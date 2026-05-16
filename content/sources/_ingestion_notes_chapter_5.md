# Ingestion notes — Chapter 5

## Chapter

- **Chapter 5 — Of the Mahābhūtas (Ultimate Material Substances)**
  full title: *Of the Mahābhūtas or the Ultimate Material Substances or States of Matter*
- Source: https://www.wisdomlib.org/hinduism/book/padarthadharmasamgraha-and-nyayakandali (Ganganatha Jha, 1915)
- Slug chosen: `mahabhutas`
- File created: `content/sources/prashastapada/mahabhutas.json`

This chapter is the closing block of Prashastapāda's *dravya-padārtha* exposition. The final passage (Text 45 / mahabhutas.6) ends with the colophon `इति प्रशस्तपादभाष्ये द्रव्यपदार्थः`, sealing the section on the nine substances. The chapter follows immediately after the four *bhautika* dravyas (Earth, Water, Fire, Air — covered in chapters 1–4 / Texts 1–39) and covers the remaining five: *ākāśa*, *kāla*, *dik*, *ātman*, *manas*, prefaced by an opening *sṛṣṭi-saṃhāra* overview (Text 40).

## Passages

| locator         | wisdomlib Text # | edition para # (Devanagari `|| N ||`) | topic                                |
| --------------- | ---------------- | ------------------------------------- | ------------------------------------ |
| mahabhutas.1    | Text 40          | ४०                                    | Process of Creation and Destruction  |
| mahabhutas.2    | Text 41          | ४१                                    | On *ākāśa*                           |
| mahabhutas.3    | Text 42          | ४२                                    | On *kāla* (Time)                     |
| mahabhutas.4    | Text 43          | ४३                                    | On *dik* (Space / Direction)         |
| mahabhutas.5    | Text 44          | ४४                                    | On *ātman* (Self)                    |
| mahabhutas.6    | Text 45          | ४५                                    | On *manas* (Mind)                    |

Six passages total — well under the 25-passage limit, so all are fully drafted (Devanagari, IAST, literal Jha English, ml_draft, en_simple_draft).

## Locator convention

Following the precedent in `content/sources/prashastapada/samavaya.json` — where four passages bearing edition-numbers 157–160 are locator-keyed `samavaya.1` … `samavaya.4` — Chapter 5's six passages are keyed `mahabhutas.1` … `mahabhutas.6` (sequential index within the chapter file). The printed edition's paragraph numbers (40–45) are preserved inside the Devanagari (`|| ४० ||` etc.) and in the `Text (N):` prefix of `literal_en`.

## Nyāyakandalī

No Devanagari Nyāyakandalī text is present on wisdomlib for any of these six passages. Each text page presents an English rendering of Śrīdhara's commentary but the commentary's Sanskrit is **not** carried by wisdomlib. Per the instruction "create the nyayakandali file only if Devanagari is on wisdomlib", **no `content/sources/nyayakandali/mahabhutas.json` is created**. When the printed Nyāyakandalī edition is keyed, that file should be added separately.

## Extraction protocol

1. Fetched HTML for each of `doc1215399` … `doc1215404` (the six children of `doc1215398`).
2. Stripped to `<article>` body; extracted three streams: Devanagari (lines containing `[ऀ-ॿ]`), IAST (lines without Devanagari, between the Sanskrit and `Text (N):`), and Jha's literal English (from `Text (N)` until `Commentary:`).
3. **Verbatim preservation**: no normalization of Devanagari, no editorial changes to Jha (typos and OCR artefacts like `belong:` for `belongs`, `Posteriority’`, `line the jar`, `nimeṣa,’ ‘kāṣṭhā,’`, `aṇd`, `vāyāvāpyebhyaḥ`, the spurious `pṛthśśdivyādi-`, the `(?)` mis-OCR of `(2)`, etc. — all retained as on the source page). The literal_en for Text 41 lacks the `:—` separator (the source reads `Text (41)—`); kept as-is.
4. Note on wisdomlib reliability: during fetching, the URL `doc1215399.html` intermittently served unrelated content (`Text 139`, Chapter 6a). Verified the correct page by `<title>` match before extracting.

## Translation decisions

