/**
 * Shared "being prepared" placeholder, used by each depth panel when
 * its status is not yet published in the active locale.
 *
 * The phrasing matches the page-level placeholder in tone — quiet,
 * present-tense, not apologetic. Drafts must never leak (vision Part
 * III.2), so the panel acknowledges the absence without revealing
 * whether content exists in draft elsewhere.
 */

import type { Locale } from '@/lib/status';

export function PreparingPlaceholder({ locale }: { locale: Locale }) {
  const text =
    locale === 'ml'
      ? 'ഈ സ്തരം തയ്യാറാക്കിക്കൊണ്ടിരിക്കുകയാണ്.'
      : 'This depth is being prepared.';
  return (
    <p className={`text-ink-muted ${locale === 'ml' ? 'ml' : ''}`}>
      {text}
    </p>
  );
}
