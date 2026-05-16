import type { Metadata } from 'next';
import Link from 'next/link';

/**
 * The śāstrika authoring console.
 *
 * This subtree lives OUTSIDE `/[locale]`. It is the one place in the
 * application where drafts and under-review content are visible
 * (vision Part III.2, Part VI). It MUST NOT leak into the
 * learner-facing surface — distinct visual register, distinct routing,
 * `noindex` so it does not enter search engines.
 *
 * The console is a tool, not a sanctum (vision Part VI). Dense rows,
 * monospace accents for IDs and locators, neutral colors. No
 * contemplative flourish.
 */

export const metadata: Metadata = {
  title: 'śāstrika console — Padārtha-Vidyāgāra',
  description:
    'Authoring console for draft, under-review, and published content. Not for public consumption.',
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: { index: false, follow: false, noimageindex: true },
  },
};

export default function ShastrikaLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900 font-sans text-sm">
      {/* Header band — clearly marks this as the authoring console. */}
      <header className="border-b border-zinc-300 bg-zinc-900 text-zinc-100">
        <div className="mx-auto max-w-6xl px-4 py-2 flex items-center justify-between gap-4">
          <div className="flex items-baseline gap-3">
            <Link
              href="/shastrika"
              className="font-mono text-xs tracking-widest uppercase hover:text-white"
            >
              śāstrika·console
            </Link>
            <span className="text-[10px] font-mono uppercase tracking-wider text-amber-300">
              authoring · not for public consumption
            </span>
          </div>
          <nav className="flex items-center gap-4 text-[11px] font-mono uppercase tracking-wider">
            <Link href="/shastrika#concepts" className="hover:text-white">
              concepts
            </Link>
            <Link href="/shastrika#sources" className="hover:text-white">
              sources
            </Link>
            <Link href="/shastrika#purvapaksa" className="hover:text-white">
              purvapaksa
            </Link>
            <Link href="/en" className="text-zinc-400 hover:text-white">
              ← reading view
            </Link>
          </nav>
        </div>
      </header>

      {/* Persistent reminder. The console shows drafts; drafts are
          not for learners. */}
      <div className="border-b border-amber-300 bg-amber-100 text-amber-900">
        <div className="mx-auto max-w-6xl px-4 py-1.5 text-[11px]">
          <strong className="font-semibold">Note:</strong> Draft and under-review content
          rendered here is NOT for public consumption. Reading-view consumers see only
          <span className="font-mono"> published_*</span> depths via{' '}
          <span className="font-mono">loadPublishedConcepts()</span>.
        </div>
      </div>

      <main className="mx-auto max-w-6xl px-4 py-6">{children}</main>

      <footer className="border-t border-zinc-200 mt-12 py-4">
        <div className="mx-auto max-w-6xl px-4 text-[11px] text-zinc-500 font-mono">
          read-mostly · no write actions in this track · data refreshed per request
        </div>
      </footer>
    </div>
  );
}
