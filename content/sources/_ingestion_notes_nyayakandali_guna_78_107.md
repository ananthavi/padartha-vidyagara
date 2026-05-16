# Nyāyakandalī Ingestion Notes — Guṇa Texts 78–107 (Phase A)

## Identification

- **Text:** Śrīdhara Bhaṭṭa's *Nyāyakandalī*, the Commentary block under each numbered Text in Praśastapāda's *Padārthadharmasaṅgraha*.
- **Source (LOCAL):** `content/sources/_reference/jha_pdf/jha_padarthadharmasamgraha.en.txt` — the embedded-OCR text layer of Gaṅgānātha Jhā's 1916 Allahabad edition (Chaukhambha 1982 reprint), per `content/sources/_reference/jha_pdf/NOTICE.md`.
- **Phase A protocol:** sanctioned by `content/sources/README.md` and reaffirmed by the task brief; `verified_by` / `verified_at` / `reviewed_by` / `reviewed_at` remain `null` throughout.
- **Output file:** `content/sources/nyayakandali/guna-part-2.json`.
- **Sister files:** `content/sources/prashastapada/guna-part-2.json` (Praśastapāda mūla, Texts 73–97) and `content/sources/prashastapada/guna-part-3.json` (mūla Texts 98–122). This commentary file covers the middle third of guṇa, Texts 78–102 inclusive; Texts 103–107 deferred (see "Scope deferral" below).

## Scope ingested

25 records, IDs `nk.guna.78` through `nk.guna.102`, locators `gloss.guna.78` … `gloss.guna.102`. Each record carries the verbatim `Commentary.` block that follows the corresponding `Text (N):` marker in the source PDF, up to (and excluding) the next `Text (M):` marker.

### Scope deferral (HARD CONSTRAINT #7)

The task brief asks for Texts 78–107 = 30 records, but the same brief also caps a single pass at 25 records ("If >25 records, do first 25 fully and defer rest with note"). I therefore did **78–102 in full** and **deferred 103–107** to a follow-up pass. The deferred Texts correspond to:

- Text 103 — `[Page 213] That which differs from the above-mentioned …` (further sub-classification of the *liṅga*)
- Text 104 — The five-membered *nyāya* (*pratijñā / apadeśa / nidarśana / anusandhāna / pratyāmnāya*) and the *parārtha-anumāna* process (PDF line 20746)
- Text 105 — *Śabda* and the other *pramāṇa*s as included in *anumāna* (line 21369)
- Text 106 — Refutation of *upamāna* as an independent *pramāṇa* (line 22046)
- Text 107 — Refutation of *arthāpatti* (line 22067)

A second nyāyakandali agent should pick these up under a likely `guna-part-3.json` file with locators `gloss.guna.103` … `gloss.guna.107` (paralleling the existing `prashastapada/guna-part-3.json` split point).

## Locator scheme

`gloss.guna.<N>` mirrors the existing `prashastapada/guna-part-2.json` and `guna-part-3.json` locator scheme (`guna.<N>`). The `gloss.` prefix follows the convention established in `content/sources/README.md`: "Nyāyakandalī locator e.g. `gloss.samavaya.7`." The `<N>` numbering follows Jha's `Text (N)` marker numbering as printed in the PDF, not any internal Devanagari *kārikā* numbering (which is not surfaced in this OCR layer at all).

## Extraction protocol

