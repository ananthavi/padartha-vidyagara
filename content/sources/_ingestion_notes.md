# Ingestion notes — samavāya section

Status: **first-pass, unverified**. Every record in
`content/sources/prashastapada/samavaya.json` was extracted by an AI agent
from a derived web source. No śāstrika has reviewed the Devanagari, IAST,
or English. `source_refs.verified_by` and `source_refs.verified_at` MUST
remain `null` until two-pass review against a printed edition (see
`content/sources/README.md` §"Ingestion protocol", point 2).

## Sources visited

Primary (extracted from):

- https://www.wisdomlib.org/hinduism/book/padarthadharmasamgraha-and-nyayakandali
  — table of contents, identified Chapter 9 "On Samavāya (Inherence)"
- https://www.wisdomlib.org/hinduism/book/padarthadharmasamgraha-and-nyayakandali/d/doc1215518.html
  — chapter index page (structural, no content extracted)
- https://www.wisdomlib.org/hinduism/book/padarthadharmasamgraha-and-nyayakandali/d/doc1215519.html
  — Text 157 → `pp.samavaya.1`
- https://www.wisdomlib.org/hinduism/book/padarthadharmasamgraha-and-nyayakandali/d/doc1215520.html
  — Text 158 → `pp.samavaya.2`
- https://www.wisdomlib.org/hinduism/book/padarthadharmasamgraha-and-nyayakandali/d/doc1215521.html
  — Text 159 → `pp.samavaya.3`
- https://www.wisdomlib.org/hinduism/book/padarthadharmasamgraha-and-nyayakandali/d/doc1215522.html
  — Text 160 → `pp.samavaya.4`
- https://www.wisdomlib.org/hinduism/book/padarthadharmasamgraha-and-nyayakandali/d/doc1215523.html
  — Text 161 → **SKIPPED, see below**

Cross-check reference (NOT pulled from in this pass; deferred to śāstrika
verification phase):

- https://archive.org/details/padarthadharmasangrahaofprasastapadawithnyayakandaliofsridharaed.ganganathajhachowkambha_202003_711_W
  — scanned PDF of the printed Ganganatha Jha edition (Chowkhamba). The
  proper authority for proofing both the Devanagari/IAST of the mūla and
  the Sanskrit of the Nyāyakandalī commentary.

## Counts per text

| file                                          | records | wisdomlib texts covered |
| --------------------------------------------- | ------- | ----------------------- |
| `content/sources/prashastapada/samavaya.json` | 4       | Texts 157, 158, 159, 160 |
| `content/sources/nyayakandali/samavaya.json`  | 0       | (none — see below)      |

## Why `nyayakandali/samavaya.json` is empty

The wisdomlib pages render Śrīdhara's *Nyāyakandalī* commentary **only as
an English rendering**. The Devanagari and IAST of Śrīdhara's text are
not reproduced on these pages. Inventing a Sanskrit source from the
English would be a P0 violation of the Vision (Part I.2) and of
`docs/AUTHORING.md` "Forbidden moves" — fabricated Sanskrit is the
worst possible failure for this corpus.

The schema (`SourcePassage`) requires both `sa_devanagari` and `sa_iast`
to be non-empty strings, and `content/sources/README.md` specifies that
the Devanagari come from a printed edition with two-pass review.

**Next step for the śāstrika:** ingest Nyāyakandalī passages from the
archive.org scan (or another printed edition), proof the Devanagari
character-by-character, derive IAST mechanically, and adopt
Ganganatha Jha's English rendering for `literal_en`. Suggested locator
scheme (per `content/sources/README.md`): `gloss.samavaya.1`,
`gloss.samavaya.2`, …, anchored to the relevant Praśastapāda passages.

## Passages skipped

### Text 161 (wisdomlib doc1215523) — entire passage skipped

Reason: **the page is malformed**. The Devanagari and IAST blocks for
Text 161 begin with a verbatim duplicate of the entirety of Text 160
(opening `ननु यद्येकः समवायो …` / `nanu yadyekaḥ samavāyo …`), followed
by an empty section marker `|| ||`, followed by the genuine Text 161
mūla beginning `सम्बन्धनित्यत्वेऽपि …` / `sambandhanityatve'pi …`. The
Devanagari block furthermore closes with `॥ १६० ॥` (the section number
that appears in the printed source for Text 160) while the IAST block
closes with `|| 161 ||`. The trailing colophons (`इति प्रशस्तपादभाष्ये
समवायपदार्थः समाप्तः`, the closing benedictory verse
`योगाचारविभूत्या यस्तोषयित्वा महेश्वरम् …`, and `इति प्रशस्तपादविरचितं
द्रव्यादिषट्पदार्थभाष्यं समाप्तम्`) are present after the body.

Recovering the genuine Text 161 mūla from this page requires an
editorial choice about where the duplication ends — a decision that
should be made by a śāstrika against the printed edition, not by an
ingestion agent. Per `docs/AUTHORING.md`, fabricated or
editorially-stitched Sanskrit must not enter the corpus.

The English rendering of Text 161 on the page is clean and unambiguous;
it begins "Even though the members related are transient, the Inherence
is not transient, like Conjunction; …" through "Thus ends the
Padārthadharmasaṅgraha of Praśastapāda." The śāstrika may use this
English as `literal_en` once a clean Devanagari/IAST is paired with it.

### Chapter intro page (wisdomlib doc1215518) — structural only

This page is a table of contents for Chapter 9 and contains no
extractable source content.

## Character / normalisation decisions

