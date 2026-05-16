import { notFound } from 'next/navigation';
import Link from 'next/link';
import { loadConcepts, loadPurvapaksaPositions } from '@/lib/content';
import { isApprovedForLiveDialogue } from '@/lib/schema';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

/**
 * Pūrvapakṣa position detail. Read-only. Approve/reject buttons are a
 * later track; the schema already enforces the dual-flag rule
 * (approved_by_shastrika ↔ approved_at).
 */
export default async function PurvapaksaDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const id = decodeURIComponent(params.id);
  const { valid } = await loadPurvapaksaPositions();
  const position = valid.find((p) => p.id === id);
  if (!position) notFound();

  // Concepts whose ṭīkā depth references this position.
  const concepts = await loadConcepts();
  const referers = concepts.valid.filter(({ node }) =>
    node.depths.tika.dialectic_positions.some((dp) => dp.position_id === position.id),
  );

  const liveEligible = isApprovedForLiveDialogue(position);

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
          / purvapaksa / <span className="text-zinc-700">{position.id}</span>
        </nav>
        <h1 className="font-mono text-xl text-zinc-900">{position.id}</h1>
        <dl className="mt-2 grid grid-cols-[max-content_1fr] gap-x-3 gap-y-0.5 font-mono text-[11px] text-zinc-700">
          <dt className="text-zinc-500">school</dt>
          <dd>{position.school}</dd>
          <dt className="text-zinc-500">thinker</dt>
          <dd className="font-sans">{position.thinker}</dd>
          <dt className="text-zinc-500">source_text</dt>
          <dd className="font-sans">{position.source_text}</dd>
          <dt className="text-zinc-500">attestation</dt>
          <dd>{position.attestation}</dd>
        </dl>
      </header>

      {/* ----- APPROVAL STATE ----- */}
      <section>
        <h2 className="text-sm font-mono uppercase tracking-wider text-zinc-700 mb-2">
          approval
        </h2>
        <div
          className={`border px-3 py-2 text-xs ${
            liveEligible
              ? 'border-emerald-300 bg-emerald-50 text-emerald-900'
              : 'border-zinc-300 bg-zinc-50 text-zinc-800'
          }`}
        >
          <div className="font-mono">
            approved_by_shastrika:{' '}
            <span className={position.approved_by_shastrika ? 'text-emerald-700' : 'text-zinc-700'}>
              {String(position.approved_by_shastrika)}
            </span>
          </div>
          <div className="font-mono">
            approved_at:{' '}
            <span className={position.approved_at ? 'text-emerald-700' : 'text-zinc-500'}>
              {position.approved_at ?? 'null'}
            </span>
          </div>
          <p className="mt-2 text-[11px]">
            {liveEligible
              ? 'This position flows into the live dialectic engine via loadApprovedPurvapaksa().'
              : 'Not eligible for live dialogue. The dialectic engine consumes only approved positions.'}
          </p>
        </div>
        <p className="mt-2 text-[11px] text-zinc-500 font-mono">
          no approve / reject controls in this track. write actions are a later fanout.
        </p>
      </section>

      {/* ----- OBJECTION SUMMARIES ----- */}
      <section>
        <h2 className="text-sm font-mono uppercase tracking-wider text-zinc-700 mb-2">
          objection_summary_en
        </h2>
        <div className="border border-zinc-300 bg-white px-4 py-3 text-sm text-zinc-800 leading-relaxed">
          {position.objection_summary_en}
        </div>
      </section>

      <section>
        <h2 className="text-sm font-mono uppercase tracking-wider text-zinc-700 mb-2">
          objection_summary_ml
        </h2>
        <div className="border border-zinc-300 bg-white px-4 py-3 ml text-sm text-zinc-800 leading-relaxed">
          {position.objection_summary_ml || (
            <span className="text-zinc-400 italic font-sans">empty</span>
          )}
        </div>
      </section>

      {/* ----- SIDDHANTA RESPONSE ----- */}
      <section>
        <h2 className="text-sm font-mono uppercase tracking-wider text-zinc-700 mb-2">
          siddhanta_response_summary_en
        </h2>
        <div className="border border-zinc-300 bg-white px-4 py-3 text-sm text-zinc-800 leading-relaxed">
          {position.siddhanta_response_summary_en ?? (
            <span className="text-zinc-400 italic">null — no response recorded yet</span>
          )}
        </div>
      </section>

      {/* ----- REVERSE: concepts referencing this position ----- */}
      <section>
        <h2 className="text-sm font-mono uppercase tracking-wider text-zinc-700 mb-2">
          referenced from <span className="text-zinc-500">[{referers.length}]</span>
        </h2>
        {referers.length === 0 ? (
          <div className="border border-dashed border-zinc-300 bg-white px-3 py-2 text-xs text-zinc-500">
            No concept node currently lists this position in its{' '}
            <code className="font-mono">tika.dialectic_positions</code>.
          </div>
        ) : (
          <ul className="border border-zinc-300 bg-white divide-y divide-zinc-200 text-xs">
            {referers.map(({ node }) => (
              <li key={node.id} className="px-3 py-2">
                <Link
                  href={`/shastrika/concept/${node.slug}`}
                  className="font-mono underline decoration-zinc-300 hover:decoration-zinc-700"
                >
                  {node.slug}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>
    </article>
  );
}
