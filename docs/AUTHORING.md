# Authoring

The editorial workflow for *concept nodes*, *source passages*, and *pūrvapakṣa
positions*. Every commit in `content/` touches the platform's primary
deliverable: the fidelity of the corpus.

## Five status states

```
draft → under_review_en → published_en
      ↘ under_review_ml → published_ml
```

A node can have different statuses per depth (the karikā may be `published_en`
while the ṭīkā is still `draft`). The reading view shows each depth
independently.

## Hard rules

1. **No `published_*` without sources.** The Zod schema rejects any node
   where a depth is published but `source_refs` is empty. The cross-reference
   check in `scripts/validate-content.ts` further rejects unresolved locators.
2. **Sanskrit is typed and proofed, never AI-generated.** No exceptions.
   Devanagari in `content/sources/` comes from a printed edition, reviewed
   two-pass. The AI never produces Sanskrit that claims to be from a source.
3. **Provenance per paragraph.** Every paragraph of authored prose carries
   a `provenance` tag in `provenance_per_paragraph`:
   - `traditional` — a direct rendering of source
   - `paraphrase` — faithful re-expression in modern language
   - `bridge` — modern analogy or contextualization
   The reading UI surfaces this as a thin marginal stripe (`globals.css`).
4. **Malayalam is reviewed before publish.** AI drafts are permitted in
   `under_review_ml` only. Transition to `published_ml` requires a
   Malayalam-literate śāstrika sign-off recorded in `source_refs.verified_by`.
5. **Modern analogies require a disanalogy panel.** A `bridge` paragraph that
   makes a comparison to modern science MUST be paired with an explicit
   note of what the comparison falsifies. "Paramāṇu is just like an atom"
   is structurally rejected.

## Workflow

### A new concept node

1. Copy the structure of `content/concepts/samavaya.mdx`.
2. Set `id`, `slug`, `title_sa`, `title_iast`, `title_en`, `title_ml`,
   `rasa_stage`. Leave all depths in `status: draft` and bodies empty.
3. Commit. The node is now invisible to the reading view, visible only
   in the (forthcoming) `/shastrika` console.
4. Author the kārikā first. Bind at least one `source_refs` entry that
   points at a passage already present in `content/sources/`.
5. When ready, change `depths.karika.status` to `under_review_en`.
6. Reviewer approves: set verified_by + verified_at on the relevant
   source_ref, flip status to `published_en`.

### A new source passage

1. Add the Devanagari + IAST + literal English to a JSON file under
   `content/sources/<text_key>/<topic>.json`. Use a stable `id` and a
   text-specific `locator`.
2. `npm run validate:content` to confirm shape.
3. The passage is now available to bind from any concept node.
4. **`verified_by` / `verified_at` stay `null`** until step 4 of the
   Phase B protocol in `content/sources/README.md` is complete (printed-
   edition cross-check). Do NOT flip these flags from a wisdomlib-only
   confirmation — that violates the source-fidelity gate.

### Phase A draft sources (wisdomlib-derived)

The current corpus is being seeded from wisdomlib.org (Jha's translation,
1916, public domain — see `content/sources/README.md`). Wisdomlib-derived
content is fine in `sa_devanagari` / `sa_iast` / `literal_en` for the draft
phase as long as `verified_by` and `verified_at` remain null. The reading
view will not surface anything until those flags are flipped, which
requires the printed-edition cross-check.

If you are writing an ingestion agent or running one: this protocol is
sanctioned. Reference `content/sources/README.md` Phase A from your
prompt so the agent does not refuse on protocol grounds.

### A new pūrvapakṣa position

1. Author against an actual passage. `attestation: attested` if the
   objection is in the named text; `reconstructed` only when the tradition
   defends a position without a single cited locus.
2. File goes to `content/purvapaksa/<school>/<slug>.json` with
   `approved_by_shastrika: false`, `approved_at: null`.
3. Second śāstrika reviews. On approval, flip both flags together
   (one without the other is a schema error).
4. The dialectic engine now sees it via `loadApprovedPurvapaksa()`.

## Forbidden moves

- Editing `published_*` content in place. Demote to `under_review_*` first.
- Listing a source you have not personally verified. `verified_by` is your
  name; `verified_at` is the actual timestamp of verification.
- Substituting a Western philosophical frame for a darśanic category in
  prose. Comparison is welcome (`bridge`); substitution is not.
- Adding a `school` to the enum without shastrika consultation.
