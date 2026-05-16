# Ingestion notes — Chapter 1 (Introduction)

Status: **first-pass, unverified.** Every record in
`content/sources/prashastapada/introduction.json` was extracted by an AI
agent from a single derived web source (wisdomlib). No śāstrika has
reviewed the Devanagari, IAST, English, or the AI-drafted `ml_draft` /
`en_simple_draft` renderings. All `reviewed_*` and `verified_*` flags
remain `null`.

## Chapter identification

- Book: *Padārtha-dharma-saṅgraha and Nyāyakandalī* (Ganganatha Jha
  translation, presented on wisdomlib).
- Chapter 1 title on wisdomlib: **"Introduction"**.
- File slug chosen: **`introduction`**.
- Wisdomlib's Chapter 1 TOC page (`doc1215355.html`) lists exactly four
  child pages, and the prev/next navigation confirms they form a closed
  chapter (Text 7 "Next" jumps to Chapter 2 / `doc1215366.html`):
  1. *Introductory—Benediction* (`doc1215356.html`) — the maṅgalaśloka.
  2. *Text 1: Purpose of the Science* (`doc1215357.html`).
  3. *Text 2: Source of Knowledge* (`doc1215358.html`).
  4. *Text 7* (`doc1215362.html`) — opening definition of *sāmānya*.
- Texts 3–4, 5, 6, 8, 9, 10 (`doc1215359`–`1215365` minus 1215362)
  belong to Chapter 2 ("Enumeration and Classification of Categories")
  per wisdomlib's own TOC. They are explicitly **not** part of this
  chapter on the source site and are not ingested here.

## Sources visited

Primary (content extracted from):

- https://www.wisdomlib.org/hinduism/book/padarthadharmasamgraha-and-nyayakandali
  — book index, used to identify Chapter 1.
- https://www.wisdomlib.org/hinduism/book/padarthadharmasamgraha-and-nyayakandali/d/doc1215355.html
  — Chapter 1 index page (structural; no content extracted from it).
- https://www.wisdomlib.org/hinduism/book/padarthadharmasamgraha-and-nyayakandali/d/doc1215356.html
  — Benediction → `pp.introduction.1`.
- https://www.wisdomlib.org/hinduism/book/padarthadharmasamgraha-and-nyayakandali/d/doc1215357.html
  — Text 1 → `pp.introduction.2`.
- https://www.wisdomlib.org/hinduism/book/padarthadharmasamgraha-and-nyayakandali/d/doc1215358.html
  — Text 2 → `pp.introduction.3`.
- https://www.wisdomlib.org/hinduism/book/padarthadharmasamgraha-and-nyayakandali/d/doc1215362.html
  — Text 7 → `pp.introduction.4`.

Cross-check reference (NOT pulled from this pass; deferred to
śāstrika verification phase):

- archive.org scan of Ganganatha Jha's printed Chowkhamba edition (see
  prior `_ingestion_notes.md` for the URL). The proper authority for
  proofing both Devanagari/IAST and English.

## Counts per text

| file                                             | records | wisdomlib texts covered                    |
| ------------------------------------------------ | ------- | ------------------------------------------ |
| `content/sources/prashastapada/introduction.json`| 4       | Benediction, Text 1, Text 2, Text 7        |
| `content/sources/nyayakandali/introduction.json` | —       | not created; see "Nyāyakandalī" below      |

ml_drafts produced: 4. en_simple_drafts produced: 4. All
`reviewed_by` / `reviewed_at` left `null`.

## Why no `nyayakandali/introduction.json`

Same situation as the prior pass (samavāya): wisdomlib renders
Śrīdhara's *Nyāyakandalī* commentary **only as an English rendering**
on every one of the four chapter-1 pages. The section heading reads
"Commentary: The Nyāyakandalī of Śrīdhara" and the paragraph below it
states explicitly "*English rendering of Śrīdhara's commentary called
Nyāyakandalī … from the 10th century*." No Devanagari or IAST of the
commentary is reproduced.

Inventing Sanskrit from English is a P0 violation (vision Part I.2;
`docs/AUTHORING.md` "Forbidden moves"; the user-provided hard
constraint **"Do NOT invent Sanskrit"**). The schema requires
`sa_devanagari` to be a non-empty string. Therefore this file is not
created. The śāstrika should ingest from a printed edition or the
archive.org scan, two-pass proofed.

## Chapter 1's place in the system (śāstrika orientation)

