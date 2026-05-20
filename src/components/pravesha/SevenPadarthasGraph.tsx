'use client';

/**
 * SevenPadarthasGraph — an SVG graph that unfolds one padārtha at a time.
 *
 * Authority: docs/VISION.md Part II Phase 1 ("the seven padārthas unfolding
 * visually as a structured graph, one node at a time, with breathing
 * room"); Part V (motion must justify itself by disclosing structure;
 * decorative animation does not ship).
 *
 * Layout is hand-tuned and static. No force-directed solver: the seven
 * padārthas have a canonical doctrinal ordering and the renderer reflects
 * it. dravya sits at the centre. guṇa, karma, sāmānya, viśeṣa orbit
 * around as the four that inhere. samavāya, the relation itself, sits
 * apart — labelled but not positioned within the inherence ring. abhāva,
 * the seventh, sits opposite as the contrast term.
 *
 * Edge styling: samavāya is drawn with a doubled cross-stripe stroke
 * (doctrinally the inherence relation is "tighter" than conjunction);
 * saṃyoga is drawn with a single dashed stroke. Labels appear only on
 * hover — the vision (Part II, Part V) is explicit that the graph
 * discloses structure without captions.
 */

import { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { PADARTHAS, type PadarthaEdgeKind, type PadarthaId } from '@/data/padarthas';

interface NodePosition {
  cx: number;
  cy: number;
}

// Hand-tuned coordinates on a 600x460 viewBox. dravya at centre.
// The four inherence-bearers orbit. samavāya sits low-right (the relation
// is "between" categories). abhāva mirrors at top, as the contrast term.
const POSITIONS: Record<PadarthaId, NodePosition> = {
  dravya: { cx: 300, cy: 240 },
  guna: { cx: 130, cy: 170 },
  karma: { cx: 130, cy: 320 },
  samanya: { cx: 470, cy: 170 },
  vishesha: { cx: 470, cy: 320 },
  samavaya: { cx: 300, cy: 410 },
  abhava: { cx: 300, cy: 60 },
};

// Order of appearance. dravya first (the substantive ground), then the
// four inhering padārthas, then samavāya (the relation that has bound
// them all along), then abhāva (the contrast that completes the seven).
const REVEAL_ORDER: PadarthaId[] = [
  'dravya',
  'guna',
  'karma',
  'samanya',
  'vishesha',
  'samavaya',
  'abhava',
];

// Per-node delay. 750ms is inside the 600–900ms breathing-room band the
// vision prescribes; slow enough that each padārtha registers, fast
// enough that the seven together remain a single unfolding gesture.
const STEP_MS = 750;

function strokeFor(kind: PadarthaEdgeKind): {
  stroke: string;
  strokeDasharray?: string;
  strokeWidth: number;
} {
  switch (kind) {
    case 'samavaya':
      // Solid, slightly heavier. The cross-stripe overlay is rendered
      // separately to mark inherence doctrinally.
      return { stroke: '#5a554c', strokeWidth: 1.5 };
    case 'samyoga':
      return { stroke: '#8a8378', strokeDasharray: '4 4', strokeWidth: 1 };
    case 'related':
      return { stroke: '#8a8378', strokeDasharray: '1 5', strokeWidth: 1 };
  }
}

interface EdgeSpec {
  from: PadarthaId;
  to: PadarthaId;
  kind: PadarthaEdgeKind;
}

// Flatten the edge declarations into a single list for rendering.
const EDGES: EdgeSpec[] = PADARTHAS.flatMap((p) =>
  p.edges
    // Drop self-loops (dravya→dravya for saṃyoga is doctrinally
    // sensible but visually noisy as a self-loop).
    .filter((e) => e.to !== p.id)
    .map((e) => ({ from: p.id, to: e.to, kind: e.kind })),
);

export interface SevenPadarthasGraphProps {
  /** Locale toggle for the gloss row beneath the graph (en | ml). */
  locale?: 'en' | 'ml';
}

export function SevenPadarthasGraph({ locale = 'en' }: SevenPadarthasGraphProps) {
  const reduceMotion = useReducedMotion();
  // Index of the last node that has been revealed. -1 means none yet.
  const [revealedThrough, setRevealedThrough] = useState<number>(
    reduceMotion ? REVEAL_ORDER.length - 1 : -1,
  );
  const [hoveredEdge, setHoveredEdge] = useState<number | null>(null);

  useEffect(() => {
    if (reduceMotion) return;
    if (revealedThrough >= REVEAL_ORDER.length - 1) return;
    const t = window.setTimeout(() => {
      setRevealedThrough((n) => n + 1);
    }, STEP_MS);
    return () => window.clearTimeout(t);
  }, [revealedThrough, reduceMotion]);

  const isRevealed = (id: PadarthaId) => {
    const idx = REVEAL_ORDER.indexOf(id);
    return idx >= 0 && idx <= revealedThrough;
  };

  return (
    <section
      aria-labelledby="padarthas-heading"
      className="mx-auto max-w-3xl px-6 py-16"
    >
      <h2
        id="padarthas-heading"
        className="text-xs uppercase tracking-[0.3em] text-ink-faint text-center mb-10"
      >
        sapta padārtha
      </h2>

      <div className="relative">
        <svg
          viewBox="0 0 600 460"
          className="w-full h-auto"
          role="img"
          aria-label="The seven padārthas as a structured graph"
        >
          <defs>
            {/* Cross-stripe pattern for samavāya. Doctrinally legible:
                the inherence relation is "woven through" rather than
                merely adjacent. This is the doctrinal motion the vision
                permits (Part V). */}
            <pattern
              id="samavaya-stripe"
              patternUnits="userSpaceOnUse"
              width="6"
              height="6"
              patternTransform="rotate(45)"
            >
              <rect width="6" height="6" fill="transparent" />
              <line x1="0" y1="0" x2="0" y2="6" stroke="#3a5a7a" strokeWidth="1.2" />
            </pattern>
          </defs>

          {/* Edges first so nodes draw over them. */}
          {EDGES.map((e, i) => {
            const from = POSITIONS[e.from];
            const to = POSITIONS[e.to];
            const visible = isRevealed(e.from) && isRevealed(e.to);
            const style = strokeFor(e.kind);
            return (
              <g
                key={`edge-${i}`}
                onMouseEnter={() => setHoveredEdge(i)}
                onMouseLeave={() => setHoveredEdge((h) => (h === i ? null : h))}
                style={{ cursor: 'help' }}
              >
                <motion.line
                  x1={from.cx}
                  y1={from.cy}
                  x2={to.cx}
                  y2={to.cy}
                  stroke={style.stroke}
                  strokeWidth={style.strokeWidth}
                  strokeDasharray={style.strokeDasharray}
                  initial={false}
                  animate={{ opacity: visible ? 1 : 0 }}
                  transition={{ duration: 0.6, ease: 'easeOut' }}
                />
                {e.kind === 'samavaya' && (
                  // Overlay the cross-stripe on the inherence edge as a
                  // visibly distinct mark — without a textual label.
                  <motion.line
                    x1={from.cx}
                    y1={from.cy}
                    x2={to.cx}
                    y2={to.cy}
                    stroke="url(#samavaya-stripe)"
                    strokeWidth={5}
                    initial={false}
                    animate={{ opacity: visible ? 0.5 : 0 }}
                    transition={{ duration: 0.6, ease: 'easeOut' }}
                  />
                )}
                {/* Hover-only label. Sits at midpoint. */}
                {hoveredEdge === i && visible && (
                  <text
                    x={(from.cx + to.cx) / 2}
                    y={(from.cy + to.cy) / 2 - 6}
                    textAnchor="middle"
                    fontSize="11"
                    fontStyle="italic"
                    fill="#5a554c"
                    pointerEvents="none"
                  >
                    {e.kind === 'samavaya'
                      ? 'samavāya'
                      : e.kind === 'samyoga'
                      ? 'saṃyoga'
                      : 'related'}
                  </text>
                )}
                {/* Wider invisible hit-line to make hover forgiving. */}
                <line
                  x1={from.cx}
                  y1={from.cy}
                  x2={to.cx}
                  y2={to.cy}
                  stroke="transparent"
                  strokeWidth={14}
                  pointerEvents={visible ? 'stroke' : 'none'}
                />
              </g>
            );
          })}

          {/* Nodes. Each is an <a> link to the concept page, so a learner
              who recognises the padārtha can step into its concept node
              immediately. Discoverability without push — the link is
              there, no arrow or "click me" prompt. */}
          {PADARTHAS.map((p) => {
            const pos = POSITIONS[p.id];
            const visible = isRevealed(p.id);
            return (
              <motion.g
                key={p.id}
                initial={false}
                animate={{ opacity: visible ? 1 : 0 }}
                transition={{ duration: 0.7, ease: 'easeOut' }}
              >
                <a
                  href={`/${locale}/concept/${p.slug}`}
                  aria-label={`${p.title_iast} concept`}
                  style={{
                    cursor: visible ? 'pointer' : 'default',
                    pointerEvents: visible ? 'all' : 'none',
                  }}
                >
                  <circle
                    cx={pos.cx}
                    cy={pos.cy}
                    r={42}
                    fill="#fbf7ee"
                    stroke="#3a5a7a"
                    strokeWidth={1}
                  />
                  <text
                    x={pos.cx}
                    y={pos.cy - 2}
                    textAnchor="middle"
                    className="sa"
                    fontSize="22"
                    fill="#1a1814"
                  >
                    {p.title_sa}
                  </text>
                  <text
                    x={pos.cx}
                    y={pos.cy + 16}
                    textAnchor="middle"
                    fontSize="10"
                    fontStyle="italic"
                    fill="#5a554c"
                  >
                    {p.title_iast}
                  </text>
                </a>
              </motion.g>
            );
          })}
        </svg>
      </div>

      {/* Gloss row beneath. Sanskrit is already on the nodes; here we
          surface only the doorway language (English or Malayalam), per
          vision Part I commitment 4 ("English and Malayalam are
          doorways"). */}
      <ul className="mt-10 grid grid-cols-2 gap-x-8 gap-y-3 text-sm">
        {PADARTHAS.map((p) => {
          const visible = isRevealed(p.id);
          const gloss = locale === 'ml' ? p.gloss_ml : p.gloss_en;
          return (
            <motion.li
              key={p.id}
              initial={false}
              animate={{ opacity: visible ? 1 : 0 }}
              transition={{ duration: 0.7, ease: 'easeOut' }}
              className="flex items-baseline gap-3"
            >
              <span className="sa text-base text-ink min-w-[5rem]">{p.title_sa}</span>
              {gloss ? (
                <span
                  className={
                    locale === 'ml' ? 'ml text-ink-muted' : 'text-ink-muted'
                  }
                >
                  {gloss}
                </span>
              ) : (
                <span className="text-ink-faint italic">—</span>
              )}
            </motion.li>
          );
        })}
      </ul>
    </section>
  );
}

export default SevenPadarthasGraph;
