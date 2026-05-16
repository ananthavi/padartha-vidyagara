# Karma (Action) Chapter Ingestion Notes — Padārthadharmasaṅgraha

## Identification

- **Chapter:** Chapter 6a — "On Actions" (the second of two pages wisdomlib labels "Chapter 6a"; the first, "On Qualities", indexes Texts 46–137).
- **Source:** https://www.wisdomlib.org/hinduism/book/padarthadharmasamgraha-and-nyayakandali (Ganganatha Jha, 1915; "On Actions" entry page at `/d/doc1215497.html`).
- **Slug:** `karma` (the Vaiśeṣika *padārtha* this chapter expounds).
- **Mūla file:** `content/sources/prashastapada/karma.json`.
- **Commentary file:** **not created.** Wisdomlib carries no Devanagari for the Nyāyakandalī on these pages; only Jha's English rendering of Śrīdhara appears, in the "Commentary:" section of each Text page. Per the ingestion protocol (`content/sources/README.md` Phase A; standing rule "only if Devanagari on wisdomlib"), no `nyayakandali/karma.json` is emitted.

## Scope ingested

The full karma chapter — wisdomlib's "On Actions" Texts 138 through 153 — is ingested in a single pass. The chapter ends at Text 153 with the colophon `iti praśastapādabhāṣye karmapadārthaḥ samāpataḥ` (preserved verbatim in `pp.karma.153.sa_devanagari` and `…sa_iast`). Sāmānya (Texts 154–155) was already ingested in `samanya.json` and is not touched here.

### Records (16)

| Locator | Topic |
|---------|-------|
| `karma.138` | introductory characterisation; common lakṣaṇas of all five karmas; the directional viśeṣa |
| `karma.139` | *utkṣepaṇa* (throwing upward) defined |
| `karma.140` | *avakṣepaṇa* (throwing downward; mūla reads *apakṣepaṇa*) defined |
| `karma.141` | *ākuñcana* (contraction) defined |
| `karma.142` | *prasāraṇa* (expansion) defined |
| `karma.143` | *gamana* (going) defined; long pūrvapakṣa-siddhānta on whether *niṣkramaṇa*, *praveśana*, *bhramaṇa*, *patana* etc. are separate jātis or only *kārya-bheda*; jātisaṅkara argument |
| `karma.144` | *gamanatva* — synonym of *karmatva*, or distinct apara-sāmānya? two answers given |
| `karma.145` | *sat-pratyaya-karma-vidhi* — the musala/ulūkhala worked example: prayatna chain, abhighāta, saṃskāra |
| `karma.146` | *pāṇi-mukta* (hand-shot) gamana — the *tomara* (javelin) worked example; nodana, saṃskāra, āpatana |
| `karma.147` | *yantra-mukta* (instrument-shot) gamana — full *dhanus-jyā-iṣu* (bow-string-arrow) worked example, including elasticity (*sthitisthāpaka-saṃskāra*) |
| `karma.148` | *anadhiṣṭhita* (non-soul-guided) action in the four mahābhūtas; *nodana* defined |
| `karma.149` | *abhighāta* defined; *saṃyukta-saṃyoga*; *patana* (free fall) in pṛthivī and ap |
| `karma.150` | *syandana* (flowing of water) — the breach-in-embankment worked example |
| `karma.151` | *bhramaṇa* (revolving) — the potter's wheel; saṃskāra-driven gamana-viśeṣa |
| `karma.152` | *karma* in *prāṇa-vāyu*; ākāśa/kāla/dik/ātman are *niṣkriya* because *amūrta* |
| `karma.153` | *manas-karma*: indriyāntara-sambandha, *apasarpaṇa* (mind leaving dead body), *upasarpaṇa* (mind entering new body); *ativāhika-śarīra*; yogins' projected manas; *adṛṣṭa-kārita* karmas in mahābhūtas (paramāṇu-karma at sarga, agni's upward motion, vāyu's sideward motion, consecrated gem to thief, iron to loadstone). Closes with the *karma-padārtha* colophon. |

Locator scheme: `karma.<N>` where `N` is Jha's verse number from the `॥ N ॥` Devanagari marker on the wisdomlib page. IDs are `pp.karma.<N>`. text_key is `prashastapada`.

### Wisdomlib page mapping

