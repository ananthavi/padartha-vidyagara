import { notFound } from 'next/navigation';
import Link from 'next/link';
import { loadConcepts, loadSourcePassages } from '@/lib/content';
import { TextKey } from '@/lib/schema';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

/**
 * SourcePassage detail. The third click of the audit-trail path
 * (vision Part XII #2):
 *   /shastrika → click concept → click locator → here.
 *
 * Shows Devanagari (`.sa`), IAST, literal English, plus the reverse
 * binding set — every ConceptNode that depends on this passage. The
 * shastrika can then see impact before editing the source text.
 */

export default async function SourceDetailPage({
  params,
}: {
  params: { text: string; locator: string[] };
}) {
  // Validate the [text] segment against the TextKey enum.
  const textResult = TextKey.safeParse(params.text);
  if (!textResult.success) notFound();
  const textKey = textResult.data;

  // Decode the catch-all segments back into a locator string.
  const locator = params.locator.map((s) => decodeURIComponent(s)).join('.');

  const sources = await loadSourcePassages();
  const passage = sources.valid.find(
    (p) => p.text_key === textKey && p.locator === locator,
  );

  // Concepts that bind to this passage — computed even when the
  // passage itself isn't registered, so an "unresolved ref" page is
  // still useful.
  const concepts = await loadConcepts();
  const referers = concepts.valid.filter(({ node }) =>
    node.source_refs.some((r) => r.text === textKey && r.locator === locator),
  );

  return (
    <article className="space-y-8">
      <header className="border-b border-zinc-300 pb-4">
        <nav className="text-[11px] font-mono text-zinc-500 mb-2">
          <Link
            href="/shastrika"
            className="underline decoration-zinc-300 hover:decoration-zinc-700"
          >
            index
          </Link>{' '}
          / sources / <span className="text-zinc-700">{textKey}</span> ::{' '}
          <span className="text-zinc-700">{locator}</span>
        </nav>
        <div className="flex items-baseline gap-3 flex-wrap font-mono text-sm">
          <span className="text-zinc-500">{textKey}</span>
          <span className="text-zinc-400">::</span>
          <span className="text-zinc-900">{locator}</span>
        </div>
      </header>

      {!passage ? (
        <section className="border border-rose-300 bg-rose-50 px-3 py-3 text-xs text-rose-900">
          <div className="font-mono uppercase tracking-wider text-[10px] mb-1">
            passage not found
          </div>
          <p>
            No <code className="font-mono">SourcePassage</code> with{' '}
            <code className="font-mono">text_key={textKey}</code> and{' '}
            <code className="font-mono">locator={locator}</code> is registered in{' '}
            <code className="font-mono">content/sources/</code>.
          </p>
          {referers.length > 0 && (
            <p className="mt-1">
              However, {referers.length} concept node
              {referers.length === 1 ? '' : 's'} reference{referers.length === 1 ? 's' : ''}{' '}
              this locator. The binding is unresolved and would fail the cross-reference
              check in <code className="font-mono">scripts/validate-content.ts</code>.
            </p>
          )}
        </section>
      ) : (
        <>
          {/* Sanskrit text — primary surface. */}
          <section>
            <h2 className="text-sm font-mono uppercase tracking-wider text-zinc-700 mb-2">
              sa_devanagari
            </h2>
            <div className="border border-zinc-300 bg-white px-4 py-3">
              <p className="sa text-xl text-zinc-900 leading-relaxed">{passage.sa_devanagari}</p>
            </div>
          </section>

          <section>
            <h2 className="text-sm font-mono uppercase tracking-wider text-zinc-700 mb-2">
              sa_iast
            </h2>
            <div className="border border-zinc-300 bg-white px-4 py-3">
              <p className="italic text-zinc-800 leading-relaxed">{passage.sa_iast}</p>
            </div>
          </section>

          <section>
            <h2 className="text-sm font-mono uppercase tracking-wider text-zinc-700 mb-2">
              literal_en
            </h2>
            <div className="border border-zinc-300 bg-white px-4 py-3">
              <p className="text-zinc-800 leading-relaxed">
                {passage.literal_en || (
                  <span className="text-zinc-400 italic">empty</span>
                )}
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-sm font-mono uppercase tracking-wider text-zinc-700 mb-2">
              record
            </h2>
            <dl className="grid grid-cols-[max-content_1fr] gap-x-3 gap-y-0.5 font-mono text-[11px] text-zinc-700 border border-zinc-300 bg-white px-3 py-2">
              <dt className="text-zinc-500">id</dt>
              <dd>{passage.id}</dd>
              <dt className="text-zinc-500">text_key</dt>
              <dd>{passage.text_key}</dd>
              <dt className="text-zinc-500">locator</dt>
              <dd>{passage.locator}</dd>
            </dl>
          </section>
        </>
      )}

      {/* ----- REVERSE BINDINGS ----- */}
      <section>
        <h2 className="text-sm font-mono uppercase tracking-wider text-zinc-700 mb-2">
          bound by <span className="text-zinc-500">[{referers.length}]</span>
        </h2>
        <p className="text-xs text-zinc-600 mb-2">
          Concept nodes that reference this passage in their{' '}
          <code className="font-mono">source_refs</code>. Edits to this passage affect every
          binding below.
        </p>
        {referers.length === 0 ? (
          <div className="border border-dashed border-zinc-300 bg-white px-3 py-3 text-xs text-zinc-500">
            No concept currently binds to this passage. (Schema does not require reverse
            coverage — this is a shastrika-side observation only.)
          </div>
        ) : (
          <ul className="border border-zinc-300 bg-white divide-y divide-zinc-200 text-xs">
            {referers.map(({ node }) => {
              const ref = node.source_refs.find(
                (r) => r.text === textKey && r.locator === locator,
              );
              return (
                <li key={node.id} className="px-3 py-2 flex items-center justify-between">
                  <Link
                    href={`/shastrika/concept/${node.slug}`}
                    className="font-mono underline decoration-zinc-300 hover:decoration-zinc-700"
                  >
                    {node.slug}
                  </Link>
                  <span className="font-mono text-[11px] text-zinc-600">
                    {ref?.verified_by ? (
                      <span className="text-emerald-700">verified</span>
                    ) : (
                      <span className="text-amber-700">unverified</span>
                    )}
                  </span>
                </li>
              );
            })}
          </ul>
        )}
      </section>
    </article>
  );
}
