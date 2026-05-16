# Chapter 6 Ingestion Notes — Padārthadharmasaṅgraha — Part 2 (Texts 73–97)

## Identification

- **Continuation of:** `_ingestion_notes_chapter_6.md` (which ingested wisdomlib's Texts 46–72 / verses 46–72).
- **This pass covers:** wisdomlib's pages **Texts 73 through 97** inclusive.
- **Source:** https://www.wisdomlib.org/hinduism/book/padarthadharmasamgraha-and-nyayakandali (Ganganatha Jha, 1915).
- **Mūla file:** `content/sources/prashastapada/guna-part-2.json`.
- **Commentary file:** **not created.** Wisdomlib carries no Devanagari for the Nyāyakandalī on these pages; the commentary appears only in Jha's English rendering. Per the ingestion protocol (`content/sources/README.md` §2 + spec rule "only if Devanagari on wisdomlib"), no `nyayakandali/guna-part-2.json` is emitted.

## Scope ingested

25 passages, IDs `pp.guna.73` through `pp.guna.97`, locators `guna.73` … `guna.97`. Each passage corresponds to one wisdomlib page in the chapter-6 sequence (URL pattern `/d/doc1215432.html` … `/d/doc1215456.html`). The locator suffix follows the wisdomlib page-title number (continuing the sequential `guna.<N>` scheme of the existing `guna.json`), per the explicit spec instruction "Use `guna.<N>` to keep numbering aligned with the existing guna.json."

### Note on wisdomlib page-title vs. printed verse number

The lag flagged by the prior agent (page-titled "Text 68" actually carrying ॥६९॥) persists through this range. The verse-marker `॥ N ॥` inside `sa_devanagari` therefore does **not** equal the locator `guna.<N>` for many entries in this part:

| locator    | wisdomlib page title | Devanagari verse marker | IAST marker |
|------------|----------------------|--------------------------|--------------|
| guna.73    | Text 73              | ॥ ७४ ॥                   | ǁ 74 ǁ       |
| guna.74    | Text 74              | ॥ ७५ ॥                   | ǁ 75 ǁ       |
| guna.75    | Text 75              | ॥ ७६ ॥                   | ǁ 76 ǁ       |
| guna.76    | Text 76              | ॥ ७७ ॥                   | ǁ 77 ǁ       |
| guna.77    | Text 77              | ॥ ७८ ॥                   | ǁ 78 ǁ       |
| guna.78    | Text 78              | ॥ ७८ ॥ (OCR typo)         | ǁ 79 ǁ       |
| guna.79    | Text 79              | ॥ ७९ ॥                   | ǁ 79 ǁ       |
| guna.80    | Text 80              | ॥ ८० ॥                   | ǁ 80 ǁ       |
| guna.81–97 | Text 81–97           | ॥ ८१ ॥ — ॥ ९७ ॥           | ǁ 81 ǁ — ǁ 97 ǁ |

So the lag self-corrects at `guna.79`, after which page-title, Devanagari marker, and IAST marker all agree. The duplicate Devanagari marker ॥ ७८ ॥ on the page-titled "Text 78" (locator `guna.78`) is wisdomlib's own typo: the IAST line on that same page already prints ǁ 79 ǁ, and the content (`śeṣāṇām ayāvaddravya-bhāvitvaṃ ca`) is logically the second half of a Praśastapāda kārikā that the IAST/Jha numbering treats as verse 79. **Per the spec ("preserve any OCR-looking artefacts; preservation is the protocol"), the typo'd Devanagari marker is left as-is in `sa_devanagari`.**

### Gap from the prior pass: verse 73 (`buddhisukhaduḥkha…nimittakāraṇatvam`)

Between the two passes, the Praśastapāda kārikā numbered ॥ ७३ ॥ (`bud­dhi­sukhaduḥkhecchādveṣaprayatnadharmādharmabhāvanānāṃ nimittakāraṇatvam`) is **not** included in either commit. It sits on wisdomlib's page-titled "Text 72" (`/d/doc1215431.html`), which fell into the prior agent's nominal range (Texts 46–72) but was apparently skipped because the prior agent stopped at the verse-marker ॥ ७२ ॥ rather than the page-title 72. Per the spec ("preserve the gap — do not renumber"), this kārikā is **not** retro-fitted into the locator scheme; it should be back-filled in a future pass with locator `guna.72b` or by renaming the existing chapter-6 entries to a verse-based scheme. Flagged here for the second-pass reviewer.

## Terminology decisions

- **Glossary terms** carried as Sanskrit-in-Malayalam-script throughout `ml_draft` and as italicised Sanskrit in `en_simple_draft`: `dravya, guṇa, karma, sāmānya, viśeṣa, samavāya, paramāṇu, dvyaṇuka, tryaṇuka, ātman, manas, pṛthivī, ap, tejas, vāyu, ākāśa, kāla, dik, saṃyoga, saṃskāra, buddhi`.
- **Other technical terms** (transliterated, never translated; glossed in surrounding prose):
  - The five sense-quality definitions (verses 80–83): `rūpa, rasa, gandha, sparśa`; sub-kinds `pākaja-rūpa, apākaja-rūpa, sāṃsiddhika-dravatva, naimittika-dravatva, surabhi, asurabhi, śīta, uṣṇa, anuṣṇāśīta`.
  - Causal classification (verses 73–78): `samavāyi-kāraṇa, asamavāyi-kāraṇa, ubhayathā-kāraṇa, akāraṇatva, pradeśa-vṛtti, āśraya-vyāpin, yāvad-dravya-bhāvin, ayāvad-dravya-bhāvin`.
  - Number / dimension / separateness (verses 85–87): `saṃkhyā, ekatva, dvitva, tritva, parārdha, apekṣā-buddhi, bādhya-ghātaka, ekadravyā, anekadravyā, parimāṇa, aṇu, mahat, dīrgha, hrasva, pārimāṇḍalya, parama-mahattva, pracaya, tūla-parimāṇa, pṛthaktva, eka-pṛthaktva, dvi-pṛthaktva, apoddhāra, apara-sāmānya`.
  - Conjunction / disjunction (verses 88–89): `aprāpta, prāpti, anyatara-karma-ja, ubhaya-karma-ja, saṃyoga-ja, vibhāga-ja, abhighāta, nodana, vibhu, mūrta, sthāṇu`.
  - Priority / posteriority (verse 90): `paratva, aparatva, dik-kṛta, kāla-kṛta`.
  - Cognition (verses 91–97): `buddhi, upalabdhi, jñāna, pratyaya, paryāya, pratyartha-niyata, vidyā, avidyā, saṃśaya, viparyaya, anadhyavasāya, svapna, sādhāraṇa-liṅga, vimarśa, sthāṇu, gavaya, panasatva, vāhīka, antaḥkaraṇa, uparatendriya-grāma, pralīna-manaska, prāṇa-apāna, svāpa, svapnāntika, smṛti, dharma, adharma, adṛṣṭa, saṃskāra-pāṭava, dhātu-doṣa, vāta, pitta, kapha, trayī, śākya`.
- `ātman` and `manas` surface as `ആത്മാ` / `മനസ്സ്` (ml_draft) and as italicised `*ātman*` / `*manas*` (en_simple_draft) wherever Jha's English uses "Self" / "Internal Organ" / "mind."
- `viparyaya`, `anadhyavasāya`, `svapna` (the four sub-kinds of *avidyā*) are kept as Sanskrit termini throughout, with Malayalam/English glosses around — never substituted with "error", "indeterminate cognition", or "dream" alone.

## Concerns / known gaps

1. **Devanagari is wisdomlib-as-typed**, not yet proofed against the printed Jha edition. Several entries preserve wisdomlib orthography or OCR artefacts that ought to be normalised on second pass — including:
   - `सम्योग` / `सम्युक्त` (anusvāra-via-`म्`, e.g. verses 75, 88, 89); should be `संयोग` / `संयुक्त`.
   - Duplicate verse marker ॥ ७८ ॥ on `guna.78` (see table above).
   - `रूपदी` typo for `रूपादी` in `guna.85`.
   - `त्वक्षहकारी` for `त्वक्सहकारी` in `guna.83`.
   - `आदूत-` (etc.) sandhi quirks across `guna.95`.
   - Inverted apostrophe `अप्रसिद्धार्येषु` for `अप्रसिद्धार्थेषु` in `guna.96`.
   - These are preserved verbatim per spec; flag for the second-pass review.

2. **English verbatim from wisdomlib's HTML**, captured by direct curl + paragraph-preserving HTML strip (the WebFetch summarising layer was refusing to relay the longer Jha sections under copyright concerns; the page itself appears to be freely served). The English includes Jha's own typos preserved as-is (e.g. `Efort`, `Saltish, Bitter, Hot and gent`, `‘aye’` for `‘age’`, `‘(9) Due to time’`, `con junction` line-broken, `destraction`, `‘(q) an entity’`). Two-pass character-by-character review against the printed Jha edition is still pending — the standing fidelity protocol (`content/sources/README.md` §2) requires this before any concept node binds these passages for `published_*`.

3. **Verses 84–90 carry extended Praśastapāda bhāṣya prose, not a single mnemonic kārikā.** This is structurally PDS — Praśastapāda's own treatise often runs to many pages under one ॥ N ॥ marker. The extended Sanskrit, IAST, and English are all preserved verbatim from wisdomlib in `sa_devanagari`, `sa_iast`, and `literal_en`. The `ml_draft` and `en_simple_draft` for these long entries are necessarily compressed faithful overviews, not sentence-by-sentence renderings; per the schema `PassageRendering` is explicitly an AI-drafted companion, never canonical, and is not surfaced in the reading view until `reviewed_by` / `reviewed_at` are populated.

4. **Nyāyakandalī Devanagari unavailable on this source.** Recovery from a separate edition (Sanskrit-original Nyāyakandalī text) is required before any `nyayakandali/guna*.json` is created.

5. **All `reviewed_by` / `reviewed_at` are null on every draft.** Per spec, no rendering is marked verified.

6. **Verse 73 (`buddhisukhaduḥkha…`) is missing from both passes** — see the gap section above.

## Branch

`agent-a8498e47850b63d18`
