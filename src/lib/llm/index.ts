/**
 * Provider selector for the pūrvapakṣin dialogue engine.
 *
 * Selection order:
 *   1. If `LLM_PROVIDER` is set to a known provider, use that one
 *      (and 503 if its API key is missing — explicit choice wins).
 *   2. Otherwise prefer Anthropic if ANTHROPIC_API_KEY is set.
 *   3. Otherwise Gemini if GEMINI_API_KEY is set.
 *   4. Otherwise null — the route returns 503.
 *
 * This file is the only seam the route needs. Adding another provider
 * means: implement `LLMProvider` in a new file and register it below.
 */

import { anthropic } from './anthropic-client';
import { gemini } from './gemini-client';
import type { LLMProvider, ProviderName } from './types';

export type { LLMProvider, StreamInput, LLMMessage, LLMRole, ProviderName } from './types';
export { anthropic, gemini };

const REGISTRY: Record<ProviderName, LLMProvider> = {
  anthropic,
  gemini,
};

function parseExplicitChoice(): ProviderName | null {
  const raw = (process.env.LLM_PROVIDER || '').trim().toLowerCase();
  if (raw === 'anthropic' || raw === 'gemini') return raw;
  return null;
}

/**
 * Pick the first provider whose API key is present in the environment,
 * honouring `LLM_PROVIDER` if set. Returns null if no provider has a
 * key configured.
 */
export function selectProvider(): LLMProvider | null {
  const explicit = parseExplicitChoice();
  if (explicit) {
    const p = REGISTRY[explicit];
    return p.isAvailable() ? p : null;
  }
  if (anthropic.isAvailable()) return anthropic;
  if (gemini.isAvailable()) return gemini;
  return null;
}

/** True iff any provider has its API key configured. */
export function isAnyAvailable(): boolean {
  return anthropic.isAvailable() || gemini.isAvailable();
}

/** Diagnostic — which providers are currently usable, in selection order. */
export function availableProviders(): ProviderName[] {
  const out: ProviderName[] = [];
  if (anthropic.isAvailable()) out.push('anthropic');
  if (gemini.isAvailable()) out.push('gemini');
  return out;
}
