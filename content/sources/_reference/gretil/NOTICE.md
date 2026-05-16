# GRETIL — Attribution and Licence

The text in this directory is mirrored from the **Göttingen Register of
Electronic Texts in Indian Languages (GRETIL)**, Universitäts­bibliothek
Göttingen / Niedersächsische Staats- und Universitätsbibliothek.

## File

`padarthadharmasamgraha.iast.txt`

- **Title**: Praśastapāda's *Pādārthadharmasaṃgraha* (commentary on Kaṇāda's
  *Vaiśeṣikasūtra*)
- **Editor / data entry**: Muneo Tokunaga and Muroya
- **Source edition**: V. P. Dvivedin (ed.), *The Praśastapādabhāṣya with
  commentary Nyāyakandalī of Śrīdhara*, Sri Garbi Dass Oriental Series 13,
  Delhi: Sri Satguru Publications (reprint of the Benares 1895 edition,
  Vizianagram Sanskrit Series 6).
- **Date of GRETIL version**: 2020-07-31
- **Source URL**: https://gretil.sub.uni-goettingen.de/gretil/corpustei/transformations/plaintext/sa_prazastapAda-pAdArthadharmasaMgraha.txt
- **TEI XML source**: https://gretil.sub.uni-goettingen.de/gretil/corpustei/sa_prazastapAda-pAdArthadharmasaMgraha.xml
- **Format**: IAST (Roman transliteration with Tokunaga's word-boundary periods)
- **Reference scheme**: `Pdhs_<chapter>.<section>(<verse>)` or `Pdhs_<chapter>(<verse>)`

## Licence

> Distributed under a Creative Commons Attribution-NonCommercial-ShareAlike
> 4.0 International License (CC BY-NC-SA 4.0).
>
> https://creativecommons.org/licenses/by-nc-sa/4.0/

## Use in this project

This file is a **reference text**, not a SourcePassage. It is not loaded by
the content pipeline and does not enter the schema. Its role is:

1. **Verification of wisdomlib-sourced IAST.** The Phase-A draft ingestion
   pulls IAST from wisdomlib, which has multiple OCR-flagged divergences
   from any standard edition (see `content/sources/_ingestion_notes_*.md`).
   GRETIL's Tokunaga input is a higher-fidelity reference for cross-
   checking before any `verified_by` flag is flipped (Phase B per
   `content/sources/README.md`).
2. **Mechanical Devanagari recovery.** Where wisdomlib's Devanagari is
   visibly corrupted but the IAST agrees with GRETIL, an editor can
   mechanically transliterate from GRETIL's IAST back to Devanagari
   (a lossless one-to-one operation) and stage the corrected version
   for śāstrika review.
3. **Verse-level cross-reference.** GRETIL's `Pdhs_x.y(z)` references are
   keyed to the Vizianagram edition's sūtra/verse scheme, which is more
   granular than wisdomlib's "Text" units. A future tooling pass can
   build a wisdomlib-Text → Pdhs-verse map for the śāstrika console.

It is **not** a substitute for the printed edition (Phase B requires
typed-and-proofed Devanagari). It is a verification companion, not a
canonical source.

## What GRETIL does NOT provide

- **Devanagari text** — only IAST is in this file
- **Nyāyakandalī Sanskrit** — Śrīdhara's gloss is not in GRETIL's
  Vaiśeṣika section. The Phase-B printed-edition pass remains the only
  path for the gloss text.
- **English translation** — Jha's translation is not in GRETIL.
