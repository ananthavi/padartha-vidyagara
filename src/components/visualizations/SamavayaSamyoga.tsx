'use client';

/**
 * SamavayaSamyoga
 *
 * Two parallel SVG panels that *visibly* distinguish samyoga (conjunction,
 * separable contact) from samavaya (inherence, inseparable relation).
 *
 * Vision authority:
 *   - Part V: "Samavaya contrasted with samyoga — two parallel animations
 *     showing why the cloth and its threads, the pot and its potness, are
 *     not merely 'attached.'"
 *   - Part X: samavaya is the MVP visualization target.
 *
 * Doctrinal claim the motion must disclose:
 *   - Samyoga is anitya (non-eternal) and aupadhika (conditioned) — the
 *     two relata can be separated; when the relation dissolves, both relata
 *     remain themselves.
 *   - Samavaya is the relation in virtue of which the avayavin (the whole,
 *     here paṭa, cloth) IS its avayavas (parts, here tantu, threads).
 *     Withdraw the threads and the cloth does not get "lifted away" from
 *     them — it ceases to be. The relation is not between two pre-existing
 *     separable items; the relatum "cloth" has no standing apart from
 *     this relation.
 *
 * Discipline (vision Part V, Part XI):
 *   - No decorative motion. Every animation step is the doctrine.
 *   - No analogy to chemical bonding, set-membership, topology. The
 *     DisanalogyPanel below the visualization forbids those readings.
 *   - SVG paths are hand-written and schematic. Clarity over prettiness.
 *
 * Interaction:
 *   - Hover or tap either panel to trigger the contrast. A single shared
 *     "lift" state drives BOTH panels in parallel so the viewer sees the
 *     identical gesture yield two structurally different outcomes.
 *   - A restart button resets to the rest pose. The loop is paced ~30s
 *     end-to-end (lift -> hold -> aftermath -> reset) and is restartable.
 */

import { motion, useReducedMotion } from 'framer-motion';
import { useCallback, useEffect, useMemo, useState } from 'react';

type Phase = 'rest' | 'lifting' | 'aftermath';

/**
 * Phase durations in seconds. Tuned so the full sequence reads in
 * roughly 30 seconds, including the rest pose that bookends the loop.
 */
const TIMING = {
  rest: 4,
  lifting: 8,
  aftermath: 14, // longer dwell so the consequence has time to register
  recover: 4,
} as const;

/* ------------------------------------------------------------------ */
/* Saṃyoga panel — blanket on floor                                   */
/* ------------------------------------------------------------------ */

