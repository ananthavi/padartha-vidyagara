/**
 * `/[locale]/read` — corpus-browser TOC.
 *
 * Lists every (text, chapter) pair with at least one ingested passage,
 * grouped by text and ordered by the canonical sequence of Praśastapāda's
 * bhāṣya. Independent of the concept-node reading view at
 * `/[locale]/concept/<slug>`; concept-nodes remain the contemplative
 * deep-read; this is the "show me the corpus" door.
 */

import Link from 'next/link';
import { notFound } from 'next/navigation';
import { listChapters, TEXT_TITLES } from '@/lib/sources-index';
import type { TextKey } from '@/lib/schema';

const LOCALES = ['en', 'ml'] as const;
type Locale = (typeof LOCALES)[number];

export async function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export default async function ReadIndexPage({
  params,
}: {
  params: { locale: string };
}) {
  if (!LOCALES.includes(params.locale as Locale)) notFound();
  const locale = params.locale as Locale;

  const chapters = await listChapters();
  const byText: Record<TextKey, typeof chapters> = {
    prashastapada: chapters.filter((c) => c.text === 'prashastapada'),
    nyayakandali: chapters.filter((c) => c.text === 'nyayakandali'),
  };

  const total = chapters.reduce((sum, c) => sum + c.passageCount, 0);

  return (
    <article className="mx-auto max-w-prose px-6 py-16">
      <header className="mb-12">
        <h1 className="text-2xl text-ink mb-2">
          {locale === 'ml' ? 'പാഠം' : 'the text'}
        </h1>
        <p className="text-sm text-ink-muted leading-relaxed">
          {locale === 'ml'
            ? `${total} പാഠഭാഗങ്ങൾ — പ്രശസ്തപാദന്റെ മൂലവും ശ്രീധരന്റെ വ്യാഖ്യാനവും. AI-സഹായത്തോടെ പ്രസിദ്ധീകരിച്ചത്, ശാസ്ത്രി പരിശോധന ഇതുവരെ നടന്നിട്ടില്ല.`
            : `${total} passages from Praśastapāda's *mūla* and Śrīdhara's *Nyāyakandalī* commentary. Published with AI assistance; not yet śāstrika-reviewed.`}
        </p>
      </header>

      {(['prashastapada', 'nyayakandali'] as const).map((textKey) => (
        <section key={textKey} className="mb-12">
          <h2 className="sa text-lg text-ink mb-1">{TEXT_TITLES[textKey].sa}</h2>
          <p className="text-xs italic text-ink-faint mb-6">
            {locale === 'ml' ? TEXT_TITLES[textKey].ml : TEXT_TITLES[textKey].en}
          </p>
          <ul className="space-y-1">
            {byText[textKey].map((c) => (
              <li key={`${c.text}/${c.chapter}`}>
                <Link
                  href={`/${locale}/read/${c.text}/${c.chapter}`}
                  className="group flex items-baseline justify-between border-b border-ink-faint/15 py-2 no-underline"
                >
                  <span
                    className={`text-base text-ink-muted group-hover:text-ink ${
                      locale === 'ml' ? 'ml' : ''
                    }`}
                  >
                    {locale === 'ml' ? c.title_ml : c.title_en}
                  </span>
                  <span className="text-xs text-ink-faint tabular-nums">
                    {c.passageCount}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </article>
  );
}
