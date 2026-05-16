/**
 * The fidelity backbone. Every claim in the corpus is shaped here.
 *
 * Authority: docs/VISION.md, Part VIII. If a field is added or relaxed,
 * update the vision document or push back on the change. The schema is
 * what makes "no drop in traditional content" enforceable rather than
 * aspirational (vision Part I, commitment 2).
 */

import { z } from 'zod';

/* ------------------------------------------------------------------ */
/* Enums                                                              */
/* ------------------------------------------------------------------ */

export const ContentStatus = z.enum([
  'draft',
  'under_review_en',
  'under_review_ml',
  'published_en',
  'published_ml',
]);
export type ContentStatus = z.infer<typeof ContentStatus>;

export const RasaStage = z.enum(['pravesha', 'vichara', 'vada']);
export type RasaStage = z.infer<typeof RasaStage>;

export const Provenance = z.enum(['traditional', 'paraphrase', 'bridge']);
export type Provenance = z.infer<typeof Provenance>;

/**
 * Schools whose purvapaksa positions are admitted to the dialectic engine.
 * Extending this list requires shastrika sign-off, not just a code change.
 */
export const School = z.enum([
  'sautrantika',
  'yogacara',
  'madhyamaka',
  'mimamsa',
  'advaita',
  'jaina',
]);
export type School = z.infer<typeof School>;

export const Attestation = z.enum(['attested', 'reconstructed']);
export type Attestation = z.infer<typeof Attestation>;

/**
 * Text identifiers admitted as primary sources. MVP carries Prashastapada
 * (mula) and Nyayakandali (the surfaced commentary). Future commentaries
 * (Kiranavali, Nyayalilavati) extend this enum.
 */
export const TextKey = z.enum(['prashastapada', 'nyayakandali']);
export type TextKey = z.infer<typeof TextKey>;

/* ------------------------------------------------------------------ */
/* Source binding                                                     */
/* ------------------------------------------------------------------ */

/**
 * A pointer into the SourcePassage store. `locator` is text-specific
 * (e.g. 'samavaya.1.3' for Prashastapada, 'gloss.samavaya.7' for Nyayakandali).
 * `verified_by` is the shastrika identifier; `verified_at` is the ISO timestamp
 * at which the binding was confirmed.
 */
export const SourceRef = z.object({
  text: TextKey,
  locator: z.string().min(1),
  verified_by: z.string().nullable(),
  verified_at: z.string().datetime().nullable(),
});
export type SourceRef = z.infer<typeof SourceRef>;

export const ParagraphProvenance = z.object({
  paragraph_id: z.string().min(1),
  kind: Provenance,
});
export type ParagraphProvenance = z.infer<typeof ParagraphProvenance>;

/* ------------------------------------------------------------------ */
/* Concept-node depths (Part IV)                                      */
/* ------------------------------------------------------------------ */

export const KarikaDepth = z.object({
  svg_ref: z.string().nullable(),
  essence_en: z.string(),
  essence_ml: z.string(),
  status: ContentStatus,
});

export const BhashyaDepth = z.object({
  body_en: z.string(),
  body_ml: z.string(),
  media_refs: z.array(z.string()).default([]),
  status: ContentStatus,
});

export const PadaVigraha = z.object({
  pada: z.string().min(1), // Devanagari pada
  iast: z.string().min(1),
  gloss_en: z.string(),
  gloss_ml: z.string(),
});
export type PadaVigraha = z.infer<typeof PadaVigraha>;

export const VrittiDepth = z.object({
  mula_sa: z.string(), // Devanagari mula
  iast: z.string(),
  literal_en: z.string(),
  framing_en: z.string(),
  framing_ml: z.string(),
  recitation_audio_ref: z.string().nullable(),
  padavigraha: z.array(PadaVigraha).default([]),
  status: ContentStatus,
});

export const DialecticPosition = z.object({
  position_id: z.string().min(1), // -> PurvapaksaPosition.id
  context_note_en: z.string().optional(),
});
export type DialecticPosition = z.infer<typeof DialecticPosition>;

export const TikaDepth = z.object({
  sridhara_gloss_refs: z.array(z.string()).default([]),
  dialectic_positions: z.array(DialecticPosition).default([]),
  status: ContentStatus,
});

/* ------------------------------------------------------------------ */
/* ConceptNode                                                        */
/* ------------------------------------------------------------------ */

const SLUG_RE = /^[a-z][a-z0-9-]*$/;

export const ConceptNode = z
  .object({
    id: z.string().min(1),
    slug: z.string().regex(SLUG_RE, 'slug must be kebab-case ascii'),
    /** Devanagari title — never a translated word, always the Sanskrit term. */
    title_sa: z.string().min(1),
    title_iast: z.string().min(1),
    title_en: z.string().min(1),
    /** Malayalam title — the Sanskrit term in Malayalam script, not a translation. */
    title_ml: z.string().min(1),
    rasa_stage: RasaStage,
    depths: z.object({
      karika: KarikaDepth,
      bhashya: BhashyaDepth,
      vritti: VrittiDepth,
      tika: TikaDepth,
    }),
    /**
     * Source bindings. May be empty while every depth is draft, but the
     * superRefine below blocks publishing without at least one entry.
     */
    source_refs: z.array(SourceRef).default([]),
    provenance_per_paragraph: z.array(ParagraphProvenance).default([]),
    prerequisites: z.array(z.string()).default([]),
    related_concepts: z.array(z.string()).default([]),
  })
  .superRefine((node, ctx) => {
    const depthStatuses = [
      node.depths.karika.status,
      node.depths.bhashya.status,
      node.depths.vritti.status,
      node.depths.tika.status,
    ];
    const hasPublished = depthStatuses.some((s) => s.startsWith('published'));
    if (hasPublished && node.source_refs.length === 0) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['source_refs'],
        message:
          'A node with any published depth must carry at least one source_refs entry. ' +
          'Untraceable claims do not enter the corpus (vision Part I, commitment 2).',
      });
    }
    // English-published depths require an EN verified source.
    const wantsEnSource = depthStatuses.includes('published_en');
    const wantsMlSource = depthStatuses.includes('published_ml');
    const anyVerified = node.source_refs.some(
      (r) => r.verified_by !== null && r.verified_at !== null,
    );
    if ((wantsEnSource || wantsMlSource) && !anyVerified) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['source_refs'],
        message:
          'Publishing requires at least one source_refs entry with verified_by and verified_at populated.',
      });
    }
  });

