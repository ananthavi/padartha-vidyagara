# Ingestion notes — samavāya `ml_draft` / `en_simple_draft` pass

Status: **drafts only, unreviewed**. This pass adds AI-generated
`ml_draft` (maṇipravāḷam-conscious Malayalam) and `en_simple_draft`
(accessible English alongside Jha) to each of the four existing records
in `content/sources/prashastapada/samavaya.json`. The canonical
`sa_devanagari`, `sa_iast`, `literal_en`, `id`, `text_key`, and
`locator` fields were not touched. `reviewed_by` and `reviewed_at` are
`null` on every rendering; a Malayalam-literate śāstrika has not seen
these drafts.

The companion notes in `_ingestion_notes.md` (the original prior pass)
remain authoritative for the canonical fields, including the list of
suspected typographical irregularities and the absence of Text 161.
Nothing in those notes was edited here; suspected typos were left
verbatim per the brief.

## Scope and constraints honoured

- No edits to canonical fields (Devanagari, IAST, Jha English, id,
  text_key, locator). Verified by drafting the file in a single Write
  with the original canonical strings copied byte-for-byte from the
  prior file.
- No edits to schema, docs, concept nodes, settings, or any other
  agent's territory.
- `npm run validate:content` was run and passes after the changes.

## ml_draft style decisions

The draft uses a maṇipravāḷam register: Sanskrit *termini technici*
stay Sanskrit (rendered in Malayalam script with case-endings adapted
where needed for prose flow), and Malayalam connective prose glosses
around them. Where the technical term is the *whole point* of a
clause, I leave it bare and append the Malayalam gloss in parentheses
on first introduction, so a reader who already knows the term is not
slowed by re-explanation.

### Terminology table for the samavāya passages

| Sanskrit            | Malayalam-script form    | Glossed (first occurrence) as                              |
| ------------------- | ------------------------ | ---------------------------------------------------------- |
| dravya              | ദ്രവ്യം                  | (kept bare — known from Ch. 1)                             |
| guṇa                | ഗുണം                     | (kept bare)                                                |
| karma               | കർമ്മം                   | (kept bare)                                                |
| sāmānya             | സാമാന്യം                 | (kept bare; "general character" implicit)                  |
| viśeṣa              | വിശേഷം                   | (kept bare in the doctrinal sense)                         |
| samavāya            | സമവായം                   | (NEVER glossed in-text — vision Part I.4)                  |
| paramāṇu / dvyaṇuka | ദ്രവ്യാദി context — n/a here                                                          |
| ātman / manas       | n/a in these passages                                                                  |
| saṃyoga             | സംയോഗം                   | (kept bare; contrastive role with samavāya carries gloss)  |
| ayutasiddha         | അയുതസിദ്ധം               | "(പരസ്പരം വേർപെടാത്ത)" — "incapable of standing apart"     |
| sambandha           | സംബന്ധം                  | (kept bare)                                                |
| kāraṇa / kārya      | കാരണം / കാര്യം           | (kept bare)                                                |
| abhāva              | n/a in these passages                                                                  |
| ādhāra / ādheya     | ആധാരം / ആധേയം            | "(ആധാരം ഏതാണ് ആധേയം ഏതാണ് എന്നതിന് നിയമം)"                 |
| ādhārya / ādhāra    | ആധാര്യം / ആധാരം          | rendered as a -bhāva compound, gloss "(ആധാര്യ-ആധാരഭാവം)"   |
| iha-pratyaya        | ഇഹപ്രത്യയം               | "'ഇതില്‍ ഇത് ഉണ്ട്' എന്ന ഇഹപ്രത്യയം"                         |
| aviṣvagbhāva        | അവിഷ്വഗ്ഭാവം             | "(വേർപെടാത്ത ഏകീഭാവം)" — "non-divergent togetherness"      |
| asarvagata          | അസർവഗതം                  | "(എല്ലായിടത്തും വ്യാപിക്കാത്തവ)"                              |
| anvaya / vyatireka  | അന്വയം / വ്യതിരേകം       | "(ഉള്ളയിടത്ത് ഉണ്ടാകുന്നു, ഇല്ലാത്തിടത്ത് ഇല്ല)"               |
| pratiniyama         | പ്രതിനിയമം               | "(പരസ്പര-നിയന്ത്രണം)"                                       |
| sattā / bhāva       | സത്ത / ഭാവം              | "സത്ത (ഭാവം)" / "ഭാവം (സത്ത)"                              |
| dravyatva, guṇatva, karmatva | ദ്രവ്യത്വം മുതലായവ | (kept bare; English column glosses as "substance-ness")    |
| vyaṅgya-vyañjaka-śakti       | വ്യങ്ഗ്യ-വ്യഞ്ജക-ശക്തിഭേദം | "(പ്രകടിപ്പിക്കപ്പെടുന്നതും പ്രകടിപ്പിക്കുന്നതും ആകാനുള്ള സാമർത്ഥ്യങ്ങളിലെ വ്യത്യാസം)" |
| padārtha-saṅkara              | പദാർത്ഥസങ്കരം            | "(പദാർത്ഥങ്ങള്‍ പരസ്പരം കൂടിക്കലരുന്ന ദോഷം)"                |

### Specific Malayalam phrasing choices

