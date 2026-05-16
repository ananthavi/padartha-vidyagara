# Nyāyakandalī ingestion — Guṇa deferred ranges (Phase A close-out)

## Identification

- **Source edition (LOCAL):** `content/sources/_reference/jha_pdf/jha_padarthadharmasamgraha.en.txt`
  (Mahāmahopādhyāya Gaṅgānātha Jhā, *Padārthadharmasaṃgraha of Praśastapāda
  with the Nyāyakandalī of Śrīdhara*, Allahabad 1916; Chaukhambha reprint
  1982; public domain — Jha d. 1941). Phase A sanctioned per
  `content/sources/README.md`.
- **Output file:** `content/sources/nyayakandali/guna-part-4.json` (new) —
  a single twelve-record file holding all ranges deferred by the three
  prior guṇa-chapter agents.
- **Why a new file and not appending to `guna-part-1/2/3.json`:** the
  brief explicitly forbids touching the existing three files. Their
  canonical merged forms live on `padartha-vidyagara`; appending here
  would create a merge conflict. The locator scheme is otherwise
  identical to those files (`gloss.guna.<N>`), so a future pass can
  trivially fold these twelve records back into the per-third splits
  if desired.

## Records emitted (twelve, in numeric order)

| ID            | Locator           | Origin range and prior agent             |
|---------------|-------------------|------------------------------------------|
| `nk.guna.76`  | `gloss.guna.76`   | Deferred by agent C (`guna-part-1.json`) |
| `nk.guna.77`  | `gloss.guna.77`   | Deferred by agent C (`guna-part-1.json`) |
| `nk.guna.103` | `gloss.guna.103`  | Deferred by agent D (`guna-part-2.json`) |
| `nk.guna.104` | `gloss.guna.104`  | Deferred by agent D                      |
| `nk.guna.105` | `gloss.guna.105`  | Deferred by agent D                      |
| `nk.guna.106` | `gloss.guna.106`  | Deferred by agent D                      |
| `nk.guna.107` | `gloss.guna.107`  | Deferred by agent D                      |
| `nk.guna.133` | `gloss.guna.133`  | Deferred by agent E (`guna-part-3.json`) |
| `nk.guna.134` | `gloss.guna.134`  | Deferred by agent E                      |
| `nk.guna.135` | `gloss.guna.135`  | Deferred by agent E                      |
| `nk.guna.136` | `gloss.guna.136`  | Deferred by agent E                      |
| `nk.guna.137` | `gloss.guna.137`  | Deferred by agent E (chapter colophon)   |

## Per-Text source-line ranges (1-based, PDF text-layer)

`literal_en` is the verbatim run from "commentary first line" through
"end (exclusive)" — i.e. up to but not including the line that opens
the next `Text (N+1):` marker (or, for Text 137, up to and including
the closing colophon `Thus ends* the chapter on (Qualities.` at line
27647, with the `CHAPTER XI.` line at 27648 excluded).

| Text | Marker line | Commentary first line | End (excl.) | literal_en chars |
|------|-------------|------------------------|-------------|-------------------|
| 76   | 10440       | 10443                  | 10446       | 152               |
| 77   | 10446       | 10451                  | 10455       | 213               |
| 103  | 20714       | 20721                  | 20746       | 1 448             |
| 104  | 20746       | 20802                  | 21369       | 30 396            |
| 105  | 21369       | 21389                  | 22046       | 36 758            |
| 106  | 22046       | 22052                  | 22067       | 852               |
| 107  | 22067       | 22079                  | 22274       | 10 594            |
| 133  | 26403       | 26508                  | 26989       | 26 583            |
| 134  | 26989       | 27000                  | 27017       | 797               |
| 135  | 27017       | 27042                  | 27077       | 2 024             |
| 136  | 27077       | 27104                  | 27484       | 21 111            |
| 137  | 27484       | 27536                  | 27648       | 6 232             |

Notes on marker variants:

- Text 76: marker prints cleanly as `Text (76):` at line 10440.
- Text 77: marker prints as `Text (77);` (semicolon) at line 10446.
- Text 103–107: all five markers print with the expected `Text (N):`
  / `Text (N).` form (Text 107: `Text (107).`).
