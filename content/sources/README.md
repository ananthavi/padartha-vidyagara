# Sources

This directory holds the typed-and-proofed Sanskrit source corpus that anchors
every claim in the platform. Two text keys are admitted for MVP:

- `prashastapada` — Praśastapāda's *Padārthadharmasaṅgraha* (mūla)
- `nyayakandali` — Śrīdhara Bhaṭṭa's *Nyāyakandalī* (commentary)

## File layout

```
content/sources/
  prashastapada/
    samavaya.json        # array of SourcePassage records, locator e.g. "samavaya.1.3"
    dravya.json
    ...
  nyayakandali/
    samavaya.json        # locator e.g. "gloss.samavaya.7"
    ...
```

Each JSON file is either a single `SourcePassage` object or an array of them.
The schema (`src/lib/schema.ts`):

```ts
SourcePassage {
  id: string                  // stable, file-scoped unique identifier
  text_key: 'prashastapada' | 'nyayakandali'
  locator: string             // text-specific addressing (section.sutra.page or analog)
  sa_devanagari: string       // the passage in Devanagari, proofed
  sa_iast: string             // the same passage in IAST
  literal_en: string          // a literal (not free) English rendering
}
```

## Ingestion protocol

Source content is built up in two phases.

### Phase A — draft ingestion (current)

For the initial corpus build, wisdomlib.org's edition of *Padārthadharmasaṅgraha
and Nyāyakandalī* is acceptable as a starting source for both Sanskrit
(Devanagari + IAST) and Ganganatha Jha's English translation. This is a
deliberate relaxation of the strict "no scraping" rule below, scoped to
content that is **flagged unverified throughout**:

- `verified_by` and `verified_at` on every `SourceRef` stay `null`.
- `reviewed_by` and `reviewed_at` on every `PassageRendering` stay `null`.
- The reading view never surfaces unverified content (the schema and
  `loadPublishedConcepts` enforce this).

Provenance is documented in `content/sources/_ingestion_notes_*.md` per
chapter. Wisdomlib's known issues — OCR-era Devanagari typos, Jha's own
1916 typos, occasional editorial parentheticals — are preserved verbatim
rather than silently corrected, so a śāstrika can compare against the
printed edition before flipping any flag.

**Public-domain status of Jha's translation.** Ganganatha Jha (1872–1941),
*Padārthadharmasaṃgraha of Praśastapāda with the Nyāyakandalī of Śrīdhara*,
Allahabad, 1916. Jha's translation is in the public domain in all
jurisdictions whose copyright term is life + ≤95 years (it expired worldwide
by 2036 at the latest; in life-+-60 jurisdictions including India, by 2001;
in life-+-70 jurisdictions, by 2011). Wisdomlib distributes the edition
openly without access restriction.

### Phase B — śāstrika verification (pre-publish)

Before any concept node depth transitions to `published_*`:

1. **Text acquisition** from a published edition (Ganganatha Jha's printed
   edition, e.g. the Chowkhamba reprint of 1895 / Allahabad 1916, is the
   working reference for the MVP).
2. **Devanagari proofing** — typed against the printed edition, two-pass
   review. OCR output from archive.org scans is acceptable as a starting
   draft but must be reviewed character-by-character before commit.
3. **IAST generation** — script-derived from the proofed Devanagari (a
   one-to-one transliteration; no editorial choices here).
4. **Literal English** — confirmed against Jha's printed translation, with
   the edition cited in the `_ingestion_notes_*.md` log. Wisdomlib-sourced
   text is replaced or annotated as needed.
5. **`verified_by` / `verified_at`** flipped on the relevant `SourceRef`
   only after all four steps. This is the gate to `published_*`.

In short: scraping wisdomlib produces drafts that are *useful and
inspectable*; only the printed-edition pass produces *canonical*. The
schema's `superRefine` ensures published content can never have an empty
`source_refs` array; this README ensures every published claim has been
reconciled against the printed edition.

## Why JSON and not MDX

Source passages are referenced by stable locators from many concept nodes.
They are data, not prose; the structured form prevents the "translated once,
quoted differently elsewhere" drift that this project exists to refuse.
