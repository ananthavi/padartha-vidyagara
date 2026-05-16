# Jha printed edition — text extraction notice

The text in this directory is the embedded-OCR text layer extracted from
the PDF you uploaded:

- `content/sources/Padartha Dharma Sangraha of Prasastapada With Nyayakandali of Sridhara Ed. Ganganatha Jha Chowkambha-1-350.pdf`
- `content/sources/Padartha Dharma Sangraha of Prasastapada With Nyayakandali of Sridhara Ed. Ganganatha Jha Chowkambha-351-700.pdf`

## Source edition

- **Title**: *Padārthadharmasaṃgraha of Praśastapāda with the Nyāyakandalī
  of Śrīdhara*
- **Translator**: Mahāmahopādhyāya Gaṅgānātha Jhā (1872–1941)
- **Publisher**: Chaukhambha Orientalia, Varanasi (reprint 1982 of the
  original Allahabad 1916 edition)
- **Pagination**: ~700 printed pages, split across two PDF parts of 350
  pages each
- **Status**: Public domain (Jha d. 1941; life + 60 jurisdictions including
  India: expired 2001; life + 70: expired 2011; life + 95: expires by 2036).
  The Chaukhambha 1982 reprint adds no new copyrightable content over
  Jha's 1916 work.

## Extraction

```
pdftotext content/sources/jha_part1.pdf .scratch/jha_part1.txt
pdftotext content/sources/jha_part2.pdf .scratch/jha_part2.txt
cat .scratch/jha_part{1,2}.txt > jha_padarthadharmasamgraha.en.txt
```

The PDF carries a baked-in OCR text layer (iLovePDF-processed). No
separate `tesseract` pass was needed.

## What the extracted text contains

- ✅ **Praśastapāda's bhāṣya in Jha's English translation**, with the
  same `Text (1)` … `Text (161)` numbering wisdomlib uses (confirmed
  identical: same edition family).
- ✅ **Śrīdhara's *Nyāyakandalī* commentary in Jha's English translation**,
  alternating with the bhāṣya as `Commentary.` blocks (~123 sections
  detected). **This is the principal addition over wisdomlib**, which
  carried only the bhāṣya in usable form.
- ⚠️ **Sanskrit termini in Latin-1 transliteration** (German-umlaut
  convention: `Bhäsya` for *Bhāṣya*, `Sütra` for *Sūtra*, `Saroaväya` for
  *Samavāya*). Mechanical conversion to standard Unicode IAST is possible
  but lossy where the OCR garbled terminal letters.
- ❌ **No Devanagari at all** — the OCR pipeline transliterated the
  printed Devanagari to Latin-1 rather than preserving the script.
  Devanagari recovery requires either:
    - mechanical conversion from GRETIL's IAST (lossless, see
      `_reference/gretil/`), or
    - a separate `tesseract --lang=san` pass over the page images
      (poppler's `pdftoppm` + tesseract).

## OCR quality concerns

- Many "Text (N)" markers are dropped by strict regex matching due to
  OCR drift in the punctuation (`Text (4):` vs `Text (4).` vs `Text  (4)`);
  recovering all 161 markers needs lenient pattern matching.
- Running headers are inconsistently OCR'd (`PRACASTAPÄDA` vs
  `PRACASTAPADA` vs `PRA9ASTAPADA`).
- Capital/lowercase confusion: `Säraavaya`/`Saroaväya`/`Samaväya`.
- Word-internal substitutions: `aattd` for *sattā*, `relaionxkip` for
  "relationship", `Throtving` for "Throwing".

These are recoverable by careful per-passage agent review, not by silent
regex cleanup.

## Use in this project

This extraction is a **reference text** (Phase B canonical for
`literal_en`), not a SourcePassage. The content pipeline does not load it.
A separate ingestion pass should:

1. Per existing wisdomlib SourcePassage, locate the matching `Text (N)`
   block in this file and confirm/replace `literal_en` with Jha's printed
   text (cleaning OCR artefacts, preserving Jha's own typos).
2. For each `Commentary.` block, create a new SourcePassage under
   `text_key: "nyayakandali"` carrying the English commentary as
   `literal_en`. Devanagari from GRETIL where applicable; otherwise
   `sa_devanagari: ""` and `sa_iast: ""` until a Devanagari pass runs.
3. Once verified against the PDF, flip `verified_by` / `verified_at`
   on the relevant `SourceRef` (this is the Phase B gate per
   `content/sources/README.md`).