- Text 108 marker (used as the end-bound for Text 107's commentary)
  is OCR'd as `[Page 223] Text {IDS) :` at line 22274 — `{IDS}` is the
  OCR's garble of `(108)`, confirmed by surrounding context and the
  matching entry in `nyayakandali/guna-part-3.json` (`nk.guna.108`,
  whose `literal_en` begins identically).
- Text 133: marker prints as `Text (133).—` at line 26403.
- Text 134–137: markers print cleanly.
- The Text 137 block carries the *guṇa-padārtha* chapter colophon
  `Thus ends* the chapter on (Qualities.` (line 27647); this is
  preserved as the closing line of `nk.guna.137.literal_en`. Chapter
  XI (`ON ACTIONS.`) begins at line 27649.

## Texts skipped

**None.** All twelve Texts in the three deferred ranges carry a
`Commentary.` block in the PDF text layer. (The agent-C log already
verified Texts 76, 77 carry usable commentary at lines 10443–10445
and 10451–10454 respectively; the agent-D log verified Texts 103–107;
the agent-E log verified Texts 133–137. This pass simply ingests them.)

## Extraction method

The `literal_en` payload for each record is the literal byte-range
between the lines noted above (newlines preserved, trailing whitespace
trimmed). No OCR substitution, no silent normalisation. Page-running
headers (`PRA<?ASTAPÄDA BHÄSHYA`, `QUALITIES : SIMILARITIES AND
DISSIMILARITIES`, page numbers, `SOUND.` in Text 137), bracketed page
markers (`[Page 205-]`, `[Page 215]`, `Page 274.`, etc.), and the
intermittent footnote text are kept inside `literal_en` exactly as the
PDF text-layer renders them — this matches the verbatim-preservation
policy adopted in `_ingestion_notes_nyayakandali_guna_78_107.md`
(§ "OCR quality concerns preserved verbatim") and
`_ingestion_notes_nyayakandali_guna_108_137.md`
(§ "Extraction method").

## Verbatim sample (Text 76, full `literal_en`)

> Qualities other than those enumerated above extend over
> the whole of their substrates, and do not, like Conjunction etc.,
> exist in certain parts of them

(Lifted verbatim from the PDF text-layer at lines 10443–10445; this
is the entire `literal_en` for `nk.guna.76`.)

## Terminology decisions (`ml_draft`, `en_simple_draft`)

The task glossary was applied without deviation. All listed termini
stay Sanskrit in both drafts and are glossed in surrounding prose; they
are never translated. Specifically for this twelve-record close-out:

- **Extension-class** (Texts 76–77): *vyāpi-vṛtti*, *avyāpi-vṛtti*
  / *pradeśa-vṛtti*, *yāvad-dravya-bhāvitva*, *ayāvad-dravya-bhāvin*,
  *pākaja* / *apākaja*.
- **Inference closing-block** (Texts 103–107): the *hetv-ābhāsa* taxa
  (*aprasiddha*, *anapadeśa*, *asat* = *asiddha*, *sandigdha* =
  *anaikāntika*, *viruddha*, *asādhāraṇa*); *vyāpti*, *vyāpti-smṛti*,
  *pakṣa-dharmatā*, *sapakṣa-vṛtti*, *vipakṣa-vṛtti*, *liṅga*,
  *trairūpya*, *svārtha*- vs *parārtha-anumāna*, the five members
  *pratijñā / hetu (= apadeśa) / udāharaṇa (= nidarśana) / upanaya
  (= anusandhāna) / nigamana (= pratyāmnāya)*. The Bauddha
  *tādātmya–tadutpatti* doctrine of *vyāpti* (Dignāga / Dharmakīrti)
  surfaces in Text 104's commentary together with the *apoha* sub-
  debate; both are named in Sanskrit in the drafts. Text 105 carries
  the full *śabda-pramāṇa* reduction — *āpta-vacana*, *sāṅketika*
  *vyāpti*, *vāc-yavācaka*, *prāmāṇya* and the four
  *Sarvadarśanasaṃgraha* positions on its source (kept in their
  Sanskrit terms — *svataḥ / parataḥ prāmāṇya*). Text 106 names
  *ceṣṭā*. Text 107 carries *upamāna*, *upamiti*, *āpta*, *gavaya*,
  *sādṛśya*, *nāma-nāmi-sambandha*, and opens the segue into Text
  108's *arthāpatti* / *dṛṣṭārthāpatti* / *śrutārthāpatti*.
- **Closing *ātma-viśeṣa-guṇa* and *śabda* block** (Texts 133–137):
  *dharma*, *adharma*, *apūrva* (the Mīmāṃsaka posit, refuted),
  *yāga / sandeśa* as *upacāra*-extension of `dharma`, *yama* +
  *niyama* (Pātañjala enumeration), the four *varṇa*s and four
  *āśrama*s (kept Sanskrit), *pañca-mahāyajña*, *agnihotra*; the
  *kleśa* set (*avidyā, asmitā, rāga, dveṣa, abhiniveśa*), the
  *jñāna-karma-samuccaya-vāda*, *nitya / naimittika karma*,
  *jīvanmukti*, *videhamukti* / *mokṣa*; the Vedāntic counter-thesis
  *ānanda-svarūpa-ātman* (refuted by Śrīdhara); the *ātma-svarūpa-
  mātreṇa avasthāna* of `mokṣa`. For Text 137: *śabda*, *ākāśa*,
  *kṣaṇika*, *varṇātmaka / dhvanyātmaka śabda*, *ātma-manas-saṃyoga*,
  *prayatna*, *vāyu-kriyā*, the *vīcī-taraṅga-nyāya* (the
  water-ripple analogy), *śrotrendriya-śabda-sannikarṣa*.
- **Vedic ritual and scriptural categories** in Text 133 (*śruti* vs
  *smṛti*, *pakayajna*, *agnyādheya*, *haviryajña*, *agniṣṭoma*,
  *somayāga*, *gālīna* / *yāyāvara*, *vānaprastha*, *sannyāsin*,
  *vidyāvrata-snātaka*, *prājāpatya-yajña*) are all kept Sanskrit,
  with Jha's English glosses surfaced in `literal_en` and reflected
  in `en_simple_draft` only as parenthetical guides.

For all of the above the rule of the brief holds: never translate;
*sa-iast*-italicised Sanskrit + gloss in `en_simple_draft`; Malayalam-
script Sanskrit + Malayalam syntactic suffix in `ml_draft`.

## `ml_draft` / `en_simple_draft` scope

For the long Commentaries (Texts 104, 105, 133, 136) the drafts are
gist-summaries that touch the principal Naiyāyika / Vaiśeṣika position,
the named pūrvapakṣin(s), and the line of Śrīdhara's reply. For the
short Commentaries (Texts 76, 77, 103, 106, 134, 135) the drafts cover
the whole gloss. The drafts are explicitly provisional — the schema
will keep them out of the reading view until `reviewed_by` /
`reviewed_at` are populated, which they are not in this pass.

## Field-level constraints honoured

- `literal_en` is verbatim from the LOCAL PDF text-layer; no
  composition, no silent correction of OCR artefacts. Recognisable
  garbles (`Pag6 205-`, `Ttftt`, `apiJcajd`, `Akäca`, `Äkäca`,
  `Aklga`, `Dhatma`, `Adkarma`, `Mahäyänikas`, `tk*`, `BSÄSHTA`,
  `PRA<?ASTAPÄDA`, `Tvst`, `Throtving`, `Sarapräya`, `Twuti`,
  `Cish'd`, `Vidyä` / `Vidyd`, `vāc-yavācaka` printed mis-set, etc.)
  are preserved.
- `sa_devanagari` and `sa_iast` are `""` on every record, per the
  brief's HARD CONSTRAINT #2.
- No `reviewed_by` / `reviewed_at` was set: all draft renderings
  carry `null` / `null`, per HARD CONSTRAINT #4.
- Only `content/sources/nyayakandali/guna-part-4.json` (new) and this
  notes file were created; no other file in the repository was
  modified. (HARD CONSTRAINTS #5, #6, #7.)

## Validation

`npm install` (254 packages installed) followed by
`npm run validate:content` passes:

```
— Concept nodes —     validated: 1
— Source passages —   validated: 312
— Purvapaksa positions — validated: 0
Content OK.
```

The total source-passage count rises from 300 (after the prior three
guṇa-chapter passes plus the existing corpus) to 312 with this commit
(+12 records).

## Concerns / known gaps

1. **`sa_devanagari` and `sa_iast` are `""` throughout.** Per the
   brief's explicit instruction. Phase B (śāstrika verification)
   must populate these from a Sanskrit-original Nyāyakandalī edition
   (Kāśī Sanskrit Series or the Vārāṇasī printing) before any
   concept node binds these locators for `published_*`.
2. **OCR garble preserved verbatim** in `literal_en`. A Phase-B
   reviewer must reconcile each block character-by-character against
   the printed page before flipping `verified_by` / `verified_at` on
   any binding `SourceRef`.
3. **Texts 104, 105, 133, 136 are very long** — 30 396, 36 758,
   26 583, and 21 111 chars respectively. A future pass may wish to
   subdivide each into multiple finer-grained passages once concept
   nodes need to bind specific sub-arguments rather than the whole
   gloss. For now they are kept whole, matching the policy of
   `_ingestion_notes_nyayakandali_guna_108_137.md` for Text 132 (the
   long *sphoṭa* polemic was kept undivided).
4. **`guna-part-4.json` is a stop-gap layout.** Once the canonical
   merged `guna-part-1/2/3.json` files on `padartha-vidyagara` accept
   these twelve records, this file should be deleted and its twelve
   records folded back into the three sibling files at their natural
   positions (76, 77 into `guna-part-1.json`; 103–107 into
   `guna-part-2.json`; 133–137 into `guna-part-3.json`). The locator
   scheme (`gloss.guna.<N>`) is already identical, so the fold-in is
   purely a JSON-array re-position.
5. **Chapter colophon** (`iti praśastapādabhāṣye guṇapadārthaḥ`,
   printed in Jha's English as `Thus ends* the chapter on
   (Qualities.`) is captured inside `nk.guna.137.literal_en` as the
   closing line. It is therefore bound to the same locator as
   Text 137 (`gloss.guna.137`); a separate `gloss.guna.colophon`
   record was *not* created. If a future curator wants the colophon
   addressable on its own locator, it should be split off.
6. **Text 137's commentary contains a printed editorial interpolation
   notice**: `[ There fa an obvious Interpolation in the reading here,
   all the worda from tato* up to bdhiriti have no connection with the
   present context. J` (PDF lines 27615–27616). This too is preserved
   verbatim inside `nk.guna.137.literal_en`.

## Branch

`worktree-agent-a04eff1663eb293aa`
