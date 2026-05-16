# Nyāyakandalī Karma Ingestion Notes

## Identification

- **Commentary:** Śrīdhara Bhaṭṭa, *Nyāyakandalī* on the *karma-padārtha* section
  of Praśastapāda's *Padārthadharmasaṅgraha*.
- **Source (LOCAL):**
  `content/sources/_reference/jha_pdf/jha_padarthadharmasamgraha.en.txt` —
  the pdftotext extraction of Jha (Chowkhamba 1982 reprint of Allahabad 1916);
  see `content/sources/_reference/jha_pdf/NOTICE.md`.
- **Phase:** A (Jha's printed edition, public-domain, `verified_by`/`verified_at`
  remain `null`; `reviewed_by`/`reviewed_at` on every rendering remain `null`).
- **Output file:** `content/sources/nyayakandali/karma.json` — 15 records.

## Scope ingested

Texts **138–153** of Jha's numbering — the karma chapter, beginning with the
opening *sādharmya-vaidharmya* survey (Text 138) and closing with Text 153
(unguided karmas, *apasarpaṇa* / *upasarpaṇa* of *manas*, and *adṛṣṭa*-caused
motions in the rudimentary elements). The chapter colophon is followed by
`CHAPTER VII. On Sänmänya—Community.` (line 28945–46 of the source text),
which marks the boundary; no sāmānya material is touched here.

