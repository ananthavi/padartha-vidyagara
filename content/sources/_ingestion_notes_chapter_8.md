# Ingestion notes — Chapter 8 (Viśeṣa)

Status: **first-pass, unverified**. The single record in
`content/sources/prashastapada/vishesha.json` was extracted by an AI agent
from a derived web source. No śāstrika has reviewed the Devanagari, IAST,
or English. `source_refs.verified_by` and `source_refs.verified_at` MUST
remain `null` on every node binding this passage until two-pass review
against a printed edition (see `content/sources/README.md` §"Ingestion
protocol", point 2).

The accompanying `ml_draft` and `en_simple_draft` are AI-generated
renderings, never canonical. `reviewed_by` and `reviewed_at` on each
rendering are `null` and MUST remain so until a Malayalam-literate
śāstrika (for `ml_draft`) and a content reviewer (for `en_simple_draft`)
sign off. The reading view filter `isRenderingReviewed()`
(`src/lib/schema.ts`) keeps both renderings invisible until then.

## Chapter / slug

| field   | value                                  |
| ------- | -------------------------------------- |
| chapter | 8                                      |
| title   | On Viśeṣa                              |
| slug    | `vishesha`                             |
| locator | `vishesha.1` (single passage)          |
| id      | `pp.vishesha.1`                        |

## Sources visited

Primary (extracted from):

- https://www.wisdomlib.org/hinduism/book/padarthadharmasamgraha-and-nyayakandali
  — table of contents, identified Chapter 8 "On Viśeṣa"
- https://www.wisdomlib.org/hinduism/book/padarthadharmasamgraha-and-nyayakandali/d/doc1215516.html
  — chapter index page (structural, no content extracted)
- https://www.wisdomlib.org/hinduism/book/padarthadharmasamgraha-and-nyayakandali/d/doc1215517.html
  — Text 156 → `pp.vishesha.1`

Cross-check reference (NOT pulled from in this pass; deferred to śāstrika
verification phase):

- https://archive.org/details/padarthadharmasangrahaofprasastapadawithnyayakandaliofsridharaed.ganganathajhachowkambha_202003_711_W
  — scanned PDF of the printed Ganganatha Jha edition (Chowkhamba). The
  proper authority for proofing both the Devanagari/IAST of the mūla and
  the Sanskrit of the Nyāyakandalī commentary.

## Counts per text

| file                                            | records | wisdomlib texts covered |
| ----------------------------------------------- | ------- | ----------------------- |
| `content/sources/prashastapada/vishesha.json`   | 1       | Text 156                |
| `content/sources/nyayakandali/vishesha.json`    | —       | (file not created)      |

The 25-passage cap was not approached; the chapter contains exactly one
text section in the wisdomlib edition (the chapter index page lists only
"Text 156: On Viśeṣa", and the body of doc1215517 is one continuous
passage closing with `॥ १५६ ॥ ... इति प्रशस्तपादभाष्ये विशेषपदार्थः
समाप्तः`). No deferral.

## Why `nyayakandali/vishesha.json` was NOT created

The wisdomlib page renders Śrīdhara's *Nyāyakandalī* commentary on Text
156 **only as an English rendering** (under the heading "Commentary: The
Nyāyakandalī of Śrīdhara"). The Devanagari and IAST of Śrīdhara's
text are not reproduced on the page. The deliverable spec for this
ingestion ("`content/sources/nyayakandali/<slug>.json` — only if
Devanagari on wisdomlib") therefore excludes this file. Inventing a
Sanskrit source from the English would be a P0 violation of the Vision
(Part I.2) and of `docs/AUTHORING.md` "Forbidden moves" — fabricated
Sanskrit is the worst possible failure for this corpus.

The schema (`SourcePassage`) further requires both `sa_devanagari` and
`sa_iast` to be non-empty strings, and `content/sources/README.md`
specifies that the Devanagari come from a printed edition with two-pass
review.

**Next step for the śāstrika:** ingest the Nyāyakandalī passage on
viśeṣa from the archive.org scan (or another printed edition), proof
the Devanagari character-by-character, derive IAST mechanically, and
adopt Ganganatha Jha's English rendering of the commentary for
`literal_en`. Suggested locator scheme (per `content/sources/README.md`):
`gloss.vishesha.1`, `gloss.vishesha.2`, …, anchored to the Praśastapāda
passage `pp.vishesha.1`.

## Character / normalisation decisions

Inherits the same conventions as the samavāya pass (see
`_ingestion_notes.md` §"Character / normalisation decisions"). Specifics
for this chapter:

1. **Unicode normalisation:** NFC. All strings audited.
2. **No invisible characters:** ZWNJ (U+200C), ZWJ (U+200D), BOM
   (U+FEFF), NBSP (U+00A0), ZWSP (U+200B), WJ (U+2060) — none present
   in the extracted Devanagari or IAST.
3. **Inline whitespace:** runs of whitespace collapsed to single
   spaces within each paragraph. Paragraph breaks in the English
   (five `<p>` blocks in the body) preserved as `\n\n`.
4. **Inline formatting:** wisdomlib wraps every paragraph of Text 156's
   English (except the closing `(I-ii-6)` mention) in `<em>` tags; it
   also wraps glossary terms in `<a>` tags. Per the Vision Part I
   commitment to "no drop in traditional content," the inner text was
   retained verbatim and the tags stripped. The trailing
   `</em><em> </em>|| 156 ||` in the IAST block was rendered as
   `samāptaḥ || 156 ||` (single space) after tag-stripping.
5. **Punctuation preserved verbatim:** Devanagari daṇḍa `।`, double
   daṇḍa `॥`, Devanagari digits `१५६`, the doubled daṇḍa `।।` that
   appears mid-passage just before `इति प्रशस्तपादभाष्ये`, em-dashes
   `—`, smart quotes `‘ ’ “ ”` in the English are kept as printed.
6. **Devanagari is verbatim from the page.** I did not detect any
   evident typographical irregularities in this chapter analogous to
   those in Chapter 9 (samavāya). The śāstrika should still confirm
   against the printed edition.

7. **English typos preserved verbatim** (do not silently correct):
   - "such f.i. as" — abbreviation for "for instance," preserved as
     printed.
   - "(4)that it has a 'fat hump,'" — missing space after the
     parenthesis; preserved.
   - "e.g, the lamp" — comma where a period is expected after "e.g";
     preserved.
   - "the cognitions that a certain, thing brings about" — stray
     comma; preserved.
   - "those causes by reason whereof they have such distinct
     cognitions.—" — period before em-dash; preserved.
   - "&c." (ampersand abbreviation for "etc.") appears twice;
     preserved.

8. **Wisdomlib in-page section number:** kept inside the Devanagari /
   IAST strings as `॥ १५६ ॥` / `|| 156 ||` as it appears on the page.
   The `locator` field uses the slug-local scheme `vishesha.1` per the
   ingestion brief; this leaves the śāstrika free to renumber against a
   printed edition's section divisions if those differ.

9. **`id` scheme:** `pp.<locator>` = `pp.vishesha.1`. Mirrors the
   convention proposed for Nyāyakandalī (`nk.gloss.vishesha.1`).

10. **Vaiśeṣika-sūtra cross-reference:** Jha's English closes with
    `(I-ii-6)`. This is a reference to Vaiśeṣika-sūtra I.ii.6
    ("Final Species excluded"). It is preserved inside `literal_en`
    verbatim, exactly as printed.

## Terminology decisions (ml_draft, en_simple_draft)

Adhered to the glossary specified in the ingestion brief (Sanskrit
termini technici never translated; rendered in Malayalam script in
`ml_draft`, italicised Sanskrit in `en_simple_draft`):

- *viśeṣa* → വിശേഷം (ml); *viśeṣa* / *antya-viśeṣa* (en)
- *paramāṇu* → പരമാണു (ml); *paramāṇu* (en)
- *ākāśa* → ആകാശം (ml); *ākāśa* (en)
- *kāla* → കാലം (ml); *kāla* (en)
- *dik* → ദിക് (ml); *dik* (en)
- *ātman* → ആത്മാ (ml); *ātman* (en)
- *manas* → മനസ്സ് (ml); *manas* (en)
- *dravya* → ദ്രവ്യം (ml); *dravya* (en)
- *guṇa* → ഗുണം (ml); *guṇa* (en)
- *karma* → കർമ്മം (ml, glossed as ക്രിയ where Jha uses "action" in the
  bull example to match the printed sense); *karma* (en)
- *saṃyoga* → സംയോഗം (ml); *saṃyoga* (en)

Additional technical Sanskrit terms transliterated (Malayalam script in
`ml_draft`, italicised in `en_simple_draft`), gloss around but never
translated:

- *antya-viśeṣa* (the chapter's defining compound, "ultimate
  individuality")
- *pratyabhijñāna* ("recognition of identity at different time/place")
- *yogaja-dharma* ("merit born of yogic practice")
- *tādātmya* ("identity of nature")
- *vyāvṛtti* / *vyāvṛttibuddhi* ("differentiating cognition")
- *bhāṣya* (when naming Praśastapāda's *Bhāṣya* at the closing
  colophon)

The `ml_draft` is stylistically *manipravalam-conscious
traditional-simple*: Malayalam syntactic frame, technical Sanskrit
terms kept in Sanskrit, sandhi-light register so a modern Malayalam
reader can follow without losing the *śāstra* vocabulary. The
`en_simple_draft` is stylistically *traditional-simple*: accessible
academic English alongside Jha (never replacing Jha's `literal_en`),
italicised Sanskrit termini technici preserved.

## Pages that failed to fetch

None. Both pages (1 chapter index + 1 text page) fetched cleanly via
raw HTTP. Initial attempts to extract via WebFetch returned a
copyright-conservative refusal; raw HTML was used instead. Jha's 1915
translation is in the public domain (>95 years old).

## Quality concerns for the śāstrika before flipping verified flags

In priority order:

1. **The Devanagari and IAST in `prashastapada/vishesha.json` is
   derived from a single web source (wisdomlib).** It has not been
   collated against the printed Chowkhamba edition. The text is
   dense and technical; even an absence of visible typos does not
   substitute for a two-pass proof against the printed source.
2. **No Nyāyakandalī Sanskrit at all** for this chapter (see §"Why
   `nyayakandali/vishesha.json` was NOT created"). The commentary
   layer of a future viśeṣa concept node currently has nothing to
   bind to.
3. **No collation against the underlying Vaiśeṣika Sūtra reference**
   `(I-ii-6)` that Jha cites at the close of the passage. The
   reference is preserved inside `literal_en` verbatim and should be
   confirmed against the Vaiśeṣika-sūtra editions on śāstrika review.
4. **`ml_draft` and `en_simple_draft` are AI first-drafts.** Both
   carry their `reviewed_by`/`reviewed_at` as `null`. The reading
   view will not surface either rendering until those fields are
   populated (`isRenderingReviewed()` in `src/lib/schema.ts`).
5. **Whitespace inside English strings has been collapsed.** Paragraph
   boundaries (`\n\n`) are preserved (five paragraphs, matching the
   five `<p>` blocks in the page body).

Once the śāstrika has personally read the Devanagari / IAST / English
triple against a printed edition, the corresponding
`source_refs.verified_by` and `source_refs.verified_at` may be set on
the concept node(s) that bind `pp.vishesha.1`.
