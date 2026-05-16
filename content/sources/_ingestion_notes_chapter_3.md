# Ingestion notes — Praśastapāda, Chapter 3

**Chapter:** 3 — *Similarities and Dissimilarities among Categories*
(*Padārthānāṃ Sādharmya-Vaidharmya*).
**Slug:** `sadharmya-vaidharmya`.
**Source:** https://www.wisdomlib.org/hinduism/book/padarthadharmasamgraha-and-nyayakandali — chapter 3 index `doc1215367.html`, sub-pages `doc1215368.html` (Text 11) through `doc1215390.html` (Text 34).
**Edition behind wisdomlib:** Ganganatha Jha (1916), *Padārthadharmasaṅgraha of Praśastapāda, with the Nyāyakandalī of Śrīdhara*.

## Scope

- 24 sūtras of Praśastapāda (Text 11 through Text 34, with Text 30 and Text 31 occupying a single wisdomlib page).
- All 24 ingested in full: Devanagari, IAST, Jha's literal English, AI ml_draft, AI en_simple_draft.
- Praśastapāda numbering on this site begins chapter 3 at sūtra 11 because the first ten sūtras were assigned to chapter 2 (*Enumeration and Classification of Categories*).

## Why no Nyāyakandalī companion file

For every one of the 24 sub-pages, the *Nyāyakandalī* gloss appears on wisdomlib as **English-only prose** — Jha's English rendering of Śrīdhara, with no embedded Devanagari for the gloss text itself. This matches the prior pass's observation for the *samavāya* chapter. Per the deliverables spec, no `content/sources/nyayakandali/sadharmya-vaidharmya.json` is produced; that file should be authored later from a printed Sanskrit edition of the *Nyāyakandalī* in the proper two-pass proofing workflow.

## Verbatim fidelity — wisdomlib data issues flagged

Two upstream defects were preserved or worked around without inventing Sanskrit:

1. **Text 16 — wisdomlib copy-paste error on Devanagari.**
   The `<p lang="sa">` block on `doc1215373.html` reproduces the Devanagari of Text 15 verbatim, ending in `॥ १६ ॥`. The IAST on the same page is correct: `kāryatvānityatve kāraṇavatāmeva || 16 ||`. Because the IAST is a faithful transliteration of a real sūtra (attested in standard editions), I have entered the **mechanical Devanagari counterpart of that IAST** as `sa_devanagari`: `कार्यत्वानित्यत्वे कारणवतामेव ॥ १६ ॥`. This is not invented Sanskrit; it is a one-to-one transliteration of wisdomlib's own IAST, and must be **verified character-by-character against a printed edition** before any concept node treats this passage as published.

2. **Text 29 — wisdomlib digit typo.**
   The Devanagari block reads `भूतात्मनां वैशेषिकगुणवत्त्वम् ॥ २८ ॥`. The IAST reads `bhūtātmanāṃ vaiśeṣikaguṇavattvam || 29 ||`. The numeral `२८` is clearly a typo for `२९`. **The Devanagari is stored verbatim** (with `२८`) because the ingestion spec demands `sa_devanagari: verbatim, no normalization`. A śāstrika reviewing this passage should correct the numeral against the printed edition; the field is currently a known-wrong but faithful copy of wisdomlib.

3. **Text 24 — wisdomlib OCR artefact.**
   The IAST contains `sarvasamyogisamānadsatvam`, where `dsatvam` is almost certainly an OCR fault for `deśatvam` (the printed reading should be `sarvasaṃyogi-samāna-deśatvam`). Devanagari shows `सर्वसम्योगिसमानद्सत्वम्` — likewise corrupt. **Both stored verbatim** per spec; flagged here for proof.

4. **Texts 12, 18 — anusvāra spelling.**
   `सम्योग`/`samyoga` appears with `म्` rather than the more common `ं` (anusvāra) form `संयोग`/`saṃyoga`. Stored verbatim. The same archaic spelling appears in the existing `prashastapada/samavaya.json`.

5. **Texts 13, 15, 19, 20, 22 — final danda spacing.**
   Some sūtras print `पञ्चानाम्` and `नवानाम्` (with halant) before the next word rather than the sandhi'd form. Stored verbatim.

## Terminology — Malayalam glossary decisions

