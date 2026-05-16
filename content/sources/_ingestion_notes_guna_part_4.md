# Guṇa Part 4 Ingestion Notes — Padārthadharmasaṅgraha

## Identification

- **Chapter:** Chapter 6a — "On Qualities" (the closing block of the guṇa-padārtha exposition, ending in the colophon `iti praśastapādabhāṣye guṇapadārthaḥ samāptaḥ`).
- **Source:** https://www.wisdomlib.org/hinduism/book/padarthadharmasamgraha-and-nyayakandali (Ganganatha Jha, 1916; chapter index at `doc1215405.html`).
- **Slug:** `guna-part-4` — the fourth ingestion slice of Jha's Texts within `guna`.
- **Mūla file:** `content/sources/prashastapada/guna-part-4.json`.
- **Commentary file:** **not created.** Wisdomlib carries no Devanagari for the Nyāyakandalī on these pages; the commentary appears only in Jha's English rendering. Consistent with prior parts and with `content/sources/README.md`.

## Scope ingested

This part covers Jha's **Texts 123–137 (15 verses)** — from the `siddhadarśana` (yogic perception) discussion that closes `buddhi`, through the quality-by-quality exposition (`sukha`, `duḥkha`, `icchā`, `dveṣa`, `prayatna`, `gurutva`, `dravatva`, `sneha`, `saṃskāra`, `dharma`, `adharma`, *saṃsāra-bandha*, *mokṣa*), and finally `śabda` (Text 137), which terminates with the colophon `iti praśastapādabhāṣye guṇapadārthaḥ samāptaḥ`.

### Verses included (15)

Texts **123, 124, 125, 126, 127, 128, 129, 130, 131, 132, 133, 134, 135, 136, 137.**

Locator scheme: `guna.<N>` where N is Jha's verse number. IDs are `pp.guna.<N>`.

### Where the chapter ends on wisdomlib

The colophon `iti praśastapādabhāṣye guṇapadārthaḥ samāptaḥ` appears at the foot of `doc1215496.html` (Text 137, on śabda). Wisdomlib's next-chapter navigation transitions to "Chapter 6a — On Actions" (i.e. `karma`), which is the scope of a sibling agent. No karma material is touched here.

## Provenance per page (wisdomlib doc-IDs)

| Text | URL fragment      |
|------|-------------------|
| 123  | `doc1215482.html` |
| 124  | `doc1215483.html` |
| 125  | `doc1215484.html` |
| 126  | `doc1215485.html` |
| 127  | `doc1215486.html` |
| 128  | `doc1215487.html` |
| 129  | `doc1215488.html` |
| 130  | `doc1215489.html` |
| 131  | `doc1215490.html` |
| 132  | `doc1215491.html` |
| 133  | `doc1215492.html` |
| 134  | `doc1215493.html` |
| 135  | `doc1215494.html` |
| 136  | `doc1215495.html` |
| 137  | `doc1215496.html` |

Sanskrit (Devanagari + IAST) and English were read from the `<blockquote lang="sa">…</blockquote>` and translation `<p>` blocks of each page, captured verbatim. Where the WebFetch summarising layer initially truncated long translations (notably 126, 132, 133, 134, 135, 136, 137), the raw HTML was re-fetched directly to preserve Jha's wording.

## Terminology decisions

