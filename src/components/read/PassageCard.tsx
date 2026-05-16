/**
 * One passage on the `/read` corpus-browser surface.
 *
 * Layout, top to bottom (with sections omitted when their data is empty):
 *   1. Locator chip (e.g. `prashastapada · samavaya.5`)
 *   2. Sanskrit block — Devanagari, then IAST below it
 *   3. Jha's literal English — the canonical record
 *   4. Locale-appropriate AI re-rendering:
 *        en locale → en_simple_draft (accessible English)
 *        ml locale → ml_draft (maṇipravāḷam Malayalam)
 *   5. Small "AI-reviewed for evaluation" footer chip
 *
 * Sanskrit (Devanagari + IAST) is always visible when present,
 * regardless of locale, per vision Part VII.
 */

import type { SourcePassage } from '@/lib/schema';
import type { Locale } from '@/lib/status';

export function PassageCard({
  passage,
  locale,
}: {
  passage: SourcePassage;
  locale: Locale;
}) {
  const rendering = locale === 'ml' ? passage.ml_draft : passage.en_simple_draft;
  const aiReviewed = rendering?.reviewed_by === 'ai';

  return (
    <article className="border-l border-ink-faint/20 pl-6 py-2">
      <header className="mb-4 text-xs uppercase tracking-[0.2em] text-ink-faint">
        {passage.text_key === 'prashastapada' ? 'praśastapāda' : 'nyāyakandalī'}
        <span className="mx-2 text-ink-faint/50">·</span>
        <span className="font-mono normal-case tracking-normal">{passage.locator}</span>
      </header>

      {passage.sa_devanagari && (
        <p className="sa text-xl leading-relaxed text-ink mb-2">{passage.sa_devanagari}</p>
      )}
      {passage.sa_iast && (
        <p className="text-sm italic text-ink-muted mb-6">{passage.sa_iast}</p>
      )}

      {passage.literal_en && (
        <div className="mb-6 provenance-stripe" data-kind="traditional">
          <p className="text-xs uppercase tracking-wide text-ink-faint mb-1">
            Jha (1916), verbatim
          </p>
          <p className="text-base leading-relaxed text-ink whitespace-pre-line">
            {passage.literal_en}
          </p>
        </div>
      )}

      {rendering?.text && (
        <div className="provenance-stripe" data-kind="paraphrase">
          <p className="text-xs uppercase tracking-wide text-ink-faint mb-1">
            {locale === 'ml' ? 'മലയാളം — മണിപ്രവാളം' : 'accessible English'}
          </p>
          <p
            className={`text-base leading-relaxed text-ink whitespace-pre-line ${
              locale === 'ml' ? 'ml' : ''
            }`}
          >
            {rendering.text}
          </p>
        </div>
      )}

      <footer className="mt-4 text-[10px] uppercase tracking-[0.2em] text-ink-faint">
        {aiReviewed ? 'AI-reviewed · published for evaluation' : 'unverified draft'}
      </footer>
    </article>
  );
}
