/**
 * Kārikā panel — the essence layer (vision Part IV.1).
 *
 * A single short statement plus an optional inline SVG. This is the
 * shortest depth on purpose: the kārikā is the seed, not the tree.
 * If `svg_ref` is provided we render it as an <img>; the SVG itself is
 * assumed to be authored separately and not embedded inline here.
 *
 * The panel is pure / server-renderable.
 */

import { isPublishedFor, type Locale } from '@/lib/status';
import type { ConceptNode } from '@/lib/schema';
import { ProvenanceStripe } from './ProvenanceStripe';
import { PreparingPlaceholder } from './PreparingPlaceholder';

export function KarikaPanel({
  depth,
  locale,
}: {
  depth: ConceptNode['depths']['karika'];
  locale: Locale;
}) {
  if (!isPublishedFor(depth.status, locale)) {
    return <PreparingPlaceholder locale={locale} />;
  }

  const essence = locale === 'ml' ? depth.essence_ml : depth.essence_en;
  const essenceClass = locale === 'ml' ? 'ml' : '';

  return (
    <div className="space-y-6">
      <ProvenanceStripe kind="paraphrase" as="p" className={`text-xl leading-relaxed text-ink ${essenceClass}`}>
        {essence}
      </ProvenanceStripe>
      {depth.svg_ref && (
        <figure className="pt-2">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={depth.svg_ref}
            alt=""
            className="max-w-full"
            loading="lazy"
          />
        </figure>
      )}
    </div>
  );
}