The required glossary was honored throughout the `ml_draft` field: every *termini technici* in the list (*dravya, guṇa, karma, sāmānya, viśeṣa, samavāya, abhāva, paramāṇu, dvyaṇuka, tryaṇuka, ātman, manas, pṛthivī, ap, tejas, vāyu, ākāśa, kāla, dik, saṃyoga, saṃskāra, buddhi*) is rendered in Malayalam script form (ദ്രവ്യം, ഗുണം, …) and glossed in surrounding Malayalam prose. No technical term is translated.

Additional terms encountered, treated the same way (Sanskrit-in-Malayalam-script, gloss around):

- *astitva* → അസ്തിത്വം (ഉണ്മ)
- *abhidheyatva* → അഭിധേയത്വം (പറയപ്പെടാവുന്നത് ആകുക)
- *jñeyatva* → ജ്ഞേയത്വം (അറിയപ്പെടാവുന്നത് ആകുക)
- *sattā* → സത്ത
- *artha* (technical) → 'അർത്ഥ' (പാരിഭാഷിക ശബ്ദമായി)
- *dharma / adharma* → ധർമ്മം / അധർമ്മം
- *kārya / kāraṇa* → കാര്യം / കാരണം
- *nitya / anitya* → നിത്യം / അനിത്യം
- *avayavin* → അവയവി
- *mūrta* → മൂർത്തം
- *paratva / aparatva* → പരത്വം / അപരത്വം
- *vega* → വേഗം
- *gandha, rasa, rūpa, sparśa, śabda* → ഗന്ധം, രസം, രൂപം, സ്പർശം, ശബ്ദം
- *gurutva* → ഗുരുത്വം
- *bhūta, mahābhūta* → ഭൂതം, മഹാഭൂതം
- *antya-viśeṣa* → അന്ത്യവിശേഷം
- *pārimāṇḍalya* → പാരിമാണ്ഡല്യം
- *sādharmya / vaidharmya / asaṅkara* → സാധർമ്മ്യം / വൈധർമ്മ്യം / അസങ്കരം
- *naimittika / sāṃsiddhika* → നൈമിത്തികം / സ്വാഭാവികം (gloss)

In the `en_simple_draft` field, each Sanskrit term appears italicized in IAST followed by a parenthetical English gloss on first contextual use — never replacing it.

## Śāstrika concerns to surface to a reviewer

- **Wisdomlib is a derived source, not a printed edition.** Per `content/sources/README.md`, the *Nyāyakandalī* and Sanskrit text must ultimately be verified against Jha's printed edition (or another) before any concept node binding to these passages is published. The four flagged defects above are concrete proof of this need.
- **Text 16 in particular** — the Devanagari is reconstructed-from-IAST and must not be treated as proofed.
- **Text 24's gloss vs Sanskrit mismatch.** Jha's English mentions only "Ākāśa, Time and Space" while the Sanskrit *ākāśakāladigātmanām* clearly includes *ātman* (Self). Jha himself or his typesetter dropped "Soul" in the English; the Devanagari has it. The en_simple_draft mentions this discrepancy parenthetically.
- **Text 30's fourteen qualities.** The exact enumeration (*caturdaśa-guṇa*) is a settled list in classical Vaiśeṣika but is not made explicit in this sūtra itself; Jha's note cross-references the Vaiśeṣika-sūtra loci. The en_simple_draft lists representative items only and explicitly defers the count to the cross-references rather than asserting a definitive enumeration.
- **The ml_draft's choice of register** is "Manipravalam-conscious traditional-simple": Sanskrit termini retained in Malayalam script, surrounded by simple Malayalam connective prose. No high-Manipravalam diction, no Sanskrit chunks in Devanagari inside the Malayalam.
- **Drafts are unreviewed.** `reviewed_by` and `reviewed_at` are `null` on every record. The reading view will not surface either `ml_draft` or `en_simple_draft` until a Malayalam-literate śāstrika and a Sanskrit-literate śāstrika respectively sign off.

## Deferred / not in this commit

- No Nyāyakandalī companion file (English-only gloss on wisdomlib — see above).
- No new concept node was authored. This pass is source-corpus only.
- No edits to the existing `prashastapada/samavaya.json` (chapter 3 is not the *samavāya* chapter; special-case mode was not triggered).
- The whole 24-sūtra range was within the 25-passage soft cap; nothing was deferred for length reasons.
