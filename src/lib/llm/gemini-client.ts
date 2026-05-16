/**
 * Gemini provider — implements LLMProvider via @google/generative-ai.
 * This file is the only place that imports the Google SDK.
 *
 * Configuration:
 *   - Reads GEMINI_API_KEY from env on construction (lazy).
 *   - Maps the provider-neutral `user`/`assistant` roles to Gemini's
 *     `user`/`model` roles.
 *   - Passes `system` as Gemini's `systemInstruction` so it carries the
 *     same hard constraints as the Anthropic path.
 *
 * Vision-relevant invariants (Parts III.3, VI, XI):
 *   - No telemetry, no logging of learner content, no persistence here.
 *   - The system prompt — which forbids unapproved positions and
 *     AI-generated Sanskrit — is provided by the route, not the client.
 *   - The trailing `[position_id]` tag convention is provider-agnostic;
 *     the route parses it from accumulated text after streaming closes.
 */

import { GoogleGenerativeAI } from '@google/generative-ai';
import type { LLMProvider, StreamInput } from './types';

/**
 * Default model for the dialogue. Uses Google's `-latest` alias so the
 * deployment automatically picks up the most recent Gemini Pro release
 * rather than pinning to a specific version that will go stale.
 * Override per request via `input.model` if a śāstrika wants to A/B a
 * specific snapshot. The current alias (as of writing) resolves to a
 * Gemini 2.5-class Pro model.
 */
export const GEMINI_DEFAULT_MODEL = 'gemini-pro-latest';

let _client: GoogleGenerativeAI | null = null;
function client(): GoogleGenerativeAI {
  if (_client) return _client;
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error('GEMINI_API_KEY is not set');
  }
  _client = new GoogleGenerativeAI(apiKey);
  return _client;
}

async function* geminiStream(input: StreamInput): AsyncIterable<string> {
  const genAI = client();
  const model = genAI.getGenerativeModel({
    model: input.model ?? GEMINI_DEFAULT_MODEL,
    systemInstruction: input.system,
    generationConfig: {
      maxOutputTokens: input.maxTokens ?? 2048,
    },
  });

  // Map provider-neutral roles to Gemini's role names.
  const contents = input.messages.map((m) => ({
    role: m.role === 'user' ? 'user' : 'model',
    parts: [{ text: m.content }],
  }));

  const result = await model.generateContentStream({ contents });

  for await (const chunk of result.stream) {
    const text = chunk.text();
    if (text) yield text;
  }
}

export const gemini: LLMProvider = {
  name: 'gemini',
  defaultModel: GEMINI_DEFAULT_MODEL,
  isAvailable: () => Boolean(process.env.GEMINI_API_KEY),
  stream: geminiStream,
};
