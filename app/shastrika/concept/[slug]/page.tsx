import { notFound } from 'next/navigation';
import Link from 'next/link';
import fs from 'node:fs/promises';
import path from 'node:path';
import matter from 'gray-matter';
import {
  loadConcepts,
  loadSourcePassages,
} from '@/lib/content';
import { ConceptNode } from '@/lib/schema';
import { StatusBadge } from '@/components/shastrika/StatusBadge';
import { ValidationBox } from '@/components/shastrika/ValidationBox';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

/**
 * Full detail for one ConceptNode. The shastrika lands here from the index
 * (click #1 in the audit-trail path of vision Part XII #2). The
 * source_refs table here links onward to each SourcePassage (click #2 →
 * click #3 = the source itself).
 *
 * The frontmatter is rendered raw (read-only). The MDX body is NOT
 * rendered here — see the comment under "MDX body" below.
 */

function locatorToPath(locator: string): string {
  return locator
    .split('.')
    .map((s) => encodeURIComponent(s))
    .join('/');
}

const DEPTH_KEYS = ['karika', 'bhashya', 'vritti', 'tika'] as const;
const DEPTH_LABEL: Record<(typeof DEPTH_KEYS)[number], string> = {
  karika: 'kārikā',
  bhashya: 'bhāṣya',
  vritti: 'vṛtti',
  tika: 'ṭīkā',
};

const STATUS_COLUMNS = [
  'draft',
  'under_review_en',
  'under_review_ml',
  'published_en',
  'published_ml',
] as const;

