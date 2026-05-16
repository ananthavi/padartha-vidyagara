# Ingestion notes — Praśastapāda, Chapter 4 (corrective ingestion)

**Chapter:** 4 — *Of Special Substances* (*Viśeṣa-dravya-vaidharmya*; chapter heading "Of Special Substances" on wisdomlib).
**Slug:** `visesha-dravya`.
**Source:** https://www.wisdomlib.org/hinduism/book/padarthadharmasamgraha-and-nyayakandali — chapter 4 sub-pages:
- Text 35 (Introductory) — `doc1215392.html`
- Text 36 (The Earth) — `doc1215393.html`
- Text 37 (Of Water) — `doc1215395.html`
- Text 38 (Of Fire) — `doc1215396.html`
- Text 39 (Of Air) — `doc1215397.html`

**Edition behind wisdomlib:** Ganganatha Jha (1915), *Padārthadharmasaṅgraha of Praśastapāda, with the Nyāyakandalī of Śrīdhara*.

## Scope and corrective nature

This pass *replaces* an earlier fabricated chapter-4 ingestion in which `literal_en` was AI-paraphrased prose rather than Jha's printed English. The prior branch was discarded; this work begins from `padartha-vidyagara` HEAD.

5 *SourcePassage* records (Texts 35–39) ingested in full: Devanagari, IAST, Jha's verbatim English, AI ml_draft, AI en_simple_draft. The locator scheme is `visesha-dravya.1` … `visesha-dravya.5` mapping to Texts 35 … 39 respectively. The chapter-4 numbering of the Sūtras on wisdomlib begins at 35 because Texts 1–34 were assigned to chapters 1–3 in the wisdomlib structuring.

## `literal_en` provenance — verbatim from wisdomlib

For each of the five sub-pages, the wisdomlib HTML carries a dedicated paragraph block (or sequence of blocks) under the IAST line and immediately preceding the heading "Commentary: The Nyāyakandalī of Śrīdhara." That block is **Jha's English translation of the *bhāṣya* portion only** — not the Nyāyakandalī gloss, which is rendered separately below. Every character of the `literal_en` field in `prashastapada/visesha-dravya.json` is copied character-for-character from that block, including:

- the `Text (N):—` (or `Text (N).—` in Text 38) header prefix that wisdomlib prints inline at the start of Jha's English;
- internal paragraph breaks, rendered as `\n\n` in the JSON string;
- curly quotes (`‘`, `’`), em-dashes (`—`), and ampersand-`c.` abbreviations (`&c.`) preserved as-is;
- the Sūtra cross-reference parentheticals appended by Jha — e.g. `—(II-i-1, 6; IV-i-?; V-i-16, 17, 18, 7, II-ii-2; V-ii-1)`;
- Jha's typos and OCR artefacts in the English itself, listed below.

No paraphrase, no modernization, no summary, no AI rewriting was applied to `literal_en`.

## Why no Nyāyakandalī companion file

For all five sub-pages the *Nyāyakandalī* gloss appears on wisdomlib as **English-only prose** — Jha's English rendering of Śrīdhara with no embedded Devanagari for the gloss text itself. Per the deliverables spec, no `content/sources/nyayakandali/visesha-dravya.json` is produced; that file should be authored later from a printed Sanskrit edition of the *Nyāyakandalī* in the standard two-pass proofing workflow.

## Verbatim fidelity — wisdomlib data issues flagged

Several upstream defects were preserved without invention:

1. **Text 37 — Devanagari final-numeral typo.** The Devanagari block on `doc1215395.html` closes with `॥ ३६ ॥` but the IAST closes correctly with `|| 37 ||`. Stored verbatim. A śāstrika reviewing this passage should correct the numeral to `३७` against the printed Jha edition.

2. **Text 36 — Jha-English typos and punctuation oddities (preserved verbatim).** "quailities", "Odour Touch" (missing comma), "Distance Proximity" (missing comma), "Common" with stray capitalization, "chair­and" (missing space), "of of perception", "enteral" for "eternal", and the cross-reference `IV-i-?` (a literal question-mark in the printed source). All retained.

