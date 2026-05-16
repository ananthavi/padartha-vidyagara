# Architecture

This document maps the engineering surface to the vision's commitments.
Read `docs/VISION.md` first. If anything below diverges from the vision,
the vision wins.

## Layout

```
app/                           # Next.js App Router
  page.tsx                     # redirect → /en
  layout.tsx                   # three-script font wiring
  globals.css                  # tailwind + provenance-stripe utilities
  [locale]/
    layout.tsx                 # validates locale, frames the reading column
    page.tsx                   # praveśa entry (placeholder for opening sequence)
    concept/[slug]/page.tsx    # reading view (depth render arrives via fanout)
src/
  lib/
    schema.ts                  # Zod schemas — the fidelity backbone (Part VIII)
    content.ts                 # loaders that validate before returning
    status.ts                  # publish-gating helpers
scripts/
  validate-content.ts          # build-time gate; fails the build on violations
content/
  concepts/                    # MDX, frontmatter validated against ConceptNode
  sources/                     # JSON SourcePassage records, keyed by text+locator
  purvapaksa/                  # JSON PurvapaksaPosition records, gated by approval
docs/
  VISION.md
  ARCHITECTURE.md              # (this file)
  AUTHORING.md                 # editorial workflow
  ROADMAP.md                   # fanout tracks
```

## Where each commitment is enforced

| Commitment (vision Part I)                  | Enforced in                                                                |
| ------------------------------------------- | -------------------------------------------------------------------------- |
| 2. No drop in traditional content           | `ConceptNode.superRefine` requires source_refs for any published depth     |
| 2. Sourced AI utterances                    | `loadApprovedPurvapaksa()` filters dialectic engine input                  |
| 3. No interference (no progress bars, etc.) | Reading view layout; UI components must avoid streak/badge/quiz patterns  |
| 4. Sanskrit primary                         | `title_sa` and `title_iast` are required on every node                     |

## Content pipeline

1. Author writes / edits MDX or JSON.
2. `npm run validate:content` runs Zod schemas across `content/`.
3. Cross-reference check: every `source_refs.locator` must resolve to a
   `SourcePassage` (once the source corpus has any entries for that
   `text_key`). Unresolved → build failure.
4. Reading view consumes `loadPublishedConcepts(locale)` only.
   Drafts and review states are invisible outside the authoring console.
5. Dialectic engine consumes `loadApprovedPurvapaksa()` only.

## Locale strategy

- Routing: `/{locale}/...` with `locale ∈ {en, ml}`.
- Sanskrit is **not** a locale. It is embedded content surfaced in every
  view regardless of toggle (Part VII).
- Locale switcher should hide `ml` until at least one node has a
  `published_ml` depth (use `availableLocales()` in `lib/status.ts`).

## What lives in client vs server

- Reading view: server-rendered. Fast first paint, no JS shell.
- Pūrvapakṣin dialogue: client component (uses Claude API via a server route).
- Visualizations: SVG inline where possible (server), Framer Motion for
  motion primitives that disclose doctrinal distinctions only.
- Authoring console (`/shastrika`, not yet built): server-rendered with
  client islands for the editor. Stays separate from the reading shell so
  it cannot leak draft content.

## Open architectural choices to confirm

- **Hosting**: the vision flags data residency. Vercel by default; revisit
  once we have learner data (private *svādhyāya*).
- **Audio**: static MP3/OGG behind a CDN. No streaming protocol yet — recitation
  files are minutes, not hours.
- **Persistence**: SQLite for MVP per Part IX. Wire only when we ship the
  *svādhyāya* notebook.
