# Deployment

Padārtha-Vidyāgāra ships with three deployment recipes. All are tested
against the current corpus; choose by feature-set.

| Target | Reading view | Praveśa | Visualization | Pūrvapakṣin API | Śāstrika console |
|---|:---:|:---:|:---:|:---:|:---:|
| GitHub Pages (static) | ✓ | ✓ | ✓ | ✗ | ✗ (intentional) |
| Cloudflare Pages — static mode | ✓ | ✓ | ✓ | ✗ | ✗ (intentional) |
| Cloudflare Pages — SSR mode | ✓ | ✓ | ✓ | ✓ | optional (gate behind auth) |
| **Vercel** — Next.js native | ✓ | ✓ | ✓ | ✓ | optional (gate behind auth) |

The pūrvapakṣin API needs a server runtime. The śāstrika console is
intentionally excluded from static public deploys (vision Part VI calls
for authentication before the console is reachable). For SSR-capable
targets it can ship behind an auth gate.

**Recommended for production**: **Vercel** — it is Next.js's home host,
needs no adapter, supports the entire feature set out of the box, and
its free tier covers this site's expected traffic. Cloudflare Pages SSR
is the second-best choice; GitHub Pages is for a static archive of the
reading-only view.

## Vercel

The path of least friction. Vercel maintains Next.js, so the build
pipeline understands every feature this app uses (server components,
streaming SSE from `/api/purvapakshin`, `next/font` typography,
`generateStaticParams`) without adapters or build-command tweaks.

### One-time setup (3–4 minutes)

1. **Create a Vercel account** at https://vercel.com if you don't have
   one. Sign in with the GitHub account that owns this repository.
2. **Import the project**: Vercel dashboard → *Add New* → *Project* →
   pick `padartha-vidyagara`. The "Production Branch" selector should
   point at `main` (Vercel will offer your current default; change it
   if needed).
3. **Framework preset**: Vercel auto-detects *Next.js*. Leave the build
   defaults — they match this repo's `package.json` scripts:
   - Build command: `npm run build` (which runs
     `npm run validate:content && next build`)
   - Output directory: `.next` (auto-detected)
   - Install command: `npm install`
   - Node version: `20.x` (default; matches the GH Actions workflow)
4. **Environment variables** — add at least one provider key. The
   pūrvapakṣin route returns 503 without one, so the build still
   succeeds, but live dialogue needs:
   - `ANTHROPIC_API_KEY` (uses `claude-sonnet-4-6`), and/or
   - `GEMINI_API_KEY` (uses `gemini-pro-latest`)
   - Optional: `LLM_PROVIDER=anthropic|gemini` to pin a specific
     provider regardless of which keys are present.
   Mark them as *Production* + *Preview* + *Development* if you want
   preview deploys (per PR) to have access too. Marking as *Production*
   only is safer if you'd rather not burn LLM credits on every preview.
5. **Deploy**. The first build takes ~2–3 minutes. Subsequent pushes
   to `padartha-vidyagara` trigger automatic deploys; PRs against it
   get isolated preview URLs.

### Domain

By default Vercel gives you `<project>-<team>.vercel.app`. To use a
custom domain (e.g. `padarthavidyagara.org`):

