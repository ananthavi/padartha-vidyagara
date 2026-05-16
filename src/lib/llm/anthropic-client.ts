/**
 * Anthropic provider — implements LLMProvider for the purvapakshin
 * dialogue engine. Wrapped around @anthropic-ai/sdk so the route does
 * not couple to the SDK surface: this is the only file that imports
 * Anthropic.
 *
 * Responsibilities:
 *   - Read ANTHROPIC_API_KEY from env on construction (lazy).
 *   - Expose a `stream()` function returning an async-iterable of text
 *     deltas (string chunks). The caller does not see SDK events; it
 *     sees plain text.
 *   - No telemetry, no logging of learner content, no persistence
 *     (vision Part III.3 and Part XI).
 */

import Anthropic from '@anthropic-ai/sdk';
import type { LLMProvider, StreamInput } from './types';

/**
 * As of authoring, claude-sonnet-4-6 is the latest Sonnet — chosen for
 * the purvapakshin role because it is thoughtful enough for dialectical
 * nuance without the latency of the Opus tier. A reviewer can confirm
 * the model identity here.
 */
export const ANTHROPIC_DEFAULT_MODEL = 'claude-sonnet-4-6';

let _client: Anthropic | null = null;
function client(): Anthropic {
  if (_client) return _client;
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    // Defensive — callers must gate on isAvailable() before calling
    // stream(). The route returns 503 in that case.
    throw new Error('ANTHROPIC_API_KEY is not set');
  }
  _client = new Anthropic({ apiKey });
  return _client;
}

async function* anthropicStream(input: StreamInput): AsyncIterable<string> {
  const c = client();
  const response = c.messages.stream({
    model: input.model ?? ANTHROPIC_DEFAULT_MODEL,
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

export const anthropic: LLMProvider = {
  name: 'anthropic',
  defaultModel: ANTHROPIC_DEFAULT_MODEL,
  isAvailable: () => Boolean(process.env.ANTHROPIC_API_KEY),
  stream: anthropicStream,
};

/* ------------------------------------------------------------------ */
/* Back-compat named exports (older callers used direct imports)      */
/* ------------------------------------------------------------------ */

export const DEFAULT_MODEL = ANTHROPIC_DEFAULT_MODEL;
export const stream = anthropicStream;
export const isAvailable = anthropic.isAvailable;
