# Ingestion notes — Nyāyakandalī commentary, Praśastapāda Texts 1–34

Phase-A draft ingestion of Śrīdhara's *Nyāyakandalī* commentary covering the
benediction and Praśastapāda Texts 1–34 (the Introduction, Enumeration of
Categories, and Sādharmya–Vaidharmya chapters).

## Source

Local PDF-OCR text extract:
`content/sources/_reference/jha_pdf/jha_padarthadharmasamgraha.en.txt`

— extracted from the uploaded scans of Mahāmahopādhyāya Gaṅgānātha Jhā's
edition (Allahabad 1916; Chaukhambha 1982 reprint). Public domain in all
jurisdictions whose copyright term is life + ≤95 years.

## Deliverables

| File | Records | Texts covered |
| --- | --- | --- |
| `content/sources/nyayakandali/introduction.json` | 3 | benediction, 1, 2 |
| `content/sources/nyayakandali/enumeration-of-categories.json` | 5 | 3, 5, 8, 9, 10 |
| `content/sources/nyayakandali/sadharmya-vaidharmya.json` | 23 | 11–29, 31–34 |
| **Total** | **31** | |

## Extraction protocol

For each Praśastapāda Text in range, the corresponding `Commentary.` block
was located in the PDF text and captured verbatim into `literal_en`. Lenient
matching was needed because the OCR baked the `Commentary` marker into the
next word in several places (`CommentaryThough…`, `CommentaryBy…`,
`CommentaryThose…`, `CommentaryEarth…`) and once mangled it altogether
(`COILHL eiA ar y.` for `Commentary.` at line 2408). For run-in markers,
the leading `Commentary` prefix was stripped but the rest of the line was
kept; for the fully mangled marker, the marker line was dropped while its
body was preserved.

Block endings respect the next `Text (M):` marker, the next `CHAPTER` line,
or — for Text 10, where the chapter break separates it from Text 11 — the
chapter heading. Section-level transitions inside a chapter (`SECTION ( 2 )`,
`SECTION ( 3 )`, etc.) were *not* used as cut points; they are preserved
inside the commentary text as the OCR delivered them, including the
intervening running headers and page numbers.

OCR garble is preserved verbatim throughout `literal_en`. The corpus
therefore contains expected artefacts such as `quailities`, `vje have säen`,
`lnhera-nc',,`, `Throvjing` for *Throwing*, `dhtirma` for *dharma*,
`Bhäsya` for *Bhāṣya*, `Äkáca`, running-header bleed-in
(`PRA<?ASTAPÄDA BHÄSHYA—CHAP. III. SECTION (1).`), and embedded page
markers (`Page 13—Reply:`). The Phase-B printed-edition cross-check will
later silently clean these.

## Texts skipped (no `Commentary.` marker found)

- **Text 4** — does not appear as a numbered `Text (N)` marker in this
  edition; in the printed text the contents are absorbed into the long
  commentary on Text 3 (the Darkness/Tamas refutation) and into the
  `enumeration-of-categories` `pp.enumeration-of-categories.3` mūla itself.
  Nothing to ingest as a separate Nyāyakandalī record.