- **Terminology**: glossary terms (`dravya`, `guṇa`, `karma`, `sāmānya`, `viśeṣa`, `samavāya`, `abhāva`, `paramāṇu`, `dvyaṇuka`, `tryaṇuka`, `ātman`, `manas`, `pṛthivī`, `ap`, `tejas`, `vāyu`, `ākāśa`, `kāla`, `dik`, `saṃyoga`, `saṃskāra`, `buddhi`) kept Sanskrit. In ml_draft they appear in Malayalam-script transliteration (ദ്രവ്യം, ഗുണം, ആത്മാ, etc.); in en_simple_draft they appear italicised (`*dravya* (substance)` form).
- **Other technical terms** newly encountered — *adṛṣṭa*, *liṅga* (here ='inferential mark', not 'gender'), *vibhu*, *pariśeṣa*, *upacāra*, *antaḥkaraṇa*, *vyatikara*, *aṇu-parimāṇa*, *paramamahat*, *mūrta*, *lokapāla*, *adhyātman*, *prayatna*, *icchā*, *dveṣa*, *sukha*, *duḥkha*, *dharma*, *adharma*, *avadhi*, *bhakti* (in sense of *upacāra*) — transliterated to Malayalam script and glossed parenthetically on first occurrence in each passage's ml_draft.
- **Proper names** (Maheśvara, Brahmā, Meru, Prajāpati, Manu, Devarṣi, Pitṛ, Māhendrī, Vaiśvānarī, Yāmyā, Nairṛti, Vāruṇī, Vāyavyā, Kauberī, Aiśānī, Brāhmī, Nāgī) transliterated to Malayalam script with the directional gloss in parentheses where Jha provides one.
- **Quantitative units of time** (*kṣaṇa, lava, nimeṣa, kāṣṭhā, kalā, muhūrta, yāma, ahorātra, ardhamāsa, māsa, ṛtu, ayana, saṃvatsara, yuga, kalpa, manvantara, pralaya, mahāpralaya*) kept Sanskrit; for en_simple_draft, a short parenthetical English gloss is given for the units most opaque to a modern reader (instant, blink, day-and-night, fortnight, month, season, solstice-half, year).
- **Cardinal directions** were rendered with Malayalam compass words (കിഴക്ക്, പടിഞ്ഞാറ് etc.) since these are familiar everyday Malayalam, not technical Sanskrit.

## Concerns

1. The Devanagari on wisdomlib carries multiple OCR/typesetting infelicities — e.g. `कलप` for `कल्प` (mahabhutas.3), `अइशानी` for `ऐशानी` (mahabhutas.4), `पृथ्श्श्दिव्या° ` (mahabhutas.5) — and the IAST shows matching transliterations. Per the verbatim mandate I have not corrected these. A two-pass review against the printed Jha edition is required before any `published_*` binding.
2. The English translation also has multiple OCR-era artefacts (italics lost, parenthesis numerals corrupted into `(?)`, `aṇd`, `line the jar`, etc.). Same caveat — preserved verbatim, will need editorial cleanup at the proofing stage.
3. Text 41 displays `Text (41)—` rather than `Text (41):—` on the wisdomlib page; I kept the form as-displayed. This is a minor cosmetic mismatch with the pattern in `samavaya.json` (`Text (157): …`).
4. The ml_draft and en_simple_draft are AI-generated paraphrases marked with `generated_by: "claude-agent-ingestion"`, `reviewed_by: null`, `reviewed_at: null`. They must not surface in the reading view until a Malayalam-literate śāstrika reviews and signs off (per AUTHORING.md §4 and `isRenderingReviewed`).
5. mahabhutas.5 (*ātman*, Text 44) is the longest passage in the chapter and dense with inferential structure. The ml_draft uses paragraph breaks to track Prashastapāda's six concrete inferences and his enumeration of the fourteen *ātma-guṇa*; reviewer should verify the order and the glosses (especially *sannikarṣa-jatva*, *vyavasthā*, *adṛṣṭa-parigrahā*) against a printed Malayalam Vaiśeṣika source.
6. No Nyāyakandalī source file was created (no Devanagari commentary on wisdomlib). When the printed edition's Devanagari is keyed, expect roughly six commentary blocks corresponding to mahabhutas.1–6.
