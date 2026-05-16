# Ingestion notes — Nyāyakandalī "skipped" Texts revisit

Investigation of nine Texts that earlier ingestion passes flagged as having
no separable `Commentary.` block in Jha's PDF. The goal of this pass: open
each region, confirm or overturn the prior agent's call, and recover
records wherever the printed commentary is genuinely present in the OCR.

## Source

`content/sources/_reference/jha_pdf/jha_padarthadharmasamgraha.en.txt` —
the embedded-OCR text layer of Mahāmahopādhyāya Gaṅgānātha Jhā's edition
(Allahabad 1916; Chaukhambha 1982 reprint; Jha d. 1941, public domain).
Phase A sanction per `content/sources/README.md`.

## Disposition summary

| Text | Chapter | Prior status | This pass | Record? |
|-----:|---------|--------------|-----------|---------|
| 4    | enumeration-of-categories | wisdomlib pagination artefact | confirmed; no record possible | no |
| 6    | enumeration-of-categories | "no `Commentary.` marker before Text 7" | **recoverable** — marker absent but gloss unambiguously present | **yes** |
| 7    | enumeration-of-categories | same | **recoverable** — long *sāmānya* gloss, no marker but unambiguous | **yes** |
| 30   | sadharmya-vaidharmya | "no commentary block between Texts 30 and 31" | confirmed; no Śrīdhara gloss in this OCR | no |
| 48   | guna | "trapped in qualities-vs-substances broken table" | confirmed | no |
| 49   | guna | same | confirmed | no |
| 50   | guna | same | confirmed | no |
| 51   | guna | same | confirmed | no |
| 67   | guna | "PDF and prashastapada both skip this number" | confirmed | no |

**Records produced**: 2 (`nk.enumeration-of-categories.text-6`,
`nk.enumeration-of-categories.text-7`), written to
`content/sources/nyayakandali/_recovered.json`.

## Per-Text investigation

### Text 4 — wisdomlib pagination artefact (confirmed; no record)

- **Region examined**: prior agent's note at
  `content/sources/_ingestion_notes_text_4_resolution.md` and the surrounding
  `Text (3)` / `Text (5)` markers in the PDF.
- **Finding**: there is no `Text (4)` marker in this PDF at all (a `grep`
  for `Text.*[(\{].?4.?[)\}]` in the relevant pages returns nothing in
  the chapter II region). The wisdomlib split of Q+A across Texts 3 and 4
  is not present in Jha's print, so there is no separate Praśastapāda
  *bhāṣya* line for `(4)` and no Śrīdhara gloss on a non-existent line.
  The prior resolution stands.
- **Record produced?** No. This is the correct outcome.

### Text 6 — gloss present, marker absent (RECOVERED)

- **PDF line region examined**: 1121–1152 (mūla at 1121–1125; gloss at
  1131–1142 after a page header and bare `25`; editorial NOTES at
  1143–1152).
- **Finding**: prior agent skipped this Text because the OCR carries no
  `Commentary.` or any obvious mangle of it between `(I.-i-7).` (line
  1125) and the start of Śrīdhara's gloss (line 1131, beginning "The
  author divides Actions; and lays down their number AS five only.").
  However, the gloss content is unambiguously Śrīdhara's commentary on
  Text 6: it defends the five-fold enumeration of *karma*s against the
  objection that gyrating, evacuating, &c. should add to the count, by
  showing that all such named actions are *viśeṣa*s of *gamana*. This
  matches the printed Nyāyakandalī on the *karma*-pañcaka exactly.
- **Why the prior agent skipped**: a strict reading of the protocol
  ("if the next thing is another `Text (M):` … skip that Text gracefully")
  applied to a region where the `Commentary.` marker is simply missing
  from the OCR, not present-but-garbled. The body itself, however,
  is intact and recoverable.
- **Block end**: line 1152, immediately before `Text ( 7 )` on line 1153.
  NOTES (1)–(2), like the NOTES at the end of the Text 5 record in
  `enumeration-of-categories.json`, are kept inside `literal_en`.
- **Record produced?** Yes: `nk.enumeration-of-categories.text-6` in
  `_recovered.json`.

### Text 7 — gloss present, marker absent (RECOVERED)

- **PDF line region examined**: 1153–1368 (mūla at 1153–1163, gloss at
  1164–1368, ending immediately before `Text (8):` at line 1369).