| Verse(s) | Wisdomlib URL |
|----------|---------------|
| 138 | `/d/doc1215498.html` |
| 139 | `/d/doc1215499.html` |
| 140 | `/d/doc1215500.html` |
| 141 + 142 | `/d/doc1215501.html` (one page carries both Texts) |
| 143 | `/d/doc1215502.html` |
| 144 | `/d/doc1215503.html` |
| 145 | `/d/doc1215504.html` |
| 146 | `/d/doc1215505.html` |
| 147 | `/d/doc1215506.html` |
| 148 | `/d/doc1215507.html` |
| 149 | `/d/doc1215508.html` |
| 150 | `/d/doc1215509.html` |
| 151 | `/d/doc1215510.html` |
| 152 | `/d/doc1215511.html` |
| 153 | `/d/doc1215512.html` |

Texts 141 and 142 share a single wisdomlib page; they were split on the `॥ १४१ ॥` / `॥ १४२ ॥` Devanagari markers (and corresponding `|| 141 ||` / `|| 142 ||` IAST markers, and `Text (141):` / `Text (142):` Jha markers). Each is a separate record.

## Terminology decisions

### Glossary terms (per spec — Sanskrit-in-Malayalam-script throughout `ml_draft`; italicised Sanskrit in `en_simple_draft`; never translated)

`dravya, guṇa, karma, sāmānya, viśeṣa, samavāya, abhāva, paramāṇu, ātman, manas, pṛthivī, ap, tejas, vāyu, ākāśa, saṃyoga, saṃskāra` — all carried.

### Karma-specific termini (from the task glossary)

`utkṣepaṇa → ഉത്ക്ഷേപണം`, `avakṣepaṇa → അവക്ഷേപണം`, `ākuñcana → ആകുഞ്ചനം`, `prasāraṇa → പ്രസാരണം`, `gamana → ഗമനം`, `vega → വേഗം`, `adṛṣṭa → അദൃഷ്ടം`, `prayatna → പ്രയത്നം` — all preserved untranslated, with surrounding gloss.

The five karmas are introduced jointly in Text 138 (`utkṣepaṇādīnāṃ pañcānām`) and then defined individually in Texts 139–143. Each is named in both scripts and glossed parenthetically in surrounding prose; nowhere replaced by an English/Malayalam common-noun equivalent.

Note on *avakṣepaṇa* vs *apakṣepaṇa*: the wisdomlib mūla in Text 140 reads `कर्मापक्षेपणम्` (i.e. *apakṣepaṇa*); the task glossary spells it *avakṣepaṇa*. Both are attested forms of the same karma. The drafts use *avakṣepaṇa* (per the glossary) when introducing the five-karma list, and `അവക്ഷേപണം (പണ്ഡിതഗ്രന്ഥങ്ങളിൽ അപക്ഷേപണം എന്നും കാണാം)` in the Text 140 ml_draft to flag the spelling variation explicitly. The Devanagari mūla is left untouched.

### Other technical terms (transliterated in italics, glossed in surrounding prose; never translated to English/Malayalam common nouns)

From the karma chapter: `karmatva, karmatva-sambandha, ekadravyavattva, kṣaṇikatva, mūrtadravyavṛttitva, mūrta, amūrta, aguṇavat, gurutva, dravatva, asamavāyi-kāraṇa, samavāyi-kāraṇa, vibhāga, pratyaya, sat-pratyaya, asat-pratyaya, apratyaya, anuvṛtti, vyāvṛtti, jāti, jāti-saṅkara, sāmānya-viśeṣa-bheda, kārya-bheda, upalakṣaṇa-bheda, upasarga, niṣkramaṇa, praveśana, bhramaṇa, patana, spandana, avayava, avayavin, digviśiṣṭa, dik-pradeśa, aniyata, pratiniyata, abhighāta, nodana, utpatana, paṭu, sācivya, saṃyukta-saṃyoga, sthitisthāpaka, dhanus, jyā, śara, iṣu, koṭi, mokṣaṇa, ākarṣaṇa, tomara, musala, ulūkhala, cakra, syandana, srotobhūta, paṅka, setu, abhisarpaṇa, vṛtti-lābha, kāraṇa-guṇa-pūrvaka, prāṇa, jīvana, pratyāgamana, ativāhika-śarīra, āśaya, sarga, sarga-kāla, aṇu-karma, ayas, ayaskānta, dharma, adharma, upakāra, apakāra`. Each is introduced in transliterated italic form (en_simple_draft) or in Malayalam script (ml_draft), then immediately followed by a parenthetical English / Malayalam gloss; never silently replaced.

### Modern-science overlap discipline (vision Part XIII; AUTHORING.md rule 5)

Two places in the en_simple_draft and ml_draft mention modern physical concepts (impulse-momentum near *saṃskāra* in Texts 145–146; elastic restoring force near *sthitisthāpaka-saṃskāra* in Text 147) and explicitly call them "partial analogy, not identification". This is a Phase-A draft register; a fully-fledged disanalogy panel belongs to a future bridge-style concept node, not to a SourcePassage rendering, but the wording is conservative enough to flag the issue without crossing into substitution.

