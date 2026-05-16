# Chapter 6 Ingestion Notes — Padārthadharmasaṅgraha

## Identification

- **Chapter:** Chapter 6a — "On Qualities" (the first of two pages wisdomlib both label "Chapter 6a"; the second, "On Actions", indexes verses 73 onward).
- **Source:** https://www.wisdomlib.org/hinduism/book/padarthadharmasamgraha-and-nyayakandali (Ganganatha Jha, 1915; chapter index at `doc1215405.html`).
- **Slug:** `guna` (the Vaiśeṣika *padārtha* this chapter expounds).
- **Mūla file:** `content/sources/prashastapada/guna.json`.
- **Commentary file:** **not created.** Wisdomlib carries no Devanagari for the Nyāyakandalī on these pages; the commentary appears only in Jha's English rendering. Per the ingestion protocol (`content/sources/README.md` §2 + spec rule "only if Devanagari on wisdomlib"), no `nyayakandali/guna.json` is emitted.

## Scope ingested

Chapter 6a covers Jha's Texts 46–137 (92 *sūtra*s of guṇa-classification). Per the >25-passages hard constraint, this commit ingests **the first 25 verses in Jha's numbering**, fully. The remaining verses (Texts 73–137, plus the wisdomlib gap noted below) are deferred to a follow-up ingestion.

### Verses included (25)

Texts **46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 69, 70, 71, 72.**

Locator scheme: `guna.<N>` where N is Jha's verse number (the integer enclosed in the ॥ N ॥ marker on each verse). IDs are `pp.guna.<N>`.

### Wisdomlib pagination quirk (deferred for follow-up)

Wisdomlib's pages `doc1215406…doc1215426` carry Texts 46–66 cleanly. The next page, `doc1215427`, jumps to Jha's Text **69** in the Sanskrit (॥ ६९ ॥) while titling itself "Text 68"; subsequent pages each show a page-title that lags the verse marker by one. As a result **Jha's Texts 67 and 68 are not surfaced as separate pages on wisdomlib** within this chapter. They will need to be recovered from the printed Jha edition during follow-up; they are **not** silently filled here. The 25-verse first-pass window happens to land exactly at Text 72 (3 wisdomlib pages past the gap), so this deferral does not extend the ingestion window.

## Terminology decisions

- **Glossary terms** (per spec) carried as Sanskrit-in-Malayalam-script throughout `ml_draft` and as italicised Sanskrit in `en_simple_draft`: `dravya, guṇa, karma, sāmānya, viśeṣa, samavāya, ātman, manas, saṃyoga, saṃskāra, buddhi`.
- **Other technical terms** (transliterated, never translated; glossed in surrounding prose):
  - The ten *mūrta-guṇa*s: `rūpa, rasa, gandha, sparśa, paratva, aparatva, gurutva, dravatva, sneha, vega`.
  - The ten *amūrta-guṇa*s: `buddhi, sukha, duḥkha, icchā, dveṣa, prayatna, dharma, adharma, bhāvanā, śabda`.
  - Classificatory terms: `mūrta, amūrta, vaiśeṣika, sāmānya, ubhaya, anekāśrita, ekaika-dravya-vṛtti, dvī-indriya-grāhya, bāhya-indriya-grāhya, antaḥkaraṇa-grāhya, atīndriya, apākaja, kāraṇa-guṇa-pūrvaka, akāraṇa-guṇa-pūrvaka, saṃyoga-ja, vibhāga-ja, karma-ja, buddhy-apekṣa, samāna-jātīya-ārambhaka, asamāna-jātīya-ārambhaka, samāna-asamāna-jātīya-ārambhaka, paratra-ārambhaka, ubhayatra-ārambhaka, kriyā-hetu, asamavāyi-kāraṇa, sāṃsiddhika-dravatva, naimittika-dravatva, tūla-parimāṇa, anuṣṇa-sparśa, uṣṇa-sparśa, dvitva, ekatva, eka-pṛthaktva, dvi-pṛthaktva`.
- `bhāvanā` is glossed in Malayalam as "സംസ്കാരത്തിന്റെ ഒരു വകഭേദം" (a kind of *saṃskāra*: the memory-trace faculty) — connecting back to the glossary term `saṃskāra` and explicitly *not* translated as "faculty" inside the prose.
- `ātman` and `manas` are surfaced as `ആത്മാ` / `മനസ്സ്` and as italicised `*ātman*` / `*manas*` per the glossary, in places where Jha's prose says "Self" or "Internal Organ" (e.g. Texts 48, 56, 69).

## Concerns / known gaps

1. **Jha translations of Texts 47, 49, 51, 52, 53, 54, 55, 56, 57, 59, 60, 61, 62, 63, 64, 65, 66, 69, 70, 71, 72** were captured from individual wisdomlib verse pages; on first fetch a few were paraphrased by the page-summarising layer (notably Text 55), and were re-fetched verbatim before commit. Text 58's parenthetical `(of the thing to which they belong)` is included as Jha printed it. Two-pass character-by-character review against the printed Jha edition is still pending — the standing fidelity protocol (`content/sources/README.md` §2) requires this before any concept node binds these passages for `published_*`.
2. **Devanagari is wisdomlib-as-typed**, not yet proofed against a print edition. Schemes such as `सम्योग` (with anusvāra-via-`म्`) reflect wisdomlib's orthography and should be normalised to `संयोग` on second pass; preserved here to keep ingestion verbatim.
3. **Nyāyakandalī Devanagari unavailable on this source.** Recovery from a separate edition (Sanskrit-original Nyāyakandalī text) is required before any `nyayakandali/guna.json` is created.
4. **Texts 67–68 absent** from wisdomlib pagination — see "pagination quirk" above.
5. All `reviewed_by` / `reviewed_at` are null on every draft. Per spec, no rendering is marked verified.

## Branch

`worktree-agent-a34568a8917ed9d8a`