- **Finding**: identical pattern to Text 6. No `Commentary.` marker
  appears in the OCR after `(I.-ii-l to 5).` (line 1163). The gloss
  begins at line 1164 with the unmistakable lead-in "The author
  proceeds to explain ' Generality ' (Sämänya):—". The block is one of
  Śrīdhara's most extended *sāmānya*-discussions in the early chapters:
  the *anuvṛtti*/*vyāvṛtti* characterisation, the *para-apara* split
  with *sattā* as the highest *sāmānya*, the *pramāṇa-sambandha*
  *pūrvapakṣa* (rejected on *anavasthā* and *anyonyāśraya* grounds),
  the cow-and-mustard objection on partial-vs-total similarity, the
  refutation of the *artha-kriyā-kāritva* theory of *sattā*, the
  *sad-viśeṣa* analysis of *dravyatva*/*guṇatva*/*karmatva*, the
  *brāhmaṇya*-parentage analogy and its women-and-chastity side-note,
  and the *gauṇa-vṛtti* etymological reading of *viśeṣa*. Editorial
  NOTES (1)–(5) on *sāmānya*/*jāti*/*upādhi*, etymology, *jāti-bādhaka*s,
  &c. are kept inside `literal_en` per the established convention.
- **Block end**: line 1368, immediately before `Text (8):` on line 1369.
- **Record produced?** Yes: `nk.enumeration-of-categories.text-7` in
  `_recovered.json`.

### Text 30 — genuinely uncommented (confirmed; no record)

- **PDF line region examined**: 2381–2424.
- **Finding**: Text 28 (line 2381) has a clear `Commentary.` block
  (lines 2383–2387). Text 29 (line 2388) has a clear `Commentary.`
  block (lines 2390–2396). Text 30 (line 2397, headed `Page 25-]
  Text (30) -.—`) lists the fourteen qualities common to Earth, Water,
  and the Souls. Text 31 (line 2401) follows immediately, with NO
  intervening `Commentary.` marker — neither clean nor garbled.
  At line 2408 the marker `COILHL eiA ar y.` (the garbled `Commentary.`
  noted by the earlier agent at this exact line in the
  `_ingestion_notes_nyayakandali_1_34.md` file) opens a gloss block
  that runs 2410–2415. That gloss reads "la as much as specific
  qualities in general belong to Earth &c, also, the author, with a
  view to preclude these, has added— 'such as exist only over certain
  parts of their .3/.'As trates!", which is unambiguously commentary
  on **Text 31**, not on Text 30 (Text 31 is the one that introduces
  the *kṣaṇika* + *pradeśa-vṛtti* restriction; Text 30 just enumerates
  the fourteen common qualities).
- The NOTE at lines 2417–2423 IS specifically about Text 30 ("Have the
  fourteen qualities :—The similarity here meint is only one in the
  number of qualities…"), but it is signed `1 KiU` — Udayana's
  *Kiraṇāvalī*, an editorial citation rather than Śrīdhara's
  Nyāyakandalī.
- **Conclusion**: in this OCR, Śrīdhara has genuinely passed over
  Text 30 without an independent gloss; what looks like commentary on
  it is in fact editorial Kiraṇāvalī material. Phase-B reviewers
  should still check the printed page (Jha's page 25, the column under
  the fourteen-quality list) to confirm Jha did not silently merge a
  one-line Śrīdhara remark into the surrounding gloss.
- **Record produced?** No.

### Texts 48, 49, 50, 51 — broken qualities-vs-substances table (confirmed; no records)

- **PDF line region examined**: 7810 (`Text (47)`) through 9950
  (`Text (53)`). The intervening ~2100 lines are the OCR-shattered
  qualities-vs-substances comparative table.
- **Finding**: a `grep` for any `Text` marker with `48`, `49`, `50`,
  or `51` in the relevant chapter returns nothing — every Text marker
  for these four numbers has been swallowed by the broken table.
  Spot-reads at lines 7822–7980 and 9900–9940 show the table in
  exactly the state the earlier agent described: one character per
  line ("C", "o", "l", "o", "u", "r"…) with blank separators. The
  Commentary on Text 47 itself is truncated at four lines (7813–7820)
  before the same table begins, ending mid-sentence with "all these
  except, f".
- The first readable Text after the table is `Text (5-2):—` at line
  9924 (`52` mis-OCR'd as `5-2`). Texts 48–51 cannot be located in
  any form, and any Commentary on them is also lost to the broken
  rasterisation.
- **Recovery prerequisite**: a fresh `tesseract --lang=eng+san` pass
  over the page images for Jha's pages ~218–227 (the qualities table
  region), with column-aware layout analysis, is the only practical
  path to recovering this material from the printed scan. That is out
  of scope for an OCR-text-only ingestion pass.
- **Records produced?** None. The prior call stands.

### Text 67 — number genuinely skipped in this edition (confirmed; no record)

- **PDF line region examined**: 10200–10262.
- **Finding**: there is no `Text (67)` marker in the PDF (a `grep` for
  `Text.*[(\{][^0-9]?6[6-8][^0-9]?[)\}]` returns only `Text {68):—`
  at line 10260). The bhāṣya line that the earlier agent treats as
  the Text-66 line — `Page 100 ] Conjunction, Disjunction, Number,
  Gravity,Fluidity, Hot touch, Knowledge, Virtue\ Vice and Faculty
  are productive of likes as well as unlihes.` — sits at line 10227,
  with no `Text (N):` header at all, and is followed immediately by
  `Commentary.` (line 10228) and a long *guṇa*-by-*guṇa* gloss
  (10230–10258) before Text 68 at line 10260.
- **Cross-check with `content/sources/prashastapada/guna.json`**:
  prior agents have noted that the prashastapada source also skips
  `pp.guna.67` — the numbering convention of this edition simply
  passes from 66 to 68. Creating `nk.guna.67` would have no
  corresponding mūla to bind against and would mis-locate the
  commentary that is already (or will be) carried under the Text-66
  / Text-68 records.
- **Record produced?** No.

## Patterns noticed (notes for future agents)

1. **Missing-marker glosses follow chapter or section breaks.** Both
   Text 6 and Text 7 are commentary blocks that start immediately after
   a page-header/page-number pair (`25` between Text 6's mūla and
   gloss; `26\n\nPRA(?ASTAPÄDA BHASHYA—CHAP. IX. SECTION (1).` in the
   middle of Text 7's gloss). Where Jha typeset a chapter or section
   change between mūla and gloss, the `Commentary.` line appears to
   have been absorbed into the page-header band by the OCR. Future
   agents encountering an apparent gloss-omission should check whether
   the printed page break sits between mūla and gloss, and read the
   first sentence of what follows the page-header — if it begins
   with "The author…", "He proceeds to…", or otherwise summarises
   the mūla's verb, the block IS commentary.
2. **Mangled markers vs. omitted markers.** The OCR sometimes leaves a
   marker mangled-but-detectable (`CommentaryThough`, `COILHL eiA ar y.`,
   `Comment aiy.`, `Commentaryj`, `CommentaryIntellect`) and sometimes
   omits the marker entirely. Both cases produce commentary; the
   strict "must have a visible marker" rule the earlier agent applied
   excludes the second case unnecessarily. The recovery protocol
   used here: when no marker is found, read forward; if the next prose
   is unambiguously a paraphrase of the *mūla* preceded by no other
   `Text (N):` line, treat it as the gloss.
3. **Editorial notes vs. Śrīdhara prose.** Blocks signed `KiU` or
   `[Y. V. Athalye]` or otherwise bracketed `[ ]` are editorial — Jha's
   notes or Athalye's commentary on Jha. The earlier agents have
   correctly absorbed these into `literal_en` when they fall inside a
   Commentary block (Texts 1, 5, 6, 19, 32 all show this pattern), but
   they should never on their own be the basis for creating a
   Nyāyakandalī record: if all that exists for a Text is editorial
   material, no `nk.*` record is warranted. Text 30 is the clearest
   example in this set.
4. **Genuinely uncommented Texts exist.** Text 30 (a simple list of
   fourteen qualities) and the absent Text 67 (a numbering gap in
   this edition) are real "no gloss" outcomes, not OCR failures.
   Future agents should not feel obligated to recover something for
   every numbered Text — the printed Nyāyakandalī genuinely passes
   over a few.
5. **The qualities-vs-substances table (Texts 48–51) is the only
   structural OCR loss in the Nyāyakandalī corpus so far.** Other
   "skipped" Texts in the agent record are recoverable on a re-read
   (Texts 6, 7) or genuinely uncommented (Texts 30, 67). The 48–51
   block is the one place where a fresh OCR pass is the right
   intervention; it is not worth pursuing in a text-only pipeline.

## Schema-relevant choices

- **`sa_devanagari` and `sa_iast` are both empty strings** per the
  current-pass instruction. Phase-B Devanagari recovery is deferred.
- **`ml_draft` is *maṇipravāḷam-conscious*** — *termini technici*
  carried in Sanskrit (Malayalam script), glossed in surrounding
  Malayalam prose, never translated. Same glossary the earlier
  Nyāyakandalī agents established.
- **`en_simple_draft`** keeps Sanskrit *termini technici* in
  italicised IAST alongside English prose. *Pūrvapakṣa*/*siddhānta*
  structure preserved explicitly.
- **OCR garble preserved verbatim** in `literal_en`. Notable
  artefacts in the recovered Text-7 block: `Sämänya` /
  `Sämänra` / `Sän/äuya` (multiple spellings of *sāmānya*),
  `Viceska` / `Viqisha` for *viśeṣa*, `Sucbstanee`, `S ibstane?`,
  `Q-ulity`, `A.ctiou`, `E irth`, `Baing`, `Substauce`,
  `Bicauss`, `Arthikriyälcäritva`, `Sätnänya` from chapter heading
  drift, page-header bleeds (`PRACASTAPÄDA BHÄSHYA-CHAP. II.
  SECTION (1).`), `Akkancia` for *akhaṇḍa*, `Sakhandu` for
  *sakhaṇḍa*, `npädhi` for *upādhi*, `Iffädhi`, `Xarutvatea` for
  *karutvatva*, `S<tmuvnyatva` for *sāmānyatva*.
- **No `reviewed_by` / `reviewed_at` populated.** AI drafts only.
- **`generated_by: "claude-agent-ingestion"`** and a single
  ISO timestamp for auditability.

## Validation

`npm run validate:content` passes:

```
— Source passages —
  validated: 302
```

(300 previously + 2 new = 302.)
