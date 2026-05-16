# Deployment

Padārtha-Vidyāgāra ships with two deployment recipes. Both are tested
against the current corpus; choose by feature-set.

| Target | Reading view | Praveśa | Visualization | Pūrvapakṣin API | Śāstrika console |
|---|:---:|:---:|:---:|:---:|:---:|
| GitHub Pages (static) | ✓ | ✓ | ✓ | ✗ | ✗ (intentional) |
| Cloudflare Pages — static mode | ✓ | ✓ | ✓ | ✗ | ✗ (intentional) |
| Cloudflare Pages — SSR mode | ✓ | ✓ | ✓ | ✓ | optional (gate behind auth) |

The pūrvapakṣin API needs a server runtime. The śāstrika console is
intentionally excluded from public deploys (vision Part VI calls for
authentication before the console is reachable; the current console
has none, so we don't ship it).

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
   `ananthavi/padartha-vidyagara`, branch `main`.
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
   variables → Encrypt):
   - `ANTHROPIC_API_KEY` — for the pūrvapakṣin dialogue route. Without
     this the API returns 503 (the route has a build-time guard).
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