- **Glossary terms** (per spec) carried as Sanskrit-in-Malayalam-script in `ml_draft` and as italicised Sanskrit in `en_simple_draft`: `dravya, guṇa, karma, sāmānya, viśeṣa, samavāya, abhāva, paramāṇu, ātman, manas, saṃskāra, saṃyoga, buddhi`.
- **Late-guṇa termini** (per the prompt's late-guṇa list, transliterated to Malayalam, glossed in surrounding prose, never translated): `dharma → ധർമ്മം`, `adharma → അധർമ്മം`, `saṃskāra → സംസ്കാരം`, `bhāvanā → ഭാവന`, `vega → വേഗം`, `sthitisthāpaka → സ്ഥിതിസ്ഥാപകം`, `sukha → സുഖം`, `duḥkha → ദുഃഖം`.
- **Other technical terms** (transliterated, glossed, never translated):
  - On `buddhi` (Text 123): `siddha-darśana`, `pratyakṣa`, `anumāna`, `liṅga`, `ārṣa`, *anugraha*, *abhiṣvaṅga*, *upaghāta*, *amarṣa*, *dainya*.
  - On `icchā` and `dveṣa` (126, 127): `kāma, abhilāṣa, rāga, saṅkalpa, kāruṇya, vairāgya, upadhā, bhāva, cikīrṣā, jihīrṣā, krodha, droha, manyu, akṣa, āmarṣa`.
  - On `prayatna` (128): `jīvana-pūrvaka, icchā-dveṣa-pūrvaka, prāṇa, apāna, antaḥkaraṇa, vyāpāra, saṃrambha, utsāha`.
  - On `gurutva, dravatva, sneha` (129–131): `apratyakṣa`, `paramāṇu`, *sāṃsiddhika*, *naimittika*, *saṅghāta*, *dvyaṇuka*, *ādṛṣṭa*, *syandana*, *saṃgraha*, *mārjana / mṛja*.
  - On `saṃskāra` (132): *vega*, *bhāvanā*, *sthitisthāpaka*, *paṭu-pratyaya*, *abhyāsa*, *ādara-pratyaya*, *pratyabhijñāna*.
  - On `dharma`/`adharma` (133–134): *puruṣa*, *mokṣa*, *priya*, *hita*, *atīndriya*, *abhisandhi*, *varṇa*, *āśrama*, *śruti*, *smṛti*, *śraddhā*, *ahiṃsā*, *satya*, *asteya*, *brahmacarya*, *anupadhā*, *abhiṣecana*, *bhakti*, *upavāsa*, *apramāda*, *ijyā*, *adhyayana*, *dāna*, *pratigraha*, *adhyāpana*, *yājana*, *brahmacārī*, *gurukula*, *bhaikṣya*, *snātaka*, *gṛhastha*, *śālīna*, *yāyāvara*, *mahāyajña* (*bhūta-, manuṣya-, deva-, pitṛ-, brahma-yajña*), *ekāgni*, *pākayajña*, *agnyādheya*, *haviryajña*, *agniṣṭoma*, *somayajña*, *vānaprasthya*, *yama*, *niyama*, *pravrajita*, *bhāva-prasāda*, *pratyavāya*, *hiṃsā*, *anṛta*, *steya*, *pramāda*, *duṣṭa-abhisandhi*.
  - On `saṃsāra` (135): *avidvas*, *prakṛṣṭa*, *pravartaka*, *āśaya*, *iṣṭa*, *aniṣṭa*, *preta*, *tiryañc*, *nāraka*, *pravṛtti-lakṣaṇa*, *saṃsāra-bandha*.
  - On `mokṣa` (136): *jñāna*, *ācārya*, *ṣaṭpadārtha*, *tattvajñāna*, *ajñāna*, *upabhoga*, *santoṣa-sukha*, *śarīra-pariccheda*, *nivṛtti-lakṣaṇa*, *kevala-dharma*, *paramārtha-darśana*, *nirodha*, *nirbīja*, *upaśama*.
  - On `śabda` (137): *ambara* (= *ākāśa*), *śrotra-grāhya*, *kṣaṇika*, *pradeśa-vṛtti*, *samāna-jātīya / asamāna-jātīya kāraṇa*, *varṇa-lakṣaṇa*, *dhvani-lakṣaṇa*, *vāyu*, *kaṇṭha*, *sthāna*, *bherī*, *daṇḍa*, *veṇu-parva-vibhāga*, *vīcī-santāna*, *śabda-santāna*, *pariśeṣa*.

## Concerns / known gaps

1. **Wisdomlib OCR-era typos preserved verbatim** in Devanagari, e.g. `दृश्यद्रष्ट्qणां` (Text 123) where a stray Latin `q` substitutes for what should be `ृ`; `सम्योग` for `संयोग` throughout; `दुह्ख` for `दुःख`; `१२3` (mixed Devanagari + Arabic numeral) in Text 123's verse marker; `सद् विविधो` for what reads as `स द्विविधो` in Text 128; `पञ्वसु` for `पञ्चसु`; `धमाधर्म` for `धर्माधर्म` in Text 126; `संकल्पजम्` vs `सङ्कल्पजम्` inconsistency. All are reproduced as wisdomlib displays them; flagged here for second-pass normalisation against the printed Jha edition.
2. **Jha's English typos preserved verbatim** — e.g. `accompained` (Text 135), `propuced` (Text 132), `desti??es` (Text 130), `bach` for `back` (Text 132), `Disinclination` used to render `vairāgya` in Text 126 while the prompt-glossary names it `vairāgya`, `'sukta'` for `'sukha'` (Text 124), `ths` for `the` (Text 123), `Aṇḍ` for `And` (Text 135). Mid-paragraph editorial brackets like `[1]` (footnote markers) and `[Śālīna?]` are kept exactly as rendered. These are Jha-1916 / OCR artefacts and should be reconciled at Phase B.
3. **Text 126 has a wisdomlib lacuna** — the definition of `kāma` reads `Lust is desire................................;` on the page (a literal row of dots). Reproduced verbatim in `literal_en`. The `ml_draft` and `en_simple_draft` give the doctrinal definition (`maithunecchā kāmaḥ`) from the Sanskrit, which is intact.
4. **Nyāyakandalī Devanagari unavailable on this source.** Recovery from a separate edition is required before any `nyayakandali/*.json` is created.
5. **Text 133 footnotes** — Jha's two footnotes about the compound-split (`puruṣāntarasaṃyogaja` / `biśuddhābhisandhija`) and the `Śālīna` / `Yāyāvara` livelihood definitions appear inline at the end of the translation block on wisdomlib (asterisk-prefixed). Captured into `literal_en` exactly as displayed.
6. **No karma material was touched** — the colophon at Text 137 is the hard stop; karma is the sibling agent's scope.
7. All `reviewed_by` / `reviewed_at` are `null` on every draft. No rendering is marked verified. Phase B printed-edition cross-check is still required before any concept node binds these passages for `published_*`.

## Validation

`npm run validate:content` passes. After this commit the source-passage count is 78 + 15 = 93.

## Branch

`worktree-agent-a6d30cab1340927e8`
