# Nyāyakandalī ingestion — Guṇa, Texts 108–137 (closing third)

## Identification

- **Source edition (LOCAL):** `content/sources/_reference/jha_pdf/jha_padarthadharmasamgraha.en.txt`
  (Mahāmahopādhyāya Gaṅgānātha Jhā, *Padārthadharmasaṃgraha of Praśastapāda
  with the Nyāyakandalī of Śrīdhara*, Allahabad 1916; Chaukhambha reprint
  1982; public domain, Jha d. 1941). Phase A sanctioned per
  `content/sources/README.md`.
- **Chapter:** *Guṇapadārtha*, final third — closes the *guṇa* chapter
  at `iti praśastapādabhāṣye guṇapadārthaḥ` (Jha's English: "Thus ends*
  th© chapter on (Qualities." — line 27647 of the PDF text-layer).
- **Output file:** `content/sources/nyayakandali/guna-part-3.json` (new).
- **Scope this commit:** Jha's Texts **108 through 132** (25 records).
  Texts **133–137** are *deferred* per the agent prompt's >25-record rule
  ("If >25 records, do first 25 fully and defer rest"). 133–137 (dharma,
  adharma, the saṃsāra/mokṣa block, and *śabda*) will be picked up by the
  next pass against the same source. The two notes-files documenting that
  next pass should retain the locator scheme below.

## Locator scheme

- `id`: `nk.guna.<N>` where `<N>` is Jha's Text-number.
- `locator`: `gloss.guna.<N>` (the canonical Nyāyakandalī locator for a
  guṇa-chapter gloss, matching the precedent `gloss.samavaya.N` already
  used in `content/sources/nyayakandali/samavaya.json` shape).
- Both `sa_devanagari` and `sa_iast` are `""` per the agent prompt's
  explicit instruction; Devanagari recovery is a future Phase-B pass.

## Records emitted (25)

Texts **108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118, 119, 120,
121, 122, 123, 124, 125, 126, 127, 128, 129, 130, 131, 132.**

All twenty-five Texts in this window have a *Commentary.* block in
Jha's printed text. **No Texts were skipped for absence of commentary.**

## Records deferred (5)

Texts **133, 134, 135, 136, 137** — covering *dharma*, *adharma*, the
*saṃsāra* / *mokṣa* block (the bondage-and-liberation discussion at the
hinge between *ātma-viśeṣa-guṇa* and *śabda*), and *śabda* itself (the
*śabda*-block closes the *guṇa* chapter; see line 27483 ff. in the source
text). Each of these has a Commentary block present in the PDF
text-layer (verified by lenient regex on `^Comm(entary|entry|...)`); the
next agent inherits a clean continuation with no orphan Texts.

## Topical map of the ingested window

The window opens inside Praśastapāda's *pramāṇa*-reduction sub-block
and closes at the end of the *saṃskāra* triad:

- **108–111** — closing reductions to *anumāna*: *arthāpatti* (108),
  *sambhava* (109), *abhāva* (110), *aitihya* (111). Each non-Nyāya
  pramāṇa is shown to reduce to inference.
- **112–119** — *parārtha-anumāna* and its five *avayavas*: *pratijñā*,
  *apadeśa*, *nidarśana* (two kinds, with *nidarśanābhāsa*),
  *anusandhāna*, *pratyāmnāya*. The long *hetvābhāsa* taxonomy
  (*asiddha*, *viruddha*, *sandigdha*, *anadhyavasita*) sits in Text 115
  with its sub-debate on *manas*-*kriyāvattva*.
- **120** — *nirṇaya* (definite cognition), divided into pratyakṣa- and
  anumāna-nirṇaya.
- **121** — *smṛti*: causes (ātma-manas-saṃyoga + liṅga-darśana +
  praṇidhāna + bhāvanā + dharma/adharma); the four kinds of liṅga; the
  Vedāntic dissent; Śaṅkara's spontaneous-vs-intentional memory.
- **122** — *ārṣa-jñāna* (the *prātibha* cognition of the ṛṣis), with
  rare laukika instances ("tomorrow my brother arrives").
- **123** — *siddha-darśana* is *not* a distinct pramāṇa; it falls under
  *yoga-ja-pratyakṣa* / *ārṣa-jñāna*.
- **124–128** — the core *ātma-viśeṣa-guṇa* block:
  - **124** *sukha*, **125** *duḥkha*, **126** *icchā* (with *kāma*,
    *kṣudhā*, *sneha*, *abhilāṣa*, *kāruṇya*, *vairāgya*, *upadhā*,
    *bhāva*, and the *kriyā-niyata* desires *jigamiṣā* &c.),
  - **127** *dveṣa* (with *krodha*, *droha*, *manyu*, *akṣamā*, *amarṣa*),
  - **128** *prayatna* (= *saṃrambha* = *utsāha*; *jīvana-prayatna* +
    *icchā-dveṣa-ja-prayatna*).
- **129–131** — physical guṇas in the closing inventory: *gurutva*,
  *dravatva* (*sāṃsiddhika* / *naimittika*), *sneha*.
- **132** — *saṃskāra*, three-fold: *vega*, *bhāvanā*, *sthitisthāpaka*.
  Text 132's *Commentary* also contains the long Mīmāṃsaka-*sphoṭa*
  polemic — Śrīdhara argues that ordinary *saṃskāra*-driven *smṛti* of
  the constituent letters suffices to deliver sentence-meaning, with no
  need to posit a *sphoṭa* substance.

## Extraction method

`literal_en` was extracted **verbatim** from the LOCAL PDF text-layer
(`jha_padarthadharmasamgraha.en.txt`) by a single-pass Python script.
For each Text N in the window:

1. Locate the line where `Text (N):` (or its OCR variants: `Text {N}`,
   `Text f Nj`, `Text {IDS}` (= 108 garbled), `Text (III)` (= 111 in
   Roman numerals), `Ttftt (121)`, `Tvst (113)`, `Teat (113)`, etc.) opens.
2. Locate the first `Commentary` marker after that start. The marker
   is liberally matched against `^\s*Comm(entary|entry|entaiy|entaty)
   \s*[.,*^»«:;]*\s*$` (case-insensitive) to absorb the OCR-era trailing
   punctuation: `Commentary.`, `Commentary*`, `Commentary«`, `Commentry.`,
   `Commentary^`.
3. Capture every line from the line **after** the Commentary marker up
   to (but not including) the line that opens Text N+1.

Multiple-paragraph commentaries are preserved with their internal
newlines and blank lines. Page-headers (`PRA<?ASTAPÄDA BHÄSHYA…`,
`QUALITIES: SIMILARITIES AND DISSIMILARITIES`), page numbers, and
footnote markers that fall inside a Commentary block are **kept
verbatim**, since this is Phase A and a śāstrika needs an unmodified
view of Jha's text against which to audit later.

## Verbatim sample (Text 124, *sukha*, opening of `literal_en`)

> Page 260] In as much as pleasure is a product of Buddhi, the
> author proceeds to describe it after having dealt with Buddhi.
> Pleasure is of the nature of favour
> Pleasure having
> tbe character of something desirable or favourable, when
> bringing about the experiencing of its objective, favours
> the person aa it were.

(Lifted verbatim from the PDF text-layer at lines 25433–25439; preserved
exactly as Jha's 1916 print has it, OCR artefacts — `tbe`, `aa it were`
— and all.)

## Text 126 — the printed lacuna

The agent prompt flagged Text 126 as carrying a known lacuna in Jha's
printed English: `Lust is desire................................;`.
On inspection of the LOCAL PDF text-layer, that lacuna sits inside the
**sūtra (Praśastapāda)** block at lines 25533–25534:

```
25533: Ln#t, Hunger, Affection, Aspiration, Compassion
   …
25533: Lust it
25534: desire
25535: ; Hunger is desire
```

— i.e. the printed dotted ellipsis is in the *Text (126)* block, which
is **not** what this Nyāyakandalī ingestion captures. The
**Commentary** to Text 126 (lines 25546–25591 of the PDF text-layer)
**does** supply the missing predicate explicitly:

> Lust is desire for sexual intercourse ;ke.t the word 'Kama' without
> any qualifying adjuncts is used in the sense of desire fqr sexual
> intercourse ;'

That intact phrasing in Śrīdhara's gloss is what this record (`nk.guna.126`)
carries as `literal_en`. The lacuna therefore does **not** appear in
the Nyāyakandalī JSON — but it is preserved (and flagged in this notes
file) so that the Phase-B reviewer of the *bhāṣya* side (Praśastapāda's
Text 126 in `prashastapada/...`) is forewarned. The intact Sanskrit
`maithunecchā kāmaḥ` (per the agent prompt) is reflected in the
`ml_draft` and `en_simple_draft` for `nk.guna.126`, but never
substituted into the `literal_en` field.

## Terminology decisions

The agent-prompt glossary was applied without deviation. All listed
termini stay Sanskrit in both drafts and are glossed in surrounding
prose; they are never translated. Specifically for this window:

- *Ātma-viśeṣa-guṇas* — *sukha*, *duḥkha*, *icchā*, *dveṣa*,
  *prayatna*, *bhāvanā*, *dharma*, *adharma* — carried as Sanskrit in
  both `ml_draft` (Malayalam script) and `en_simple_draft` (italicised
  Sanskrit). Jha's "Pleasure," "Pain," "Desire," "Aversion," "Effort"
  appear *only* in `literal_en` (Jha's own English, untouched).
- *Pramāṇa-reduction terms* — *arthāpatti*, *sambhava*, *aitihya*,
  *abhāva*, *anumāna*, *pramāṇa*, *vyāpti*, *liṅga* — kept Sanskrit.
- *Pañca-avayava* names (*pratijñā*, *apadeśa*, *nidarśana*,
  *anusandhāna*, *pratyāmnāya*) and the *hetvābhāsa* taxa (*asiddha*
  with its four sub-types, *viruddha*, *sandigdha* / *anaikāntika*,
  *anadhyavasita*) — kept Sanskrit.
- *Saṃskāra*-triad — *vega*, *bhāvanā*, *sthitisthāpaka* — kept
  Sanskrit; "Speed," "Faculty," "Elasticity" not substituted.
- *Kāma* in Text 126 — carried as Sanskrit with the Sanskrit-sourced
  gloss *maithunecchā kāmaḥ* (the intact phrasing the agent prompt
  pointed to) informing the `ml_draft`/`en_simple_draft` but never
  injected into `literal_en`.
- *Śabda* — Text 137 is *deferred* with the rest of 133–137; the
  *śabda* terminus will be glossed Sanskrit when that pass runs.
- *Smṛti*, *saṃskāra*, *bhāvanā* — kept Sanskrit even where Jha
  consistently writes "Remembrance," "Impression," "Faculty."

## Field-level constraints honoured

- `literal_en` is verbatim from the PDF text-layer; no composition,
  no silent correction of OCR artefacts. Recognisable garbles
  (`Akäca`, `Saroaväya`, `ploasure-giviog`, `paraonal`, `'Twuti'`,
  `relaionxkip`, etc.) are preserved.
- `sa_devanagari` and `sa_iast` are `""` on every record, per the
  agent prompt's explicit instruction. Phase B is the appropriate
  place to populate them.
- No `reviewed_by` / `reviewed_at` was set: all draft renderings
  carry `null` / `null`.

## Validation

`npm install` followed by `npm run validate:content` passes:

```
— Concept nodes —     validated: 1
— Source passages —   validated: 185
— Purvapaksa positions — validated: 0
Content OK.
```

(The total source-passage count rises from 160 to 185 with this commit.)

## Concerns / known gaps for the next pass

1. **Texts 133–137 deferred.** The next agent should pick up at
   `nk.guna.133` (*dharma*) and continue through *śabda* (Text 137).
   All five have Commentary blocks present in the LOCAL PDF text-layer
   at lines 26507 (Text 133), 26999 (Text 134), 27041 (Text 135),
   27103 (Text 136) and 27535 (Text 137). The chapter colophon
   ("Thus ends*") sits at line 27647 of the same file.
2. **Devanagari and IAST are entirely absent** from these 25 records.
   Phase B must source the Nyāyakandalī Devanagari (Vārāṇasī edition
   or GRETIL e-text) before any of these locators is bound to a
   concept node for `published_*`.
3. **OCR garbles preserved.** Notable garbles in this window:
   `Throtving`, `Aklga`, `Ttftt`, `Tvst`, `Teat`, `IDS` (= 108),
   `(III)` (Roman, = 111), `Sarapräya`, `Twuti`, `Akäca`, `<frc.`,
   `Ärspraye`. A Phase-B reviewer must reconcile these against the
   printed page.
4. **Text 110's printed footnote about *abhāva* not being a separate
   padārtha** ("if 'absolute non-existence' were not admitted, then it
   would be absolutely impossible to arrive at any such restriction as
   that 'there are only six categories'") is preserved at the foot of
   `nk.guna.110.literal_en`; it is part of Śrīdhara's running argument
   but reads slightly disjointedly in the OCR.
5. **Text 132's *sphoṭa* polemic** runs long (≈ 400 lines of Jha) and
   pulls the *śabda*-discussion forward into the *saṃskāra* commentary.
   No truncation was applied — the entire Commentary is in `literal_en`.
