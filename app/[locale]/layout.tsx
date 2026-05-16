import Link from 'next/link';
import { notFound } from 'next/navigation';

const LOCALES = ['en', 'ml'] as const;
type Locale = (typeof LOCALES)[number];

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export default function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  if (!LOCALES.includes(params.locale as Locale)) notFound();

  return (
    <div lang={params.locale} className="min-h-screen flex flex-col">
      {/*
        Top header. Always present so the learner can return to the
        praveśa entry from any depth view. Deliberately small and
        low-contrast — discoverability without pressure (vision Part XI).
        Renders on the praveśa entry too; on that page it sits quietly
        above the maṅgala without competing.
      */}
      <header className="border-b border-ink-faint/15">
        <div className="mx-auto flex max-w-prose items-center justify-between px-6 py-3">
          <Link
            href={`/${params.locale}`}
            className="group inline-flex items-baseline gap-2 no-underline"
            aria-label={params.locale === 'ml' ? 'പ്രവേശം' : 'praveśa'}
          >
            <span className="sa text-base text-ink-muted transition-colors group-hover:text-ink">
              पदार्थविद्यागार
            </span>
            <span className="text-[10px] uppercase tracking-[0.3em] text-ink-faint">
              padārtha-vidyāgāra
            </span>
          </Link>
          <nav className="text-xs text-ink-faint">
            <Link
              href={`/${params.locale}/read`}
              className="underline-offset-4 hover:underline hover:text-ink-muted"
            >
              {params.locale === 'ml' ? 'പാഠം' : 'read'}
            </Link>
            <span className="mx-2 text-ink-faint/50">·</span>
            <Link
              href="/en"
              className={`underline-offset-4 hover:underline ${params.locale === 'en' ? 'text-ink-muted' : ''}`}
            >
              en
            </Link>
            <span className="mx-1.5 text-ink-faint/50">·</span>
            <Link
              href="/ml"
              className={`underline-offset-4 hover:underline ${params.locale === 'ml' ? 'text-ink-muted' : ''}`}
            >
              ml
            </Link>
          </nav>
        </div>
      </header>

      <main className="flex-1">{children}</main>

      {/*
        Footer kept deliberately quiet. No "next up", no "related",
        no progress bars (vision Part XI). One day this holds a single
        soft praṇāma and a link to the colophon.
      */}
    </div>
  );
}