- Vercel dashboard → Project → *Settings* → *Domains* → add the domain.
- Set the DNS records Vercel shows you at your registrar. Vercel issues
  the TLS certificate automatically (Let's Encrypt-backed).
- Vercel handles the apex/`www` redirect either way you configure it.

`NEXT_PUBLIC_BASE_PATH` is **not needed** for Vercel deploys (unlike
GitHub Pages project-pages). The app lives at root.

### Śāstrika console — gating the authoring surface

The `/shastrika/*` subtree is left intact on Vercel by default (no
`rm` step like the GH Pages workflow does), because Vercel can run
the server components it needs. But the vision (Part VI) calls for
authentication. Three options, weakest to strongest:

1. **Vercel Deployment Protection — Password** *(Vercel Pro, paid)*:
   Dashboard → Project → *Settings* → *Deployment Protection* → enable
   *Password Protection*. Set one shared password. Anyone hitting any
   route on this deployment is challenged. Simple, blunt, but blocks
   the reading view too — only useful if you want the entire site
   private during evaluation.
2. **Vercel Authentication (SSO)** *(Vercel Pro/Enterprise)*: same
   panel, *Vercel Authentication*. Allows specific email addresses
   (Google/SAML/etc.) through. Still blocks the entire deployment.
3. **Middleware-based path-prefix gate** *(works on free tier)*:
   Add `middleware.ts` at the repo root that requires a session
   cookie or a `Bearer` token only on `/shastrika/*`. The reading
   view stays public; the console stays gated. This is the
   recommended pattern for free-tier deploys until vision Part VI's
   full auth-and-roles model lands. Sketch (not yet committed to
   the repo — add when you actually need the console live):

   ```ts
   // middleware.ts (sketch)
   import { NextResponse } from 'next/server';
   import type { NextRequest } from 'next/server';

   export function middleware(req: NextRequest) {
     if (!req.nextUrl.pathname.startsWith('/shastrika')) {
       return NextResponse.next();
     }
     const auth = req.headers.get('authorization');
     const expected = `Bearer ${process.env.SHASTRIKA_TOKEN}`;
     if (auth !== expected) {
       return new NextResponse('shastrika', {
         status: 401,
         headers: { 'WWW-Authenticate': 'Bearer realm="shastrika"' },
       });
     }
     return NextResponse.next();
   }
   export const config = { matcher: '/shastrika/:path*' };
   ```

   Set `SHASTRIKA_TOKEN` as a Vercel env var. A reviewer hits the
   console with a bearer-token-capable client (curl, an extension)
   or you replace this with a real session-based gate when needed.

### Preview deployments

Every PR opened against the production branch gets its own preview URL
of the form `<branch-slug>-<project>.vercel.app`. Useful for śāstrika
review of new concept-node authoring without touching production. The
preview honors the same env vars as production unless you've scoped
them differently.

### Vercel CLI alternative

If you prefer not to connect the repo to Vercel and only want occasional
deploys (e.g. for a single demo):

```bash
npm install -g vercel
vercel login
cd /path/to/repo
vercel              # interactive — pick org, project name, defaults
vercel --prod       # promotes the current state to production
```

The CLI uses the same auto-detected Next.js settings.

### `vercel.json`

A minimal `vercel.json` at the repo root documents the build intent so
the dashboard settings are reproducible. It carries no behaviour the
dashboard couldn't set itself, but it makes the configuration
version-controlled.

### Cost

For this site's expected traffic (low, contemplative, no analytics
chasing engagement), the Vercel **Hobby (free)** tier is sufficient:
100 GB bandwidth/month, unlimited static requests, a sensible quota of
server-component executions. The LLM calls themselves are billed by
Anthropic / Google, not by Vercel. If you go beyond Hobby (custom
domain on a team account, multiple seats, Deployment Protection), the
**Pro** tier is $20/month per seat.

### What the deploy actually contains on Vercel

Verify locally before pushing:

```bash
# SSR build — matches what Vercel produces
npm run build
# Then locally serve it (or use Vercel CLI for a parity preview)
vercel build && vercel dev
```

The route table should show:

| Route | Mode | What it is |
|---|---|---|
| `/` | static | redirect → `/en` |
| `/[locale]` | SSG | praveśa entry (`en`, `ml`) |
| `/[locale]/concept/[slug]` | SSG | reading view for `dravya`, `guṇa`, `karma`, `sāmānya`, `viśeṣa`, `samavāya` — 6 concepts × 2 locales = 12 pages |
| `/[locale]/read` | SSG | corpus TOC |
| `/[locale]/read/[text]/[chapter]` | SSG | 40 chapter pages (20 chapters × 2 locales) |
| `/visualizations/samavaya` | static | the SVG demo |
| `/api/purvapakshin` | server function | the dialectic engine route |
| `/shastrika/*` | server function | authoring console (gate per above) |

That's the full feature surface, live, with the engine reachable.

---

## GitHub Pages

A workflow at `.github/workflows/deploy-pages.yml` does the build and
deploy. To use it:

1. **Enable Pages** in `Settings → Pages` of the GitHub repository.
   Source: *GitHub Actions*.
2. **Push to `main`**. The workflow excludes `app/api` and
   `app/shastrika` before building, runs `STATIC_EXPORT=1 npm run build`,
   and uploads the resulting `./out` directory to Pages.
