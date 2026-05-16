import Link from 'next/link';
import {
  loadConcepts,
  loadPurvapaksaPositions,
  loadSourcePassages,
} from '@/lib/content';
import { StatusBadge } from '@/components/shastrika/StatusBadge';

/**
 * The shastrika console index. Three quiet tables:
 *   1. Concept nodes (with per-depth status, source-binding count)
 *   2. Source passages (text + locator + sa_iast preview)
 *   3. Purvapaksa positions (with approval state)
 *
 * Read-mostly. No write actions. Each row is a link to the detail page.
 * Validation errors at the index level are surfaced inline so a bad
 * file does not hide a node from the editor (vision Part III).
 */

// Always fetch fresh; the shastrika sees the current state of `content/`.
export const dynamic = 'force-dynamic';
export const revalidate = 0;

function locatorToPath(locator: string): string {
  // Split on '.', encode each segment for URL safety.
  return locator
    .split('.')
    .map((s) => encodeURIComponent(s))
    .join('/');
}

export default async function ShastrikaIndexPage() {
  const concepts = await loadConcepts();
  const sources = await loadSourcePassages();
  const purvapaksa = await loadPurvapaksaPositions();

  // Build a quick map of how many concept nodes bind to each source passage.
  // This is the kind of cross-data observation the schema does NOT enforce
  // but the shastrika console makes visible.
  const passageBindingCount = new Map<string, number>();
  for (const { node } of concepts.valid) {
    for (const ref of node.source_refs) {
      const key = `${ref.text}::${ref.locator}`;
      passageBindingCount.set(key, (passageBindingCount.get(key) ?? 0) + 1);
    }
  }

  // Set of bound locators per text — to flag orphaned source passages.
  const boundKeys = new Set(passageBindingCount.keys());

  // Set of "expected" source bindings from concepts — for "unresolved" check.
  const sourceIndex = new Set(sources.valid.map((s) => `${s.text_key}::${s.locator}`));

  return (
    <div className="space-y-12">
      {/* ============== CONCEPTS ============== */}
      <section id="concepts">
        <SectionHeader
          title="Concept nodes"
          count={concepts.valid.length + concepts.errors.length}
          subtitle="Every node, every depth status, every source binding count. Schema-failing files surface here too."
        />

        {concepts.errors.length > 0 && (
          <ErrorList title="files failing schema validation" items={concepts.errors} />
        )}

        {concepts.valid.length === 0 && concepts.errors.length === 0 && (
          <EmptyState>No concept files in <code className="font-mono">content/concepts/</code>.</EmptyState>
        )}

        {concepts.valid.length > 0 && (
          <div className="border border-zinc-300 bg-white overflow-hidden">
            <table className="w-full text-xs">
              <thead className="bg-zinc-100 text-zinc-700 font-mono uppercase tracking-wider text-[10px]">
                <tr>
                  <th className="text-left px-3 py-2 border-b border-zinc-300">slug</th>
                  <th className="text-left px-3 py-2 border-b border-zinc-300">title (sa / en)</th>
                  <th className="text-left px-3 py-2 border-b border-zinc-300">rasa</th>
                  <th className="text-left px-3 py-2 border-b border-zinc-300">kārikā</th>
                  <th className="text-left px-3 py-2 border-b border-zinc-300">bhāṣya</th>
                  <th className="text-left px-3 py-2 border-b border-zinc-300">vṛtti</th>
                  <th className="text-left px-3 py-2 border-b border-zinc-300">ṭīkā</th>
                  <th className="text-right px-3 py-2 border-b border-zinc-300">src</th>
                </tr>
              </thead>
              <tbody>
                {concepts.valid.map(({ node }) => {
                  // Count refs that don't resolve to any known passage.
                  const unresolved = node.source_refs.filter(
                    (r) => !sourceIndex.has(`${r.text}::${r.locator}`),
                  ).length;
                  return (
                    <tr key={node.id} className="border-b border-zinc-200 hover:bg-zinc-50">
                      <td className="px-3 py-2 align-top">
                        <Link
                          href={`/shastrika/concept/${node.slug}`}
                          className="font-mono text-zinc-900 underline decoration-zinc-300 hover:decoration-zinc-700"
                        >
                          {node.slug}
                        </Link>
                      </td>
                      <td className="px-3 py-2 align-top">
                        <span className="sa text-base text-zinc-900">{node.title_sa}</span>
                        <span className="ml-2 text-zinc-500">{node.title_en}</span>
                      </td>
                      <td className="px-3 py-2 align-top font-mono text-[11px] text-zinc-600">
                        {node.rasa_stage}
                      </td>
                      <td className="px-3 py-2 align-top">
                        <StatusBadge status={node.depths.karika.status} />
                      </td>
                      <td className="px-3 py-2 align-top">
                        <StatusBadge status={node.depths.bhashya.status} />
                      </td>
                      <td className="px-3 py-2 align-top">
                        <StatusBadge status={node.depths.vritti.status} />
                      </td>
                      <td className="px-3 py-2 align-top">
                        <StatusBadge status={node.depths.tika.status} />
                      </td>
                      <td className="px-3 py-2 align-top text-right font-mono text-[11px]">
                        <span
                          className={
                            node.source_refs.length === 0
                              ? 'text-zinc-400'
                              : 'text-zinc-800'
                          }
                        >
                          {node.source_refs.length}
                        </span>
                        {unresolved > 0 && (
                          <span
                            className="ml-1 text-rose-700"
                            title={`${unresolved} ref(s) do not resolve to a SourcePassage`}
                          >
                            ({unresolved} unresolved)
                          </span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {/* ============== SOURCES ============== */}
      <section id="sources">
        <SectionHeader
          title="Source passages"
          count={sources.valid.length + sources.errors.length}
          subtitle="Devanagari / IAST / literal_en records. Each row links to its detail view; bindings count shows reverse-impact."
        />

        {sources.errors.length > 0 && (
          <ErrorList title="files failing schema validation" items={sources.errors} />
        )}

        {sources.valid.length === 0 && sources.errors.length === 0 && (
          <EmptyState>
            No source passages registered yet. The fidelity pipeline requires that any{' '}
            <code className="font-mono">published_*</code> depth bind to at least one
            passage here. See{' '}
            <code className="font-mono">content/sources/README.md</code>.
          </EmptyState>
        )}

        {sources.valid.length > 0 && (
          <div className="border border-zinc-300 bg-white overflow-hidden">
            <table className="w-full text-xs">
              <thead className="bg-zinc-100 text-zinc-700 font-mono uppercase tracking-wider text-[10px]">
                <tr>
                  <th className="text-left px-3 py-2 border-b border-zinc-300">text</th>
                  <th className="text-left px-3 py-2 border-b border-zinc-300">locator</th>
                  <th className="text-left px-3 py-2 border-b border-zinc-300">id</th>
                  <th className="text-left px-3 py-2 border-b border-zinc-300">sa (iast)</th>
                  <th className="text-right px-3 py-2 border-b border-zinc-300">bindings</th>
                </tr>
              </thead>
              <tbody>
                {sources.valid.map((p) => {
                  const key = `${p.text_key}::${p.locator}`;
                  const bindings = passageBindingCount.get(key) ?? 0;
                  return (
                    <tr key={key} className="border-b border-zinc-200 hover:bg-zinc-50">
                      <td className="px-3 py-2 align-top font-mono text-[11px]">
                        {p.text_key}
                      </td>
                      <td className="px-3 py-2 align-top font-mono">
                        <Link
                          href={`/shastrika/source/${p.text_key}/${locatorToPath(p.locator)}`}
                          className="underline decoration-zinc-300 hover:decoration-zinc-700"
                        >
                          {p.locator}
                        </Link>
                      </td>
                      <td className="px-3 py-2 align-top font-mono text-zinc-500 text-[11px]">
                        {p.id}
                      </td>
                      <td className="px-3 py-2 align-top">
                        <span className="italic text-zinc-700">{p.sa_iast}</span>
                      </td>
                      <td className="px-3 py-2 align-top text-right font-mono text-[11px]">
                        {bindings === 0 ? (
                          <span className="text-amber-700" title="orphan: no concept binds this">
                            0 (orphan)
                          </span>
                        ) : (
                          bindings
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {/* Cross-data observation: refs from concepts to absent passages. */}
        {(() => {
          const unresolvedRefs: { slug: string; text: string; locator: string }[] = [];
          for (const { node } of concepts.valid) {
            for (const ref of node.source_refs) {
              if (!sourceIndex.has(`${ref.text}::${ref.locator}`)) {
                unresolvedRefs.push({
                  slug: node.slug,
                  text: ref.text,
                  locator: ref.locator,
                });
              }
            }
          }
          if (unresolvedRefs.length === 0) return null;
          return (
            <div className="mt-4 border border-rose-300 bg-rose-50 px-3 py-2 text-xs">
              <div className="font-mono uppercase tracking-wider text-[10px] text-rose-900 mb-1">
                {unresolvedRefs.length} unresolved source ref
                {unresolvedRefs.length === 1 ? '' : 's'} — pointed to by concept(s) but no
                matching <code className="font-mono">SourcePassage</code>
              </div>
              <ul className="space-y-0.5 font-mono text-[11px] text-rose-900">
                {unresolvedRefs.map((u, idx) => (
                  <li key={idx}>
                    <Link href={`/shastrika/concept/${u.slug}`} className="underline">
                      {u.slug}
                    </Link>{' '}
                    → {u.text} :: {u.locator}
                  </li>
                ))}
              </ul>
            </div>
          );
        })()}
      </section>

      {/* ============== PURVAPAKSA ============== */}
      <section id="purvapaksa">
        <SectionHeader
          title="Pūrvapakṣa positions"
          count={purvapaksa.valid.length + purvapaksa.errors.length}
          subtitle="Schools, thinkers, and approval state. The dialectic engine sees only the approved subset."
        />

        {purvapaksa.errors.length > 0 && (
          <ErrorList title="files failing schema validation" items={purvapaksa.errors} />
        )}

        {purvapaksa.valid.length === 0 && purvapaksa.errors.length === 0 && (
          <EmptyState>
            No pūrvapakṣa positions registered yet. Positions are authored under{' '}
            <code className="font-mono">content/purvapaksa/&lt;school&gt;/</code> and
            must be approved by a second śāstrika before flowing into the dialectic
            engine.
          </EmptyState>
        )}

        {purvapaksa.valid.length > 0 && (
          <div className="border border-zinc-300 bg-white overflow-hidden">
            <table className="w-full text-xs">
              <thead className="bg-zinc-100 text-zinc-700 font-mono uppercase tracking-wider text-[10px]">
                <tr>
                  <th className="text-left px-3 py-2 border-b border-zinc-300">id</th>
                  <th className="text-left px-3 py-2 border-b border-zinc-300">school</th>
                  <th className="text-left px-3 py-2 border-b border-zinc-300">thinker</th>
                  <th className="text-left px-3 py-2 border-b border-zinc-300">attestation</th>
                  <th className="text-left px-3 py-2 border-b border-zinc-300">approval</th>
                </tr>
              </thead>
              <tbody>
                {purvapaksa.valid.map((p) => (
                  <tr key={p.id} className="border-b border-zinc-200 hover:bg-zinc-50">
                    <td className="px-3 py-2 align-top font-mono">
                      <Link
                        href={`/shastrika/purvapaksa/${encodeURIComponent(p.id)}`}
                        className="underline decoration-zinc-300 hover:decoration-zinc-700"
                      >
                        {p.id}
                      </Link>
                    </td>
                    <td className="px-3 py-2 align-top font-mono text-[11px]">{p.school}</td>
                    <td className="px-3 py-2 align-top">{p.thinker}</td>
                    <td className="px-3 py-2 align-top font-mono text-[11px]">
                      {p.attestation}
                    </td>
                    <td className="px-3 py-2 align-top">
                      <ApprovalBadge approved={p.approved_by_shastrika} at={p.approved_at} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {/* Footer hint for the audit trail (vision Part XII #2). */}
      <section className="text-[11px] text-zinc-500 font-mono border-t border-zinc-200 pt-4">
        Audit-trail hint: any published claim is reachable in three clicks —
        concept slug → source binding → passage detail. See{' '}
        <code>docs/VISION.md</code> Part XII #2.
      </section>

      {/* Render counts of orphan passages — schema doesn't enforce reverse coverage. */}
      {sources.valid.length > 0 &&
        (() => {
          const orphans = sources.valid.filter(
            (p) => !boundKeys.has(`${p.text_key}::${p.locator}`),
          );
          if (orphans.length === 0) return null;
          return (
            <div className="text-[11px] text-amber-800 font-mono">
              {orphans.length} orphaned source passage{orphans.length === 1 ? '' : 's'} —
              registered but bound by no concept yet.
            </div>
          );
        })()}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Tiny presentational helpers (kept local — utilitarian, not reused) */
/* ------------------------------------------------------------------ */

function SectionHeader({
  title,
  subtitle,
  count,
}: {
  title: string;
  subtitle: string;
  count: number;
}) {
  return (
    <div className="mb-3">
      <h2 className="text-base font-semibold text-zinc-900 flex items-baseline gap-3">
        {title}
        <span className="font-mono text-[11px] text-zinc-500">[{count}]</span>
      </h2>
      <p className="text-xs text-zinc-600 mt-0.5">{subtitle}</p>
    </div>
  );
}

function EmptyState({ children }: { children: React.ReactNode }) {
  return (
    <div className="border border-dashed border-zinc-300 bg-white px-3 py-4 text-xs text-zinc-600">
      {children}
    </div>
  );
}

function ErrorList({
  title,
  items,
}: {
  title: string;
  items: { file: string; error: string }[];
}) {
  return (
    <div className="mb-3 border border-rose-300 bg-rose-50 px-3 py-2 text-xs">
      <div className="font-mono uppercase tracking-wider text-[10px] text-rose-900 mb-1">
        {title} — {items.length}
      </div>
      <ul className="space-y-1 font-mono text-[11px] text-rose-900">
        {items.map((e, idx) => (
          <li key={idx}>
            <span className="font-semibold">{e.file}</span>
            <pre className="whitespace-pre-wrap pl-3">{e.error}</pre>
          </li>
        ))}
      </ul>
    </div>
  );
}

function ApprovalBadge({ approved, at }: { approved: boolean; at: string | null }) {
  if (approved && at) {
    return (
      <span className="font-mono text-[10px] inline-block rounded border border-emerald-300 bg-emerald-100 text-emerald-800 px-1.5 py-0.5">
        approved
      </span>
    );
  }
  return (
    <span className="font-mono text-[10px] inline-block rounded border border-zinc-300 bg-zinc-100 text-zinc-700 px-1.5 py-0.5">
      pending
    </span>
  );
}
