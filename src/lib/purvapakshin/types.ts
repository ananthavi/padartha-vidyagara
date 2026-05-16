/**
 * Wire shapes for the purvapakshin dialogue harness.
 *
 * These are the contracts between the client component
 * (`PurvapakshinDialogue.tsx`) and the API route
 * (`app/api/purvapakshin/route.ts`).
 *
 * Authority: vision Part VI ("Vāda governed by vīra"). The hard constraint
 * is that every assistant turn is tagged with the `position_id` it argued
 * from — there is no untagged purvapaksha. If the model declines (because
 * the requested position is not in the approved corpus), `position_id` is
 * null and the `text` carries the refusal.
 */

/**
 * One turn of the in-memory transcript exchanged with the route.
 *
 * `role` follows the schema's SvadhyayaDialogueTurn vocabulary:
 *   - 'learner'      — the human's prompt
 *   - 'purvapakshin' — Claude arguing a named purvapaksa
 *   - 'siddhanta'    — Shridhara's actual reply (currently a stub; the
 *                      gloss corpus is not yet ingested)
 *
 * `position_id` is REQUIRED for purvapakshin turns and refers to a
 * PurvapaksaPosition.id that has been approved by a shastrika. It is
 * optional for learner/siddhanta turns.
 */
export type DialogueMessage = {
  role: 'learner' | 'purvapakshin' | 'siddhanta';
  text: string;
  position_id?: string;
};

export type DialogueRequest = {
  conceptSlug: string;
  messages: DialogueMessage[];
  /**
   * If present, the route requires this id to be in the approved corpus
   * AND will instruct the model to argue from this position specifically.
   * If not approved → 400.
   */
  requestedPositionId?: string;
  /**
   * If present, the route returns the siddhanta-side reply stub instead of
   * a live LLM dialogue turn. The gloss corpus is not yet ingested
   * (vision: "no improvisation of darśana"), so the stub is intentional.
   */
  mode?: 'purvapakshin' | 'siddhanta';
};

/**
 * The shape of an assistant turn after the route has parsed the model's
 * closing `[position_id]` citation tag. `position_id` is null only when
 * the model declined to argue (refusal) — in which case the caller should
 * render the refusal rather than a position attribution.
 */
export type DialogueTurn = {
  role: 'purvapakshin';
  text: string;
  position_id: string | null;
  thinker?: string;
  source_text?: string;
};

/**
 * SSE-flavored events the route streams back. The client component reads
 * these in order. Text deltas are streamed incrementally; the final
 * `done` event carries the parsed `position_id` and the audit metadata
 * (thinker / source_text) once we know which position the model cited.
 */
export type DialogueStreamEvent =
  | { type: 'delta'; text: string }
  | { type: 'meta'; position_id: string | null; thinker?: string; source_text?: string }
  | { type: 'done' }
  | { type: 'error'; message: string };