1. **Unicode normalisation:** all strings normalised to NFC.
2. **No invisible characters:** ZWNJ (U+200C), ZWJ (U+200D), BOM
   (U+FEFF), NBSP (U+00A0), ZWSP (U+200B), WJ (U+2060) were audited
   for; none were present in any extracted Devanagari or IAST.
3. **Inline whitespace:** within each paragraph, runs of whitespace
   (including those introduced by HTML tag removal) were collapsed to
   single spaces. Paragraph breaks in the English (rendered as `<p>`
   on the page) are preserved as `\n\n`.
4. **Inline formatting:** wisdomlib wraps glossary terms in `<a>` tags
   and italicises display terms with `<em>`. Per the user instruction
   "Preserve italics as plain text. Do not paraphrase, condense, or
   expand," the inner text of these tags was retained and the tags
   stripped. Some smart-quote / smart-space artefacts from wisdomlib's
   own rendering remain (e.g. a stray space inside `'Samavāya '`); these
   were left verbatim.
5. **Punctuation preserved verbatim:** Sanskrit daṇḍa `।` and double
   daṇḍa `॥`, Devanagari digits, em-dashes `—`, smart quotes `‘ ’ “ ”`
   in the English are kept as they appear on the page.
6. **Devanagari is verbatim from the page,** including what appear to
   be typographical errors in the wisdomlib edition. The śāstrika
   should be aware of (and will likely need to correct against the
   printed edition):
   - Text 157 (`pp.samavaya.1`) Devanagari `गुणकंरणी` and IAST
     `guṇakaṃraṇī` — almost certainly a misprint for `गुणकर्मणी` /
     `guṇakarmaṇī` ("quality and action"). The English rendering on
     the page reads "this, quality and that action are in this
     substance", confirming the intended sense.
   - Text 157 (`pp.samavaya.1`) Devanagari `वायुतसिद्धानाम्` and IAST
     `vāyutasiddhānām` — appears to be a misprint for
     `अयुतसिद्धानाम्` / `ayutasiddhānām` (the same compound that
     opens the section). The English "which are inseparably
     connected" matches *ayutasiddha*, not anything readable as
     `vāyu-`.
   - Text 158 (`pp.samavaya.2`) Devanagari `सम्योगः सं बन्धिनाम्` and
     IAST `samyogaḥ saṃ bandhinām` — the space-break inside `saṃ
     bandhinām` is a wisdomlib typesetting bug; the intended reading
     is `सम्बन्धिनाम्` / `sambandhinām` ("of the related members").
   - Text 159 (`pp.samavaya.3`) IAST `bhāvavalliṅgāviśeṣāt` — Jha's
     English "Inherence has the same distinguishing feature" suggests
     `bhāvavalliṅgāviśeṣāt` (`bhāvavat + liṅgāviśeṣāt`); this looks
     correct, flagged here only because the compound is dense.

7. **English typos preserved verbatim** (do not silently correct):
   - Text 157 (`pp.samavaya.1`) Jha writes "in this pit" where "in
     this pot" is the obvious sense (rendering `कुण्डे` = "in the
     pot"). Recurs in Text 160. Preserved as printed.
   - Text 159 (`pp.samavaya.3`) "with regard io" — likely OCR/typo
     for "with regard to". Preserved.
   - Punctuation in the English is occasionally idiosyncratic in Jha's
     translation (e.g. comma placement around "‘substance ’"). All
     punctuation preserved verbatim.

8. **Wisdomlib in-page section numbers:** kept inside the Devanagari /
   IAST strings as `॥ १५७ ॥` / `|| 157 ||` etc., as they appear on the
   page. The `locator` field uses an independent file-local scheme
   (`samavaya.1` … `samavaya.4`) that monotonically tracks source
   order; this leaves the śāstrika free to renumber against a printed
   edition's section divisions if those differ.

9. **`id` scheme:** `pp.<locator>` (e.g. `pp.samavaya.1`) for
   Praśastapāda; once Nyāyakandalī passages are ingested, `nk.<locator>`
   (e.g. `nk.gloss.samavaya.1`) is the proposed mirror.

## Pages that failed to fetch

None. All six pages (1 chapter index + 5 text pages) fetched cleanly
via raw HTTP. Initial attempts to extract via WebFetch returned a
copyright-conservative refusal; raw HTML was used instead. Jha's 1915
translation is in the public domain (>95 years old).

## Quality concerns for the śāstrika before flipping verified flags

In priority order:

1. **All Devanagari and IAST in `prashastapada/samavaya.json` is
   derived from a single web source (wisdomlib).** It has not been
   collated against the printed Chowkhamba edition. Confirmed
   typographical irregularities are listed in §"Character /
   normalisation decisions" point 6; there may be others.
2. **Text 161 is absent from the corpus.** Re-ingest from the printed
   edition; insert as `samavaya.5` (or renumber the whole sequence to
   match a section division the śāstrika prefers).
3. **No Nyāyakandalī Sanskrit at all.** The commentary section of the
   MVP node currently has nothing to bind to.
4. **No collation against the underlying Vaiśeṣika Sūtra references**
   that Jha cites parenthetically at the end of Text 157 ("(VII-ii-29,
   27, 28; V-ii-23)"). These remain inside `literal_en` verbatim.
5. **Whitespace inside English strings has been collapsed.** The
   original page rendering had wide paragraph spacing that does not
   survive intact; paragraph boundaries (`\n\n`) do.

Once the śāstrika has personally read each Devanagari / IAST / English
triple against a printed edition, the corresponding
`source_refs.verified_by` and `source_refs.verified_at` may be set on
the concept node(s) that bind these passages.
