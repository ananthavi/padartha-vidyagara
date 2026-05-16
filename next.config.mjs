/**
 * Static export is enabled when `STATIC_EXPORT=1` is set in the build
 * environment. In that mode the app produces a directory of static HTML
 * files (`out/`) deployable to GitHub Pages, Cloudflare Pages's static
 * build, or any HTTP host. Server-only features are excluded — the
 * deployment workflow removes `app/api` and `app/shastrika` before
 * building so static export does not fail on dynamic functions.
 *
 * For full server-side rendering (the pūrvapakṣin API route, etc.),
 * deploy without STATIC_EXPORT to Cloudflare Pages via
 * `@cloudflare/next-on-pages` or to any Node-runtime host.
 *
 * See `docs/DEPLOYMENT.md` for both deployment recipes.
 */
const isStatic = process.env.STATIC_EXPORT === '1';
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  ...(isStatic && {
    output: 'export',
    images: { unoptimized: true },
    trailingSlash: true,
  }),
  ...(basePath && { basePath, assetPrefix: basePath }),
};

export default nextConfig;
