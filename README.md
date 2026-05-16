# Padārtha-Vidyāgāra

A contemplative bilingual (English + Malayalam) web environment for the study of
Praśastapāda's *Padārthadharmasaṅgraha* with Śrīdhara Bhaṭṭa's *Nyāyakandalī*.

> Read [`docs/VISION.md`](./docs/VISION.md) before writing a single line of code.
> Every later technical decision is downstream of Part I.

## Status

Foundation pass. Schema, content pipeline, and locale routing scaffold are in place.
No published content yet — the MVP target is the *samavāya* node (Part X).

## Quickstart

```bash
npm install
npm run dev               # next dev
npm run validate:content  # runs Zod validation over content/concepts/*.mdx
npm run typecheck
```

The content pipeline validates every concept node's frontmatter against
`src/lib/schema.ts` on `next build`. Nodes without populated `source_refs`
cannot have any depth in `published_*` status. This is enforced by the
schema, not by hope (see vision Part I, commitment 2).

## What this is not

- Not an edtech product.
- Not a CMS-backed content site (content lives in version-controlled MDX).
- Not gamified. There are no streaks, badges, leaderboards, or progress bars
  in the reading view. See `docs/VISION.md` Part XI.

## What this is

A contemporary commentarial layer in service of a lineage that runs
Praśastapāda → Śrīdhara → Udayana → Vallabha → forward.

*Oṁ tat sat.*