This chapter is the *anubandha-catuṣṭaya* opening of the *bhāṣya*:

- `pp.introduction.1` — the maṅgalaśloka: *praṇāma* to Īśvara (cause)
  and to Kaṇāda (the *sūtra-kāra*), followed by the *pratijñā* to
  expound the *Padārthadharmasaṅgraha*.
- `pp.introduction.2` — *prayojana* of the *śāstra*: tattva-jñāna of
  the six *padārthas* via *sādharmya* and *vaidharmya* leads to
  *niḥśreyasa*.
- `pp.introduction.3` — the *sambandha* with *dharma* and the
  *īśvara-codanā* clause that mediates between knowledge and beatitude
  (a Vaiśeṣika answer to the Mīmāṃsaka *codanā-lakṣaṇa-artha-dharma*
  challenge).
- `pp.introduction.4` — opening definition of *sāmānya* (para / apara,
  *sattā* as the highest, *dravyatva* etc. as both *sāmānya* and
  *sad-viśeṣa*).

The presence of the *sāmānya* passage as Text 7 inside Chapter 1 on
wisdomlib (rather than in a later chapter on *sāmānya* proper) reflects
the source site's TOC. The śāstrika may wish to relocate `pp.introduction.4`
to a future `samanya` source file once the printed-edition section
divisions are collated. The choice was to preserve wisdomlib's chapter
assignment for this pass rather than make an editorial reorganisation.

The earlier samavāya pass uses `pp.samavaya.N` ids and `samavaya.N`
locators. This chapter follows the same scheme: ids `pp.introduction.N`
and locators `introduction.N`.

## Terminology decisions for this chapter