1. The PDF text layer contains the string `Text (N):` (with OCR-variant punctuation — `Text (N).`, `Text {N}:`, `Tkxt (N):`, `Ttext (N):`, `Text N.`, etc.) for each Praśastapāda passage.
2. After each `Text (N):` block, the string `Commentary.` (sometimes `Commentary,` / `Commentary*` / `Commentary:` / `Commentary«` — OCR drift) opens Śrīdhara's gloss, which runs to the next `Text (M):` marker.
3. I located the precise PDF line numbers for each marker via `grep -n` and `awk`, then a small Python extractor (split on `\n`, not Python's default `splitlines()` which also splits on form-feed `\f` and would have shifted indexes — the file contains 700 form-feeds) sliced out each Commentary block and stripped the leading `Commentary.` token. The extracted text is exactly what the OCR produced — OCR artefacts and all — and is written to `literal_en` verbatim.

### Per-Text line ranges (1-based, PDF text-layer)

| Text | Marker line | Commentary start | End (excl.) | literal_en chars |
|------|-------------|------------------|-------------|------------------|
| 78   | 10455       | 10459            | 10468       | 211              |
| 79   | 10468       | 10471            | 10508       | 1 689            |
| 80   | 10508 (marker dropped; Jha's bhāṣya begins `Of these, Colour is perceptible by the Eye.`) | 10520 | 10602 | 4 728 |
| 81   | 10602 (`Tkxt (81)`) | 10615   | 10636       | 1 197            |
| 82   | 10636       | 10640            | 10660       | 748              |
| 83   | 10660 (`Text {83}v`) | 10667   | 10691       | 617              |
| 84   | 10691 (`Text 84.—`) | 10729    | 10986       | 14 321           |
| 85   | marker shredded into vertical OCR fragments around lines 10987–13700 (Jha's pages 241–245 of the bhāṣya on *saṃkhyā*); Śrīdhara's Commentary itself resumes coherently | 13843 | 15302 | 81 177 |
| 86   | 15302       | 15392            | 15890       | 26 333           |
| 87   | 15890 (`[Page 138] Text (87).`) | 15906 | 15972 | 3 622 |
| 88   | 15972       | 16094            | 16870       | 42 155           |
| 89   | 16870 (`[Page 151.] Text (89):`) | 17089 | 17839 | 42 309 |
| 90   | 17839 (`[Page 164] Text (90):`)  | 18038 | 18249 | 11 800 |
| 91   | 18249 (`Text (SI)`)              | 18251 | 18324 | 4 008  |
| 92   | 18324 (`Text (9%)`)              | 18327 | 18339 | 842    |
| 93   | 18339       | 18352            | 18490       | 8 148            |
| 94   | 18490       | 18522            | 18675       | 8 245            |
| 95   | 18675 (`Ttxt (95).—`)            | 18699 | 19001 | 17 365 |
| 96   | 19001 (`Text {96}`)              | 19024 | 19087 | 2 954  |
| 97   | 19087 (`Text, (97)`)             | 19160 | 19258 | 5 311  |
| 98   | 19258 (`Ttet (99)`)*             | 19265 | 19273 | 526    |
| 99   | 19273 (`Text (99):..`)*          | 19345 | 20353 | 57 565 |
| 100  | 20353 (`Tfeet (100)`)            | 20356 | 20393 | 2 216  |
| 101  | 20393 (`Text (101):—`)           | 20406 | 20465 | 3 574  |
| 102  | 20465 (`Text (102):—(1^`)        | 20476 | 20714 | 14 593 |

\* The PDF text layer prints `Ttet (99)` and then `Text (99)` in immediate succession (PDF lines 19258 and 19273), an OCR off-by-one duplicating "99." Cross-referencing the printed Devanagari numbering visible in `content/sources/prashastapada/guna-part-3.json` (`vidyāpi caturvidhā` is verse 98, and `tatrākṣam akṣam pratītya` is verse 99) confirms that the first `(99)` is actually Text **98**, the second is Text **99**. I treat them accordingly. The Commentary block at PDF line 19265 ("The author proceeds to classify Vidyā…") is therefore mapped to `nk.guna.98`; the block at PDF line 19345 ("The author proceeds to explain the definition of 'sensuous perception'…") is mapped to `nk.guna.99`. **This single OCR off-by-one is the only Text-marker re-attribution in this pass; every other Text marker matches the printed Jha numbering.**

## Skipped Texts

**None within range 78–102 was skipped.** Every Text in this range carries a `Commentary.` block in the PDF text layer (even Text 78, which has a 3-line gloss, and Text 92, which has a 12-line gloss).

Texts 103–107 are not skipped on substantive grounds but are **deferred** for capacity reasons per HARD CONSTRAINT #7.

## OCR quality concerns preserved verbatim

Per the task brief (spec line: "Preserve OCR garble verbatim") and the PDF NOTICE (`content/sources/_reference/jha_pdf/NOTICE.md` §"OCR quality concerns"), all of the following are kept as-typed by the OCR — never silently corrected. A second-pass reviewer should reconcile against the printed Jha edition:

1. **Sanskrit termini in Latin-1 / German-umlaut transliteration** — `Bhäsya`, `aattd` for *sattā*, `apiJcajd` for *apākaja*, `parthiva` (lowercase first letter), `pärimändalya`, `apekshäbuddhi`, `dvitvasämänya`, `Vyavahdra`, `e'kddi`, `tatra`, `dargana` for *darśana*, `Säraavaya`, `Vidyä` / `Vidyd`, `avidyd`, `nirvi-halpaka`, `aksham`, `pratyaksha buddhih`, `vipakshavrtti`, `apekshd`, `kdldtyayäpadishja`, `Saroaväya`, `Pärimändalya`, `pdrimdndalya`, `prdpti`, `Süira`, `Säötra`, `lava* / *hshana* / *lcshana`, `dhdtu`, etc.
2. **Word-internal OCR substitutions** — `relaionxkip` for "relationship", `Throtving` for "Throwing", `unkidness` regions, `coloured` ↔ `eolored`, `gent` for "Pungent", `Efort` for "Effort", `prevevious`, `seuse-organs`, `vibu` for *vibhu*, `con junction` line-split, `donot` / `doNot`, `donot` (run-together).
3. **Capital/lowercase confusion** — `PRAgASTAPÄDA` / `PRA<?ASTAPÄDA` / `PKAgASTAPÄDA` running headers, lowercase initial *t* in `tk`, `tkis`, `wlt`, etc.
4. **Punctuation drift in `Text (N):` markers** — `Text (78):`, `Text {83}v`, `Text 84.—`, `Tkxt (81):`, `Text (SI) :`, `Text (9%)'fr~-`, `Tfeet (100)`, `Tkxt (95).—`, `Ttext, (97):`. These are flagged at the column heading in the table above; the `literal_en` payload for each record is **just the Commentary block**, with the `Text (N):` marker excluded.
5. **Vertically-shredded OCR fragments** — for the bhāṣya of Texts 84–85 the PDF lines 10986 → ~13700 are largely single-character per line (vertical text re-flow artefact). These fragments fall **between** the Commentary blocks of Texts 84 and 85, so they are not included in any `literal_en` of this file. (The shredded region is the bhāṣya of Text 85 on `parimāṇa`, which is owned by `prashastapada/guna-part-2.json` `pp.guna.85`; that file ingested the Sanskrit-original *bhāṣya* from wisdomlib, bypassing the shredded English layer entirely. The Nyāyakandalī Commentary on Text 85 begins coherently at PDF line 13843, "Though the form and existence of Number…", and that is what is ingested here.)
6. **Page-banner intrusions** — `[Page 102]`, `Page 138]`, `[Page 151.]`, `[Page 164]`, `[Page 178]`, `[Page 182-]`, `[Page 188.]`, `Page 200]`, `Page 213]`, `Page 215]`, and the recurring `QUALITIES : SIMILARITIES AND DISSIMILARITIES.` and `PRA<?ASTAPÄDA BHÄSHYA—CHAP. VI. SECTION (10).` running headers/footers appear mid-Commentary in the text layer. These are preserved verbatim inside `literal_en` rather than stripped — the protocol calls for verbatim preservation.

## Terminology decisions (`ml_draft`, `en_simple_draft`)

The task glossary was followed in full. Specifically, the following Sanskrit termini are kept Sanskrit (in Malayalam script for `ml_draft`, italicised IAST + gloss for `en_simple_draft`); they are **never** translated:

### From the task glossary (carried throughout)
`dravya`, `guṇa`, `karma`, `sāmānya`, `viśeṣa`, `samavāya`, `saṃyoga`, `saṃskāra`, `pṛthaktva`, `vibhāga`, `paratva`, `aparatva`, `gurutva`, `dravatva`, `sneha`, `vega`, `sthitisthāpaka`, `ātman`, `manas`, `pratyakṣa`, `anumāna`, `śabda-pramāṇa`, `liṅga`, `hetu`, `sādhya`, `sapakṣa`, `vipakṣa`, `anvaya`, `vyatireka`.

### Brief-flagged for this range (sense-perception / inference / cognition machinery)
`smṛti`, `saṃśaya`, `viparyaya`, `anadhyavasāya`, `svapna`, `vidyā`, `avidyā`, `vyāpti` — all carried Sanskrit. The four kinds of *avidyā* (*saṃśaya*, *viparyaya*, *anadhyavasāya*, *svapna*) and the four kinds of *vidyā* (*pratyakṣa*, *anumāna* / *laiṅgika*, *smṛti*, *ārṣa*) are never substituted with "doubt", "error", "indeterminate cognition", "dream", "perception", "inference", "memory", "intuition" alone — those English/Malayalam glosses occur *alongside* the Sanskrit, not as replacements.

### Range-specific other technical termini (transliterated, never translated; glossed in surrounding prose)
- **Causal classification** (Texts 78–80): *pākaja-rūpa*, *apākaja-rūpa*, *yāvad-dravya-bhāvin*, *ayāvad-dravya-bhāvin*, *udbhūta-rūpa*, *piṭhara-pāka*, *pīlu-pāka*.
- **Five sense-quality definitions** (Texts 80–83): *rūpa*, *rasa*, *gandha*, *sparśa*; sub-kinds *surabhi*, *asurabhi*, *śīta*, *uṣṇa*, *anuṣṇāśīta*; sense-context *tvac-indriya*, *jīvana*, *puṣṭi*, *bala*, *ārogya*.
- **Number / dimension / separateness** (Texts 85–87): *saṃkhyā*, *ekatva*, *dvitva*, *tritva*, *śatatva*, *parārdha*, *apekṣā-buddhi*, *ekadravyā*, *anekadravyā*, *parimāṇa*, *aṇu*, *mahat*, *dīrgha*, *hrasva*, *pārimāṇḍalya*, *parama-mahattva*, *pracaya*, *tūla-parimāṇa*, *pṛthaktva*, *eka-pṛthaktva*, *dvi-pṛthaktva*, *apara-sāmānya*.
- **Conjunction / disjunction** (Texts 88–89): *aprāpta*, *prāpti*, *anyatara-karma-ja*, *ubhaya-karma-ja*, *saṃyoga-ja*, *vibhāga-ja*, *abhighāta*, *nodana*, *vibhu*, *mūrta*, *sthāṇu*, *kapi-vṛkṣa-saṃyoga*, *avayava*, *avayavin*, *vyāpyavṛtti*, *avyāpyavṛtti*.
- **Priority / posteriority** (Text 90): *paratva*, *aparatva*, *dik-kṛta*, *kāla-kṛta*, *dik-saṃyoga*.
- **Cognition** (Texts 91–98): *buddhi*, *upalabdhi*, *jñāna*, *pratyaya*, *paryāya*, *pratyartha-niyata*, *vidyā*, *avidyā*, *saṃśaya*, *viparyaya*, *anadhyavasāya*, *svapna*, *sādhāraṇa-liṅga*, *vimarśa*, *sthāṇu*-*puruṣa* (the famous example), *gavaya*, *panasatva*, *vāhīka*, *antaḥkaraṇa*, *uparatendriya-grāma*, *pralīna-manaska*, *prāṇa-apāna*, *svāpa*, *svapnāntika*, *smṛti*, *dharma*, *adharma*, *adṛṣṭa*, *saṃskāra-pāṭava*, *dhātu-doṣa*, *vāta*, *pitta*, *kapha*, *śākya*, *bauddha*, *jaina*, *asat-khyāti*, *ātma-khyāti*, *anirvacanīya-khyāti*, *viparīta-khyāti*.
- **Perception / inference machinery** (Texts 99–102): *akṣa*, *indriya*, *catuṣṭaya-sannikarṣa*, *ātma-manas-sannikarṣa*, *manas-indriya-sannikarṣa*, *indriya-viṣaya-sannikarṣa*, *viśeṣaṇa-viśeṣya-bhāva*, *aneka-dravyavattva*, *udbhūta-rūpa-prakāśa*, *savikalpaka*, *nirvikalpaka*, *ālocana-mātra*, *yoga-ja-dharma*, *yukta* / *viyukta*, *sūkṣma* / *vyavahita* / *viprakṛṣṭa*, *pramāṇa*, *prameya*, *pramātṛ*, *pramiti*, *liṅga-darśana*, *laiṅgika*, *anumeya*, *sādhya-dharma*, *trairūpya*, *anvaya-vyāpti*, *vyatireka-vyāpti*, *viruddha*, *sandigdha*, *ajñāta*, *sapakṣa-vṛtti*, *vipakṣa-vṛtti*, *vipakṣaikadeśa-vṛtti*, *kevala-anvayin*, *kevala-vyatirekin*, *anvaya-vyatirekin*, *pratijñā*, *hetu*, *udāharaṇa*, *upanaya*, *nigamana*, *svārtha-anumāna*, *parārtha-anumāna*, *kāryānumāna*, *kāraṇānumāna*, *saṃyogi-liṅga*, *samavāyi-liṅga*, *virodhi-liṅga*. (Several of these surface only in the longer Commentary blocks of Texts 99 and 102; not all appear in the `ml_draft` / `en_simple_draft`, but where they do they are kept Sanskrit-with-gloss.)

### Particular decisions worth flagging

- **`buddhi`** is kept Sanskrit even though "*intellect*"/"*cognition*"/"*idea*" are tempting. Praśastapāda treats *buddhi* as a single *ātma-viśeṣa-guṇa* with synonyms *upalabdhi*, *jñāna*, *pratyaya* — translating *buddhi* alone would break the synonym-set.
- **`indriya`** is kept Sanskrit; the English "sense-organ" appears in surrounding prose but not as a substitute.
- **`pratyakṣa`** vs **`darśana`**: in Text 100's Commentary, Śrīdhara explicitly says *darśana* in the *bhāṣya* means *grahaṇa*/*jñāna*, not visual *pratyakṣa* alone. Both Sanskrit terms are kept distinct in the draft.
- **`liṅga`** is kept Sanskrit throughout; "mark", "probans", "inferential sign" appear only as parenthetical glosses.
- **`apekṣā-buddhi`** (the trigger of *dvitva*, *dvi-pṛthaktva*, *paratva*) is kept Sanskrit — translating as "comparative cognition" obscures the technical role.
- **`adṛṣṭa`** is kept Sanskrit. Both "unseen" and "destiny" gloss it depending on context; the Sanskrit term carries both senses and the schools' theological commitment.
- **`khyāti`-classification of error** (Texts 95, 99 Commentary): the four-way classification (*viparīta-*, *asat-*, *ātma-*, *anirvacanīya-*) is preserved Sanskrit; the school-affiliations (Mādhyamika, Yogācāra, Advaita) are named only in `en_simple_draft` for orientation.
- **`Īśvara`** in the *parimāṇa* discussion (Text 86) is left as `Īśvara` in `en_simple_draft` and `ഈശ്വരൻ` in `ml_draft`. The Vaiśeṣika *Īśvara* is doctrinally specific and not interchangeable with "God" without footnoting.
- **Heterodox schools** (Text 95 Commentary): `bauddha`, `śākya`, `jaina` are kept Sanskrit; "Buddhist" / "Jain" appear in parenthetical gloss. This matches Praśastapāda's own diction ("*śākyaka*-and-others-tenets").

## `ml_draft` quality concerns

- The `ml_draft` for each record is a **compressed gist** of Śrīdhara's gloss, not a sentence-by-sentence translation. For very long Commentaries (Texts 84, 85, 88, 89, 99 — each 14 000–81 000 chars of OCR text), the `ml_draft` is necessarily a few-sentence summary touching the key Naiyāyika positions, Pūrvapakṣin objections, and Vaiśeṣika replies. For shorter Commentaries (Texts 78, 82, 92, 98) the `ml_draft` covers the whole gloss.
- Maṇipravāḷam style is light: I keep Sanskrit *tat-puruṣa* compounds (e.g. *catuṣṭaya-sannikarṣa*, *yoga-ja-dharma*) intact and use Malayalam syntactic suffixes (`-ങ്ങൾ`, `-ത്തിന്റെ`, `-ത്താൽ`) for Malayalam grammatical role. Devanagari is never embedded — the brief explicitly requires `sa_devanagari: ""`.
- The reading view will never surface these drafts until `reviewed_by` / `reviewed_at` are populated; they are intentionally provisional.

## `en_simple_draft` quality concerns

- Same gist-compression policy as `ml_draft`. Italicised Sanskrit termini + parenthetical English gloss is the consistent stylistic move. Jha's "literal" English is preserved separately in `literal_en` and is the canonical reference; `en_simple_draft` is a *companion*, not a *replacement*, per the schema docstring.

## Concerns and known gaps (P0 #4 — nothing flipped verified)

1. **`reviewed_by` / `reviewed_at` are `null` on every draft.** Per HARD CONSTRAINT #4, no rendering is marked verified.
2. **`verified_by` / `verified_at`** are not flipped on any binding `SourceRef` either (those bindings do not yet exist; concept nodes have not yet bound `gloss.guna.*`).
3. **No Sanskrit on Nyāyakandalī passages.** `sa_devanagari` and `sa_iast` are explicitly `""` per the brief and per the relaxed schema (`z.string()`). A future Sanskrit pass — either by recovering the Nyāyakandalī Devanagari from a separate edition (e.g., the Kashi Sanskrit Series Sanskrit-original of Nyāyakandalī) or by per-passage śāstrika typing — is required before any concept node binds these for `published_*`.
4. **OCR garble is preserved verbatim.** The `literal_en` payloads are not fit to surface in the reading view as-is. A second-pass cleanup against the printed Jha edition is the Phase B gate, and must be done before any `verified_by` flip.
5. **Texts 103–107 deferred** per HARD CONSTRAINT #7 (see Scope deferral above).
6. **Text 85's Commentary is the largest single block** at 81 177 chars. The earliest stretch up to the "246" pagebreak is on *pratyakṣatva-vāda* of *saṃkhyā* against the Yogācāra *vāsanā-vāda*; the middle stretch develops the *dvitvotpatti* sequence (apekṣā-buddhi → dvitva-sāmānya-jñāna → dvitva-guṇa-jñāna → dravya-jñāna → dvitva-nāśa); the late stretch debates whether the *dvitva* of generality is itself *eka-dravyavṛtti* or *aneka-dravyavṛtti*. The `ml_draft` and `en_simple_draft` summarise the three stretches.
7. **Text 99 is the second-largest** at 57 565 chars and contains the canonical Vaiśeṣika *indriya-pramāṇa* exposition — including the *catuṣṭaya-sannikarṣa* analysis, *yogi-pratyakṣa* doctrine, refutation of the Sāṃkhya eleven-*indriya* scheme, and the *savikalpaka*/*nirvikalpaka* debate against the *Bhāṭṭa* and *Bauddha* schools. A future pass should subdivide this `literal_en` into multiple finer-grained passages once concept nodes need to bind specific sub-arguments rather than the whole Text 99 gloss.

## Validation

Ran `npm install` (561 packages installed) and then `npm run validate:content`:

```
— Source passages —
  validated: 185
Content OK.
```

(185 passages = 160 prior + 25 new in this pass.)

## Branch

`worktree-agent-add3bccc74177442b`