function SamyogaPanel({ phase }: { phase: Phase }) {
  // The "blanket" lifts cleanly off the "floor." Both relata stay intact;
  // only the contact-relation (a small highlight at the interface) fades.
  const lift = phase === 'lifting' || phase === 'aftermath';

  return (
    <svg
      viewBox="0 0 320 240"
      className="block h-auto w-full"
      role="img"
      aria-label="Saṃyoga: a small rectangle resting on a line. When lifted, the two remain intact and the contact-relation simply ceases."
    >
      {/* Floor (bhūmi) */}
      <line
        x1="20"
        y1="190"
        x2="300"
        y2="190"
        stroke="#5a554c"
        strokeWidth="1.5"
      />
      {/* Floor label */}
      <text
        x="20"
        y="215"
        fontSize="11"
        fill="#8a8378"
        fontFamily="ui-sans-serif, system-ui, sans-serif"
      >
        bhūtala (floor)
      </text>

      {/* Contact highlight: a short underline at the interface.
          This IS the samyoga — when the blanket lifts, this fades. */}
      <motion.line
        x1="110"
        y1="190"
        x2="210"
        y2="190"
        stroke="#7a6a3a"
        strokeWidth="3"
        animate={{ opacity: lift ? 0 : 1 }}
        transition={{ duration: TIMING.lifting * 0.4 }}
      />

      {/* Blanket: a simple rectangle (the relatum that gets lifted). */}
      <motion.g
        animate={{ y: lift ? -110 : 0 }}
        transition={{
          duration: TIMING.lifting,
          ease: [0.4, 0.0, 0.2, 1],
        }}
      >
        <rect
          x="110"
          y="150"
          width="100"
          height="40"
          fill="#f3ecdc"
          stroke="#1a1814"
          strokeWidth="1.5"
        />
        {/* A faint stitch line so it reads as a discrete object. */}
        <line
          x1="118"
          y1="170"
          x2="202"
          y2="170"
          stroke="#8a8378"
          strokeWidth="0.75"
          strokeDasharray="3 3"
        />
        <text
          x="160"
          y="143"
          fontSize="11"
          fill="#5a554c"
          textAnchor="middle"
          fontFamily="ui-sans-serif, system-ui, sans-serif"
        >
          kambala (blanket)
        </text>
      </motion.g>

      {/* Caption baked into the SVG so the panel is self-contained
          for screenshot / print. */}
      <text
        x="160"
        y="30"
        fontSize="13"
        fill="#1a1814"
        textAnchor="middle"
        fontFamily="ui-serif, Georgia, serif"
        fontStyle="italic"
      >
        saṃyoga
      </text>
      <text
        x="160"
        y="48"
        fontSize="10"
        fill="#5a554c"
        textAnchor="middle"
        fontFamily="ui-sans-serif, system-ui, sans-serif"
      >
        conjunction · separable contact
      </text>
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Samavāya panel — paṭa woven from tantus                            */
/* ------------------------------------------------------------------ */

/**
 * Six horizontal warps and seven vertical wefts. Hand-laid coordinates.
 * The cloth's rectangular outline is the convex hull of the weave; when
 * the threads displace, the outline must NOT stay intact — there is no
 * "cloth" hovering above the threads, available to be lifted independently.
 */
const WARP_YS = [122, 134, 146, 158, 170, 182] as const;
const WEFT_XS = [120, 132, 144, 156, 168, 180, 192] as const;
const CLOTH_LEFT = WEFT_XS[0] - 6;
const CLOTH_RIGHT = WEFT_XS[6] + 6;
const CLOTH_TOP = WARP_YS[0] - 6;
const CLOTH_BOTTOM = WARP_YS[5] + 6;

function SamavayaPanel({ phase }: { phase: Phase }) {
  // Same gesture as samyoga: a "pull" upward at the cloth's center.
  // But here, the threads are what exist; the cloth is the relation
  // among them. Pulling unweaves rather than separates.
  const pulling = phase === 'lifting' || phase === 'aftermath';
  const dissolved = phase === 'aftermath';

  return (
    <svg
      viewBox="0 0 320 240"
      className="block h-auto w-full"
      role="img"
      aria-label="Samavāya: a cloth woven from threads. When the same lifting gesture is applied, the threads displace, the cloth's boundary disintegrates, and the relatum 'cloth' ceases to be — leaving only threads in disarray."
    >
      {/* Cloth outline (paṭa). NOT a separate object: it is the visible
          boundary of the weave. It fades as the weave loosens. */}
      <motion.rect
        x={CLOTH_LEFT}
        y={CLOTH_TOP}
        width={CLOTH_RIGHT - CLOTH_LEFT}
        height={CLOTH_BOTTOM - CLOTH_TOP}
        fill="#f3ecdc"
        stroke="#1a1814"
        strokeWidth="1.5"
        strokeDasharray="0 0"
        animate={{
          opacity: dissolved ? 0 : pulling ? 0.35 : 1,
          // The outline does not move upward — there is nothing to lift.
        }}
        transition={{ duration: TIMING.lifting }}
      />

      {/* Warp threads (horizontal, tantu). Each one is independently
          a relatum; together-in-weave they make a cloth. As we pull,
          they slacken, droop, and slide out at the right edge.
          The closer to the pull-point (center), the more displacement. */}
      {WARP_YS.map((y, i) => {
        // Pulling lifts the center of each warp upward and to the right;
        // when "dissolved," the warp has slid out — endpoints diverge.
        const liftY = pulling ? -18 - i * 1.5 : 0;
        const restPath = `M ${CLOTH_LEFT} ${y} L ${CLOTH_RIGHT} ${y}`;
        const pulledPath = `M ${CLOTH_LEFT} ${y} Q 156 ${y + liftY} ${CLOTH_RIGHT} ${y}`;
        const dissolvedPath = `M ${CLOTH_LEFT - 10 - i * 2} ${y + 6 + i * 2} Q 156 ${y - 30} ${CLOTH_RIGHT + 18 + i * 3} ${y + 4 + i}`;
        return (
          <motion.path
            key={`warp-${i}`}
            d={restPath}
            fill="none"
            stroke="#7a6a3a"
            strokeWidth="1.5"
            strokeLinecap="round"
            animate={{
              d: dissolved ? dissolvedPath : pulling ? pulledPath : restPath,
            }}
            transition={{
              duration: TIMING.lifting,
              ease: [0.4, 0.0, 0.2, 1],
            }}
          />
        );
      })}

      {/* Weft threads (vertical). They were interlaced; as the warps lift,
          the wefts have nothing to hold them in column, and they fall. */}
      {WEFT_XS.map((x, i) => {
        const restPath = `M ${x} ${CLOTH_TOP} L ${x} ${CLOTH_BOTTOM}`;
        // Distance from pull center scales the displacement.
        const offCenter = (x - 156) / 36;
        const pulledPath = `M ${x} ${CLOTH_TOP - 6} L ${x + offCenter * 3} ${CLOTH_BOTTOM}`;
        const dissolvedPath = `M ${x + offCenter * 22} ${CLOTH_TOP + 40 + i * 2} L ${x + offCenter * 28} ${CLOTH_BOTTOM + 14 + i}`;
        return (
          <motion.path
            key={`weft-${i}`}
            d={restPath}
            fill="none"
            stroke="#5a554c"
            strokeWidth="1.25"
            strokeLinecap="round"
            animate={{
              d: dissolved ? dissolvedPath : pulling ? pulledPath : restPath,
            }}
            transition={{
              duration: TIMING.lifting,
              ease: [0.4, 0.0, 0.2, 1],
            }}
          />
        );
      })}

      {/* The "pull" gesture: a thin arrow at the cloth center.
          Identical in placement to where the samyoga rectangle is grasped. */}
      <motion.g
        animate={{ y: pulling ? -90 : 0, opacity: pulling ? 1 : 0 }}
        transition={{ duration: TIMING.lifting }}
      >
        <line
          x1="156"
          y1="150"
          x2="156"
          y2="120"
          stroke="#7a4a3a"
          strokeWidth="1.25"
        />
        <path
          d="M 152 124 L 156 118 L 160 124"
          fill="none"
          stroke="#7a4a3a"
          strokeWidth="1.25"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </motion.g>

      {/* Label: paṭa (cloth). Fades with the cloth's existence. */}
      <motion.text
        x="156"
        y="113"
        fontSize="11"
        fill="#5a554c"
        textAnchor="middle"
        fontFamily="ui-sans-serif, system-ui, sans-serif"
        animate={{ opacity: dissolved ? 0 : 1 }}
        transition={{ duration: TIMING.lifting * 0.5 }}
      >
        paṭa (cloth)
      </motion.text>

      {/* Label: tantavaḥ (threads). Survives — they are what exist. */}
      <text
        x="20"
        y="215"
        fontSize="11"
        fill="#8a8378"
        fontFamily="ui-sans-serif, system-ui, sans-serif"
      >
        tantavaḥ (threads)
      </text>

      {/* Aftermath note: when the cloth has ceased to be, mark that
          this is not "lifted apart" but ayutasiddha — the relation could
          not survive separation because one relatum has no standing
          apart from the relation. */}
      <motion.text
        x="160"
        y="68"
        fontSize="10"
        fill="#7a4a3a"
        textAnchor="middle"
        fontFamily="ui-sans-serif, system-ui, sans-serif"
        animate={{ opacity: dissolved ? 1 : 0 }}
        transition={{ duration: TIMING.aftermath * 0.2 }}
      >
        the cloth has ceased to be · ayutasiddha
      </motion.text>

      <text
        x="160"
        y="30"
        fontSize="13"
        fill="#1a1814"
        textAnchor="middle"
        fontFamily="ui-serif, Georgia, serif"
        fontStyle="italic"
      >
        samavāya
      </text>
      <text
        x="160"
        y="48"
        fontSize="10"
        fill="#5a554c"
        textAnchor="middle"
        fontFamily="ui-sans-serif, system-ui, sans-serif"
      >
        inherence · inseparable relation
      </text>
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Orchestrator                                                       */
/* ------------------------------------------------------------------ */

export interface SamavayaSamyogaProps {
  /**
   * When true, the loop advances automatically after a short rest.
   * Default false: the viewer triggers via hover or tap, which keeps the
   * reading view quiet (vision Part I, commitment 3 — no nudges).
   */
  autoLoop?: boolean;
}

export function SamavayaSamyoga({ autoLoop = false }: SamavayaSamyogaProps) {
  const [phase, setPhase] = useState<Phase>('rest');
  const [runId, setRunId] = useState(0);
  const prefersReducedMotion = useReducedMotion();

  // Drive the phase machine. Each restart bumps runId so a fresh effect
  // takes over and existing timers are cancelled.
  useEffect(() => {
    if (prefersReducedMotion) {
      // Honour the user's reduced-motion preference: hold the rest pose
      // unless explicitly triggered (which still advances, but without
      // the dramatic transition — Framer Motion respects the same flag).
      return;
    }
    if (phase !== 'lifting' && phase !== 'aftermath' && !autoLoop) return;

    const timers: ReturnType<typeof setTimeout>[] = [];
    if (phase === 'lifting') {
      timers.push(
        setTimeout(() => setPhase('aftermath'), TIMING.lifting * 1000),
      );
    } else if (phase === 'aftermath') {
      timers.push(
        setTimeout(() => setPhase('rest'), TIMING.aftermath * 1000),
      );
    } else if (phase === 'rest' && autoLoop) {
      timers.push(setTimeout(() => setPhase('lifting'), TIMING.rest * 1000));
    }
    return () => timers.forEach(clearTimeout);
  }, [phase, runId, autoLoop, prefersReducedMotion]);

  const trigger = useCallback(() => {
    if (phase === 'rest') setPhase('lifting');
  }, [phase]);

  const restart = useCallback(() => {
    setPhase('rest');
    setRunId((n) => n + 1);
  }, []);

  const phaseLabel = useMemo(() => {
    switch (phase) {
      case 'rest':
        return 'at rest — hover or tap to lift';
      case 'lifting':
        return 'lifting…';
      case 'aftermath':
        return 'after the lift — observe both panels';
    }
  }, [phase]);

  return (
    <div className="w-full">
      <div
        className="grid grid-cols-1 gap-4 sm:grid-cols-2"
        // The whole pair shares one trigger surface so the viewer cannot
        // run the two panels out of phase; the contrast IS the doctrine.
        onMouseEnter={trigger}
        onClick={trigger}
        onTouchStart={trigger}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            trigger();
          }
        }}
        aria-label="Trigger the samavāya / saṃyoga contrast animation"
      >
        <div className="rounded-sm border border-ink-faint/30 bg-page p-3">
          <SamyogaPanel phase={phase} />
        </div>
        <div className="rounded-sm border border-ink-faint/30 bg-page p-3">
          <SamavayaPanel phase={phase} />
        </div>
      </div>
      <div className="mt-2 flex items-center justify-between px-1 text-xs text-ink-faint">
        <span className="font-sans">{phaseLabel}</span>
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            restart();
          }}
          className="rounded-sm border border-ink-faint/40 px-2 py-0.5 font-sans text-ink-muted hover:text-ink"
        >
          restart
        </button>
      </div>
    </div>
  );
}

export default SamavayaSamyoga;
