/**
 * Ṭīkā panel — the dialectic layer (vision Part IV.4 + Part VI).
 *
 * Lists Śrīdhara's gloss references, enumerates the dialectic positions
 * admitted on this node, and mounts the pūrvapakṣin dialogue engine.
 * The engine reads only approved positions (loadApprovedPurvapaksa);
 * draft positions cannot leak through.
 *
 * The component itself is server-renderable; PurvapakshinDialogue is a
 * client island and opts in via "use client".
 */

import { isPublishedFor, type Locale } from '@/lib/status';
import type { ConceptNode } from '@/lib/schema';
import { PreparingPlaceholder } from './PreparingPlaceholder';
import { PurvapakshinDialogue } from './PurvapakshinDialogue';

export function TikaPanel({
  depth,
  locale,
  conceptSlug,
}: {
  depth: ConceptNode['depths']['tika'];
  locale: Locale;
  conceptSlug: string;
}) {
  if (!isPublishedFor(depth.status, locale)) {
    return <PreparingPlaceholder locale={locale} />;
  }

  const glossLabel = locale === 'ml' ? 'ശ്രീധര വ്യാഖ്യാനങ്ങൾ' : "Śrīdhara's glosses";
  const dialecticLabel = locale === 'ml' ? 'പൂർവ്വപക്ഷം' : 'pūrvapakṣa';

  return (
    <div className="space-y-8">
      {depth.sridhara_gloss_refs.length > 0 && (
        <section>
          <h3 className="mb-2 text-xs uppercase tracking-wide text-ink-faint">
            {glossLabel}
          </h3>
          <ul className="space-y-1 text-sm text-ink-muted">
            {depth.sridhara_gloss_refs.map((ref) => (
              <li key={ref} className="font-serif">
                {ref}
              </li>
            ))}
          </ul>
        </section>
      )}

      {depth.dialectic_positions.length > 0 && (
        <section>
          <h3 className="mb-2 text-xs uppercase tracking-wide text-ink-faint">
            {dialecticLabel}
          </h3>
          <ul className="space-y-3">
            {depth.dialectic_positions.map((dp) => (
              <li key={dp.position_id} className="text-base text-ink">
                <span className="font-serif italic">{dp.position_id}</span>
                {dp.context_note_en && (
                  <span className="ml-2 font-serif text-ink-muted">
                    — {dp.context_note_en}
                  </span>
                )}
              </li>
            ))}
          </ul>
        </section>
      )}

      <section aria-label="purvapakshin dialogue">
        <PurvapakshinDialogue conceptSlug={conceptSlug} />
      </section>
    </div>
  );
}
