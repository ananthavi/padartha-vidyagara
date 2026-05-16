/**
 * Vṛtti panel — the verse layer (vision Part IV.3).
 *
 * Surfaces, in this order:
 *   1. Devanagari mūla (always visible)
 *   2. IAST transliteration (always visible)
 *   3. Literal English rendering (always visible — IAST without literal
 *      meaning is opaque even in the Malayalam reading; we keep it)
 *   4. Framing prose in the active locale (provenance-striped as
 *      `paraphrase`, since framing is faithful re-expression)
 *   5. Padavigraha — each pada exposed as a hover-glossary trigger
 *   6. Recitation control (renders only if audio_ref is present)
 *
 * Sanskrit is primary (vision Part VII): the top three lines render
 * regardless of locale toggle.
 */

import { isPublishedFor, type Locale } from '@/lib/status';
import type { ConceptNode } from '@/lib/schema';
import { ProvenanceStripe } from './ProvenanceStripe';
import { GlossaryHover } from './GlossaryHover';
import { RecitationControl } from './RecitationControl';
import { PreparingPlaceholder } from './PreparingPlaceholder';

export function VrittiPanel({
  depth,
  locale,
}: {
  depth: ConceptNode['depths']['vritti'];
  locale: Locale;
}) {
  if (!isPublishedFor(depth.status, locale)) {
    return <PreparingPlaceholder locale={locale} />;
  }

  const framing = locale === 'ml' ? depth.framing_ml : depth.framing_en;
  const framingClass = locale === 'ml' ? 'ml' : 'font-serif';
  const padavigrahaLabel = locale === 'ml' ? 'പദവിഗ്രഹം' : 'padavigraha';

  return (
    <div className="space-y-6">
      {/* Devanagari mūla — always visible (Part VII). */}
      <ProvenanceStripe kind="traditional" as="p" className="sa text-xl text-ink">
        {depth.mula_sa}
      </ProvenanceStripe>

      <p className="text-base italic tracking-wide text-ink-muted">
        {depth.iast}
      </p>

      <p className="font-serif text-base text-ink-muted">
        {depth.literal_en}
      </p>

      {/* Framing in the active locale — faithful re-expression. */}
      <ProvenanceStripe kind="paraphrase" as="p" className={`text-lg leading-relaxed text-ink ${framingClass}`}>
        {framing}
      </ProvenanceStripe>

      {depth.padavigraha.length > 0 && (
        <div className="pt-2">
          <p className="mb-2 text-xs uppercase tracking-wide text-ink-faint">
            {padavigrahaLabel}
          </p>
          <p className="flex flex-wrap gap-x-3 gap-y-2 text-lg">
            {depth.padavigraha.map((p, i) => (
              <GlossaryHover key={`${p.iast}-${i}`} pada={p} locale={locale} />
            ))}
          </p>
        </div>
      )}

      <RecitationControl audioRef={depth.recitation_audio_ref} locale={locale} />
    </div>
  );
}
