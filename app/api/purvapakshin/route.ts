/**
 * POST /api/purvapakshin
 *
 * The dialogue engine route. Loads approved purvapaksa positions for the
 * named concept, validates the request, builds the system prompt, and
 * streams Claude's response as a sequence of SSE-style JSON events.
 *
 * Authority: vision Part VI. Hard constraints enforced here (not just in
 * the system prompt):
 *
 *   - `requestedPositionId`, if present, MUST be in the approved set. If
 *     not, 400 (no LLM call).
 *   - Any `position_id` reference inside the learner's prior messages
 *     that is NOT in the approved set is stripped before forwarding. We
 *     do not pass through unapproved ids even silently.
 *   - If ANTHROPIC_API_KEY is not set, 503. The build must not call the
 *     LLM; this gate is what guarantees that.
 *   - The trailing `[position_id]` tag the model emits is parsed out of
 *     the accumulated text and surfaced to the client as a `meta` event,
 *     so the UI can render a provenance stripe / link without parsing
 *     the model output itself.
 *
 * Persistence: NONE. Transcripts are not written anywhere by this route
 * — the svadhyaya notebook is a separate track.
 */

import { z } from 'zod';
import { loadApprovedPurvapaksa } from '@/lib/content';
import { stream as streamClaude, isAvailable } from '@/lib/llm/anthropic-client';
import { buildSystemPrompt } from '@/lib/purvapakshin/system-prompt';
import type { PurvapaksaPosition } from '@/lib/schema';

// Edge runtime is fine for this route — it reads JSON content via the
// content loader (which uses node:fs). Keep Node runtime for now to
// avoid disturbing the loader; revisit if we move purvapaksa loading
// into a build-time artifact.
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const DialogueMessageSchema = z.object({
  role: z.enum(['learner', 'purvapakshin', 'siddhanta']),
  text: z.string().min(1),
  position_id: z.string().min(1).optional(),
});

const DialogueRequestSchema = z.object({
  conceptSlug: z
    .string()
    .min(1)
    .regex(/^[a-z][a-z0-9-]*$/, 'conceptSlug must be kebab-case ascii'),
  messages: z.array(DialogueMessageSchema).min(1),
  requestedPositionId: z.string().min(1).optional(),
  mode: z.enum(['purvapakshin', 'siddhanta']).optional(),
});

type ApprovedById = Map<string, PurvapaksaPosition>;

