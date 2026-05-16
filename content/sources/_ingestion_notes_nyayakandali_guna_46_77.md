# Ingestion Notes — Nyāyakandalī, guṇa-chapter Texts 46–77 (Part 1)

## Identification

- **Source (LOCAL)**: `content/sources/_reference/jha_pdf/jha_padarthadharmasamgraha.en.txt` — the embedded-OCR text layer of the Jha printed edition (Chaukhambha 1982 reprint of Allahabad 1916; Jha d. 1941; public domain). See `content/sources/_reference/jha_pdf/NOTICE.md`.
- **Phase A sanction**: `content/sources/README.md` Phase A. All `verified_by` / `reviewed_by` / `verified_at` / `reviewed_at` flags remain `null`.
- **Scope this pass**: PDF "Text (N)" markers 46 through 77 inclusive (first third of the guṇa chapter — Praśastapāda's category-of-quality section).
- **Output file**: `content/sources/nyayakandali/guna-part-1.json`
- **Record count emitted this pass**: **25** records.
- **Records deferred**: PDF Texts **76 and 77** (record budget per spec: "if >25, do first 25; defer the rest with a clear note"). They are next in the queue; their content was located and verified in the source (lines 10440–10454).

## Locator scheme

- `id`: `nk.guna.<N>` where `<N>` is the PDF Text number from Jha's printed edition.
- `locator`: `gloss.guna.<N>` (matches the spec's example `gloss.samavaya.7`).
- **N is the PDF Text-N, NOT the prashastapada/guna.json locator.** The two diverge from Text 66 onward — see `_ingestion_notes_guna_part_2.md` for the prior agent's lag table. Specifically, this file's `nk.guna.66` glosses the PDF "Text 66" passage (Conjunction/Disjunction/Number/Gravity/… productive of likes-and-unlikes), which is the same bhāṣya content carried in `pp.guna.66` of `prashastapada/guna.json`. From Text 68 onward the PDF's Text-N runs one ahead of pp.guna.<N+1>'s numbering for the same bhāṣya line. Resolving this drift is a separate task; the present file uses PDF Text-N consistently.

## Texts skipped (no usable Commentary block in this source)

| PDF Text | Reason |
|----------|--------|
| 48 | OCR pipeline broke the qualities-vs-substances comparative table at PDF lines ~7822–9935 into one character per line; no recoverable Commentary on Texts 48–51. |
| 49 | Same — trapped in the broken table. |
| 50 | Same. |
| 51 | Same. |

These four Texts have a `pp.guna.48` … `pp.guna.51` mūla in `content/sources/prashastapada/guna.json`, but Jha's PDF carries no readable Nyāyakandalī commentary for them in the form distributed here. A separate OCR pass over the page images would be required to recover the chapter-VI comparison table.

The four omissions are not paginated as `nk.guna.48`–`51` empty records; they simply do not appear in the JSON array. Future passes may insert them once the table is salvaged.

## Texts deferred for the next pass

| PDF Text | Location in source | Commentary present? |
|----------|--------------------|----------------------|
| 76 | line 10440 | Yes — short (lines 10443–10445) |
| 77 | line 10446 | Yes — short (lines 10451–10454) |

Both have brief Commentary blocks; deferral is purely a per-pass record-budget constraint.

## Source-feature notes (OCR artefacts preserved verbatim)

Per spec ("preserve OCR garble verbatim"), the following oddities are kept as-is in `literal_en`:

- **Text 46 header** appears in the PDF as `Text iß:` (mis-OCR of `(46)`). The text begins with Śrīdhara's *maṅgalācaraṇa* ("All obeisance to one who is blue like the clouds…"); this is preserved.
- **Text 47** header is `Text (47)` but the Commentary marker is OCR'd as `Comment aiy.` — the body is only four short lines (7814–7820) before the qualities-vs-substances table begins. The truncation in `literal_en` ends with "all these except" because the next sentence runs into the broken table.
- **Text 52** header is `Text (5-2):—`.
- **Text 54** header is just `4):—` — the leading `Text (5` was dropped.
- **Text 55** header is `Text {55)-.—`.
- **Text 56** Commentary marker fused with first word: `CommentaryIntellect &c…`. Preserved.
- **Text 57** header is `Text (-57):`.
- **Texts 66, 67, 70**: the `Text (N):` headers are entirely missing in the PDF; only the bhāṣya line remains, immediately followed by `Commentary.`. The Commentary blocks themselves are present and have been ingested for Texts 66 and 70. **Text 67 has no separable bhāṣya line in the PDF text layer either** — the list at line 10227 is the Text-66 bhāṣya, and the next discrete header is `Text {68}:` at line 10260. The corresponding prashastapada/guna.json also has no `pp.guna.67`; the PDF and the prashastapada source both skip this number. No `nk.guna.67` record is created.
- **Text 74** Commentary marker is `Commentaryj` (page-bleed character) — preserved.
- **Text 75** header is `Text (yj) :—` (mis-OCR of `(75)`).
- Page-running headers (`PRACASTAPÄDA BHÄSHYA—CHAP. VI.`, `QUALITIES : SIMILARITIES AND DISSIMILARITIES`, bare page numbers like `220`, `221`) and Jha's bracketed `[Page 100]` insertions appear throughout; they are NOT included in `literal_en` — only the prose of the Commentary itself.

## Terminology decisions (per the glossary in the spec brief)

Glossary terms carried as **Sanskrit-in-Malayalam-script** in `ml_draft` and as italicised Sanskrit in `en_simple_draft`, with surrounding gloss but never translated:

`dravya, guṇa, karma, sāmānya, viśeṣa, samavāya, paramāṇu, saṃyoga, saṃskāra, rūpa, rasa, gandha, sparśa, śabda, saṃkhyā, parimāṇa, pṛthaktva, vibhāga, paratva, aparatva, gurutva, dravatva, sneha, vega, ātman, manas, pṛthivī, ap, tejas, vāyu, ākāśa, pārimāṇḍalya, pratyakṣa`.

Other technical termini handled the same way (transliterated, glossed in surrounding prose, never substituted by a Western or Malayalam equivalent):

- Causal triad: `samavāyi-kāraṇa`, `asamavāyi-kāraṇa`, `nimitta-kāraṇa`, `akāraṇatva`, `ubhayathā`, `pradeśa-vṛtti`, `avyāpi-vṛtti`.
- Quality classes: `mūrta-guṇa`, `amūrta-guṇa`, `ubhaya-guṇa`, `vaiśeṣika-guṇa`, `sāmānya-guṇa`, `apākaja-` / `pākaja-`, `naimittika-dravatva`, `sāṃsiddhika-dravatva`, `anuṣṇa-sparśa`, `uṣṇa-sparśa`.
- Causal kinship: `samāna-jātīya-ārambhaka`, `asamāna-jātīya-ārambhaka`, `samāna-asamāna-jātīya-ārambhaka`, `paratra-ārambhaka`, `ubhayatra-ārambhaka`, `sva-āśraya`, `paratra`.
- Number / separateness: `ekatva`, `dvitva`, `eka-pṛthaktva`, `dvi-pṛthaktva`, `tri-pṛthaktva`, `aṇu-parimāṇa`, `mahat-parimāṇa`, `pracaya-parimāṇa`.
- Dialectic of cognition: `jñāna`, `buddhi`, `jñātatva`, `apekṣā-buddhi`, `anumāna`, `anumiti`, `liṅga`, `anvaya-vyatireka`, `vyāpti`, `pakṣa`, `pakvatva`, `anavasthā` (regressus ad infinitum), `vidyā`, `avidyā`, `bhāvanā`, `smṛti`.
- Action terms: `kriyā`, `patana`, `syandana`, `abhighāta`, `nodana`.
- Sense-organ terms: `bāhya-indriya`, `antaḥkaraṇa`, `pratyakṣa`, *chakṣus*, *śrotra*, *ghrāṇa*, *rasanā*, *tvak* (Malayalam-script Sanskrit: ചക്ഷുസ്സ്, ശ്രോത്രം, ഘ്രാണം, etc.).
- Substance categories beyond the glossary headline: `kāla`, `dik`.
- `ātman` rendered as ആത്മാ in Malayalam (per glossary); also as the bare *ātman* in en_simple_draft where Jha uses "Self".
- `manas` rendered as മനസ്സ് in Malayalam; *manas* in en_simple_draft where Jha uses "Internal Organ" or "Mind".
- The technical opposition `samavāyi-` / `asamavāyi-` / `nimitta-kāraṇa` is kept Sanskrit throughout. Jha's English in this stretch uses "material cause" / "immaterial cause" / "instrumental (efficient) cause", which is reproduced verbatim in `literal_en` but transposed back to the Sanskrit termini in the `ml_draft` and `en_simple_draft`.

## Structural notes

- **Text 56's Commentary is enormous** (PDF lines 9983–10094) — Śrīdhara's full polemic against the self-luminosity / *jñātatva* doctrines (Mīmāṃsā, Prabhākara, Advaita). It is preserved as one continuous `literal_en` paragraph in the record, with paragraph-breaks marked by `\n` where the source has paragraph indents. The `ml_draft` and `en_simple_draft` for this Text are correspondingly long but compressed — they are faithful overviews, not sentence-by-sentence renderings. Per the schema, `PassageRendering` is explicitly an AI-drafted companion, never canonical, and is not surfaced in the reading view until `reviewed_by` / `reviewed_at` are populated.
- **Text 71's Commentary** is the second-longest in this range (~33 lines of source), defining `asamavāyi-kāraṇa` and listing which qualities serve in each capacity. The `ml_draft` is correspondingly extensive.
- **Text 75's Commentary** runs the philosophical defence of `pradeśa-vṛtti` (partial-extension) qualities — the tree-climbing example, the *anavasthā* objection to part-only inherence, and the *cāṇḍāla-spṛṣṭa-vastra* analogy.

## Concerns / known gaps

1. **Devanagari and IAST are both empty.** Per the user instruction "leave `sa_devanagari` AND `sa_iast` both as `\"\"`. No Sanskrit/Devanagari work this pass." A separate pass (Phase B) is required to populate these from a Sanskrit-original Nyāyakandalī edition.
2. **OCR artefacts preserved.** Single-character substitutions (`relaionxkip`, `oot`, `donot`, `Bfort` for "Effort", `IntdU t` for "Intellect", `JVumoer` for "Number", `1 owing` for "flowing", `Throtving` for "Throwing", various page-running fragments and `<&c.` for `&c.`) are kept exactly as the PDF text layer renders them. Second-pass review against the printed page images is required before any verification flag is flipped.
3. **Texts 48–51 deliberately missing** — see "Texts skipped" above. The comparative qualities table at the head of Chapter VI is not recoverable from this OCR layer.
4. **Text 47's Commentary is truncated** at four lines because the rest of the section is the broken table. The current `literal_en` ends mid-sentence ("…all these except") matching the source. A note is included in the `ml_draft` and `en_simple_draft` flagging the table-OCR failure.
5. **Text 67 has no record** — the PDF and the prashastapada source both skip this number; the bhāṣya line at PDF 10227 numbered "66" in the prashastapada file already covers what would historically be Text 66 in some editions.
6. **No `reviewed_by` / `reviewed_at` is set.** Per spec, the `ml_draft` and `en_simple_draft` for every record carry `reviewed_by: null` and `reviewed_at: null` — they are AI drafts only.
7. **Defer the last two records (Texts 76, 77).** Both are short single-paragraph Commentary blocks (extension-coevality rules) and should be picked up in a follow-up pass — locator `gloss.guna.76` and `gloss.guna.77`.

## Branch

`worktree-agent-accfe8a2b04fc6bef`
