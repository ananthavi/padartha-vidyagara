# Ingestion notes — Chapter 2

## Chapter

- **Title (wisdomlib):** Enumeration and Classification of Categories
- **Chapter number:** 2
- **Slug:** `enumeration-of-categories`
- **Source URL:** https://www.wisdomlib.org/hinduism/book/padarthadharmasamgraha-and-nyayakandali (Chapter 2 index: `/d/doc1215366.html`)
- **Working edition:** Ganganatha Jha's English of *Padārthadharmasaṅgraha with Nyāyakandalī* (as presented on wisdomlib.org). Per `content/sources/README.md` §1, wisdomlib is a cross-checking surface, not the canonical proofing source — every passage here remains to be re-verified against the printed Jha edition during śāstrika review.

## Texts present in Chapter 2

The chapter on wisdomlib spans Text 3 through Text 10. Text 1 and Text 2 belong to Chapter 1 (Introduction); Text 4 does not exist as a separately rendered sūtra on wisdomlib — the chapter index labels one sub-page "Text 3-4" but the page itself ends with the marker `॥ ३ ॥`, with no `॥ ४ ॥` on the page. I have therefore ingested seven passages, locators `enumeration-of-categories.3` and `.5` through `.10`. The gap at `.4` is preserved in the IDs to keep alignment with Jha's printed sūtra-numbering if a future re-ingestion from the print edition recovers a missing Text 4.

- Text 3 — the topic-statement (`atha ke dravyādayaḥ...`) and the enumeration of the nine *dravya*s
- Text 5 — the twenty-four *guṇa*s
- Text 6 — the five *karma*s, with all other motions subsumed under *gamana*
- Text 7 — *sāmānya*: *para* (= *sattā*) and *apara*
- Text 8 — *antya viśeṣa* in *nitya-dravya*s
- Text 9 — *samavāya* defined (the brief sūtra-form; the longer 157–160 discussion lives in `samavaya.json`)
- Text 10 — closing transitional remark from *uddeśa* of *dharmin*s to *dharma*-treatment

Total passages: **7**. Both `ml_draft` and `en_simple_draft` populated on each (7 + 7).

## Nyāyakandalī gloss

Wisdomlib carries Śrīdhara's *Nyāyakandalī* only in English rendering on every Chapter-2 sub-page; no Devanagari for the commentary appears. Per the deliverables specification, the `content/sources/nyayakandali/enumeration-of-categories.json` file has therefore been **skipped**, consistent with the prior samavāya pass. The existing `content/sources/nyayakandali/samavaya.json` (empty array `[]`) is left untouched.

## Textual fidelity concerns (raise during śāstrika review)

These are the items most likely to be OCR/scan artifacts in the wisdomlib transcription. The schema demands verbatim ingestion ("no normalization"), so the apparent errors are preserved here; flagging them so they are not silently propagated into a `published_*` depth.

1. **Text 5 Devanagari:** the cluster `संस्कारादूष्टशब्दाः` contains the vowel sign ू (long ū) where the standard reading and the IAST line on the very same wisdomlib page (`saṃskārādṛṣṭaśabdāḥ`) both attest ृ (ṛ) — i.e. the canonical reading is **`संस्काराऽदृष्ट‑`** / **`saṃskāra-adṛṣṭa-`** ("*saṃskāra*, *adṛṣṭa*, ..."). The Devanagari has been retained verbatim from wisdomlib; the IAST (which is correct) has likewise been retained verbatim. Reviewer should correct the Devanagari against the printed Jha edition before any depth that cites this locator is published.
2. **`सम्योग` / `सं-` orthography:** Texts 3, 5 and the existing `samavaya.json` all carry `सम्योग` and similar forms where the anusvāra is written as half-`म्` rather than `ं`. This is a typesetting convention of certain editions and not necessarily an error, but worth a consistency review across the corpus.
3. **Text 7 IAST `sāmānyam dvividham`** preserves the wisdomlib reading (final consonant cluster left as `m` rather than the more usual `ṃ` before the next word). Verbatim retention; flag for review.

## Terminology decisions (Malayalam glossary)

Two notable calls beyond the mandated glossary:

1. **`sādharmya` / `vaidharmya`** (similarity / dissimilarity of categories) are themselves *termini technici* of the Vaiśeṣika dialectic — Praśastapāda's whole architecture in Chapters 3+ is built on them. I kept them as `സാധർമ്മ്യം` / `വൈധർമ്മ്യം` (Sanskrit in Malayalam script) in the *ml_draft*s rather than translating to e.g. *സാമ്യം* (mere "likeness"). In the *en_simple_draft*s I retained the Sanskrit term in italics with a gloss.
2. **`anuvṛtti-pratyaya` / `vyāvṛtti-pratyaya`** in Text 7 carry the technical force of "inclusive cognition" vs "exclusive cognition" that distinguishes *para sāmānya* from *apara sāmānya*. Both retained as Sanskrit termini in Malayalam script (`അനുവൃത്തിപ്രത്യയം`, `വ്യാവൃത്തിപ്രത്യയം`) and glossed in parentheses; the English drafts mirror the same convention. Translating them would collapse the very distinction Praśastapāda is drawing.
3. Inside Text 6 (the *karma*s), short Malayalam phenomenal glosses were placed in parentheses immediately after the Sanskrit term — e.g. `ഉത്ക്ഷേപണം (മേല്പോട്ടെറിയൽ)` — but the *karma*-names themselves remain Sanskrit, never replaced.

## What was not done (P0 compliance)

- No changes to `content/sources/prashastapada/samavaya.json` or `content/sources/nyayakandali/samavaya.json`.
- No changes to `src/lib/schema.ts`, `docs/`, concept nodes, or pūrvapakṣa files.
- No `verified_by` / `reviewed_by` populated anywhere; every draft remains `reviewed_by: null`, `reviewed_at: null`.
- No new Sanskrit invented. The Devanagari and IAST for all seven passages reproduce the wisdomlib page verbatim; this includes the suspected OCR artifact in Text 5 (preserved and flagged above).
- Jha's English (`literal_en`) reproduced verbatim, including the parenthetical Vaiśeṣika-sūtra references where the page supplies them (Texts 3, 5, 6, 7) and omitted where it does not (Texts 8, 9, 10).
