/**
 * Thin wrapper around @anthropic-ai/sdk for the purvapakshin dialogue
 * engine. The wrapper exists so the route does not couple to the SDK
 * surface directly: this is the only file that imports Anthropic.
 *
 * Responsibilities:
 *   - Read ANTHROPIC_API_KEY from env on construction.
 *   - Expose a `stream()` function that returns an async-iterable of
 *     text deltas (string chunks). The caller does not see SDK events;
 *     it sees plain text.
 *   - No telemetry, no logging of learner content, no persistence
 *     (vision Part III.3 and Part XI).
 */

import Anthropic from '@anthropic-ai/sdk';

/**
 * Default model for the dialogue. As of authoring, claude-sonnet-4-6 is
 * the latest Sonnet — chosen for the purvapakshin role because it is
 * thoughtful enough for dialectical nuance without the latency of the
 * full Opus tier. A reviewer can confirm the model identity here.
 */
export const DEFAULT_MODEL = 'claude-sonnet-4-6';

export type StreamInput = {
  system: string;
  messages: Array<{ role: 'user' | 'assistant'; content: string }>;
  model?: string;
  maxTokens?: number;
};

/**
 * Construct a singleton client (per process) lazily. We never construct
 * the client at module load because next.js evaluates this file during
 * build, and the build must not require ANTHROPIC_API_KEY.
 */
let _client: Anthropic | null = null;
function client(): Anthropic {
  if (_client) return _client;
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    // Defensive — callers must gate on ANTHROPIC_API_KEY before calling
    // stream(). The route returns 503 in that case.
    throw new Error('ANTHROPIC_API_KEY is not set');
  }
  _client = new Anthropic({ apiKey });
  return _client;
}

/**
 * Stream text deltas from Claude. The returned async iterable yields
 * plain string chunks in arrival order. Consumers join them however they
 * wish (the route forwards each delta as an SSE event; the route then
 * parses the trailing `[position_id]` tag from the accumulated text).
 */
export async function* stream(input: StreamInput): AsyncIterable<string> {
  const c = client();
  const response = c.messages.stream({
    model: input.model ?? DEFAULT_MODEL,
    max_tokens: input.maxTokens ?? 2048,
    system: input.system,
    messages: input.messages,
  });

  for await (const event of response) {
    if (
      event.type === 'content_block_delta' &&
      event.delta.type === 'text_delta'
    ) {
      yield event.delta.text;
    }
  }
}

/**
 * Convenience: true iff ANTHROPIC_API_KEY is present. Routes use this to
 * decide whether to 503 before any LLM work.
 */
export function isAvailable(): boolean {
  return Boolean(process.env.ANTHROPIC_API_KEY);
}
