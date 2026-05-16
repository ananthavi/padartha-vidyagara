# `_reference/` — verification-only source mirrors

This directory holds reference texts mirrored from third-party scholarly
archives, used to **verify** Phase-A draft content (see
`content/sources/README.md`) before any `verified_by` stamp is flipped
in Phase B.

These files are NOT loaded by the content pipeline:

- `loadSourcePassages()` (`src/lib/content.ts`) reads only
  `content/sources/<text_key>/*.json` — never `_reference/**`.
- `validate-content` does not parse or validate these files.
- The reading view never surfaces them.

They exist for two purposes:

1. **Cross-checking against wisdomlib draft entries.** A śāstrika or an
   automated tool compares each ingested `sa_iast` against the reference
   IAST and flags divergences. Where wisdomlib has OCR slips and
   GRETIL agrees with the printed edition, GRETIL wins.
2. **Mechanical Devanagari recovery.** Where wisdomlib's Devanagari is
   corrupted but GRETIL's IAST is clean, the IAST → Devanagari
   transliteration is mechanical and lossless; the editor stages the
   corrected Devanagari for review.

Each subdirectory MUST contain a `NOTICE.md` documenting:
- the source (full bibliographic citation and URL)
- the licence terms under which the file is mirrored here
- which fields of the schema it is competent to verify
- what it does NOT cover

## Current mirrors

- `gretil/` — Praśastapāda's *Pādārthadharmasaṃgraha* in IAST, Tokunaga input,
  Vizianagram 1895 edition. CC BY-NC-SA 4.0. See `gretil/NOTICE.md`.

## Pending

- The printed Jha edition (Allahabad 1916) — Phase-B canonical source.
  Currently inaccessible from this sandbox (egress blocks archive.org).
  Drop a typed-and-proofed copy here when available.
- Nyāyakandalī Sanskrit — neither GRETIL nor wisdomlib carries it; printed
  edition is the only path.