3. **Text 36 Devanagari — `अन्धो` for `गन्धो`.** The Devanagari block on `doc1215393.html` reads `अन्धो द्विविधः सुरभिरसुरबिह्श्च` where the context (and Jha's English "Odour is of two kinds") and the IAST `andho dvividhaḥ surabhirasurabihśca` make clear this should be `गन्धः`/`gandhaḥ`. Both Devanagari and IAST are also corrupted: `सुरबिह्श्च` / `surabihśca` is an OCR fault for `असुरभिश्च` / `asurabhiśca` ("and the foul-smelling"). **Both Devanagari and IAST stored verbatim** per the ingestion spec; flagged here for a proofreader.

4. **Text 36 — `रूपमनेकप्रकारम् शुक्लादि` and similar.** Halant `म्` before space rather than the more usual anusvāra-sandhi. Stored verbatim — matches the archaic spelling pattern already present in `samavaya.json` and chapter-3 records.

5. **Text 38 — "Text (38).—Fire is that which. belongs to the class…"** The stray period after "which" and the missing punctuation are reproduced verbatim. Also: "shewn" (archaic), `IV-i-ii` (lowercase Roman ii rather than `11`), "ths" for "this", "softening (according to the Kandalī)" — preserved exactly.

6. **Text 38 Devanagari — `सम्युक्तसमवायाद्रसाद्युपलब्धिरिति`.** The form `सम्युक्त-` for `संयुक्त-` matches the same archaic spelling of `सम्योग` already documented in chapter 3 (notes section 4 there). Stored verbatim.

7. **Text 39 — multiple punctuation/space defects.** "Is is made up" (for "It is"); "senes" (for "serves"); "shaking of grasses.being due to" (period mid-sentence); `‘Apāna‘` (left-curly instead of right-curly); "—II-i-9, 10, 16.)" (missing opening paren). All preserved.

8. **Text 39 Devanagari — `अन्तःसेरीरे`.** Should almost certainly be `अन्तःशरीरे`; the IAST `prāṇo'ntaḥserīre` confirms the corruption. Stored verbatim.

9. **Text 39 IAST/Devanagari — `|` (single pipe).** Texts 35, 36, 37, 38 use double-pipe `||` for sūtra-internal *daṇḍas* in the IAST; Text 39's IAST and Devanagari use a single `|` throughout (except the closing `॥ ३९ ॥` / `|| 39 ||`). Stored verbatim; matches the wisdomlib HTML.

## Terminology — Malayalam glossary decisions

All glossary terms required by the brief are rendered in Malayalam script (ദ്രവ്യം, ഗുണം, കർമ്മം, സാമാന്യം, വിശേഷം, സമവായം, അഭാവം, പരമാണു, ദ്വ്യണുകം, ത്ര്യണുകം, ആത്മാ, മനസ്സ്, പൃഥിവി, ആപസ്സ്, തേജസ്സ്, വായു, ആകാശം, കാലം, ദിക്, സംയോഗം, സംസ്കാരം, ബുദ്ധി) with surrounding Malayalam prose; no technical term is translated.

Additional terms encountered in chapter 4 and treated the same way:

- *aptva, tejastva, vāyutva, pṛthivītva* → ആപ്ത്വം, തേജസ്ത്വം, വായുത്വം, പൃഥിവീത്വം (each as the *jāti* whose *samavāya* defines the substance)
- *gandha, rasa, rūpa, sparśa, śabda* → ഗന്ധം, രസം, രൂപം, സ്പർശം, ശബ്ദം
- *gurutva, dravatva, sneha, vega* → ഗുരുത്വം, ദ്രവത്വം, സ്നേഹം, വേഗം
- *paramāṇu / kāryalakṣaṇā / nityā / anityā* → പരമാണു / കാര്യ-ലക്ഷണ / നിത്യ / അനിത്യ
- *śarīra / indriya / viṣaya / prāṇa* → ശരീരം / ഇന്ദ്രിയം / വിഷയം / പ്രാണൻ
- *yonija / ayonija / jarāyuja / aṇḍaja* → യോനിജം / അയോനിജം / ജരായുജം / അണ്ഡജം
- *ghrāṇa / rasana / cakṣus / tvak* → ഘ്രാണം / രസനം / ചക്ഷുസ്സ് / ത്വക്
- *bhauma / divya / udarya / ākaraja* → ഭൗമം / ദിവ്യം / ഉദര്യം / ആകരജം
- *pākaja / apākaja* → പാകജം / അപാകജം
- *sammūrcchana / nānātva* → സമ്മൂർച്ഛനം / നാനാത്വം
- *sāṃsiddhika / naimittika* → സാംസിദ്ധികം / നൈമിത്തികം
- *upabhoga / upaṣṭambha* → ഉപഭോഗം / ഉപഷ്ടംഭം
- *prāṇa, apāna, samāna, udāna, vyāna* → പ്രാണൻ, അപാനൻ, സമാനൻ, ഉദാനൻ, വ്യാനൻ
- *bhāsvara* → ഭാസ്വരം (പ്രകാശമാനം)

In the `en_simple_draft` field, each Sanskrit term appears italicized in IAST followed by a parenthetical English gloss on first contextual use — never replacing it. The draft is an English re-expression of *Jha's English*, not of the Sanskrit, in keeping with the brief.

## Śāstrika concerns to surface to a reviewer

- **Wisdomlib is a derived source.** Per `content/sources/README.md`, the final canonical form must be verified against Jha's printed edition. The seven flagged defects above are concrete proof of this need — particularly Text 36 (`अन्धो`/`andho` for `gandhaḥ`) and Text 39 (`अन्तःसेरीरे` for `अन्तःशरीरे`), where the printed reading is essentially certain but the wisdomlib OCR is wrong.
- **Text 38's `IV-i-ii` cross-reference** is almost certainly Jha's typesetter's confusion of Roman `ii` for Arabic `11` — proof on the printed page is needed before any concept node uses this passage as published.
- **Text 35 is a single transitional sūtra.** It announces the *vaidharmya-per-substance* program but contains no substantive content; concept-node authors should treat it as a section heading.
- **Text 36 is by far the largest record** (Jha English ≈ 2,950 characters). It carries the full taxonomy of *pṛthivī* — qualities, atom/product distinction, yonija/ayonija bodies, divine and *ṛṣi* bodies, gandha-organ, and the threefold *viṣaya* (clay / stone / vegetable). This is foundational for any future concept node on *pṛthivī* or *bhautika-śarīra*.
- **Text 38's Heavenly Fire "produced by watery fuel"** (*divyam abindhanam*) is doctrinally important: it is Praśastapāda's account of sun and lightning as varieties of *tejas* whose "fuel" is water, distinct from the wooden fuel of terrestrial fire.
- **Text 39's account of *prāṇa* as a single *vāyu* receiving five names by function** is the link between the Vaiśeṣika physics of air and the *prāṇa-vāyu* doctrine of the medical and yogic traditions — a productive future *bridge* paragraph.
- **The ml_draft's register** is "Manipravalam-conscious traditional-simple": Sanskrit termini retained in Malayalam script, simple Malayalam connective prose around them. No high-Manipravalam Sanskrit fragments in Devanagari inside the Malayalam.
- **Drafts are unreviewed.** `reviewed_by` and `reviewed_at` are `null` on every record. The reading view will not surface either `ml_draft` or `en_simple_draft` until a Malayalam-literate śāstrika and a Sanskrit-literate śāstrika respectively sign off.

## Validation

`npm install` then `npm run validate:content` runs cleanly. The validator reports 72 source passages total (67 from prior chapters + the 5 new chapter-4 records). One concept node, zero pūrvapakṣa positions — unchanged from baseline.

## Deferred / not in this commit

- No `content/sources/nyayakandali/visesha-dravya.json` (English-only gloss on wisdomlib — see above).
- No new concept node was authored. This pass is source-corpus only.
- No edits to any file outside the two deliverable paths.
