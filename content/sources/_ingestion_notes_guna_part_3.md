# Chapter 6 Ingestion Notes — Padārthadharmasaṅgraha (Guṇa, Part 3)

## Identification

- **Chapter:** Chapter 6 — "On Qualities" (continuation; *vidyā* / pramāṇa-classification block).
- **Source:** https://www.wisdomlib.org/hinduism/book/padarthadharmasamgraha-and-nyayakandali (Ganganatha Jha, 1916; chapter sub-pages `doc1215457.html` … `doc1215481.html`).
- **Slug:** `guna` (continuation of the *guṇa* exposition, into Praśastapāda's treatment of *vidyā* — direct sensuous, inferential, recollective and supersensuous cognition — as the cognitive *guṇa*-cluster).
- **Mūla file:** `content/sources/prashastapada/guna-part-3.json` (new file in the existing `prashastapada/` folder).
- **Commentary file:** **not created.** Wisdomlib carries no Devanagari for the Nyāyakandalī on these pages either; the commentary again appears only in Jha's English rendering, so per the Phase A protocol no `nyayakandali/guna.json` is emitted.

## Scope ingested

This commit covers Jha's **Texts 98–122** (25 sūtras, the third 25-verse window of the *guṇa* chapter).

Locator scheme: `guna.<N>` where N is Jha's verse number (the integer enclosed in the ॥ N ॥ marker on each verse). IDs are `pp.guna.<N>`.

### Verses included (25)

Texts **98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122.**

### Thematic content of this window

Praśastapāda's classification of *vidyā* (right cognition / pramāṇa) as a *guṇa* of *ātman*:

- **98** — fourfold partition of *vidyā*: pratyakṣa, laiṅgika, smṛti, ārṣa.
- **99** — full exposition of *pratyakṣa* (very long sūtra; six *indriya*s, fourfold contact, yogi-pratyakṣa, the *svarūpālocana* / *avyapadeśya* alternatives).
- **100–119** — the long *anumāna* / *parārthānumāna* block: definition of *liṅga* (101–102), ruled-out *liṅga*s (103, 115), the *vidhi* of *anumāna* and *dṛṣṭa* / *sāmānyatodṛṣṭa* split (104), reduction of *śabda*, *upamāna*, *arthāpatti*, *sambhava*, *abhāva*, *aitihya*, *ceṣṭā* to *anumāna* (105–111), then the five *avayava*s of the syllogism (112–119): pratijñā, apadeśa, nidarśana, anusandhāna, pratyāmnāya, with *nidarśanābhāsa* enumeration (117).
- **120** — *nirṇaya* (definite cognition) as opposite of *saṃśaya*; pratyakṣa-nirṇaya and anumāna-nirṇaya.
- **121** — definition of *smṛti*.
- **122** — definition of *ārṣa* (the *ṛṣi*'s prātibha cognition); rare instances in *laukika*s.

This window completes Praśastapāda's *vidyā* sub-block; Texts 67–68 remain as the only previously-noted gap, deferred to printed-edition recovery (per `_ingestion_notes_chapter_6.md`).

## Extraction method

Pages were fetched via `curl` (single user-agent header) to `/tmp/wl_pages/doc{1215457..1215481}.html`. A small Python script (`/tmp/wl_pages/extract.py`, not committed) located the body marker `<p><strong>Sanskrit text, Unicode transliteration and English translation of Text N:</strong></p>` (skipping the same string in `<meta name="description">`) and harvested:

- the first `<p lang="sa">` after the marker → `sa_devanagari`
- the second `<p lang="sa">` (which on wisdomlib is wrapped in `<em>` for italic formatting) → `sa_iast`, with surrounding `*` markers stripped
- every subsequent `<p>` block up to `<h2>Commentary: The Nyāyakandalī of Śrīdhara.</h2>` → `literal_en` (multi-paragraph, joined by blank-line separators)

Per spec (`literal_en` from the wisdomlib page; "preserve italics-as-plain-text and any cross-references"):

- The `Text (N):—` (or `Text (N):` / `Text (N).—` / `Text (N)—`) prefix is stripped, since existing `guna.json` records do not carry it.
- Italics — both Jha's italicised sūtra-quotes and his italicised termini technici inside the translation — are flattened to plain text (`*` markers removed). Smart-quotes, em-dashes and curly apostrophes are preserved as Jha printed them.
- Jha's bracketed cross-references such as `(III-i-8; IX-ii-1, 6, 23)` and `(Vaiśeṣika-Sūtras VI-i-1, 3)` **are preserved verbatim** in `literal_en`. (Existing chapter-6a records dropped these silently; Texts 98–122 retain them per the explicit instruction in this Phase-A pass.)
- Wisdomlib's Devanagari and IAST are preserved as-is, including OCR-era artefacts (see "Concerns" below).
- The wisdomlib typo on Text 113's English ("Teat (113):") is silently dropped along with the prefix; the typo is noted here so a printed-edition reviewer can audit the line.

For Text 99 the *literal_en* spans seven paragraphs of Jha's expansive translation (yogi-pratyakṣa, the alternative *svarūpālocana* and *avyapadeśya* definitions, etc.); for Text 115 it spans nine paragraphs covering the four *asiddha*-types, *viruddha*, *sandigdha* (with the *manas* / *kriyāvattva* sub-debate), and *anadhyavasita*; for Text 119 it spans eight paragraphs including the *Question* / *Answer* exchange unfolding the five *avayava*s. None of this material is paraphrased here — it is Jha's printed translation as wisdomlib serves it.

## Terminology decisions

**Glossary terms** carried as Sanskrit-in-Malayalam-script throughout `ml_draft` and as italicised Sanskrit in `en_simple_draft`: `dravya, guṇa, karma, sāmānya, viśeṣa, samavāya, abhāva, paramāṇu, ātman, manas, pṛthivī, ākāśa, kāla, dik, vāyu, saṃyoga, saṃskāra, buddhi`.

**Other technical terms** in this window (transliterated, never translated; glossed in surrounding prose):

- Cognition-types: `vidyā, pratyakṣa, laiṅgika, anumāna, smṛti, ārṣa, upamāna, arthāpatti, sambhava, aitihya, śabda, āptavacana, āptopadeśa, prātibha, prāmāṇya`.
- Inference machinery: `liṅga, anumeya, sādhya, sādhana, hetu, dharma, dharmin, sapakṣa, vipakṣa, sahacarita, prasiddha, avinābhāva, avinābhūta, sambaddha, anvaya, vyatireka, anuvyavasāya, sāmānya, viśeṣa, sāmānyatodṛṣṭa, dṛṣṭa, sāmānya-jātīya, asamāna-jātīya, paribuddha, sāsna, gavaya`.
- Syllogism members: `pratijñā, apadeśa, nidarśana, anusandhāna, pratyāmnāya, sādharmya-nidarśana, vaidharmya-nidarśana, nidarśanābhāsa, pañcāvayava, parārthānumāna`.
- Fallacies: `asiddha (ubhayāsiddha, anyatarāsiddha, tadbhāvāsiddha, anumeyāsiddha), viruddha, sandigdha, anadhyavasita, asādhāraṇa, prakaraṇasama, kālātyayāpadiṣṭa, anaikāntika, satkārya, nidarśanābhāsa`.
- Cognitive states / faculties: `pramāṇa, prameya, pramātṛ, pramiti, nirṇaya, saṃśaya, avadhāraṇa-jñāna, viśeṣa-darśana, svarūpālocana, ālocana, avyapadeśya, prātibha, paṭu-abhyāsa, ādara-pratyaya, anuvyavasāya, anusmaraṇa, icchā, dveṣa, prayatna, buddhi, sukha, duḥkha`.
- Other: `mūrta, amūrta, atīndriya, sūkṣma, vyavahita, viprakṛṣṭa, yogaja-dharma, yukta, viyukta, devarṣi, laukika, āmnāya, śruti, smṛti, āgama, svaśāstra, svavacana, dhūma, agni, vāṣpa, paramāṇu, ghaṭa, kāśyapa (Kaṇāda), abhinaya, ceṣṭā, rūpa, rasa, gandha, sparśa, paratva, aparatva, sneha, dravatva, vega, saṃkhyā, parimāṇa, pṛthaktva, vibhāga, ghrāṇa, rasana, cakṣus, tvak, śrotra, indriya, akṣa, kriyā, kriyāvattva, guṇavattva, niṣkriya, adravya`.

**Specific glosses adopted** (recurring across this window; chosen so the Sanskrit term stays the head and Malayalam / English prose orbits it):

- `pratyakṣa` → `പ്രത്യക്ഷം` (in ml) / `*pratyakṣa*` (in en).
- `liṅga` → `ലിംഗം` (in ml) / `*liṅga*` (in en) — never "sign", never "mark", never "probans" except where Jha's own gloss is being quoted in the Malayalam parenthetical.
- `anumeya` → `അനുമേയം`, `pramāṇa` → `പ്രമാണം`, `prameya` → `പ്രമേയം`, `pramātṛ` → `പ്രമാതാവ്`, `pramiti` → `പ്രമിതി` — all kept as Sanskrit-in-Malayalam-script.
- `pratijñā / apadeśa / nidarśana / anusandhāna / pratyāmnāya` retained in Malayalam script as the syllogism is being introduced; the Malayalam prose then explains each via Sanskrit-in-Malayalam-script vocabulary (e.g. അവിരോധി, അനുമേയത്തിന്റെ ഉദ്ദേശം), not via Malayalam translation.
- `dravya / adravya` consistently `ദ്രവ്യം / അദ്രവ്യം`. `kriyāvattva` / `niṣkriya` likewise transliterated.
- `smṛti` → `സ്മൃതി` (the *guṇa*; not the Malayalam ഓർമ except in a parenthetical gloss in 98).
- `ārṣa` / `prātibha` → `ആർഷം` / `പ്രാതിഭം` — kept as the Sanskrit terms; surrounding Malayalam prose explains them as ഋഷിമാർക്കു ലഭ്യമായ അതീന്ദ്രിയജ്ഞാനം (in 98) / യഥാർത്ഥനിവേദനം ചെയ്യുന്ന… ജ്ഞാനം (in 122).
- `āmnāya` → `ആമ്നായം` (Malayalam script); not translated as "scripture" inside the Malayalam prose. *śruti / smṛti / āgama* likewise kept as Sanskrit termini.
- `kāśyapa` (the *gotra* name by which Praśastapāda refers to Kaṇāda in 101) is rendered `കാശ്യപൻ` with a Malayalam parenthetical `(കണാദൻ)`, since the printed-edition reader cannot be assumed to track the gotra-attribution silently.

## Concerns / known gaps

1. **Devanagari is wisdomlib-as-typed**, not yet proofed against a print edition. Several wisdomlib OCR / encoding artefacts are preserved verbatim (per protocol):
   - Text 122 contains `आम्नायविधात्qणाम्` — the lowercase Latin `q` is clearly a glyph-substitution artefact for `ृ` (ृ-mātra), the printed reading being `आम्नायविधातॄणाम्` (gen. pl. of `āmnāyavidhātṛ`). Preserved as-is here.
   - Text 99 has `पृथिवी विषाणी` and `पृथिवी विषाणी शुक्लो गौर्गच्छति` (the example sentence) typed as wisdomlib serves it; *prtihivī* may have been read as `pṛthivi` etc. across editions.
   - Text 118 has `दृष्टस्य्स` (with stray `्य्स`) which is almost certainly an OCR slip for `दृष्टस्य`. Preserved.
   - Text 119 has `प्रप्त्याम्नायः` (with `प्रप्त्य` rather than `प्रत्याम्नायः`); the printed text is almost certainly `प्रत्याम्नायः`. The IAST mirrors this typo as `praptyāmnāyaḥ`. Preserved.
   - Text 99 has `सम्योग` (anusvāra-via-`म्`) where modern editions print `संयोग`; consistent with the chapter-6a observation, preserved.
   - Text 99's IAST has `pratakṣam` for `pratyakṣam` (one occurrence); preserved as wisdomlib serves it. The Devanagari has `प्रतक्षम्` likewise.
   - Several IAST forms drop or mispunctuate a candrabindu / anusvāra (e.g. `viṣāṇī`, `pramānātmā`, `pramātātmā` in 99); preserved.
2. **Jha's English typos preserved.** Wisdomlib has many of Jha's 1916 typos plus its own OCR artefacts: `senseorgans` (99), `whois` (104), `coṇḍition` (99), `estatic` (99), `ecstastic` (99), `awn self` for "own self" (99), `io` for "to" (99 and elsewhere), `Bhāvatva` mis-printed (99), `Vain` for "Pain" (99), `Are` for "fire" (104), `Adhvaryu priestrepeating` (104), `Sūtra ‘aprasiddho'napadeśo'san digdhaśca’` for the full `aprasiddho'napadeśo'san sandigdhaśca` (103 — wisdomlib drops one *san*), `iṇḍicated` (115), `Some people hold that…` (115 — Jha-internal grammar), `theft` for "the" (118), `f.i.` for "for instance" (99), `prtipādanaṃ` (119, IAST), `Teat (113):` (113 — wisdomlib's typo for "Text (113):"), `mūratam` for `mūrtam` (117), `Ākāça` for `Ākāśa` (119), `(IX.ii.1)` punctuation (114). All preserved to enable per-character reconciliation against the printed edition during Phase B.
3. **Ārṣ-vchana cross-refs.** Text 98's `(III-i-8; IX-ii-1, 6, 23)` and similar parentheticals throughout are preserved in `literal_en` per the spec instruction "preserve any cross-references". Existing chapter-6a records dropped these; the discrepancy is intentional.
4. **No verified flips.** All `reviewed_by` / `reviewed_at` are null on every `ml_draft` and `en_simple_draft`. Per spec, no rendering is marked verified.
5. **Texts 67–68 still missing** from the wisdomlib pagination noted in `_ingestion_notes_chapter_6.md`. Not addressed by this commit; deferred to a printed-edition follow-up.
6. **Texts 73–97** remain to be ingested as a separate "guṇa-part-2" pass. They sit between the existing `guna.json` (46–72) and this `guna-part-3.json` (98–122). This commit does not attempt to fill that gap.
7. **Long *literal_en* on 99, 104, 115, 117, 118, 119, 120.** These are Jha's translations of the long compound sūtras; they include his sub-classification prose but stop short of the *Nyāyakandalī* commentary heading. The boundary is the wisdomlib `<h2>Commentary: The Nyāyakandalī of Śrīdhara.</h2>` marker; everything before it is treated as Jha's translation of the Praśastapāda *bhāṣya*. A śāstrika's reconciliation should confirm where Jha's translation ends and his interpolated headings begin (he does not always mark them).

## Branch

`worktree-agent-abe37b1a95f4e06a9`
