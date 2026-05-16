# Praśastapāda guṇa — Texts 67 and 68 (PDF gap investigation)

## Goal

Close the wisdomlib-side gap reported by the original chapter-6 agent
(`_ingestion_notes_chapter_6.md` §"Wisdomlib pagination quirk"): wisdomlib
pagination jumps from Text 66 to Text 69 inside chapter 6a, so Jha's
**Texts 67 and 68** (per the wisdomlib / `guna.json` locator scheme,
i.e. `pp.guna.67`, `pp.guna.68`) were skipped. Investigate whether the
Jha printed-edition PDF (`_reference/jha_pdf/`) carries them, and ingest
if so.

User instruction this pass: English (`literal_en`) + Malayalam
(`ml_draft.text`) + simplified English (`en_simple_draft.text`) only.
`sa_devanagari` and `sa_iast` left as `""`. No fabrication permitted.

## PDF range examined

File: `content/sources/_reference/jha_pdf/jha_padarthadharmasamgraha.en.txt`

Window: lines **10206–10300** (the region where the missing texts would
have to live, between PDF `Text (65)` at line 10206 and `Text (71)` at
line 10300).

`Text (N)` markers actually present in this window (lenient regex
allowing `(N)`, `{N)`, `(N};`, etc., to cover OCR drift in the
parenthesis/colon):

```
10166  Text (61):  Conjunction, Disjunction and Speed …
10174  Text (62) : Sound and Secondary Disjunction …
10185  Text {63):  Priority, Posteriority, Duality …
10191  Text {64)-: Colour, Taste, Smell, Non-hot Touch …
10206  Text (65):  Pleasure, Pain, Desire, Aversion and Effort …
10260  Text {68):  Colour, Taste, Smell, Touch, Dimension, Viscidity, Effort …
10267  Text (69);  Conjunction, Disjunction, Number, Single Location …
10300  Text (71):  Colour, Taste, Smell, non-hot Touch, Number, Dimension …
10349  Text (72):  Intellect, Pleasure, Pain, Desire …
```

No `Text (66)`, `Text (67)`, `Text (68)` (in any OCR variant —
`Text (67)`, `Text {67)`, `Text 67`, `Text  67`, etc.) appears between
lines 10206 and 10260 nor anywhere else nearby in the file.

## What is between PDF `Text (65)` and PDF `Text (68)`

A single unnumbered passage introduced by a running page marker:

```
Page 100 ] Conjunction, Disjunction, Number, Gravity, Fluidity,
Hot touch, Knowledge, Virtue, Vice and Faculty are productive of
likes as well as unlikes.
```

— followed by its `Commentary.` block (PDF lines ~10227–10258). That
content is **already ingested** as `pp.guna.66` in `guna.json` (matching
wisdomlib's Text 66 verbatim).

## Numbering offset to wisdomlib

The PDF and wisdomlib disagree on numbering across this region. Content
alignment shows the PDF labels lag the wisdomlib labels by one or more
from Text 66 onward:

| PDF label              | Content matches `guna.json` locator |
| ---------------------- | ----------------------------------- |
| `Text (65)`            | `guna.65` (Pleasure, Pain, Desire, Aversion, Effort) |
| *(no marker; Page 100)*| `guna.66` (Conjunction etc., productive of likes & unlikes) |
| `Text {68)`            | `guna.69` (Colour etc., productive of qualities in other things) |
| `Text (69)`            | `guna.70` (Conjunction etc., productive of qualities in both) |
| *(no marker; Page 101)*| `guna.71` (Gravity etc., causes of actions) |
| `Text (71)`            | `guna.72` (Colour etc., non-material causes) |

So the PDF carries neither
- a passage with the **wisdomlib-numbered Text 67** content, nor
- a passage with the **wisdomlib-numbered Text 68** content,

nor any further passage whose body is unaccounted for in `guna.json`.
The same gap that exists in wisdomlib exists in the Jha printed edition
as transcribed by the OCR'd PDF text. Both editions collapse / merge /
omit two sūtras worth of material here.

## Outcome

**Records produced: 0.**

`content/sources/prashastapada/guna-67-68.json` is committed as an empty
JSON array (`[]`). Fabricating `Text (67)` or `Text (68)` content from
neighbouring passages, from outside sources, or from inference would
violate hard constraint P0-7 ("NEVER fabricate Text 67 or 68 if absent
from the PDF").

## Resolution path (for a future pass, not this one)

To actually recover wisdomlib-numbered `pp.guna.67` and `pp.guna.68`,
a śāstrika needs to consult a different printed edition (e.g. the
Vārāṇasī Sanskrit Series Praśastapāda-bhāṣya with Nyāyakandalī, or
Bronkhorst & Ramseier's critical edition). The Jha 1916/Chaukhambha
1982 lineage as captured in this repo's PDF does not carry them as
standalone sūtras. This may be a genuine edition-family feature (Jha's
edition may number the sūtras differently from the Vārāṇasī edition
the wisdomlib JSON-locator scheme implicitly assumes) rather than an
OCR loss.

A possible reconciliation worth noting (not implemented here, since it
would require shifting locators across the chapter and invalidating
the already-committed `guna.66`/`guna.69`/`guna.70`/`guna.71`/`guna.72`
records): renumber the wisdomlib-locator scheme to track the Jha PDF
numbering, in which case Texts 67 and 68 simply do not exist and the
chapter runs 65 → 66 → (gap of two) → 69. The current locator scheme
should remain stable until that decision is made by a śāstrika.

## Branch

`worktree-agent-aca732731b8c56a64`
