# Roadmap

The foundation pass is complete. From here, work proceeds in two phases:

## Phase A — Source ingestion (sequential, agent-assisted)

Goal: a typed-and-proofed source corpus for the *samavāya* section of
Praśastapāda and the corresponding Śrīdhara gloss, in
`content/sources/prashastapada/samavaya.json` and
`content/sources/nyayakandali/samavaya.json`.

This is **not** a parallelizable scrape. The protocol in
`content/sources/README.md` requires:

1. Acquisition from the Ganganatha Jha edition (archive.org scan) as the
   primary text, cross-checked against wisdomlib.org's HTML rendering.
2. OCR or hand-typing into Devanagari with two-pass character-level review.
3. IAST generated mechanically from the proofed Devanagari.
4. Literal English drawn from Jha's translation, with the edition
   recorded in a provenance log.

A single agent can prepare a *first-pass draft* of the JSON files
(Devanagari + IAST + draft literal English) marked clearly as
`unverified` in a sibling notes file. The actual `verified_by` /
`verified_at` fields stay null until a śāstrika reviews.

## Phase B — Fanout against the established schema

Once the source corpus has at least the *samavāya* section ingested,
the following tracks can run in parallel because each has a clean
interface against `src/lib/schema.ts`:

| Track | Output | Reads | Writes |
| --- | --- | --- | --- |
| B1. Reading view | `src/components/ReadingView.tsx`, `DepthSelector.tsx`, `ProvenanceStripe.tsx`, `SourceDrawer.tsx`, `GlossaryHover.tsx` | `ConceptNode`, `SourcePassage` | UI only |
| B2. Praveśa opening | `app/[locale]/page.tsx` with the seven-padartha SVG graph, three contemplation prompts | static data | `LearnerSvadhyaya.reflections` |
| B3. Visualization: samavāya vs. saṃyoga | inline SVG + Framer Motion in `content/concepts/samavaya.mdx` and a sibling SVG component | `ConceptNode` | UI only |
| B4. Pūrvapakṣin engine | `app/api/purvapakshin/route.ts`, `src/lib/purvapakshin.ts`, system-prompt builder | `loadApprovedPurvapaksa()` | conversation transcript only; never live-corpus |
| B5. Authoring console | `app/shastrika/...` with MDX editor, status-flag controls, source-binding validation | all schemas | `content/` (gated by review state) |
| B6. Svādhyāya notebook | `src/lib/svadhyaya.ts` (SQLite), client UI | none | private learner store |

Each track receives:
- this `docs/` directory
- `src/lib/schema.ts` as the contract
- a clear "do not write outside paths X, Y, Z" instruction

Each track is forbidden to:
- fabricate Sanskrit
- write to `content/sources/` (Phase A's job)
- mark any content `published_*` without going through the authoring console
- silently relax the schema

## Acceptance gates

Phase A is done when:
- `content/sources/prashastapada/samavaya.json` and the corresponding
  `nyayakandali/samavaya.json` exist
- `npm run validate:content` passes
- the entries are flagged unverified (no `verified_by`) but proofread

Phase B is done per Part XII of the vision document.