The mūla Praśastapāda counterparts already exist in
`content/sources/prashastapada/karma.json` (Texts 138–153). The present
file is the Nyāyakandalī commentary layer alone — `literal_en` is Śrīdhara's
gloss (verbatim from Jha's printed translation), not the bhāṣya.

### Records produced (15)

`nk.karma.138, 139, 140, 142, 143, 144, 145, 146, 147, 148, 149, 150, 151, 152, 153`.

Locator scheme: `gloss.karma.<N>`, `id`: `nk.karma.<N>`, where `<N>` is Jha's
Text number for the bhāṣya block to which the commentary attends.

### Skipped (1)

- **Text 141 (*ākuñcana*).** The PDF presents no separate Commentary block
  between Text 141 (line 27766) and Text 142 (line 27771); the next
  `Commentary.` marker (line 27780) follows Text 142 and discusses *prasāraṇa*
  ("disjunctions from the points of space occupied by the root-end and
  conjunction with those occupied by the top-end"). Skipped per the
  ingestion rule. The bhāṣya record `pp.karma.141` remains the source for the
  *ākuñcana* definition.

## Extraction method

For each Text marker `Text (N):` (or its OCR variants — `Text (HI):`,
`Texfc (140):`, `Page 292 Text (142):`, `,Text (143);`, `Page 296J Text (144) :`,
`Text (145}:`, `Texfc (147):`, `Text (IB1):`, `Page 308] Text 152:`), the
**next** `Commentary.` line (or `Commentary«` for Text 151 at line 28708) was
located, and lines between it and the following `Text (M)` marker (or the
chapter-VII break at line 28945) were concatenated into `literal_en`. The
opening `Commentary.` token and trailing blank lines were stripped; running
headers, page-break artefacts (e.g. `PRA<?ASTAPÄDA BHÄSHYA—CHAP. VI.
SECTION (11)`), interleaved page numbers, OCR garble, and Jha's stray
diacritical/spelling drift were **preserved verbatim**.

### Source ranges (line numbers in `jha_padarthadharmasamgraha.en.txt`)

| N   | Commentary lines  |
|-----|-------------------|
| 138 | 27673–27749       |
| 139 | 27757–27759       |
| 140 | 27763–27765       |
| 141 | (none — skipped)  |
| 142 | 27780–27783       |
| 143 | 27925–28025       |
| 144 | 28069–28136       |
| 145 | 28202–28306       |
| 146 | 28335–28363       |
| 147 | 28428–28483       |
| 148 | 28503–28538       |
| 149 | 28564–28605       |
| 150 | 28647–28692       |
| 151 | 28708–28730       |
| 152 | 28751–28774       |
| 153 | 28837–28944       |

## Field decisions

- **`sa_devanagari`** and **`sa_iast`** — both `""` per user instruction.
  No Devanagari recovery this pass. The schema (`src/lib/schema.ts`) admits
  empty `sa_devanagari` for Nyāyakandalī ingested-from-Jha records.
- **`literal_en`** — verbatim Commentary text from Jha's printed edition,
  including OCR garble (`PRAQASTAPÄDA`, `r&buunds`, `paraerouB`, `eorporeal`,
  `Bhäsya`, `samavaya` variants, `Saroaväya` etc.) and Jha's own 1916 typos
  (`Cooscious`, `accompained`, `r&bouud`, `r&buunds`, `paraerouB`,
  `relaionxkip`). Page-break artefacts (e.g. `April-June 1914.`, `Vol. XXXVI.`,
  bare page numbers like `618`, running heads `ACTION.` and
  `PRACASTAPÄDA BHÄSHYA—CHAP. VI. SECTION (11)`) are preserved in-line — this
  is by design so the śāstrika can compare verbatim against the printed PDF.
- **`ml_draft`** — *maṇipravāḷam*-conscious Malayalam. Termini stay Sanskrit
  in Malayalam script per the user-supplied glossary, glossed in surrounding
  prose where helpful. `generated_at`: `2026-05-16T00:00:00Z`. `reviewed_by` /
  `reviewed_at`: `null`.
- **`en_simple_draft`** — accessible English alongside Jha. Termini technici
  appear as italicised Sanskrit with parenthetical or appositive gloss. Style:
  `traditional-simple`. `reviewed_by` / `reviewed_at`: `null`.

## How the five karmas were handled

The five karmas (*utkṣepaṇa*, *avakṣepaṇa* / *apakṣepaṇa*, *ākuñcana*,
*prasāraṇa*, *gamana*) and the two related technical terms (*abhighāta*
'striking', *nodana* 'impulse / impulsion') are **never translated** in either
draft. They appear:

- In `ml_draft` as `ഉത്ക്ഷേപണം`, `അവക്ഷേപണം`, `ആകുഞ്ചനം`, `പ്രസാരണം`,
  `ഗമനം`, `അഭിഘാതം`, `നോദനം` — the Sanskrit term written in Malayalam
  script, with the contextual gloss in surrounding prose where the reader
  first meets it.
- In `en_simple_draft` as italicised `*utkṣepaṇa*`, `*avakṣepaṇa*` (with a
  note in record 140 that Jha's printed text reads *avakṣepaṇa*; the
  alternate spelling *apakṣepaṇa* appears in the prior bhāṣya record
  `pp.karma.140`), `*ākuñcana*`, `*prasāraṇa*`, `*gamana*`, `*abhighāta*`,
  `*nodana*`. The natural-English gloss ('throwing upward', 'striking',
  'impulse') appears only as an aid on first introduction or in quoted
  Jha-style phrasings; it never replaces the Sanskrit term.

## How modern-physics framings were avoided in `en_simple_draft`

The karma chapter is the classical site of partial physical analogy
(impulse, momentum, projectile motion, elasticity, the bow-and-arrow
sequence, rebound, flowing-water dynamics, the potter's wheel). Per the
ingestion brief and vision Part XI, no modern-physics bridge framing was
introduced. Specifically:

- **`saṃskāra` / `vega`** is rendered consistently as `*saṃskāra* (in the
  form of *vega*)` and never glossed as 'momentum', 'kinetic energy',
  'inertia', 'impulse-momentum' or the like — even where Jha's English
  itself reads 'momentum' (this is preserved verbatim only inside the
  verbatim Jha translation when quoted in `literal_en`; the `en_simple_draft`
  for records 145–147 stays inside the Vaiśeṣika categories).
- **`nodana`** is rendered as *nodana* with the parenthetical gloss
  '(impulse)' or '(impulsion)' — the bhāṣya's own characterisation — not
  reified as Newton-style impulse `F·Δt`.
- **`abhighāta`** is rendered as *abhighāta* ('striking' / 'thumping'),
  never as 'collision-force' or 'impact'.
- **The bow-and-arrow sequence (Text 147)** is described entirely in
  *prayatna* / *saṃyoga* / *vibhāga* / *saṃskāra* / *vega* / *gurutva*
  vocabulary; phrases like 'elastic restoring force', 'spring potential
  energy', 'Hooke's law', or 'kinetic energy of the arrow' are not used.
  *Sthitisthāpaka* (the elasticity-quality of the bow) is **not even
  introduced** in this chapter — it is a *guṇa*-chapter concept and a
  separate *prashastapada* record covers it.
- **The flowing-water passage (Text 150)** stays with *dravatva*,
  *saṃyoga*, *vibhāga*, *avayava*, *avayavin*, *saṃyukta-saṃyoga*. No
  appeal to viscosity, Bernoulli, surface tension, or fluid dynamics.
- **The wheel passage (Text 151)** stays with *avayavin*-level *saṃyoga* and
  *saṃskāra*; no appeal to angular momentum, torque, or rotational
  kinematics.
- **The breathing / out-going / in-coming passages (Texts 152, 153)** are
  described with *prayatna*, *jīvana-pūrvaka prayatna*, *manas–ātman
  saṃyoga*, *dharma–adharma*, *adṛṣṭa*, *ātivāhika śarīra*, *vāsanā*,
  *paramāṇu*. No appeal to neuroscience of respiration, NDE-style framings,
  or modern cosmogony in the *paramāṇu-karma* at sarga.

The disanalogy panel (vision Part XI) is the responsibility of the
concept-node bridge layer, not these source-passage drafts.

## Concerns / known gaps

1. **Devanagari unrecovered.** Per the user instruction, both `sa_devanagari`
   and `sa_iast` are empty across all 15 records. Recovery requires a Phase
   B pass (GRETIL or a tesseract Devanagari run); the *Nyāyakandalī* is in
   sandhi-prose and its IAST/Devanagari pass should be undertaken with a
   śāstrika.
2. **OCR garble preserved.** Numerous OCR artefacts are carried verbatim in
   `literal_en`: e.g. `Cooscious` (record 143), `r&bouud` /
   `r&buunds` / `rebouned` (145, 147), `paraerouB`, `relaionxkip`,
   `Saroaväya` ↔ `Samaväya` ↔ `Säraavaya`, `aattd` for *sattā*, `Sage`
   (for "*siddhāntin*"), `siddhänti` (143-area), `Bhäsya` / `Bhäshya`,
   `Akäca` / `Akäsa` for *ākāśa*, `dharma-adharma` versus `dharma and
   adharma`, capitalised `'Atmd'` / `'iftmä/` for *ātman*. Page-break
   artefacts (`PRAQASTAPÄDA BHÄSHYA—CHAP. VI. SECTION (11)`, bare page
   numbers, `April-June 1914.`, `Vol. XXXVI.`) sit inside `literal_en` as
   they appear in the OCR text.
3. **Text 141 has no own Commentary block** in the PDF text layer; the
   `Commentary.` marker at line 27780 belongs to Text 142 by content (it
   discusses *prasāraṇa* as the converse of *ākuñcana*). Skipped per the
   ingestion rule; flagged here.
4. **Text 142 Commentary is a single sentence (~30 words)** and treats
   only *prasāraṇa* (not *ākuñcana*). It is a complete record on its own,
   but the śāstrika should review whether Text 141 deserves a stub
   record citing the shared commentary block.
5. **Multiple-Commentary-block concatenation was not needed** for any of
   these 15 records; each Text marker is followed by exactly one
   `Commentary.` block before the next `Text (M):`.
6. **No modern-physics framings inserted** in `en_simple_draft` (see above);
   the prior `prashastapada/karma.json` raised this concern and a
   śāstrika review is pending. These Nyāyakandalī drafts stay strictly
   within Vaiśeṣika categories.
7. **Jha's English typos preserved.** E.g. `propuced`, `bach` for `back`,
   `oo` for `on`, `oo<t` for `not`, `mast` for `must`, `dec` for `&c.`
   The śāstrika should reconcile against the printed Chaukhambha 1982
   reprint at Phase B.
8. **`reviewed_by` and `reviewed_at` are `null` on every rendering.** No
   draft is marked verified or reviewed. No concept node is bound to these
   passages yet; Phase B printed-edition cross-check is required before
   any `published_*` transition.

## Validation

`npm install` then `npm run validate:content` — passes. Source-passage
total: **175** (was 160 before this commit; +15 new Nyāyakandalī
karma records).

## Branch

`worktree-agent-ab43fca1e0ab4abd9`
