'use client';

/**
 * Collapsed-by-default citation drawer.
 *
 * Lists `source_refs` with their text key, locator, and verification
 * status. Related concepts may appear here as a neutral list — they
 * are NEVER pushed as a "next up" rail in the reading view (vision
 * Part XI). The drawer exists for the learner who chooses to look,
 * never to advertise.
 *
 * No animation library — a single CSS transition of max-height keeps
 * the drawer quiet. Disclosure is a doctrinal pause, not a flourish.
 */

import { useState } from 'react';
import type { ConceptNode } from '@/lib/schema';
import type { Locale } from '@/lib/status';

export function SourceDrawer({
  node,
  locale,
}: {
  node: ConceptNode;
  locale: Locale;
}) {
  const [open, setOpen] = useState(false);

  const refs = node.source_refs;
  const related = node.related_concepts;

  const labelClosed =
    locale === 'ml' ? 'സ്രോതസ്സുകൾ കാണുക' : 'show sources';
  const labelOpen =
    locale === 'ml' ? 'സ്രോതസ്സുകൾ മറയ്ക്കുക' : 'hide sources';
  const emptyLabel =
    locale === 'ml'
      ? 'ഇതുവരെ സ്രോതസ്സ് ബന്ധിപ്പിച്ചിട്ടില്ല.'
      : 'No source bindings yet.';
  const relatedLabel = locale === 'ml' ? 'ബന്ധപ്പെട്ടത്' : 'related';

  return (
    <section className="border-t border-ink-faint/30 pt-6 text-sm">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls="source-drawer-body"
        className={`text-ink-muted hover:text-ink ${locale === 'ml' ? 'ml' : ''}`}
      >
        {open ? labelOpen : labelClosed}
      </button>
      <div
        id="source-drawer-body"
        hidden={!open}
        className="mt-4 space-y-4 text-ink-muted"
      >
        {refs.length === 0 ? (
          <p className={locale === 'ml' ? 'ml' : ''}>{emptyLabel}</p>
        ) : (
          <ul className="space-y-2">
            {refs.map((r, i) => {
              const verified = r.verified_by !== null && r.verified_at !== null;
              return (
                <li
                  key={`${r.text}-${r.locator}-${i}`}
                  className="flex items-baseline gap-3"
                >
                  <span className="font-serif">
                    <span className="italic">{r.text}</span>
                    <span className="mx-1 text-ink-faint">·</span>
                    <span>{r.locator}</span>
                  </span>
                  <span
                    className="text-xs uppercase tracking-wide text-ink-faint"
                    title={
                      verified
                        ? `verified by ${r.verified_by} at ${r.verified_at}`
                        : 'awaiting shastrika verification'
                    }
                  >
                    {verified
                      ? locale === 'ml'
                        ? 'പരിശോധിച്ചു'
                        : 'verified'
                      : locale === 'ml'
                        ? 'പരിശോധന ബാക്കി'
                        : 'unverified'}
                  </span>
                </li>
              );
            })}
          </ul>
        )}

        {related.length > 0 && (
          <div className="pt-2">
            <p className="mb-1 text-xs uppercase tracking-wide text-ink-faint">
              {relatedLabel}
            </p>
            <ul className="flex flex-wrap gap-x-3 gap-y-1">
              {related.map((slug) => (
                <li key={slug}>
                  <a
                    href={`/${locale}/concept/${slug}`}
                    className="text-ink-muted hover:text-ink"
                  >
                    {slug}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
}