## Source-fidelity decisions

1. **`sa_devanagari`**: typed verbatim from the wisdomlib HTML page. No normalisation. Wisdomlib's standing OCR-era orthography is preserved — notably `सम्योग` (with anusvāra-via-`म्`) where standard orthography gives `संयोग`; `द्रष्ट्q` (a clear OCR artefact for `द्रष्टॄ`) in Text 143; `कर्ंतोपन्नं` (likely `कर्मोत्पन्नं`) in Text 146; `समापतः` (the colophon-final word; standard would be `समाप्तः`) in Text 153; `धणुषि` (likely `धनुषि`) in Text 147. All retained verbatim per the Phase-A protocol so that a śāstrika comparing against the printed Jha edition can flag and fix at Phase B.

2. **`sa_iast`**: verbatim from the wisdomlib HTML page, including its leading `_` italic markers (preserved as italics-as-plain-text per spec). Whitespace inside the line is normalised; the `|| N ||` terminator and `||` daṇḍas inside the text are preserved. Single `|` daṇḍas are preserved.

3. **`literal_en`**: Ganganatha Jha's English translation as printed on the wisdomlib page. The `Text (N):` prefix is retained (matches `samanya.json` style). Italics are rendered as paired `_…_` plain-text markers (as wisdomlib's `<em>` tags emerged from the HTML extraction). Cross-reference brackets like `(I-i-7)`, `(V-ii-1, 12)` are preserved exactly. Jha's own typos are preserved verbatim — e.g. `ṇon-material` (Text 138, with the dot-below ṇ where the printer probably intended a plain n), `final` for `find` (Text 144), `totes up` for `takes up` (Text 147), `landcultivation` for `land cultivation` (Text 145), `rebouned [rebounded?]` and `conjomtly [conjointly?]` (Texts 145, 149) — these `[?]` glosses appear to be wisdomlib's editorial uncertainty markers and are preserved as the source presents them. The "Text (N):—" hyphen variant in Texts 149, 150, 151, 152 is retained.

4. **No invented Sanskrit anywhere.** Every Devanagari character and every IAST character in this file came from the wisdomlib page.

5. **No `verified_by` / `verified_at` flag is set.** Every record's `ml_draft.reviewed_by`, `ml_draft.reviewed_at`, `en_simple_draft.reviewed_by`, `en_simple_draft.reviewed_at` is `null`. The reading view will not surface this content until Phase B printed-edition review. (No SourceRef objects are created here, so the verified_* fields on those don't apply yet.)

## Concerns / known gaps

1. **Devanagari OCR artefacts** (enumerated above) need correction at Phase B against Jha's printed Allahabad 1916 edition. Particularly visible in the long Text 143 commentary block.

2. **Jha typos** preserved verbatim. Phase B will need to mark which are Jha originals vs wisdomlib re-typesetting damage.

3. **Devanagari for Nyāyakandalī commentary on these Texts is not present on wisdomlib** — only Jha's English of Śrīdhara appears. Recovery from a Sanskrit-only edition of Nyāyakandalī is required before any `nyayakandali/karma.json` is created. Jha's English of the commentary IS on the wisdomlib page (in the `Commentary:` section), but per the ingestion protocol no commentary file is generated when the underlying Devanagari is unavailable.

4. **Text 138's `literal_en`** contains a long parenthetical chain of Vaiśeṣikasūtra cross-references (I-i-17, II-ii-25, II-i-21, …); these are Jha's editorial bracketed citations and are preserved verbatim, including the inconsistent capitalisation of the roman/arabic numerals (e.g. `(I-1-7)` vs `(I-i-7)` on the very same page).

5. **Text 143 is the longest passage in the chapter (>2000 chars Devanagari, ~5800 chars Jha English).** The whole pūrvapakṣa-siddhānta exchange on jātisaṅkara is preserved as a single record because it is one continuous bhāṣya passage on a single Devanagari verse marker (॥ १४३ ॥). Subdividing it would require an authorial decision that exceeds the Phase-A ingestion scope.

6. **`avakṣepaṇa` vs `apakṣepaṇa` spelling**: see "Terminology decisions" above.

7. All `ml_draft` and `en_simple_draft` are AI-drafted at Phase A. They are admissible to the authoring console as drafts but not to the reading view until reviewed by a Malayalam-literate / English-literate śāstrika respectively (`reviewed_by` and `reviewed_at` flipped). None has been flipped here.

## Branch

`worktree-agent-a8b356cd013082e8a`