- **ayutasiddha**: rendered "അയുതസിദ്ധം" with first-use gloss "(പരസ്പരം
  വേർപെടാത്ത)". This is the central concept of Text 157, so I gloss
  every fresh occurrence near a high-information clause rather than
  only on first introduction.
- **ādhāryādhārabhūta / ādhārādheya**: I used the contemporary
  Malayalam discursive form "ആധാര-ആധേയ" for the *ādhārādheya-niyama*
  argument (Text 160). For Text 157's "ādhāryādhārabhūta" I kept the
  exact Sanskrit compound "ആധാര്യ-ആധാരഭാവം" since the kārikā is using
  it as a compound-name and replacing it would obscure the technical
  move.
- **adhikaraṇa-adhikartavya** (Text 158): preserved in Malayalam script
  with parenthetical gloss "(ആധാരത്തിന്റെയും ആധേയത്തിന്റെയും)" because
  the gloss inside the source itself (the four-reason proof) makes
  clear this is shorthand for ādhāra/ādheya in this context.
- **iha-pratyaya** vs. **iha-iti-pratyaya**: kept "ഇഹപ്രത്യയം" / "'ഇഹ'
  എന്ന പ്രത്യയം" depending on rhythm. The form "ഇഹേദം" was used once,
  as a quoted technical term ("ഇഹേദം എന്ന ബുദ്ധി"), matching Jha's
  treatment in English.
- **kāraṇa-kārya / kārya-kāraṇa**: I followed the order of the source
  ("കാര്യ-കാരണഭാവം") rather than normalising to a single convention.

## en_simple_draft style decisions

- Single short paragraph per Text (Text 160 runs a little longer
  because the pūrvapakṣa-siddhānta dialectic is structurally compound;
  the alternative was splitting it, which obscures the unity of the
  reply). Termini technici are italicised Sanskrit with parenthetical
  glosses on first occurrence within each Text. The drafts are
  intended to be read **beside** Jha, not instead of him: I preserve
  Jha's argument structure and his examples (curd-in-pot, cloth-in-
  threads, mat-in-reeds) verbatim or near-verbatim while spelling out
  the technical machinery he leaves compact.
- Where Jha leaves a technical term un-introduced (e.g. *iha-pratyaya*
  is implicit in his "the notion that 'this subsists in that'"), I
  introduce the Sanskrit explicitly the first time so the reader can
  carry it forward across the four Texts.
- I kept Jha's "pit" verbatim (it appears in `literal_en`) — the prior
  notes flag this as a likely typo for "pot"; the simple draft uses
  "pot" because (a) the Sanskrit is `kuṇḍa` "pot", (b) `literal_en`
  remains canonical and untouched, and (c) the simple draft is
  explicitly a re-rendering, not a copy.

## Lowest-confidence phrasings (śāstrika please review these first)

1. **Text 157 ml_draft, gloss of "अधिगतान्यत्वानाम् अविष्वग्भावः"** as
   "അന്യത്വം അറിയപ്പെട്ടവയുടെ അവിഷ്വഗ്ഭാവം (വേർപെടാത്ത ഏകീഭാവം)".
   Jha renders this with "the interdependence of things of limited
   extension upon something else, from which they are known to be
   different," which I find compressed even in his English. My gloss
   "non-divergent togetherness of things whose distinctness is yet
   known" is a tentative reading; a śāstrika should fix the Malayalam
   here against Śrīdhara's commentary in particular.
2. **Text 160 ml_draft, gloss of "व्यङ्ग्यव्यंजकशक्तिभेदाद्"** as
   "(പ്രകടിപ്പിക്കപ്പെടുന്നതും പ്രകടിപ്പിക്കുന്നതും ആകാനുള്ള
   സാമർത്ഥ്യങ്ങളിലെ വ്യത്യാസത്താല്‍)". The vyaṅgya/vyañjaka pair has a
   rich technical life in alaṅkāra-śāstra; here it is being used in a
   strictly Vaiśeṣika ādhāra-ādheya context, and my Malayalam gloss
   ("manifestable / manifester") is a bare etymological calque that
   may understate how Praśastapāda is using it. The English draft
   leaves the term in Sanskrit and glosses minimally for the same
   reason.
3. **Text 159 en_simple_draft**, the phrase "*samavāya* must be a sixth
   thing, distinct from the five it relates" — I'm confident the
   doctrinal point is right (samavāya is the sixth padārtha alongside
   dravya/guṇa/karma/sāmānya/viśeṣa), but the locution "sixth thing"
   is mine, not Jha's; the śāstrika may prefer a more conservative
   "another *padārtha*, distinct from these five".
4. **Text 158 ml_draft**, reason (2): "അന്യതരകർമ്മാദി-നിമിത്തം
   അസംഭവമാണ്". The compound `anyatarakarmādinimitta` packs three
   alternatives (motion of one relatum / of both / of an external
   cause) in Vaiśeṣika; I summarised as "motion of one of the
   relata," following Jha's surface English. A fuller gloss naming all
   three nimittas might be desirable in the published Malayalam.

## Verification

- `npm install` ran cleanly (background).
- `npm run validate:content` ran cleanly post-edit. Schema accepts the
  new `ml_draft` and `en_simple_draft` blocks as `PassageRendering`
  with `reviewed_by`/`reviewed_at` both `null`; the canonical fields
  are unchanged.

## Branch

`worktree-agent-a0492ede373f059a4`.
