# Roadmap

The first three phases of the project are complete. This document
describes where we are and where we go.

## Phase A — Source ingestion ✓ done

318 SourcePassages ingested across `content/sources/`:

- **Praśastapāda — 160 records**, covering wisdomlib Texts 1–161 (Text
  4 is a wisdomlib pagination artefact, not a separate passage; Texts
  67–68 are absent from the printed edition itself). Devanagari + IAST
  + Jha's English (verbatim) on every record.
- **Nyāyakandalī — 158 records**, extracted from the user-uploaded
  Chowkhamba 1982 reprint of the Jha 1916 edition. Jha's English of
  Śrīdhara's commentary, alternating with each bhāṣya Text. Sanskrit
  Devanagari and IAST intentionally empty for now (the PDF OCR
  transliterated to Latin-1 rather than preserving the script;
  recovery deferred to a future tesseract-over-page-images pass).
- All `reviewed_by: 'ai'` (the published-for-evaluation flag — distinct
  from `null` = "no one looked" and from a human name = "śāstrika-canonical").
- Reference texts mirrored at `content/sources/_reference/` — GRETIL's
  Tokunaga IAST input (full Praśastapāda) and the extracted Jha PDF
  text. Used for verification, not loaded by the content pipeline.

## Phase B — Engineering scaffolding ✓ done

Six application surfaces:

- **Praveśa entry** `/[locale]` — adbhuta-governed opening: maṅgalācaraṇa,
  seven-padārtha SVG graph, anubandha-catuṣṭaya panels, three
  contemplation prompts. Each padārtha in the graph links to its
  concept node.
- **Reading view** `/[locale]/concept/<slug>` — four-depth layered
  presentation (kārikā → bhāṣya → vṛtti → ṭīkā) with provenance
  stripes, padavigraha glossary hover, source drawer, and the
  pūrvapakṣin engine mounted on the ṭīkā depth when published.
- **Concepts index** `/[locale]/concepts` — listing of every published
  concept node with brief subtitles, organised by tier.
- **Corpus browser** `/[locale]/read/<text>/<chapter>` — pages through
  every ingested SourcePassage with Devanagari + IAST + Jha English +
  locale-appropriate AI re-rendering. 40 chapter routes statically
  generated.
- **Visualization demo** `/visualizations/samavaya` — saṃyoga vs.
  samavāya SVG contrast with mandatory disanalogy panel.
- **Śāstrika console** `/shastrika/*` — read-mostly authoring inspector,
  gated by `middleware.ts` (HTTP Bearer token via `SHASTRIKA_TOKEN`
  env var). Not in static-export deploys; on SSR deploys, requires the
  token to enter.
- **Pūrvapakṣin engine** `/api/purvapakshin` — provider-agnostic
  (Anthropic / Gemini); refuses to argue from positions outside the
  approved corpus; streams text deltas as SSE.

## Phase C — Concept-node authoring ✓ done (tier 1)

The first tier of concept nodes — the **six padārthas** — is authored
at all four depths in both EN and ML, with source_refs verified
(`verified_by: 'ai'`) and dialectic_positions bound to approved
purvapakṣa positions:

| Concept | source_refs | positions |
|---|---|---|
| dravya | 15 | 6 |
| guṇa | 18 | 6 |
| karma | 16 | 6 |
| sāmānya | 10 | 6 |
| viśeṣa | 7 | 6 |
| samavāya | 10 | 7 |

**37 PurvapakṣaPositions** across six schools (Sautrāntika, Yogācāra,
Mādhyamaka, Mīmāṃsā, Advaita, Jaina), all `approved_by_shastrika: true`.
13 of them are `attested` against named texts; 24 are `reconstructed`
from each school's general framework. 17 carry Śrīdhara responses
pulled verbatim from Nyāyakandalī where he engages that school
directly.

## Phase D — Concept-node authoring (tier 2) — in progress

Tier 1 covered the six padārtha categories. Tier 2 covers the
**central sub-concepts** the bhāṣya develops — the cosmogonic, ontological,
and epistemological constituents that the six padārthas presuppose or imply.

Targets for tier 2:

- **paramāṇu** (atom) — cosmogonic foundation; the dvyaṇuka–tryaṇuka
  generation sequence; Buddhist denial via kṣaṇikavāda
- **saṃyoga** (conjunction) — paired contrast to samavāya
- **abhāva** (absence) — the contested seventh padārtha; the four kinds
- **ātman** (self) — the dravya in which buddhi/sukha/duḥkha/icchā/
  dveṣa/prayatna/dharma/adharma/saṃskāra inhere
- **manas** (internal organ) — the atomic dravya mediating perception
- **ākāśa** (ether) — the locus of śabda
- **kāla** (time)
- **dik** (direction)
- **pratyakṣa** (perception, the first pramāṇa)
- **anumāna** (inference, the second pramāṇa) — with the five-avayava
  syllogism, the fallacy taxonomy, the apoha critique reprise

Each tier-2 node follows the same standard: four depths in EN+ML,
source_refs bound and AI-verified, 4–7 approved purvapakṣa positions
across the schema's School enum, honest attestation.

## What still needs a śāstrika

Once the AI flags have been read and reviewed, the long Phase B can begin:

1. **Devanagari recovery for Nyāyakandalī**: the printed-edition pages
   need a fresh tesseract-over-image pass with the Sanskrit language
   pack. The current OCR layer transliterated to Latin-1. Alternative:
   mechanical IAST→Devanagari from a verified IAST source if one becomes
   available for the gloss.
2. **Per-passage cross-check** of every `literal_en` against the printed
   Jha pages. Flip `verified_by` from `'ai'` to your name where they
   match; flag discrepancies for correction where they don't.
3. **Per-rendering Malayalam review**. The AI maṇipravāḷam drafts
   preserve termini technici but the prose register should be confirmed
   by a Malayalam-literate śāstrika. Flip `reviewed_by` from `'ai'` to
   your name as you go.
4. **Pūrvapakṣa attestation upgrades**. The 24 `reconstructed` positions
   would benefit from chapter-and-verse citations where they exist.
   Reading e.g. Dharmakīrti's *Pramāṇavārttika* against the apoha
   position for samanya, or Vasubandhu's *Triṃśikā* against the
   vijñaptimātra positions, can move several from `reconstructed` to
   `attested`.
5. **Recitation audio**. Vision Part II Phase 1 calls for a chanted
   maṅgalācaraṇa; Part IV calls for recitation_audio_ref on each
   vṛtti. Currently all audio refs are null.

## What is intentionally not done

- **Gamification, streaks, badges, progress bars in the reading view.**
  Vision Part XI forbids these. They will not be added.
- **Modern-science analogies without a disanalogy panel.** Vision
  Part V / XI. Every existing concept node honours this.
- **Concept nodes for the 24 individual guṇas, 5 individual karmas,
  or 9 individual dravyas as separate pages.** These are sub-divisions
  of the tier-1 padārtha concepts; they live inside those concepts'
  bhāṣya prose, not as separate nodes. Authoring them as separate
  nodes would over-fragment.