- **Text 6** — the *karma*-enumeration *mūla* (`Throvjing upwards…`) is
  followed by Śrīdhara's gloss on it, but the OCR did not preserve an
  explicit `Commentary.` marker between Text 6 and Text 7. Per the strict
  reading of the protocol ("if the next thing is another `Text (M):` …
  skip that Text gracefully"), this record was skipped. The commentarial
  content is not lost from the source — it sits in the file at roughly
  lines 1126–1152 — but it cannot be ingested without violating the
  Commentary-marker rule. A Phase-B pass should pick this up from the
  printed edition with an explicit marker.
- **Text 7** — identical situation. Text 7 is followed by Śrīdhara's gloss
  on *sāmānya* (the *anuvṛtti*/*vyāvṛtti* discussion, the "*sattā* over
  fire and water" *pūrvapakṣa* on *artha-kriyā-kāritva*, etc.) at roughly
  lines 1164–1368, but no explicit `Commentary.` marker separates Text 7
  from this gloss. Skipped per protocol.
- **Text 30** — the *mūla* `Earth, Water and the Souls have the fourteen
  qualities` (line 2397) is immediately followed by Text 31 (line 2401) in
  the OCR, with no intervening `Commentary.` block. Skipped.

## Schema-relevant choices

- **`sa_devanagari` and `sa_iast` are both empty strings**, per the user's
  current-pass instruction. The PDF's OCR transliterated all Devanagari to
  ad-hoc Latin-1; we are deferring Sanskrit-script recovery to a later
  GRETIL-merge pass or a printed-edition cross-check. The schema permits
  this (Phase A is explicitly relaxed here).
- **`ml_draft` is *maṇipravāḷam-conscious*** — Sanskrit *termini technici*
  stay in their Sanskrit form, written in Malayalam script, and are glossed
  by Malayalam prose around them. The glossary in the agent prompt was
  followed strictly: ദ്രവ്യം, ഗുണം, കർമ്മം, സാമാന്യം, വിശേഷം, സമവായം,
  സാധർമ്മ്യം, വൈധർമ്മ്യം, പ്രത്യക്ഷം, അനുമാനം, ഹേതു, പക്ഷം, സാധ്യം,
  ഇഹപ്രത്യയം, നിശ്രേയസം, പദാർത്ഥം, etc. *Never translated.* Other
  Sanskrit terms encountered (Maṇḍana, Kiraṇāvalī, Pakṣila-svāmi,
  Śabara-svāmi, Vaiśeṣika-sūtra, *prāgabhāva*, *antya-viśeṣa*,
  *kāraṇa-vyāpārādhīna-svarūpa-abhivyakti*, etc.) were transliterated to
  Malayalam script with brief Malayalam gloss, never replaced by a
  Malayalam-only word.
- **`en_simple_draft` keeps *termini technici* in italicised Sanskrit
  (IAST)** alongside English prose. The `pūrvapakṣa`/`siddhānta` structure
  of Śrīdhara's commentary — particularly his refutation of *tamas* as a
  *dravya* (Text 3), Maṇḍana's barb against the cessation-of-pain account
  of *mokṣa* (Text 1), and the long examination of *para*/*apara*
  *sāmānya* and *anekatva*/*vyāvṛtti* (Text 19) — is preserved with explicit
  labels.
- **All `reviewed_by` / `reviewed_at` fields are `null`.** No review claim
  is being made; the drafts await śāstrika sign-off.
- **`generated_by: "claude-agent-ingestion"`** and a single ISO timestamp
  is used across all records to make the provenance auditable.

## Terminology decisions a śāstrika should know about

1. **`pratiyogin`** in Text 3's *tamas*-refutation is rendered "counter-correlate"
   in `en_simple_draft` rather than "counter-entity" (Jha's term). Jha's
   "counter-entity" is preserved verbatim in `literal_en`; the modern English
   gloss uses the more philosophically standard "counter-correlate", with the
   Sanskrit term retained in italics. A śāstrika may want to harmonise.
2. **`mokṣa` vs `niḥśreyasa`.** In Text 1 the Malayalam draft uses
   നിശ്രേയസം consistently when reflecting the *mūla*'s
   *niḥśreyasa-hetuḥ*; in Text 2's commentary the same Malayalam term is
   used for Śrīdhara's *mokṣa*-talk, since the two are explicitly
   identified in the commentary. The English draft uses *mokṣa* and
   *niḥśreyasa* contextually as Śrīdhara does. If the editorial preference
   is to keep these strictly separate, the Text 2 Malayalam can be
   re-glossed accordingly.
3. **`sad-viśeṣa` in Texts 7, 15, 19, and 20.** The compound is preserved
   in Sanskrit in both Malayalam and English drafts, glossed as
   "*sāmānya*-which-also-individuates" / "സദ്വിശേഷം — സാമാന്യമെങ്കിലും
   വ്യാവർത്തനഹേതുവായതുകൊണ്ടു വിശേഷം എന്ന വ്യപദേശം ലഭിക്കുന്നതു".
4. **`Kiraṇāvalī` and its excerpts.** Wherever the printed text quotes
   Udayanācārya's *Kiraṇāvalī* (footnote-style commentary on Praśastapāda),
   the quotation has been left inside `literal_en` and summarised at the
   end of the corresponding `en_simple_draft`. These are *not* primary
   Śrīdhara material; the editorial NOTES around them are also preserved.

## Concerns the śāstrika should know about

1. **Volume of the benediction record.** `nk.introduction.benediction`
   carries ~24,000 characters of `literal_en` — Śrīdhara's longest single
   block in this range. It mixes the salutary verses, the obstacle-removal
   discussion, the five-fold examination of rival *mokṣa* accounts, the
   defense of *śabda-prāmāṇya* (with the Mīmāṃsaka *kāryānvaya* objection),
   and the lead-in to Text 1. The Malayalam and English drafts compress
   this into thematic paragraphs. A separate śāstrika pass may want to
   break the benediction into several SourcePassages indexed
   `benediction.salutation`, `benediction.purpose-of-science`, etc.
2. **OCR distortion of Sanskrit terms inside `literal_en`.** Examples that
   may trip future readers: `aattd` for *sattā*, `Saroaväya` for *Samavāya*,
   `Sänkbyas` for *Sāṅkhyas*, `iattd` and `Sattätambandha` for
   *sattā-sambandha*, `Svatmatattpa` for *svātma-sattva*, `lqvzr&` for
   *Īśvara* (line 830-ish, Text 2 *Kiraṇāvalī* note). All preserved as-is.
3. **Section/chapter headings preserved mid-record.** Records for Texts 1
   and 3 (which span page-breaks) carry an OCR'd `SOURCE OF KNOWLEDGE.`
   header (Text 1) and a long page-header (`ENUMERATION AND CLASSIFICATION
   OF CATEGORIES.`) sitting inside the prose; these were left verbatim.
4. **Text 30 has no commentary in this OCR.** It is possible Jha's printed
   edition does carry a brief gloss on Text 30; the OCR may have lost it
   to an adjacent text-run. Phase-B verification should check the printed
   edition pages 25-26.
5. **The "ed.-1916" Kiraṇāvalī summary at line 2007–2025** sits in the gap
   between Text 18's commentary end and Text 19's *mūla*; it has been
   absorbed into Text 19's `literal_en` because that is where Śrīdhara's
   gloss on the *astitva*/*sattā-sambandha*/*svātma-sattva* distinction
   actually concludes. A śāstrika may prefer to detach this editorial
   NOTE in Phase B.
6. **The marker `( Text 16i):—`** at line 1785 was read as `Text 16`. The
   `i` suffix is OCR garble; the content matches the standard Text 16 of
   the *Padārthadharmasaṅgraha*'s *sādharmya–vaidharmya* chapter.
7. **`19:` (line 1883) without `Text (`** marker. The line reads
   `19: The three beginning with Generality have the character—of having
   their nole being within themselves…` — a clear Text 19, read as such.

## Validation

`npm run validate:content` passes after this commit:
`— Source passages — validated: 191`.
