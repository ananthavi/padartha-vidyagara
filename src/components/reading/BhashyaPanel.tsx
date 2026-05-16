/**
 * Bhāṣya panel — the expository layer (vision Part IV.2).
 *
 * Renders the body prose for the active locale. Paragraph-level
 * provenance is read from `node.provenance_per_paragraph` and applied
 * via <ProvenanceStripe>. Body content is split on blank lines so that
 * each paragraph can carry its own stripe; the paragraph id convention
 * is `p1`, `p2`, …, matching the order in the authored body.
 *
 * Pure / server-renderable.
 */

import { isPublishedFor, type Locale } from '@/lib/status';
import type { ConceptNode, ParagraphProvenance, Provenance } from '@/lib/schema';
import { ProvenanceStripe } from './ProvenanceStripe';
import { PreparingPlaceholder } from './PreparingPlaceholder';

function paragraphsOf(body: string): string[] {
  return body
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean);
}

function provenanceFor(
  index: number,
  table: ParagraphProvenance[],
): Provenance {
  const id = `p${index + 1}`;
  const hit = table.find((t) => t.paragraph_id === id);
  return hit?.kind ?? 'paraphrase';
}

export function BhashyaPanel({
  depth,
  provenanceTable,
  locale,
}: {
  depth: ConceptNode['depths']['bhashya'];
  provenanceTable: ParagraphProvenance[];
  locale: Locale;
}) {
  if (!isPublishedFor(depth.status, locale)) {
    return <PreparingPlaceholder locale={locale} />;
  }

  const body = locale === 'ml' ? depth.body_ml : depth.body_en;
  const bodyClass = locale === 'ml' ? 'ml' : 'font-serif';
  const paragraphs = paragraphsOf(body);

  return (
    <div className="space-y-5">
      {paragraphs.map((p, i) => (
        <ProvenanceStripe
          key={i}
          as="p"
          kind={provenanceFor(i, provenanceTable)}
          className={`text-lg leading-relaxed text-ink ${bodyClass}`}
        >
          {p}
        </ProvenanceStripe>
      ))}
    </div>
  );
}