export async function POST(req: Request): Promise<Response> {
  // 1. Gate on env. Build must never reach the LLM.
  if (!isAvailable()) {
    return Response.json(
      { error: 'ANTHROPIC_API_KEY is not set; live dialogue is unavailable.' },
      { status: 503 },
    );
  }

  // 2. Parse + validate.
  let raw: unknown;
  try {
    raw = await req.json();
  } catch {
    return Response.json({ error: 'Request body must be JSON.' }, { status: 400 });
  }
  const parsed = DialogueRequestSchema.safeParse(raw);
  if (!parsed.success) {
    return Response.json(
      { error: 'Invalid request', details: parsed.error.flatten() },
      { status: 400 },
    );
  }
  const body = parsed.data;

  // 3. Siddhanta mode is a quiet stub. The gloss corpus is not yet
  //    ingested, and we do NOT improvise darśana (vision Part XI).
  if (body.mode === 'siddhanta') {
    return Response.json(
      {
        role: 'siddhanta',
        text: "Śrīdhara's response is not yet ingested for this position.",
        position_id: body.requestedPositionId ?? null,
        stub: true,
      },
      { status: 200 },
    );
  }

  // 4. Load approved positions. This is the ONLY source the engine sees.
  const approved = await loadApprovedPurvapaksa();
  const approvedById: ApprovedById = new Map(approved.map((p) => [p.id, p]));

  // 5. Enforce requestedPositionId is approved.
  if (body.requestedPositionId && !approvedById.has(body.requestedPositionId)) {
    return Response.json(
      {
        error:
          'requestedPositionId is not in the approved purvapaksa corpus for any concept. The dialogue engine refuses unapproved positions (vision Part VI).',
      },
      { status: 400 },
    );
  }

  // 6. Strip any position_id from prior messages that is not in the
  //    approved set. Unapproved ids never propagate to the model.
  const cleanedMessages = body.messages.map((m) => ({
    role: m.role,
    text: m.text,
    position_id:
      m.position_id && approvedById.has(m.position_id) ? m.position_id : undefined,
  }));

  // 7. Build the system prompt from the approved positions only. For
  //    now we surface every approved position to the model and let it
  //    pick the appropriate one (or use requestedPositionId if given).
  //    A future iteration can filter by conceptSlug once concept→position
  //    bindings are first-class.
  const system = buildSystemPrompt({
    conceptSlug: body.conceptSlug,
    approvedPositions: approved,
    requestedPositionId: body.requestedPositionId,
  });

  // 8. Translate transcript to Anthropic role pairs. Learner → user,
  //    purvapakshin/siddhanta → assistant (the model is re-entering its
  //    own prior dialectic turns).
  const anthropicMessages = cleanedMessages.map((m) => ({
    role: m.role === 'learner' ? ('user' as const) : ('assistant' as const),
    content: m.text,
  }));
  // Anthropic requires the first message to be a user turn.
  if (anthropicMessages[0]?.role !== 'user') {
    return Response.json(
      { error: 'The first message must be from the learner.' },
      { status: 400 },
    );
  }

  // 9. Stream. We accumulate text to parse the trailing `[position_id]`
  //    tag, but we forward deltas immediately so the UI is responsive.
  const encoder = new TextEncoder();
  const readable = new ReadableStream<Uint8Array>({
    async start(controller) {
      const send = (obj: unknown) => {
        controller.enqueue(encoder.encode(`data: ${JSON.stringify(obj)}\n\n`));
      };
      let accumulated = '';
      try {
        for await (const delta of streamClaude({
          system,
          messages: anthropicMessages,
        })) {
          accumulated += delta;
          send({ type: 'delta', text: delta });
        }
        const { positionId, thinker, source_text } = parseClosingPositionTag(
          accumulated,
          approvedById,
        );
        send({
          type: 'meta',
          position_id: positionId,
          thinker,
          source_text,
        });
        send({ type: 'done' });
      } catch (err) {
        send({ type: 'error', message: (err as Error).message });
      } finally {
        controller.close();
      }
    },
  });

  return new Response(readable, {
    headers: {
      'Content-Type': 'text/event-stream; charset=utf-8',
      'Cache-Control': 'no-cache, no-transform',
      Connection: 'keep-alive',
    },
  });
}

/**
 * Parse the trailing `[position_id]` token that the system prompt
 * instructs the model to emit. The tag MUST be a known approved id;
 * if the model invented an id or omitted the tag, we surface
 * position_id = null and the UI shows a "no provenance — refusal or
 * malformed turn" indicator.
 *
 * Exported behavior: only the LAST bracketed token at end-of-text is
 * considered. We do not parse mid-text brackets (the prompt forbids
 * them); a stricter author-time linter can be layered later.
 */
function parseClosingPositionTag(
  text: string,
  approvedById: ApprovedById,
): { positionId: string | null; thinker?: string; source_text?: string } {
  const trimmed = text.trimEnd();
  const match = trimmed.match(/\[([a-zA-Z0-9._:-]+)\]\s*$/);
  if (!match) return { positionId: null };
  const id = match[1];
  if (!id) return { positionId: null };
  const position = approvedById.get(id);
  if (!position) {
    // Model emitted a tag, but it is not an approved id. Surface as
    // null so the UI does not falsely attribute provenance.
    return { positionId: null };
  }
  return {
    positionId: position.id,
    thinker: position.thinker,
    source_text: position.source_text,
  };
}
