/**
 * Provider-agnostic interface for the LLM-backed dialogue.
 *
 * The pūrvapakṣin route consumes a `LLMProvider`; both the Anthropic
 * and Google Gemini clients implement this interface. Adding another
 * provider (OpenAI, Mistral, a local model) is one file: implement
 * `LLMProvider`, register it in `./index.ts:selectProvider`.
 *
 * Streaming shape is plain text deltas (not provider-specific event
 * objects). The route accumulates the deltas and parses the trailing
 * `[position_id]` tag itself — the tag convention is the same across
 * providers because it is enforced by the system prompt, not the SDK.
 */

export type LLMRole = 'user' | 'assistant';

export type LLMMessage = {
  role: LLMRole;
  content: string;
};

export type StreamInput = {
  /** The grounded system prompt (provider-neutral text). */
  system: string;
  /** Conversation turns. First message MUST be a `user` turn. */
  messages: LLMMessage[];
  /** Provider-specific model id; falls back to provider's default. */
  model?: string;
  /** Soft cap on response length. */
  maxTokens?: number;
};

export type ProviderName = 'anthropic' | 'gemini';

export type LLMProvider = {
  readonly name: ProviderName;
  readonly defaultModel: string;
  /** True iff the provider's API key is present in the environment. */
  isAvailable(): boolean;
  /** Stream text deltas as plain strings, in arrival order. */
  stream(input: StreamInput): AsyncIterable<string>;
};
