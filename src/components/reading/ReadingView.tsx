'use client';

/**
 * Top-level reading-view container.
 *
 * Responsibilities:
 *   - Render the Sanskrit-primary header (title_sa always, then IAST,
 *     then locale title — vision Part VII).
 *   - Host the DepthSelector and the four panels.
 *   - Pick an initial depth — the shallowest published depth in the
 *     active locale, defaulting to 'karika' when nothing is published.
 *   - Cross-fade between depth panels with a 200ms transition. This is
 *     the only motion in the reading view (vision Part V).
 *   - Render a single quiet "being prepared" message when the node has
 *     no published depth in the current locale.
 *
 * Why client? Depth switching is local UI state; making this a client
 * component lets the page remain a thin server entry that loads the
 * validated ConceptNode and hands it down. The four panels themselves
 * are pure renderers and can be statically generated as RSC children
 * once Next.js supports passing those through "use client" components —
 * for now we accept the client boundary at ReadingView and keep the
 * panels pure-functional so they remain trivially testable.
 */

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import type { ConceptNode } from '@/lib/schema';
import { isPublishedFor, type Locale } from '@/lib/status';
import { DepthSelector, DEPTHS, type Depth } from './DepthSelector';
import { KarikaPanel } from './KarikaPanel';
import { BhashyaPanel } from './BhashyaPanel';
import { VrittiPanel } from './VrittiPanel';
import { TikaPanel } from './TikaPanel';
import { SourceDrawer } from './SourceDrawer';

export function ReadingView({
  node,
  locale,
}: {
  node: ConceptNode;
  locale: Locale;
}) {
  const availability: Record<Depth, boolean> = {
    karika: isPublishedFor(node.depths.karika.status, locale),
    bhashya: isPublishedFor(node.depths.bhashya.status, locale),
    vritti: isPublishedFor(node.depths.vritti.status, locale),
    tika: isPublishedFor(node.depths.tika.status, locale),
  };

  const anyPublished = DEPTHS.some((d) => availability[d]);
  const initial: Depth = DEPTHS.find((d) => availability[d]) ?? 'karika';
  const [current, setCurrent] = useState<Depth>(initial);

  const title = locale === 'en' ? node.title_en : node.title_ml;
  const titleClass = locale === 'ml' ? 'ml' : 'font-serif';

  const beingPrepared =
    locale === 'ml'
      ? 'ഈ ഉള്ളടക്കം ഇപ്പോൾ തയ്യാറാക്കിക്കൊണ്ടിരിക്കുകയാണ്. വളരെ പതുക്കെ.'
      : 'This node is being prepared. Slowly, with care.';

  return (
    <article className="mx-auto max-w-prose space-y-12 px-6 py-16">
      {/* Header. Sanskrit always leads (Part VII). */}
      <header className="space-y-2">
        <h1 className="sa text-4xl text-ink">{node.title_sa}</h1>
        <p className="text-sm italic tracking-wide text-ink-faint">
          {node.title_iast}
        </p>
        <p className={`text-2xl text-ink ${titleClass}`}>{title}</p>
      </header>

      {!anyPublished ? (
        <p className={`text-ink-muted ${locale === 'ml' ? 'ml' : ''}`}>
          {beingPrepared}
        </p>
      ) : (
        <>
          <DepthSelector
            current={current}
            onChange={setCurrent}
            availability={availability}
            locale={locale}
          />

          <section aria-live="polite" className="min-h-[8rem]">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={current}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2, ease: 'linear' }}
              >
                {current === 'karika' && (
                  <KarikaPanel depth={node.depths.karika} locale={locale} />
                )}
                {current === 'bhashya' && (
                  <BhashyaPanel
                    depth={node.depths.bhashya}
                    provenanceTable={node.provenance_per_paragraph}
                    locale={locale}
                  />
                )}
                {current === 'vritti' && (
                  <VrittiPanel depth={node.depths.vritti} locale={locale} />
                )}
                {current === 'tika' && (
                  <TikaPanel
                    depth={node.depths.tika}
                    locale={locale}
                    conceptSlug={node.slug}
                  />
                )}
              </motion.div>
            </AnimatePresence>
          </section>
        </>
      )}

      <SourceDrawer node={node} locale={locale} />
    </article>
  );
}
