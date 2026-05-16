# Text 4 — wisdomlib pagination artifact, not a separate passage

## Status

NOT ingested as a separate SourcePassage. The "missing Text 4" in the
ingested corpus is intentional and reflects a difference in pagination
between wisdomlib.org and Jha's printed edition.

## What happened

Wisdomlib paginates Praśastapāda's *Padārthadharmasaṅgraha* such that
the question "Which are the categories, 'substance and the rest'? And
what are their similarities and dissimilarities?" appears on one Text
page (Text 3) and its answer ("Among these the Substances are — Earth,
Water, Light, Air, Ether, Time, Space, Self and Mind…") appears on the
next Text page (Text 4).

Jha's printed edition (Allahabad 1916 / Chowkhamba reprint 1982) does
NOT make this split. Both the question and the answer are presented as
a single numbered passage `Text (3)` in the print:

> *Text (3) Question: "Which are the categories, 'substance and the
> rest'? And what are their 'similarities and dissimilarities'?"
> Answer.—Among these the Substances are—Earth, Water, Light, Air,
> Ether (Ākāśa), Time, Space, Self and Mind. These, mentioned in the
> sūtra by their general as well as specific names, are nine only; as
> besides these none other is mentioned by name.—(I-i-5).*

Wisdomlib's "Text 4" page contains only the answer half of the same
passage. There is no separate sūtra-4 marker in Praśastapāda's Sanskrit
either — the chapter-2 ingestion agent confirmed by inspection that the
wisdomlib Devanagari for the surrounding pages closes with `॥ ३ ॥`
with no `॥ ४ ॥` rendered.

## Decision

The chapter-2 ingestion (`enumeration-of-categories.json`) ingests the
full Q+A passage as `pp.enumeration-of-categories.3`, matching Jha's
print. No `.4` record is created. Wisdomlib's Text 4 page is treated as
duplicate content already covered by `.3`.

This means our corpus contains records `.3, .5, .6, .7, .8, .9, .10`
(skipping `.4`) — which is the *correct* alignment with the printed
edition. The numbering gap is documentation that wisdomlib's Text 4 was
considered and resolved, not that it was overlooked.

## What a Phase-B reviewer should confirm

- Open Jha's printed edition (the PDF at `content/sources/jha_part1.pdf`,
  early pages of Chapter 2) and confirm that Text (3) is a single
  Q+A passage, not split into Q-only and A-only entries.
- Confirm the GRETIL IAST (`content/sources/_reference/gretil/`) shows
  this material as a single section around `Pdhs_2.1(6)` or similar
  (no separate `Pdhs_2.x(4)` reference for the Answer half).

If the printed edition disagrees and there really is a separate Text 4
(it would be surprising but not impossible), this note should be
revisited and `enumeration-of-categories.json` re-cut to two records.
