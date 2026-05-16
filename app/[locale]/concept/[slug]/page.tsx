import { notFound } from 'next/navigation';
import { findConcept, loadConcepts } from '@/lib/content';
import { type Locale } from '@/lib/status';
import { ReadingView } from '@/components/reading/ReadingView';

const LOCALES = ['en', 'ml'] as const;

/**
 * Enumerate every (locale × concept-slug) pair so static export can
 * pre-render the reading view. At runtime in SSR mode the route is
 * still resolved dynamically by `findConcept`; this function is
 * only consulted when `output: 'export'` is on.
 */
export async function generateStaticParams() {
  const { valid } = await loadConcepts();
  return valid.flatMap(({ node }) =>
    LOCALES.map((locale) => ({ locale, slug: node.slug })),
  );
}

/**
 * Reading view (vision Part II, Phase 2). This page is a thin server
 * entry: it validates the locale, loads the typed ConceptNode via
 * `findConcept`, and hands both to <ReadingView>. All four-depth
 * presentation, depth selection, and source disclosure live in the
 * reading-view component set (src/components/reading/).
 *
 * When no depth is yet published in the active locale, ReadingView
 * shows a quiet "being prepared" message rather than 404'ing. Draft
 * content never reaches the panels — each depth re-checks its own
 * publish status via `isPublishedFor`.
 */
export default async function ConceptPage({
  params,
}: {
  params: { locale: string; slug: string };
}) {
  if (!LOCALES.includes(params.locale as Locale)) notFound();
  const locale = params.locale as Locale;

  const concept = await findConcept(params.slug);
  if (!concept) notFound();

  return <ReadingView node={concept.node} locale={locale} />;
}
