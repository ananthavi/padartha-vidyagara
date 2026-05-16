/**
 * The seven padārthas as a typed, structured-graph dataset.
 *
 * Authority: docs/VISION.md Part I (Sanskrit primary; no drop in traditional
 * content) and Part II Phase 1 (the praveśa opening).
 *
 * This file is intentionally minimal. Glosses are restricted to the
 * single-phrase formulations any standard introduction to Vaiśeṣika would
 * yield. Malayalam glosses follow the vision rule: the Sanskrit term in
 * Malayalam script (transliteration), NOT a translation. Where a faithful
 * transliteration is not absolutely standard, the field is left empty
 * rather than invented (vision Part I commitment 2).
 *
 * Edge semantics:
 *   - 'samavaya' — inherence; the canonical Vaiśeṣika relation that binds
 *     guṇa, karma, sāmānya, viśeṣa to their dravya. Rendered with a
 *     doctrinally distinct stroke (see SevenPadarthasGraph).
 *   - 'samyoga' — conjunction; the contingent contact relation among dravyas.
 *   - 'related' — a non-doctrinal "see also" used only where the textual
 *     ordering itself links two padārthas (e.g. abhāva ↔ bhāva contrast).
 *
 * Edges are declared only on one endpoint to keep the source of truth
 * single; the renderer treats them as undirected for layout purposes.
 */

export type PadarthaEdgeKind = 'samavaya' | 'samyoga' | 'related';

export interface PadarthaEdge {
  /** id of the other padārtha. */
  to: PadarthaId;
  kind: PadarthaEdgeKind;
}

export type PadarthaId =
  | 'dravya'
  | 'guna'
  | 'karma'
  | 'samanya'
  | 'vishesha'
  | 'samavaya'
  | 'abhava';

export interface Padartha {
  id: PadarthaId;
  /** Devanagari (vision Part I commitment 4). */
  title_sa: string;
  /** IAST transliteration with diacritics. */
  title_iast: string;
  /** kebab-case ascii — matches ConceptNode slug rules. */
  slug: string;
  /** English single-phrase gloss. Standard textbook rendering. */
  gloss_en: string;
  /**
   * Malayalam single-phrase gloss. By the rule of Part I commitment 4 and
   * Part VII, this is the Sanskrit term in Malayalam script. Empty string
   * where a single absolutely standard transliteration is not at hand.
   */
  gloss_ml: string;
  edges: PadarthaEdge[];
}

export const PADARTHAS: readonly Padartha[] = [
  {
    id: 'dravya',
    title_sa: 'द्रव्य',
    title_iast: 'dravya',
    slug: 'dravya',
    gloss_en: 'substance',
    gloss_ml: 'ദ്രവ്യം',
    edges: [
      // dravya bears guṇa, karma; sāmānya and viśeṣa inhere likewise.
      { to: 'guna', kind: 'samavaya' },
      { to: 'karma', kind: 'samavaya' },
      // saṃyoga is the contact relation among dravyas themselves.
      { to: 'dravya', kind: 'samyoga' },
    ],
  },
  {
    id: 'guna',
    title_sa: 'गुण',
    title_iast: 'guṇa',
    slug: 'guna',
    gloss_en: 'quality',
    gloss_ml: 'ഗുണം',
    edges: [
      { to: 'samanya', kind: 'samavaya' },
    ],
  },
  {
    id: 'karma',
    title_sa: 'कर्म',
    title_iast: 'karma',
    slug: 'karma',
    gloss_en: 'motion',
    gloss_ml: 'കർമ്മം',
    edges: [
      { to: 'samanya', kind: 'samavaya' },
    ],
  },
  {
    id: 'samanya',
    title_sa: 'सामान्य',
    title_iast: 'sāmānya',
    slug: 'samanya',
    gloss_en: 'universal',
    gloss_ml: 'സാമാന്യം',
    edges: [],
  },
  {
    id: 'vishesha',
    title_sa: 'विशेष',
    title_iast: 'viśeṣa',
    slug: 'vishesha',
    gloss_en: 'ultimate particular',
    gloss_ml: 'വിശേഷം',
    edges: [
      // viśeṣa inheres only in eternal dravyas; one canonical samavāya tie.
      { to: 'dravya', kind: 'samavaya' },
    ],
  },
  {
    id: 'samavaya',
    title_sa: 'समवाय',
    title_iast: 'samavāya',
    slug: 'samavaya',
    gloss_en: 'inherence',
    gloss_ml: 'സമവായം',
    edges: [],
  },
  {
    id: 'abhava',
    title_sa: 'अभाव',
    title_iast: 'abhāva',
    slug: 'abhava',
    // Standard Praśastapāda-tradition phrasing: the seventh padārtha,
    // added to the original six. Single-phrase gloss only.
    gloss_en: 'absence',
    gloss_ml: 'അഭാവം',
    edges: [
      // abhāva contrasts with the six bhāva-padārthas as a category. Kept
      // as 'related' since it is not a samavāya/saṃyoga relation in the
      // strict sense.
      { to: 'dravya', kind: 'related' },
    ],
  },
] as const;

/**
 * Lookup by id. Returns undefined for unknown ids — callers that index
 * into edge targets should already trust the data and may assert.
 */
export function getPadartha(id: PadarthaId): Padartha | undefined {
  return PADARTHAS.find((p) => p.id === id);
}
