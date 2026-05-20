/**
 * `/[locale]/concepts` — the index of all authored concept nodes.
 *
 * Acts as a doorway between the praveśa entry and any individual
 * concept. Listed in canonical doctrinal order (the six padārthas
 * first, then sub-concepts in the order they appear in Praśastapāda's
 * bhāṣya). Quiet typography; no rankings, no recommendations, no
 * "start here" arrows.
 *
 * A learner who knows what they want jumps directly; a learner who
 * doesn't sees the architecture of the categorial system without
 * being told which to read first.
 */

import Link from 'next/link';
import { notFound } from 'next/navigation';
import { loadPublishedConcepts } from '@/lib/content';

const LOCALES = ['en', 'ml'] as const;
type Locale = (typeof LOCALES)[number];

/**
 * Canonical doctrinal order. The six padārthas in Praśastapāda's
 * enumeration, then sub-concepts in the order they appear inside
 * the bhāṣya. Slugs not in this list fall to the end alphabetically.
 */
const CANONICAL_ORDER: string[] = [
  // tier 1 — the six padārthas
  'dravya',
  'guna',
  'karma',
  'samanya',
  'vishesha',
  'samavaya',
  // tier 2 — sub-concepts (as they will be authored)
  'paramanu',
  'samyoga',
  'abhava',
  'atman',
  'manas',
  'akasha',
  'kala',
  'dik',
  'pratyaksha',
  'anumana',
];

export async function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export default async function ConceptsIndexPage({
  params,
}: {
  params: { locale: string };
}) {
  if (!LOCALES.includes(params.locale as Locale)) notFound();
  const locale = params.locale as Locale;

  const concepts = await loadPublishedConcepts(locale);
  const orderIdx = new Map(CANONICAL_ORDER.map((slug, i) => [slug, i]));
  concepts.sort((a, b) => {
    const ai = orderIdx.get(a.node.slug) ?? 999;
    const bi = orderIdx.get(b.node.slug) ?? 999;
    if (ai !== bi) return ai - bi;
    return a.node.slug.localeCompare(b.node.slug);
  });

  const PADARTHAS = new Set(['dravya', 'guna', 'karma', 'samanya', 'vishesha', 'samavaya']);
  const tier1 = concepts.filter((c) => PADARTHAS.has(c.node.slug));
  const tier2 = concepts.filter((c) => !PADARTHAS.has(c.node.slug));

  return (
    <article className="mx-auto max-w-prose px-6 py-16">
      <header className="mb-12">
        <h1 className="sa text-3xl text-ink mb-2">पदार्थाः</h1>
        <p className="text-sm tracking-wide text-ink-faint italic">
          padārthāḥ — the categories
        </p>
        <p className="mt-4 text-sm text-ink-muted leading-relaxed">
          {locale === 'ml'
            ? `${concepts.length} പദാർത്ഥ-സ്തരം പ്രസിദ്ധീകരിച്ചിരിക്കുന്നു — ഓരോന്നും കാരിക, ഭാഷ്യം, വൃത്തി, ടീക എന്നീ നാല് സ്തരങ്ങളിൽ. AI-സഹായത്തോടെ പ്രസിദ്ധീകരിച്ചത്, ശാസ്ത്രി-പരിശോധന തുടരുന്നു.`
            : `${concepts.length} concept nodes published — each at four depths (kārikā, bhāṣya, vṛtti, ṭīkā). Published with AI assistance; śāstrika review continuing.`}
        </p>
      </header>

      {tier1.length > 0 && (
        <section className="mb-12">
          <h2 className="text-xs uppercase tracking-[0.3em] text-ink-faint mb-6">
            {locale === 'ml' ? 'ഷട്-പദാർത്ഥം' : 'the six padārthas'}
          </h2>
          <ul className="space-y-1">
            {tier1.map(({ node }) => (
              <ConceptLink key={node.id} node={node} locale={locale} />
            ))}
          </ul>
        </section>
      )}

      {tier2.length > 0 && (
        <section>
          <h2 className="text-xs uppercase tracking-[0.3em] text-ink-faint mb-6">
            {locale === 'ml' ? 'ഉപ-സങ്കല്പങ്ങൾ' : 'sub-concepts'}
          </h2>
          <ul className="space-y-1">
            {tier2.map(({ node }) => (
              <ConceptLink key={node.id} node={node} locale={locale} />
            ))}
          </ul>
        </section>
      )}

      {concepts.length === 0 && (
        <p className="text-ink-muted italic">
          {locale === 'ml'
            ? 'ഇപ്പോൾ ഒരു സങ്കല്പവും പ്രസിദ്ധീകരിച്ചിട്ടില്ല.'
            : 'No concepts are published yet.'}
        </p>
      )}
    </article>
  );
}

function ConceptLink({
  node,
  locale,
}: {
  node: { slug: string; title_sa: string; title_iast: string; title_en: string; title_ml: string };
  locale: Locale;
}) {
  return (
    <li>
      <Link
        href={`/${locale}/concept/${node.slug}`}
        className="group flex items-baseline justify-between border-b border-ink-faint/15 py-3 no-underline gap-6"
      >
        <span className="flex items-baseline gap-3">
          <span className="sa text-lg text-ink group-hover:text-ink">{node.title_sa}</span>
          <span className="text-sm italic text-ink-faint">{node.title_iast}</span>
        </span>
        <span
          className={`text-sm text-ink-muted group-hover:text-ink ${
            locale === 'ml' ? 'ml' : ''
          }`}
        >
          {locale === 'ml' ? node.title_ml : node.title_en}
        </span>
      </Link>
    </li>
  );
}