3. **First-time only**: if your repo isn't a `username.github.io` user
   site, pages will live under `/<repo-name>/`. The workflow injects
   the right `NEXT_PUBLIC_BASE_PATH` automatically. To override
   (custom domain, etc.), set a repo variable
   `NEXT_PUBLIC_BASE_PATH=/your-path` in `Settings → Secrets and
   variables → Actions → Variables`.

The deployed site is the praveśa entry + reading view + visualization
demo, in English and Malayalam. Nothing else.

### Local preview of the static export

```bash
STATIC_EXPORT=1 npm run build
npx serve out
```

`out/` is the same artifact the workflow uploads. Open
`http://localhost:3000/en` to verify.

## Cloudflare Pages — static mode

Same artifact as GitHub Pages; just point Cloudflare at the repo.

1. **In the Cloudflare dashboard**, create a Pages project pointing at
   this repository, branch `main`.
2. **Build configuration**:
   - Framework preset: **Next.js (Static HTML Export)**
   - Build command: `STATIC_EXPORT=1 npm run build`
   - Build output directory: `out`
   - Root directory: *(blank)*
3. **Environment variables**:
   - `STATIC_EXPORT=1`
   - `NEXT_PUBLIC_BASE_PATH` — leave empty for a Cloudflare-hosted
     domain or a custom domain, set to `/<path>` for a sub-path deploy.
4. Save and deploy.

`wrangler.toml` at the repo root carries the same settings for
`wrangler pages deploy` CLI use.

## Cloudflare Pages — SSR mode (recommended for production)

Adds the pūrvapakṣin API route. Requires a one-time codebase change.

1. **Install the Cloudflare Next.js adapter**:
   ```bash
   npm install --save-dev @cloudflare/next-on-pages
   ```
2. **In the Cloudflare dashboard**:
   - Framework preset: **Next.js**
   - Build command: `npx @cloudflare/next-on-pages@latest`
   - Build output directory: `.vercel/output/static`
   - Compatibility flags (Functions tab): add `nodejs_compat`
3. **Secrets** (Cloudflare Pages → Project → Settings → Environment
   variables → Encrypt). The pūrvapakṣin route is provider-agnostic
   and works with either; set at least one:
   - `ANTHROPIC_API_KEY` — uses `claude-sonnet-4-6` by default.
   - `GEMINI_API_KEY` — uses `gemini-pro-latest` by default (Google's
     auto-tracking alias for the most recent Gemini Pro release).
   - Optional `LLM_PROVIDER=anthropic|gemini` to force a specific
     provider regardless of which keys are present. Auto-selection
     prefers Anthropic if both are set. Without either key the route
     returns 503 (a build-time guard prevents the build itself from
     calling the LLM).
4. Deploy.

The adapter packages server components and route handlers as
Cloudflare Workers. Content files in `content/` are bundled into the
build.

### Caveat — śāstrika console

The console at `/shastrika` is *not* excluded automatically in this
mode. The vision (Part VI) calls for authentication before the
console is reachable; the current implementation has none. Until that
gate lands, either:

- Keep the static-mode deploy (console is excluded by the GitHub
  workflow), or
- In the SSR-mode deploy, add a Cloudflare Access policy in front of
  the `/shastrika/*` path-prefix (5 minutes in the Cloudflare
  dashboard).

## What the deploy actually contains

Verify locally before pushing:

```bash
STATIC_EXPORT=1 npm run build
ls out/                       # top-level routes
ls out/en/                    # English reading column
ls out/ml/                    # Malayalam reading column
ls out/en/concept/samavaya/   # pre-rendered samavāya page
ls out/visualizations/samavaya/
```

If `out/api/` or `out/shastrika/` are present, the exclude step in the
workflow didn't run — those will fail at build time. Delete them
before deploying.

## Content readiness for deploy

The deploy is honest about state. Until a śāstrika reviews and flips
`verified_by` + `reviewed_by` on source passages and the samavāya
concept node's depths transition out of `draft`, the reading view
shows the contemplative "being prepared" placeholder (vision Part XI
— no progress bars, no notifications, no nudges). That is the
intended state of the published site until authoring is complete.

Pushing now is fine. The site will quietly hold the door until
content lands.
