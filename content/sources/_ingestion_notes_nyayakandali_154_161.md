# Ingestion notes — Nyāyakandalī, Texts 154–161 (sāmānya, viśeṣa, samavāya)

Status: **drafts only, unreviewed.** This pass introduces eight new
`SourcePassage` records under `text_key: "nyayakandali"`, covering
Śrīdhara's *Nyāyakandalī* commentary on Praśastapāda Texts 154–161 —
the closing chapters on *sāmānya* (Community), *viśeṣa* (Ultimate
Individuality) and *samavāya* (Inherence). Per the brief, this pass is
the closing tranche of the Phase-A Nyāyakandalī ingestion drawn from
Gaṅgānātha Jhā's printed translation (Allahabad 1916).

## Source

- Local PDF text layer:
  `content/sources/_reference/jha_pdf/jha_padarthadharmasamgraha.en.txt`
  (extraction protocol documented in
  `content/sources/_reference/jha_pdf/NOTICE.md`).
- Jhā's translation is public domain (Jhā d. 1941); the Chaukhambha
  1982 reprint adds no new copyrightable content.

## Files written

| Path | Records | Texts |
| ---- | ------- | ----- |
| `content/sources/nyayakandali/samanya.json`  | 2 | 154, 155 |
| `content/sources/nyayakandali/vishesha.json` | 1 | 156      |
| `content/sources/nyayakandali/samavaya.json` | 5 | 157, 158, 159, 160, 161 |

`samavaya.json` previously existed as an empty array `[]` (foundation
pass). It was replaced wholesale with the array of five records below.

## Record shape

Per the brief and per `src/lib/schema.ts`:

- `id`: `nk.<chapter-slug>.<N>` (e.g. `nk.samavaya.161`).
- `text_key`: `"nyayakandali"`.
- `locator`: `gloss.<chapter-slug>.<N>` (e.g. `gloss.samavaya.161`).
- `sa_devanagari`: `""` (per user instruction — no Sanskrit work this pass).
- `sa_iast`: `""` (per user instruction).
- `literal_en`: **verbatim** Jhā commentary from the PDF, OCR garble
  preserved. Each block runs from the `Commentary.` (or `Commentary`)
  marker that follows the corresponding `Text (N):` block, up to the
  next `Text (M):` marker or chapter heading.
- `ml_draft` and `en_simple_draft`: AI-drafted renderings (this pass);
  `reviewed_by`/`reviewed_at` are `null`.

## Extraction lines (for re-verification against the PDF text)

The Commentary blocks were sliced from
`jha_padarthadharmasamgraha.en.txt` at these inclusive line ranges:

| Text | Lines        | Bytes (rstripped) |
| ---- | ------------ | ----------------- |
| 154  | 29025–29128  | 5348              |
| 155  | 29157–29664  | 28594             |
| 156  | 29733–29813  | 4504              |
| 157  | 29847–29891  | 2317              |
| 158  | 29899–29925  | 1220              |
| 159  | 29941–29968  | 1657              |
| 160  | 30002–30061  | 3455              |
| 161  | 30107–30202  | 4557              |

For each block, the upper bound trims away the next `Text (M):` marker
*and* the chapter heading (`CHAPTER VIII.`, `CHAPTER IX.`) where one
intervenes; the running running-header and page-number lines that
fall *inside* the Commentary block (`PAR<garbled>ASTAPÄDA BHÄSHYA—CHAP.
VII.`, `654`, `INHERENCE.`, `Page 326]`, etc.) are preserved verbatim
as the OCR delivered them. This follows the
`content/sources/README.md` Phase-A instruction: "Wisdomlib's known
issues … are preserved verbatim rather than silently corrected, so a
śāstrika can compare against the printed edition before flipping any
flag." The same principle applies to Jhā's printed text via its OCR
layer.

## Texts skipped

