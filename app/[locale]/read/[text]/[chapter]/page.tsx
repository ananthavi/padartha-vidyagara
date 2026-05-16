/**
 * `/[locale]/read/[text]/[chapter]` — chapter view.
 *
 * Pages through every SourcePassage for the named (text, chapter) pair,
 * rendered as `PassageCard`s. Locale toggles which AI re-rendering is
 * shown (Malayalam vs. accessible English); Sanskrit and Jha's literal
 * English appear regardless of locale.
 */

import Link from 'next/link';
import { notFound } from 'next/navigation';
import { listChapters, loadChapter, TEXT_TITLES } from '@/lib/sources-index';
import { PassageCard } from '@/components/read/PassageCard';
import type { TextKey } from '@/lib/schema';

const LOCALES = ['en', 'ml'] as const;
const TEXT_KEYS: TextKey[] = ['prashastapada', 'nyayakandali'];
type Locale = (typeof LOCALES)[number];

export async function generateStaticParams() {
  const chapters = await listChapters();
  const params: { locale: string; text: string; chapter: string }[] = [];
  for (const locale of LOCALES) {
    for (const c of chapters) {
      params.push({ locale, text: c.text, chapter: c.chapter });
    }
  }
  return params;
}

export default async function ChapterPage({
  params,
}: {
  params: { locale: string; text: string; chapter: string };
}) {
  if (!LOCALES.includes(params.locale as Locale)) notFound();
  if (!TEXT_KEYS.includes(params.text as TextKey)) notFound();
  const locale = params.locale as Locale;
  const text = params.text as TextKey;

  const chapter = await loadChapter(text, params.chapter);
  if (!chapter) notFound();

  // Sibling chapter navigation (prev / next within the same text).
  const all = await listChapters();
  const siblings = all.filter((c) => c.text === text);
  const idx = siblings.findIndex((c) => c.chapter === params.chapter);
  const prev = idx > 0 ? siblings[idx - 1] : undefined;
  const next = idx < siblings.length - 1 ? siblings[idx + 1] : undefined;

  return (
    <article className="mx-auto max-w-prose px-6 py-12">
      <header className="mb-10">
        <Link
          href={`/${locale}/read`}
          className="text-xs uppercase tracking-[0.2em] text-ink-faint underline-offset-4 hover:underline hover:text-ink-muted"
        >
          ← {locale === 'ml' ? 'പാഠം' : 'the text'}
        </Link>
        <h1
          className={`mt-4 text-2xl text-ink leading-tight ${
            locale === 'ml' ? 'ml' : ''
          }`}
        >
          {locale === 'ml' ? chapter.title_ml : chapter.title_en}
        </h1>
        <p className="mt-1 text-xs italic text-ink-faint">
          {locale === 'ml' ? TEXT_TITLES[text].ml : TEXT_TITLES[text].en} ·{' '}
          {chapter.passageCount}{' '}
          {locale === 'ml' ? 'പാഠഭാഗങ്ങൾ' : 'passages'}
        </p>
      </header>

      <div className="space-y-10">
        {chapter.passages.map((p) => (
          <PassageCard key={p.id} passage={p} locale={locale} />
        ))}
      </div>

      <nav className="mt-16 flex justify-between border-t border-ink-faint/15 pt-6 text-xs text-ink-faint">
        {prev ? (
          <Link
            href={`/${locale}/read/${prev.text}/${prev.chapter}`}
            className="underline-offset-4 hover:underline hover:text-ink-muted"
          >
            ← {locale === 'ml' ? prev.title_ml : prev.title_en}
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link
            href={`/${locale}/read/${next.text}/${next.chapter}`}
            className="underline-offset-4 hover:underline hover:text-ink-muted text-right"
          >
            {locale === 'ml' ? next.title_ml : next.title_en} →
          </Link>
        ) : (
          <span />
        )}
      </nav>
    </article>
  );
}