export type ConceptNode = z.infer<typeof ConceptNode>;

/* ------------------------------------------------------------------ */
/* SourcePassage                                                      */
/* ------------------------------------------------------------------ */

/**
 * An AI-drafted rendering attached to a SourcePassage. Distinct from the
 * canonical `literal_en` (which carries Jha's published English) and from
 * `sa_devanagari` (which carries the typed-and-proofed Sanskrit). A
 * rendering is *never* canonical: it surfaces in the authoring console
 * and as a draft companion only, and the reading view must not display
 * it unless `reviewed_by` and `reviewed_at` are both populated.
 */
export const PassageRendering = z.object({
  text: z.string().min(1),
  style: z.string().min(1), // e.g. "manipravalam-conscious traditional-simple"
  generated_by: z.string().min(1), // model identifier, e.g. "claude-sonnet-4-6"
  generated_at: z.string().datetime(),
  reviewed_by: z.string().nullable(),
  reviewed_at: z.string().datetime().nullable(),
});
export type PassageRendering = z.infer<typeof PassageRendering>;

export const SourcePassage = z.object({
  id: z.string().min(1),
  text_key: TextKey,
  locator: z.string().min(1),
  /**
   * Devanagari. Allowed empty during Phase A — particularly for Nyāyakandalī
   * passages ingested from Jha's printed English (the OCR pipeline did not
   * preserve the Devanagari script). Phase B (śāstrika verification) is
   * required to populate this before any concept node binds the passage
   * for `published_*`.
   */
  sa_devanagari: z.string(),
  sa_iast: z.string(),
  literal_en: z.string(),
  /** Maṇipravāḷam-style Malayalam draft. AI-generated; never canonical until reviewed. */
  ml_draft: PassageRendering.nullable().default(null),
  /** Simplified English paraphrase, ALONGSIDE (never replacing) `literal_en`. */
  en_simple_draft: PassageRendering.nullable().default(null),
});
export type SourcePassage = z.infer<typeof SourcePassage>;

/**
 * A rendering is admissible to the reading view only when both
 * reviewed_by and reviewed_at are populated. The reading view should
 * consult this helper rather than checking the flags ad-hoc.
 */
export function isRenderingReviewed(r: PassageRendering | null): boolean {
  return r !== null && r.reviewed_by !== null && r.reviewed_at !== null;
}

/* ------------------------------------------------------------------ */
/* PurvapaksaPosition                                                 */
/* ------------------------------------------------------------------ */

export const PurvapaksaPosition = z
  .object({
    id: z.string().min(1),
    school: School,
    thinker: z.string().min(1),
    source_text: z.string().min(1),
    attestation: Attestation,
    objection_summary_en: z.string().min(1),
    objection_summary_ml: z.string(),
    siddhanta_response_summary_en: z.string().nullable(),
    approved_by_shastrika: z.boolean().default(false),
    approved_at: z.string().datetime().nullable(),
  })
  .superRefine((p, ctx) => {
    if (p.approved_by_shastrika && p.approved_at === null) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['approved_at'],
        message: 'approved_at is required when approved_by_shastrika is true.',
      });
    }
  });

export type PurvapaksaPosition = z.infer<typeof PurvapaksaPosition>;

/**
 * Only approved positions may flow into live AI dialogue. The dialectic
 * engine imports this guard rather than the bare PurvapaksaPosition.
 */
export function isApprovedForLiveDialogue(p: PurvapaksaPosition): boolean {
  return p.approved_by_shastrika && p.approved_at !== null;
}

/* ------------------------------------------------------------------ */
/* LearnerSvadhyaya (private)                                         */
/* ------------------------------------------------------------------ */

export const SvadhyayaReflection = z.object({
  concept_id: z.string().min(1),
  text: z.string(),
  created_at: z.string().datetime(),
});

export const SvadhyayaDialogueTurn = z.object({
  role: z.enum(['learner', 'purvapakshin', 'siddhanta']),
  text: z.string(),
  position_id: z.string().optional(),
  at: z.string().datetime(),
});

export const SvadhyayaDialogue = z.object({
  concept_id: z.string().min(1),
  transcript: z.array(SvadhyayaDialogueTurn),
});

export const LearnerSvadhyaya = z.object({
  learner_id: z.string().min(1),
  reflections: z.array(SvadhyayaReflection).default([]),
  saved_dialogues: z.array(SvadhyayaDialogue).default([]),
  bookmarked_nodes: z.array(z.string()).default([]),
});
export type LearnerSvadhyaya = z.infer<typeof LearnerSvadhyaya>;
