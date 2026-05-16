# Chapter 7 Ingestion Notes — *sāmānya*

- **Source page**: https://www.wisdomlib.org/hinduism/book/padarthadharmasamgraha-and-nyayakandali/d/doc1215513.html
- **Chapter title**: "On Sāmānya (Community)"
- **Slug**: `samanya`
- **Texts ingested**: 154, 155 (the complete chapter — only two `Text`-numbered units; both fully captured)
- **Locator scheme**: `samanya.N` (N = 1 for Text 154, N = 2 for Text 155), per the existing `samavaya.json` precedent.

## Files produced

- `content/sources/prashastapada/samanya.json` — 2 `SourcePassage` records.
- No `content/sources/nyayakandali/samanya.json` produced. The wisdomlib pages
  for Text 154 and Text 155 present the Nyāyakaṇḍalī commentary **only as Śrīdhara's
  English rendering** (with no Devanagari counterpart for the commentary itself).
  Per ingestion protocol — "only if Devanagari on wisdomlib" — the commentary
  file is skipped. When a future ingestion finds the Devanagari Nyāyakaṇḍalī
  (printed edition or other digital source), `samanya.json` can be added under
  `nyayakandali/` with locators `gloss.samanya.N`.

## Verbatim policy

- `sa_devanagari`: copied verbatim from wisdomlib (including the Devanagari numerals `१५४`, `१५५` at the end of each text block, and the closing colophon line `इति प्रशस्तपादभाष्ये सामान्यपदार्थः समाप्तः` on Text 155). Minor orthographic peculiarities (e.g. `सत्तासान्यं` for what would commonly be printed `सत्तासामान्यं`, `निलम्` for `नीलम्`, `सम्योग` for `संयोग`) preserved as printed; do not silently correct — flagged below.
- `sa_iast`: copied verbatim from wisdomlib's transliteration row. Same orthographic peculiarities preserved in IAST (`sattāsānyaṃ`, `nilam`, `samyoga`, `arthānatarṃ`, `pratyekaṃ`).
- `literal_en`: Ganganatha Jha's published translation (1915, public domain) copied verbatim including its idiosyncratic punctuation, typos ("vie have", "ease of", "oṭher", "and nob"), and bracketed sutra-reference tails.

## Orthography concerns flagged for śāstrika review

1. **Text 154**:
   - `सत्तासान्यं` — wisdomlib reads thus; expected `सत्तासामान्यं`. Likely OCR slip in wisdomlib. **Preserved verbatim**; recommend cross-check against Jha's printed edition before any `verified_by` stamp.
   - `नीलं निलम्` — second token printed `निलम्` (short `i`); likely OCR slip.
   - `अर्थानतर्ं` — almost certainly OCR-garbled `अर्थान्तरं`.
   - `विशिष्तेषूत्क्षेपणादिष्व` — printed with `त` for `ष्ट`; likely OCR slip for `विशिष्टेषूत्क्षेपणादिष्व`.
   - Numerous `सम्योग` for `संयोग` (anusvāra rendered as `म्`); preserved verbatim.
2. **Text 155**:
   - `सम्योगसमवायवृत्त्यभावाद्` — same `म्`/anusvāra convention.

All of the above are wisdomlib's transcription. Per protocol the file is a "starting draft" that requires character-by-character review against a printed edition before any `source_refs` binding it can be marked `verified_by`. None of the passages here is yet bound from a published concept depth, so the schema does not require verification.

## Terminology decisions for `ml_draft` and `en_simple_draft`

Glossary terms kept Sanskrit (Malayalam script in `ml_draft`, italicised Sanskrit in `en_simple_draft`) without translation:

- **From the project glossary**: *dravya / ദ്രവ്യം*, *guṇa / ഗുണം*, *karma / കർമ്മം*, *sāmānya / സാമാന്യം*, *viśeṣa / വിശേഷം*, *samavāya / സമവായം*, *paramāṇu / പരമാണു*, *pṛthivī / പൃഥിവി*, *saṃyoga / സംയോഗം*.
- **Chapter-specific termini technici** preserved as Sanskrit and glossed around (per "Other technical Sanskrit terms: transliterate, gloss around"):
  - *sattā* (Being / സത്ത) — the highest *sāmānya*; never rendered as a bare English "Being" or Malayalam "ഉണ്മ".
  - *para / apara* (higher / lower) — kept Sanskrit; glossed in parens once.
  - *anuvṛtti* / *vyāvṛtti* — kept Sanskrit; glossed as "inclusive cognition / recognitive cognition" and "exclusive cognition / distinguishing", respectively.
  - *anuvṛtti-pratyaya* — kept Sanskrit; glossed once.
  - *dravyatva, guṇatva, karmatva, pṛthivītva, gotva, ghaṭatva, paṭatva* — the abstract `-tva` class-terms kept Sanskrit; the gloss "-ness" appended only inside parentheses on first occurrence, never as a translation.
  - *saṃskāra* — kept Sanskrit (latent impression).
  - *lakṣaṇa, vṛtti-niyama, upalakṣaṇa, kāraṇa-sāmagrī, nitya, eka* — all kept Sanskrit, glossed.
  - *utkṣepaṇa* (an action-type) — kept Sanskrit.
  - *padārtha* — kept Sanskrit.
  - *Praśastapāda-bhāṣya* — kept Sanskrit (proper title).
- **NOT translated to English/Malayalam**: any Sanskrit term carrying doctrinal weight.

## Cross-reference

- Chapter 9 (*samavāya*) is reserved to a parallel agent and is untouched here.
- Chapter 8 (*viśeṣa*) untouched; this agent is chapter-7 only.
- The `samanya.1` locator becomes available for binding from `content/concepts/samanya.*` once that concept node is authored (no node currently exists, so cross-ref check has nothing to gate on).
