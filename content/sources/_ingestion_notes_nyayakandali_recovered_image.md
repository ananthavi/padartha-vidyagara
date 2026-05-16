# Nyāyakandalī Texts 48–51 — recovered from user-supplied page image

## Source

A photograph / screenshot of page 211 of the Chaukhambha Orientalia
reprint of *Padārthadharmasaṃgraha of Praśastapāda with the
Nyāyakandalī of Śrīdhara*, edited and translated by Gaṅgānātha Jhā
(Allahabad 1916; Chaukhambha reprint 1982). Supplied by the project
maintainer directly in chat. Same printed edition as
`content/sources/jha_part1.pdf` (page 211 falls inside Part 1) — but
the photograph is cleaner than the embedded OCR layer for this region.

## Why this record set exists

The earlier PDF-only Nyāyakandalī ingestion (agent C, see
`_ingestion_notes_nyayakandali_guna_46_77.md`) reported these four
commentary blocks as "OCR-irrecoverable":

> Texts 48, 49, 50, 51 — Commentary is trapped in the qualities-vs-
> substances comparative table (PDF lines ~7822–9935) which the OCR
> shattered into one character per line. Unrecoverable from this source.

The cleaner page-image bypasses the OCR damage. The four commentary
blocks are now ingested in `nyayakandali/_recovered_image.json` with
`literal_en` transcribed character-for-character from the photograph.

## Records produced

| id | Text | `literal_en` length |
|---|---|---:|
| `nk.guna.48` | All these qualities except Sound belong to Self; Sound to Ākāça | 81 chars |
| `nk.guna.49` | These qualities belong to material as well as to immaterial things | 67 chars |
| `nk.guna.50` | Individual *saṃyoga* / *vibhāga* / duality / dual-separateness / *tritva* + the *aneka* gloss | 415 chars |
| `nk.guna.51` | *Rūpa* inheres in a single substance (commentary ends mid-thought on this page) | 89 chars |

All four carry `sa_devanagari: ""` and `sa_iast: ""` per the current
"English and Malayalam only" instruction. AI-original `ml_draft` and
`en_simple_draft` accompanying each.

## Verbatim quote for verification

`nk.guna.50.literal_en` opens with:

> "An individual Conjunction, and an individual Disjunction always exist in two things; and hence are they spoken of as 'inhering in more objects than one.'"

This is the printed Jha text, character-for-character, from the supplied page.

## Concerns the śāstrika should know about

1. **Text 51's commentary appears to continue on page 212**, which is
   not in the supplied image. The phrase as transcribed —
   *"One Colour exists in one object; and it cannot like Conjunction,
   to two objects in common."* — reads as fragmentary (missing a verb
   between "cannot" and the comma). Preserved verbatim from the page;
   a Phase-B reviewer with the printed edition in hand should confirm
   the continuation on page 212.
2. **Text 48's `Ākāça`** spelling reflects the printed edition's
   transliteration scheme (German-umlaut / cedilla mix), not standard
   IAST. Preserved verbatim.
3. **Text 50** contains the *aneka*-gloss that's doctrinally important
   for the dvitva/tritva treatment; the draft renderings preserve
   *aneka* as Sanskrit term, never translated.
4. The four records bypass the PDF OCR damage and are therefore
   **higher fidelity** than the existing `_recovered.json` entries
   for Texts 6 and 7 (which were salvaged from mangled OCR text).
   Phase-B reviewers should still cross-check against the printed
   page, but the divergence from print should be minimal here.
5. All `reviewed_by` and `reviewed_at` are `null` per protocol.
