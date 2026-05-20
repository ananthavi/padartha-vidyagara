/**
 * Path-prefix authentication gate.
 *
 * Currently scoped to `/shastrika/*` only — the śāstrika authoring
 * console. Vision Part VI calls for authentication before the console
 * is reachable; this middleware is the minimum gate for public Vercel
 * (or Cloudflare Pages SSR) deploys until a full session-and-roles
 * model lands.
 *
 * The reading view (`/[locale]/...`), the corpus browser (`/read/...`),
 * the pūrvapakṣin API, and the visualization demo all remain public.
 *
 * Gate mechanism: HTTP Bearer token. Set `SHASTRIKA_TOKEN` as an
 * environment variable on the deploy. A reviewer hits `/shastrika/*`
 * with an `Authorization: Bearer <SHASTRIKA_TOKEN>` header (browser
 * extensions, curl, or a wrapping proxy can supply this). Wrong or
 * missing token → 401 with WWW-Authenticate Bearer challenge.
 *
 * If `SHASTRIKA_TOKEN` is NOT set, the gate fails closed — the console
 * returns 503 with a clear instruction. This is safer than failing
 * open: a misconfigured deploy will not silently expose drafts.
 *
 * To upgrade later (Vercel Pro password protection, SSO, role-based
 * auth), replace this file's body. The matcher stays the same.
 */

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const token = process.env.SHASTRIKA_TOKEN;

  // Fail closed if no token is configured. Better to 503 than to
  // accidentally expose the authoring console on a fresh deploy.
  if (!token) {
    return new NextResponse(
      'shastrika console is not enabled on this deployment\n' +
        '(SHASTRIKA_TOKEN is not configured)\n',
      { status: 503, headers: { 'Content-Type': 'text/plain; charset=utf-8' } },
    );
  }

  const auth = req.headers.get('authorization');
  const expected = `Bearer ${token}`;
  if (auth !== expected) {
    return new NextResponse('shastrika\n', {
      status: 401,
      headers: {
        'WWW-Authenticate': 'Bearer realm="shastrika"',
        'Content-Type': 'text/plain; charset=utf-8',
        // Belt-and-braces alongside the X-Robots-Tag in vercel.json.
        'X-Robots-Tag': 'noindex, nofollow',
      },
    });
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/shastrika/:path*',
};