1. **`anvataḥ`/`अन्वतः`** — preserved verbatim from the wisdomlib
   page. The Sanskrit-syntactic reading is unclear (the natural sense
   of the maṅgalaśloka would be "having bowed thereafter / in due
   sequence to the sage Kaṇāda", which one might expect as `anantaram`
   or `atha`). Jha's English "and then to the sage Kaṇāda" appears to
   be glossing this word. The śāstrika should collate against the
   Chowkhamba edition; this may be a wisdomlib typesetting variant
   of `anvataḥ` (which is grammatically possible as an adverb "in
   sequence / following") or a printer's misreading.
2. **`niḥśreyasahetuḥ` vs `nih्śreyasahetuḥ`** — the wisdomlib
   Devanagari reads `निह्श्रेयस‑` (with a halanta on न and श्र
   following) rather than the more usual `निःश्रेयस‑` (visarga). The
   IAST is given as `nihśreyasa`. Preserved verbatim. Likely a
   wisdomlib rendering artefact; the *prātiśākhya*-correct form would
   use visarga.
3. **`īśvara-codanā`** — the maṇipravāḷam draft for Text 2 keeps
   `ഈശ്വരചോദന` (Sanskrit compound in Malayalam script) and the simple
   English keeps `*īśvara-codanā*` italicized. The compound is a
   technical Vaiśeṣika answer to the Mīmāṃsaka *codanā-lakṣaṇa* of
   *dharma*; translating it as "command/injunction of the Lord" risks
   smuggling in a theistic-voluntarist reading that is precisely what
   the term is doing dialectic work to *avoid* dropping.
4. **`sattā` / `sad-viśeṣa`** — kept as Sanskrit-in-script in both
   drafts. `sattā` glossed as "Being-as-such" (English) and as
   "‘ഉള്ളത്’ എന്ന സാമാന്യം" (Malayalam). `sad-viśeṣa` glossed in the
   parenthetical "a universal-which-also-individuates"; this is a
   long-standing crux and the gloss is deliberately descriptive
   rather than rendering it as a fixed Western term.
5. **`sādharmya` / `vaidharmya`** — kept Sanskrit in both drafts. The
   Malayalam draft annotates them as "സാമ്യലക്ഷണ" and
   "വ്യാവർത്തകലക്ഷണ" inside parentheses; the English keeps them
   italicized and uses "shared features" / "distinguishing features"
   as gloss.

## Character / normalisation decisions

1. **Unicode normalisation:** all extracted strings normalised to NFC.
2. **Inline whitespace:** the wisdomlib markup uses `<br />` to break
   the maṅgalaśloka into lines. Line breaks were collapsed to a single
   space inside `sa_devanagari` and `sa_iast` (consistent with the
   existing `samavaya.json` records, which also store the Sanskrit as
   a single flat string).
3. **Inline formatting stripped:** `<em>`, `<a>` tags removed, inner
   text retained. Smart quotes `‘ ’` and em-dashes `—` preserved.
4. **Daṇḍas and section markers:** `।`, `॥`, `|| 1 ||`, `|| 2 ||`,
   `|| 7 ||`, `॥ १ ॥`, `॥ ७ ॥` kept verbatim.
5. **The "Text (N):—" prefix** that wisdomlib prepends to Jha's English
   is preserved inside `literal_en`. (The samavāya pass made the same
   choice; preserved for consistency.)
6. **No invisible characters** (ZWNJ / ZWJ / BOM / NBSP / ZWSP / WJ)
   present in any extracted Devanagari or IAST.

## Likely typographical concerns (śāstrika to verify)

In priority order:

1. **`प्रशस्तपादभाष्यम् ।` as title line in the maṅgala block** — the
   IAST renders it `praśastapādabhāṣyam |`. This appears to be the
   *title* of the work being treated as a syntactic line of the verse
   on wisdomlib's rendering (page line 363). In the printed edition
   this is the title, not part of the śloka. The śāstrika may wish to
   strip it from `sa_devanagari` / `sa_iast` of `pp.introduction.1`
   once collated against print. For this pass it has been preserved
   verbatim because removing it would be an editorial intervention,
   not a transcription.
2. **`अन्वतः`** in the maṅgalaśloka — see "Terminology decisions"
   point 1 above. Most likely a wisdomlib variant or printer error.
3. **`निह्श्रेयस‑`** in Text 1 — see "Terminology decisions"
   point 2 above.
4. **`सामान्यम् द्विविधम् परमपरं चानुवृत्तिप्रत्ययकारणम्`** in Text 7
   — note the Devanagari uses anusvāra-final forms `सामान्यम् द्विविधम्`
   where one might also see `सामान्यं द्विविधं`. Both are
   *prātiśākhya*-legitimate; preserved verbatim.
5. **`mahāviṣayatvāt sā cānuvṛttereva`** in Text 7 — the IAST has
   `cānuvṛttereva` which is `ca + anuvṛtteḥ + eva` joined; the
   sandhi is correct but dense. Flagged because the compound is one a
   reader is likely to mis-segment.
6. **Whitespace inside English strings has been collapsed.** Paragraph
   boundaries are not present in these *literal_en* strings because
   each of the four Jha renderings on wisdomlib is a single `<p>`.

## Passages skipped, deferrals

None. The chapter is small (4 passages, well under the 25-passage
cap) and was ingested completely. No pages failed to fetch.

## Quality concerns for the śāstrika before flipping `reviewed_*` /
## `verified_*` flags

In priority order:

1. **All Devanagari/IAST is wisdomlib-derived and uncollated** against
   the Chowkhamba printed edition. Suspected variants are flagged
   above.
2. **Jha's English in `literal_en` is verbatim from the page** —
   wisdomlib's transcription itself may differ from the printed Jha.
   Worth a sample collation.
3. **All `ml_draft.text` is AI-generated maṇipravāḷam.** A
   Malayalam-literate śāstrika must read each before it is admissible
   to the reading view. Particular things to scrutinise:
   - The glosses inside parentheses in `pp.introduction.2.ml_draft`
     for `sādharmya` and `vaidharmya`.
   - The `സദ്വിശേഷം` rendering in `pp.introduction.4.ml_draft` —
     intended to preserve the Sanskrit, not translate it.
4. **All `en_simple_draft.text` is AI-generated.** It is positioned
   as an aid alongside `literal_en`, never as a replacement. Termini
   technici are italicized. The śāstrika should confirm no
   substitution of a Western philosophical frame has crept in — the
   gloss of `sad-viśeṣa` as "universal-which-also-individuates" is
   the most exposed case.
5. **No Nyāyakandalī Sanskrit at all for this chapter.** The
   commentary section of any future concept node will have no
   Sanskrit to bind to until the śāstrika ingests from a printed
   edition.
6. **Text 7's chapter placement.** As noted above, wisdomlib places it
   in Chapter 1; a śāstrika may prefer to relocate it to a future
   `samanya` source file. If so, the locator `introduction.4` should
   be renumbered or replaced (it is not yet bound from any concept
   node, so the rename has zero downstream cost at the time of this
   ingestion).