export default async function ConceptDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const { valid, errors } = await loadConcepts();
  const sources = await loadSourcePassages();

  const found = valid.find((c) => c.node.slug === params.slug);

  // If the slug isn't in the valid set, try to find it among the failing
  // files so the shastrika lands somewhere useful instead of a 404.
  if (!found) {
    const failedSlug = errors.find((e) => e.file.endsWith(`${params.slug}.mdx`));
    if (!failedSlug) notFound();

    // Read the raw file so we can show the shastrika what's wrong.
    let raw = '';
    try {
      raw = await fs.readFile(path.join(process.cwd(), failedSlug.file), 'utf-8');
    } catch {
      /* ignore */
    }
    const fm = raw ? matter(raw).data : {};
    const result = ConceptNode.safeParse(fm);
    return (
      <article className="space-y-6">
        <header className="border-b border-zinc-300 pb-3">
          <BreadCrumb slug={params.slug} />
          <h1 className="text-2xl font-semibold font-mono">{params.slug}</h1>
          <p className="text-xs text-zinc-600 mt-1">
            This file failed schema validation; rendering raw frontmatter only.
          </p>
        </header>
        <ValidationBox result={result} label="concept node schema" />
        <section>
          <h2 className="text-sm font-mono uppercase tracking-wider text-zinc-700 mb-2">
            raw frontmatter
          </h2>
          <pre className="border border-zinc-300 bg-white px-3 py-2 text-[11px] font-mono whitespace-pre-wrap text-zinc-900 overflow-x-auto">
            {JSON.stringify(fm, null, 2)}
          </pre>
        </section>
      </article>
    );
  }

  const { node, file } = found;
  // Re-run safeParse for live, accurate output as the spec requires.
  const validation = ConceptNode.safeParse(node);

  const sourceIndex = new Map(sources.valid.map((p) => [`${p.text_key}::${p.locator}`, p]));

  return (
    <article className="space-y-8">
      {/* ----- HEADER ----- */}
      <header className="border-b border-zinc-300 pb-4">
        <BreadCrumb slug={node.slug} />
        <div className="flex items-baseline gap-4 flex-wrap">
          <h1 className="sa text-3xl text-zinc-900">{node.title_sa}</h1>
          <span className="italic text-zinc-700">{node.title_iast}</span>
          <span className="text-zinc-500">·</span>
          <span className="text-zinc-700">{node.title_en}</span>
          <span className="text-zinc-500">·</span>
          <span className="ml text-zinc-700">{node.title_ml}</span>
        </div>
        <dl className="mt-2 grid grid-cols-[max-content_1fr] gap-x-3 gap-y-0.5 font-mono text-[11px] text-zinc-600">
          <dt className="text-zinc-500">id</dt>
          <dd>{node.id}</dd>
          <dt className="text-zinc-500">slug</dt>
          <dd>{node.slug}</dd>
          <dt className="text-zinc-500">rasa_stage</dt>
          <dd>{node.rasa_stage}</dd>
          <dt className="text-zinc-500">file</dt>
          <dd className="truncate">{path.relative(process.cwd(), file)}</dd>
        </dl>
      </header>

      {/* ----- VALIDATION ----- */}
      <section>
        <ValidationBox result={validation} label="concept node schema" />
      </section>

      {/* ----- DEPTH × STATUS GRID -----
          The four depths down the rows, the five possible content statuses
          across the columns. The current status of each depth is filled in
          its column. This is the at-a-glance audit of fidelity progress. */}
      <section>
        <h2 className="text-sm font-mono uppercase tracking-wider text-zinc-700 mb-2">
          four-depth status grid
        </h2>
        <div className="border border-zinc-300 bg-white overflow-x-auto">
          <table className="w-full text-xs">
            <thead className="bg-zinc-100 text-zinc-700 font-mono uppercase tracking-wider text-[10px]">
              <tr>
                <th className="text-left px-3 py-2 border-b border-r border-zinc-300">depth</th>
                {STATUS_COLUMNS.map((col) => (
                  <th
                    key={col}
                    className="text-left px-3 py-2 border-b border-r border-zinc-300 last:border-r-0"
                  >
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {DEPTH_KEYS.map((depth) => {
                const current = node.depths[depth].status;
                return (
                  <tr key={depth} className="border-b border-zinc-200">
                    <td className="px-3 py-2 border-r border-zinc-200 font-mono text-zinc-700">
                      {DEPTH_LABEL[depth]}
                    </td>
                    {STATUS_COLUMNS.map((col) => (
                      <td
                        key={col}
                        className="px-3 py-2 border-r border-zinc-200 last:border-r-0"
                      >
                        {current === col ? <StatusBadge status={current} /> : (
                          <span className="text-zinc-300 font-mono text-[10px]">·</span>
                        )}
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>

      {/* ----- SOURCE_REFS TABLE -----
          The keystone of the three-click audit trail. Each locator links
          to the SourcePassage detail page (click #3). */}
      <section>
        <h2 className="text-sm font-mono uppercase tracking-wider text-zinc-700 mb-2">
          source_refs <span className="text-zinc-500">[{node.source_refs.length}]</span>
        </h2>
        {node.source_refs.length === 0 ? (
          <div className="border border-dashed border-zinc-300 bg-white px-3 py-3 text-xs text-zinc-600">
            No source bindings yet. Publishing any depth requires at least one entry
            (schema-enforced via <code className="font-mono">superRefine</code>).
          </div>
        ) : (
          <div className="border border-zinc-300 bg-white overflow-x-auto">
            <table className="w-full text-xs">
              <thead className="bg-zinc-100 text-zinc-700 font-mono uppercase tracking-wider text-[10px]">
                <tr>
                  <th className="text-left px-3 py-2 border-b border-zinc-300">text</th>
                  <th className="text-left px-3 py-2 border-b border-zinc-300">locator</th>
                  <th className="text-left px-3 py-2 border-b border-zinc-300">verified_by</th>
                  <th className="text-left px-3 py-2 border-b border-zinc-300">verified_at</th>
                  <th className="text-left px-3 py-2 border-b border-zinc-300">resolves?</th>
                </tr>
              </thead>
              <tbody>
                {node.source_refs.map((ref, idx) => {
                  const key = `${ref.text}::${ref.locator}`;
                  const resolved = sourceIndex.has(key);
                  return (
                    <tr key={idx} className="border-b border-zinc-200">
                      <td className="px-3 py-2 align-top font-mono text-[11px]">
                        {ref.text}
                      </td>
                      <td className="px-3 py-2 align-top font-mono">
                        <Link
                          href={`/shastrika/source/${ref.text}/${locatorToPath(ref.locator)}`}
                          className="underline decoration-zinc-300 hover:decoration-zinc-700"
                        >
                          {ref.locator}
                        </Link>
                      </td>
                      <td className="px-3 py-2 align-top font-mono text-[11px]">
                        {ref.verified_by ?? <span className="text-zinc-400">null</span>}
                      </td>
                      <td className="px-3 py-2 align-top font-mono text-[11px]">
                        {ref.verified_at ?? <span className="text-zinc-400">null</span>}
                      </td>
                      <td className="px-3 py-2 align-top font-mono text-[11px]">
                        {resolved ? (
                          <span className="text-emerald-700">yes</span>
                        ) : (
                          <span className="text-rose-700">no — passage absent</span>
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

      {/* ----- PROVENANCE PER PARAGRAPH ----- */}
      <section>
        <h2 className="text-sm font-mono uppercase tracking-wider text-zinc-700 mb-2">
          provenance_per_paragraph{' '}
          <span className="text-zinc-500">[{node.provenance_per_paragraph.length}]</span>
        </h2>
        {node.provenance_per_paragraph.length === 0 ? (
          <div className="border border-dashed border-zinc-300 bg-white px-3 py-3 text-xs text-zinc-600">
            No paragraph-level provenance tags recorded. Every paragraph of authored
            prose carries one (vision Part III.4).
          </div>
        ) : (
          <ul className="border border-zinc-300 bg-white divide-y divide-zinc-200 font-mono text-[11px]">
            {node.provenance_per_paragraph.map((p, idx) => (
              <li key={idx} className="px-3 py-2 flex justify-between">
                <span className="text-zinc-700">{p.paragraph_id}</span>
                <span className="text-zinc-600">{p.kind}</span>
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* ----- PREREQUISITES & RELATED ----- */}
      <section className="grid md:grid-cols-2 gap-6">
        <div>
          <h2 className="text-sm font-mono uppercase tracking-wider text-zinc-700 mb-2">
            prerequisites{' '}
            <span className="text-zinc-500">[{node.prerequisites.length}]</span>
          </h2>
          <CrossLinkList slugs={node.prerequisites} validSet={valid.map((v) => v.node.slug)} />
        </div>
        <div>
          <h2 className="text-sm font-mono uppercase tracking-wider text-zinc-700 mb-2">
            related_concepts{' '}
            <span className="text-zinc-500">[{node.related_concepts.length}]</span>
          </h2>
          <CrossLinkList
            slugs={node.related_concepts}
            validSet={valid.map((v) => v.node.slug)}
          />
        </div>
      </section>

      {/* ----- RAW FRONTMATTER -----
          Read-only inspection. The editor is a later track. The MDX body
          is deliberately omitted here: the body is authored prose for the
          reading view, and rendering it inside the console would risk
          inverting the rule that drafts stay invisible to learners.
          The file path above gives the shastrika what they need to open
          the body in their text editor. */}
      <section>
        <h2 className="text-sm font-mono uppercase tracking-wider text-zinc-700 mb-2">
          raw frontmatter (read-only)
        </h2>
        <pre className="border border-zinc-300 bg-white px-3 py-2 text-[11px] font-mono whitespace-pre-wrap text-zinc-900 overflow-x-auto">
          {JSON.stringify(node, null, 2)}
        </pre>
      </section>

      {/* MDX body intentionally not rendered. See note above. */}
      <section className="text-[11px] text-zinc-500 font-mono">
        MDX body not rendered in this view by design. The shastrika edits
        prose in their text editor; the console audits structure, not prose
        appearance.
      </section>
    </article>
  );
}

/* ------------------------------------------------------------------ */

function BreadCrumb({ slug }: { slug: string }) {
  return (
    <nav className="text-[11px] font-mono text-zinc-500 mb-2">
      <Link href="/shastrika" className="underline decoration-zinc-300 hover:decoration-zinc-700">
        index
      </Link>{' '}
      / concepts /{' '}
      <span className="text-zinc-700">{slug}</span>
    </nav>
  );
}

function CrossLinkList({
  slugs,
  validSet,
}: {
  slugs: string[];
  validSet: string[];
}) {
  if (slugs.length === 0) {
    return (
      <div className="border border-dashed border-zinc-300 bg-white px-3 py-2 text-xs text-zinc-500">
        none
      </div>
    );
  }
  const known = new Set(validSet);
  return (
    <ul className="border border-zinc-300 bg-white divide-y divide-zinc-200 font-mono text-[11px]">
      {slugs.map((s) => {
        const exists = known.has(s);
        return (
          <li key={s} className="px-3 py-2 flex items-center justify-between">
            {exists ? (
              <Link
                href={`/shastrika/concept/${s}`}
                className="underline decoration-zinc-300 hover:decoration-zinc-700"
              >
                {s}
              </Link>
            ) : (
              <span className="text-zinc-700">{s}</span>
            )}
            {!exists && (
              <span className="text-amber-700 text-[10px]" title="no node with this slug">
                not in corpus
              </span>
            )}
          </li>
        );
      })}
    </ul>
  );
}
