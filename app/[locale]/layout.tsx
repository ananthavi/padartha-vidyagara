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
      <main className="flex-1">{children}</main>
      {/*
        Footer kept deliberately quiet. No "next up", no "related",
        no progress bars (vision Part XI). One day this holds a single
        soft pranama and a link to the colophon.
      */}
    </div>
  );
}