None. Each of Texts 154–161 carries a Commentary block in Jhā's
printed edition, and all eight were ingested. (The brief noted: "Skip
Texts without Commentary; note in log." — nothing was skipped.)

## OCR garble — preserved verbatim, sample inventory

A non-exhaustive list of OCR artefacts left intact in `literal_en`
(śāstrika please flag for Phase-B clean-up):

- Text 154: `li&heswara` (Maheśvara); `cau«e8` (causes); `<fcc.` for
  `&c.`; `<&?.` for `&c.`; `inanntr` for `manner`; `Throtving` for
  `Throwing`; `Sämänya` / `Vigetha` / `Vigesha` for *sāmānya* /
  *viśeṣa*; `tp` for `to`.
- Text 155: `Pag6 315.` (page header garbled); `congnisable` for
  `cognisable`; `mbe` for `be` (mid-word noise); `dec, de.` for `&c,
  &c.`; `congnitions` / `cogoitions`; `« no» right; that w.tiich»`
  surrounding-quote noise; `coro» prehensive`; long Bauddha
  block reproduces Kumārila Bhaṭṭa quoted in OCR-degraded form.
- Text 156: `Reverence, to the Wearer of Five Faces who is free from
  five-foidnes8` (Five-Foldness); `aregressus` for `a regressus`; `bhown
  above <` (truncation artefact at line-end); `tiicir` for `their`.
- Text 157: `Reverence to £iva` (Śiva); `<fcc., <&?.` for `&c., &c.`;
  `samavdya or 'inherence'` (single quote loss); `Ä8 for instance`
  (umlaut artefact for `As`); `infchefollowing` (joined words);
  `pit.'` retained from Jhā (printed edition reads `pit`; the
  Sanskrit is *kuṇḍa* = pot — flagged in
  `_ingestion_notes_samavaya_drafts.md` already).
- Text 158: `doth` for `cloth`; `Ioherence` / `snbsits` /
  `snbsists` mid-OCR substitutions.
- Text 159: `sacb` for `such`; `mäuner` for `manner`; `Dotions`
  for `notions`.
- Text 160: `sefese` for `sense`; `April—Jane, 1915, VoL X X X V I I .`
  (a running periodical header from the *Pandit* serialisation,
  literally interrupting the Commentary text — left in place);
  `cootained`; `manifestibiiifcy` for `manifestibility`; `actioas`
  for `actions`.
- Text 161: `Evev though` (Even though); `fin<i` for `find`;
  `transient»,` (stray punctuation); `diftierent` for `different`;
  `bhown` for `shown`; `eoüstiiate` for `constitute`; `heuce luherence
  u not destroyed`; `Vithout` for `without`; `Nydyakatdali` /
  `Nyayakaodaii` / `Nydyakandali` variants for *Nyāyakandalī*;
  `Bhüri^rski` for *Bhūriśreṣṭi*; `y.idhara` for *Śrīdhara*;
  `Qridhara` for *Śrīdhara*; `RädhcL` for *Rāḍhā*; `Brähmanas`,
  `oomposed`, `inbabitted` etc.

A śāstrika doing Phase-B verification will need the printed page
in hand for each of these. The OCR artefacts are not "errors" of
this corpus — they are the inherited fingerprint of the OCR layer
and must remain inspectable.

## Bhūriśreṣṭi closing — special handling

Text 161 in Jhā's printing has the unusual structure: the bhāṣya's
closing benediction to Kaṇāda ("All reverence to that Kaṇāda…") and
the bhāṣya colophon ("Thus ends the Padartha-dharmasangraha of
Pragastapada.") appear in the middle of Praśastapāda's *literal_en*
block (which we do not author here — already drafted in
`content/sources/prashastapada/samavaya.json#pp.samavaya.5`). The
*Commentary* block for Text 161 then begins with the answer to the
eternity-question, runs through the *atīndriyatva* and *iha-buddhi-
anumeyatva* arguments, then transitions (via "This commentary, the
Nydyakatdali…") into Śrīdhara's autobiographical closing verses — the
**Bhūriśreṣṭi passage** — and finally the colophon noting the *Śaka
913* (≈ 991 CE) composition date and the patron *Paṇḍudāsa*.

The brief is explicit: "Capture it all." The `literal_en` for
`nk.samavaya.161` runs from `Commentary` (line 30107) through the
final colophon line (`composed by Bhatta Qridhara» at the request of
£ri Pandudäsa.`, line 30202). The block therefore contains, in order:

1. The argument for *samavāya*'s eternity.
2. The *pūrvapakṣa* and reply on the subsistence-relation regress
   (resolved by *svātma-vṛtti*).
3. The argument for *samavāya*'s imperceptibility and the closing
   summary ("the coherence of distinct substances … sets aside
   independence").
4. The opening simile of the verses (*Nyāyakandalī* as Meru's golden
   peaks).
5. Śrīdhara's lineage: the unnamed *moon-on-earth* Brāhmaṇa →
   Baladeva → wife Abhukā → Śrīdhara himself, with the puns on
   *Śrīdhara* as a tree.
6. The *Śaka 913* date and the patron *Paṇḍudāsa* dedication.

The `ml_draft` and `en_simple_draft` separate the philosophical
section from the autobiographical verses with `*** ***` to flag the
register shift for downstream UI; the bracketed heading "Śrīdhara's
autobiographical closing verses — the Bhūriśreṣṭi passage" makes the
transition explicit in the simple-English draft.

## Terminology decisions for *samavāya* (MVP target)

The brief flagged *samavāya* as the MVP target and asked for "extra
care" with its terminology, matching the register of
`content/sources/prashastapada/samavaya.json`. The terminology table
established by the prior pass
(`content/sources/_ingestion_notes_samavaya_drafts.md`) is honoured
verbatim. Specific decisions for this commentary tranche:

- *samavāya*: **never** glossed in `ml_draft`. Rendered as `സമവായം`
  and treated as fully naturalised. The English draft uses italicised
  *samavāya* throughout.
- *ayutasiddha*: `അയുതസിദ്ധം` with parenthetical "(പരസ്പരം വേർപെടാത്ത)"
  gloss on first occurrence per Text. On Text 161's *aviṣvagbhāva*
  argument the gloss is repeated since the line is high-information.
- *iha-pratyaya* / *iha idam* / *ihedam*: rendered as `ഇഹ-പ്രത്യയം`
  or quoted `'ഇഹ' എന്ന പ്രത്യയം` per rhythm; the cognition-content is
  glossed as `'ഇതില്‍ ഇത് ഉണ്ട്'` on first occurrence.
- *ādhāra-ādheya* / *ādhārya-ādhāra*: kept Sanskrit (`ആധാര-ആധേയ` for
  the discursive *niyama* argument in Text 160, `ആധാര്യ-ആധാരഭാവം` as
  a compound-name in Text 157). Gloss `(ആധാരം ഏതാണ് ആധേയം ഏതാണ്
  എന്നതിന് നിയമം)` on first introduction.
- *aviṣvagbhāva* (Text 157): `അവിഷ്വഗ്ഭാവം` with discursive gloss
  "(വേർപെടാത്ത ഏകീഭാവം)" / "non-divergent togetherness." Same wording
  as the prior Praśastapāda samavāya pass.
- *vyaṅgya-vyañjaka-śakti* (Text 160): `വ്യങ്ഗ്യ-വ്യഞ്ജക-സാമർത്ഥ്യം`
  with the gloss "(പ്രകടിപ്പിക്കാന്‍ കഴിയുന്നതും പ്രകടിപ്പിക്കുന്നതും ആകാനുള്ള
  സാമർത്ഥ്യങ്ങളിലെ വ്യത്യാസം)". This is intentionally identical to
  the prior pass — śāstrika reviewer should compare both occurrences.
- *svātma-vṛtti* (Text 161): `സ്വാത്മ-വൃത്തി` (kept Sanskrit). This
  is the doctrinal payoff of Text 161 — *samavāya* subsists by being
  itself the very relation; the term is left bare in Malayalam.
- *atīndriya* (Text 161): `അതീന്ദ്രിയം` (kept bare, established
  earlier in the corpus).
- *iha-buddhi-anumeya* (Text 161): `ഇഹ-ബുദ്ധ്യനുമേയം` with the
  parenthetical-clause translation in surrounding prose.
- *padārtha-saṅkara* (Text 160): `പദാർത്ഥ-സങ്കരം` with gloss
  "(പദാർത്ഥങ്ങള്‍ കൂടിക്കലരുന്ന ദോഷം)".
- *anvaya-vyatireka* (Text 160): `അന്വയം`/`വ്യതിരേകം` with the
  parenthetical "(ഉള്ളയിടത്ത് ഉണ്ടാകുന്നതും ഇല്ലാത്തിടത്ത് ഇല്ലാത്തതും)"
  gloss inline where appearing for the first time.
- *upādāna-kāraṇa* (Text 161): `ഉപാദാന-കാരണം` with the discursive
  English gloss "(material cause)" inline.

## sāmānya / viśeṣa terminology

Texts 154–156 share the same register principle: Sanskrit *termini
technici* in Devanagari-Malayalam script with first-occurrence
glosses, never replaced. New terms introduced this pass:

- *para-sāmānya* / *apara-sāmānya*: `പര-സാമാന്യം` / `അപര-സാമാന്യം`
  (kept Sanskrit; the gloss "Higher Community" / "Lower Community"
  goes only in the English draft and only at first introduction).
- *sattā* / *bhāva*: `സത്ത` / `ഭാവം` — cross-glossed as `സത്ത
  (ഭാവം)` on first introduction (already established in the
  Praśastapāda pass).
- *dravyatva* / *guṇatva* / *karmatva* / *gotva* / *ghaṭatva* /
  *paṭatva*: kept Sanskrit (`-ത്വം` ending preserved). English draft
  uses italicised Sanskrit + "(substance-ness)" / "(cow-ness)" /
  "(jar-ness)" / "(cloth-ness)" gloss on first occurrence.
- *vyañjaka-kāraṇa* / *manifesting cause* (Text 155): rendered
  `വ്യഞ്ജക-കാരണം` with gloss "(പ്രകടിപ്പിക്കുന്ന കാരണം)".
- *svalakṣaṇa* (Text 155, Bauddha argument): `സ്വലക്ഷണം` with the
  discursive gloss "specific-particular" / "വ്യാവൃത്ത-സർവം" in
  context.
- *apoha* (Text 155): `അപോഹം` retained as a Bauddha technical term;
  English draft uses italicised *apoha* with the "negation of the
  contrary" gloss.
- *antya-viśeṣa* (Text 156): `അന്ത്യ-വിശേഷം` (kept Sanskrit).
- *pratyabhijñā* (Texts 154, 156): `പ്രത്യഭിജ്ഞ` (kept Sanskrit; the
  English draft uses italicised *pratyabhijñā* with the inline
  "(recognition)" gloss).
- *paramāṇu* (Text 156): `പരമാണു` (kept Sanskrit, already established
  earlier in the corpus).

## Length notes

- Text 155's commentary is by far the longest in this tranche
  (~28.6 KB of `literal_en`) because Śrīdhara devotes the entire
  section to an extended defence of *sāmānya* as a positive
  *padārtha* against the Bauddha *apoha-vāda*, with substantial
  quoted material from Dignāga / Dharmakīrti-style opponents and
  a citation of Kumārila Bhaṭṭa's *Ślokavārtika* (the *Apoha*
  chapter). The `ml_draft` and `en_simple_draft` are *not*
  paragraph-by-paragraph translations of this 28 KB; they are
  faithful structural summaries that preserve the dialectic in
  sequence (objection → reply → counter-reply → reply) and the
  argument-types (no-unity-from-cause, no-unity-from-effect,
  apoha-as-positive, apoha-as-negative, Kumārila citation,
  *loka-vyavahāra* closing). A śāstrika should expand these
  drafts where the argument compression elides a move that the
  pedagogy needs to surface.
- Text 161's `literal_en` includes the autobiographical verses
  intact. The drafts mark the register shift with `*** ***` and
  preserve the proper names *Bhūriśreṣṭi*, *Baladeva*, *Abhukā*,
  *Śrīdhara*, *Paṇḍudāsa*, *Rāḍhā* with normalised diacritics in
  the English draft; the Malayalam draft uses the Devanāgarī-
  Malayalam script forms `ഭൂരിശ്രേഷ്ഠി`, `ബലദേവന്‍`, `അഭുകാ`,
  `ശ്രീധരന്‍`, `പണ്ഡുദാസന്‍`, `രാഢ`.

## Lowest-confidence drafts (śāstrika please review these first)

1. **Text 155 ml_draft and en_simple_draft of the *apoha* polemic**.
   The dialectic is dense (Bauddha opens; Naiyāyika replies; Bauddha
   counter-replies with the four-and-a-half-fold *ardhapañcamākāra*
   reasoning; Naiyāyika devastates with the Kumārila citation). My
   compression keeps every reply but flattens some of the inner
   recursion. A śāstrika should compare against the Devanāgarī text
   when it becomes available (no Devanāgarī this pass) and expand
   where the move-sequence is pedagogically important.
2. **Text 161 ml_draft / en_simple_draft of *svātma-vṛtti***. The
   doctrine — *samavāya* subsists by being itself of the nature of
   relation, hence requires no further relation — is the doctrinal
   payoff of the entire *padārtha*. My English gloss "of the very
   nature of subsisting-relation (*svātma-vṛtti*)" follows Jhā's
   "itself of the nature of relation or subsistence." A śāstrika
   should fix the Malayalam phrasing in particular; my rendering
   `സ്വയം സംബന്ധ-സ്വരൂപം (സ്വാത്മ-വൃത്തി)` is faithful but a more
   technical hand may want `സ്വാത്മ-വൃത്തി-സ്വരൂപം` or similar.
3. **Text 161 Bhūriśreṣṭi verses, Malayalam register**. I rendered
   these in the same maṇipravāḷam-conscious register as the
   philosophical body, with Sanskrit proper nouns preserved in
   Malayalam script. A traditionally trained Malayalam editor may
   prefer either (a) a higher *kāvya*-register Malayalam translation
   of the verses, or (b) leaving the verses entirely in Sanskrit
   transliteration. I chose the middle path; either of (a)/(b) is
   a small follow-up edit.
4. **Text 156, "*svatas* / self-differentiation of *viśeṣas*"**.
   Jhā renders the *pūrvapakṣa* in surface English; the Sanskrit
   contrast is between *anya-bheda-ka* (differentiation requiring
   another) and *svato-bheda-ka* (self-differentiating). My
   Malayalam draft uses `സ്വയം-വ്യാവർത്തന-സാമർത്ഥ്യം` for the
   *svato-bheda-ka* concept; a śāstrika should confirm the gloss.
5. **Text 154, "*anuvṛtti-pratyaya* vs *vyāvṛtti-pratyaya*"** in
   the higher-vs-lower *sāmānya* discussion. I have rendered
   "inclusive cognition" → `അനുവൃത്തി-ബുദ്ധി` and "exclusive
   cognition" → `വ്യാവൃത്തി-ബുദ്ധി`. These are technically correct;
   the alternative renderings *samānākāra-pratyaya* / *vyāvartaka-
   pratyaya* are also defensible and a śāstrika may prefer them.

## Verification

- `npm install` ran cleanly.
- `npm run validate:content` post-edit:
  ```
  — Source passages —
    validated: 168
  Content OK.
  ```
  (Previously 160 passages; +8 from this pass: 2 sāmānya + 1 viśeṣa
  + 5 samavāya. The schema accepts the new records with
  `sa_devanagari: ""` and `sa_iast: ""` per the Phase-A relaxation
  recorded in `src/lib/schema.ts` line 229.)

## Out of scope (HARD constraints honoured)

- `sa_devanagari` and `sa_iast` are **empty strings** on every new
  record (user instruction this pass).
- No `reviewed_by` / `reviewed_at` flag was flipped.
- No translation of *termini technici* (vision Part I, commitment 4).
- No files touched other than the four deliverable paths.
- No schema / docs / concept-node / other-agent edits.

## Branch

`worktree-agent-a546808594af8c004` — pushed to remote.
