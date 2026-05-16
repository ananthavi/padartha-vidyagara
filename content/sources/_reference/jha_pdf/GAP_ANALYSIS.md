# Gap analysis — PDF vs wisdomlib vs ingested (as of this commit)

## Source coverage

| Source | What it has | Status |
|---|---|---|
| **Wisdomlib** | Text 1–161 of Praśastapāda (Devanagari + IAST + Jha English); Nyāyakandalī **English only** in fragmentary form | Phase-A draft source |
| **GRETIL** (`_reference/gretil/`) | Praśastapāda IAST only, full text, 414 verse references at `Pdhs_x.y(z)` granularity (Tokunaga, Vizianagram 1895) | verification reference |
| **Jha PDF** (this dir) | Jha printed translation of BOTH bhāṣya AND Nyāyakandalī commentary (English); Sanskrit terms in Latin-1 transliteration; **no Devanagari** | Phase-B canonical for `literal_en`; principal new source for Nyāyakandalī |

**Confirmed identical numbering**: PDF and wisdomlib both use `Text (1)` … `Text (161)` for Praśastapāda's bhāṣya. Same edition family. Cross-checking is straightforward.

## Ingested as of this commit

78 SourcePassages across 9 chapter files in `content/sources/prashastapada/`. All `verified_by` and `reviewed_by` flags are `null` — wisdomlib-derived drafts.

| Chapter file | Locators | Wisdomlib Texts | Count |
|---|---|---|---|
| `introduction.json` | introduction.1–4 | (benediction + 1, 2, 7) | 4 |
| `enumeration-of-categories.json` | .3 .5–10 | 3, 5–10 (skipped 4) | 7 |
| `sadharmya-vaidharmya.json` | .11–.34 | 11–34 | 24 |
| `visesha-dravya.json` | .1–.5 | 35–39 | 5 |
| `mahabhutas.json` | .1–.6 | 40–45 | 6 |
| `guna.json` | .46–.72 | 46–72 | 25 |
| `samanya.json` | .1–.2 | 154, 155 | 2 |
| `vishesha.json` | .1 | 156 | 1 |
| `samavaya.json` | .1–.4 | 157–160 (161 skipped, corrupt on wisdomlib) | 4 |

## Wisdomlib Texts not yet in `content/sources/prashastapada/`

- **Texts 73–137 + 138–153**: the guṇa tail and the karma chapter. Four background agents are currently ingesting these from wisdomlib; this gap should close shortly.
- **Text 161**: the samavāya colophon, deliberately skipped because wisdomlib's page is corrupted (mismatched Devanagari `॥ १६० ॥` against IAST `|| 161 ||`, with Text 160 content duplicated). The PDF carries it correctly:
  > Text (161):—Even though the members related are…

## Nyāyakandalī coverage

- **In `content/sources/nyayakandali/`**: 0 SourcePassages. Wisdomlib has no Devanagari for the gloss and only intermittent English; ingestion was correctly refused.
- **In the PDF**: ~125 `Commentary.` blocks containing Jha's English of Śrīdhara's commentary. This is the principal new corpus the PDF unlocks.
- **Devanagari**: still nowhere. Path forward is either (a) `tesseract --lang=san` over page images, or (b) a third edition (e.g. the Vārāṇasī edition with Sanskrit *and* English on facing pages).

## What the PDF + GRETIL combination now enables

1. **Phase-B verification of every wisdomlib `literal_en` against Jha's printed text.** Per-passage agent comparison; flip `verified_by` on agreement.
2. **Ingestion of Nyāyakandalī English** as ~125 new SourcePassages under `text_key: "nyayakandali"`, with `literal_en` from the PDF and `sa_devanagari` / `sa_iast` empty until a Devanagari pass.
3. **Mechanical Devanagari recovery for Praśastapāda** by transliterating GRETIL's IAST. A śāstrika still verifies, but the staging is automatable.
4. **OCR-error reconciliation for wisdomlib drafts**. Where wisdomlib's Devanagari shows OCR garble (chapter agents flagged dozens), GRETIL's IAST + the PDF's English jointly reveal the intended reading.

## What the PDF does NOT solve

- **Nyāyakandalī Sanskrit / Devanagari** — the OCR pipeline transliterated everything to Latin-1; printed Devanagari is gone in the text layer. Tesseract over the page images is the path.
- **Concept-node authoring** — the corpus is now nearly complete enough to support real authoring of the *samavāya* node (vision Part X, the MVP target). That remains śāstrika work, not agent work.
