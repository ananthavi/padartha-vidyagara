/**
 * DisanalogyPanel
 *
 * Wraps a visualization with an explicit pair of disclosures:
 *   - `reveals`: what the depicted motion / arrangement faithfully shows.
 *   - `falsifies`: which adjacent modern-scientific picture the motion is
 *     NOT silently importing.
 *
 * Vision authority:
 *   - Part V mandates this pair on every visualization that touches an
 *     analogy to modern science. The samavaya/samyoga contrast itself
 *     does not analogize to science, but stating what it is *not* is the
 *     classical move (vyatireka) and prevents the most common modern
 *     misreading (samavaya as bond, as set-membership, as topology).
 *   - Part XI: "where an analogy is offered, the dis-analogy must be
 *     stated in the same breath."
 *
 * The component is intentionally quiet: low contrast, narrow column,
 * no chrome that competes with the visualization above it.
 */

import type { ReactNode } from 'react';

export interface BilingualSlot {
  /** English text. Required. */
  en: string;
  /**
   * Malayalam translation. Optional — leave blank if a faithful rendering
   * cannot be produced without distorting a terminus technicus. A TODO
   * comment near the call-site is preferred over a forced gloss.
   */
  ml?: string;
}

export interface DisanalogyPanelProps {
  /** What the visualization above this panel faithfully discloses. */
  reveals: BilingualSlot;
  /** Which adjacent modern picture the visualization does NOT endorse. */
  falsifies: BilingualSlot;
  /** The visualization itself. */
  children: ReactNode;
}

export function DisanalogyPanel({
  reveals,
  falsifies,
  children,
}: DisanalogyPanelProps) {
  return (
    <figure className="mx-auto w-full max-w-4xl">
      <div className="mb-3">{children}</div>
      <figcaption
        className="mt-2 rounded-sm border border-ink-faint/30 bg-page-deep/40 px-4 py-3 text-sm text-ink-muted"
        aria-label="What this visualization reveals and falsifies"
      >
        <dl className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <div>
            <dt className="mb-1 font-sans text-[0.7rem] uppercase tracking-widest text-ink-faint">
              reveals
            </dt>
            <dd className="font-serif leading-snug text-ink">{reveals.en}</dd>
            {reveals.ml ? (
              <dd className="mt-1 font-malayalam text-[0.95rem] leading-snug text-ink-muted">
                {reveals.ml}
              </dd>
            ) : null}
          </div>
          <div>
            <dt className="mb-1 font-sans text-[0.7rem] uppercase tracking-widest text-ink-faint">
              not&nbsp;/&nbsp;na
            </dt>
            <dd className="font-serif leading-snug text-ink">
              {falsifies.en}
            </dd>
            {falsifies.ml ? (
              <dd className="mt-1 font-malayalam text-[0.95rem] leading-snug text-ink-muted">
                {falsifies.ml}
              </dd>
            ) : null}
          </div>
        </dl>
      </figcaption>
    </figure>
  );
}

export default DisanalogyPanel;
