'use client';

/**
 * Hover-tooltip for a single Sanskrit pada.
 *
 * Triggered on pointer enter or keyboard focus. Renders the IAST plus
 * a brief gloss in the active reading locale. Decorative animation is
 * avoided (vision Part V); the tooltip simply appears.
 *
 * The trigger styling is a soft dotted underline — visible enough to
 * invite, quiet enough to disappear when not needed. No icons, no
 * "click me" affordances.
 */

import { useId, useState } from 'react';
import type { Locale } from '@/lib/status';
import type { PadaVigraha } from '@/lib/schema';

export function GlossaryHover({
  pada,
  locale,
}: {
  pada: PadaVigraha;
  locale: Locale;
}) {
  const [open, setOpen] = useState(false);
  const tooltipId = useId();
  const gloss = locale === 'ml' ? pada.gloss_ml : pada.gloss_en;
  const glossClass = locale === 'ml' ? 'ml' : '';

  return (
    <span
      className="relative inline-block"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onFocus={() => setOpen(true)}
      onBlur={() => setOpen(false)}
    >
      <span
        tabIndex={0}
        aria-describedby={open ? tooltipId : undefined}
        className="sa cursor-help border-b border-dotted border-ink-faint/60 outline-none focus:border-ink-muted"
      >
        {pada.pada}
      </span>
      {open && (
        <span
          id={tooltipId}
          role="tooltip"
          className="absolute left-1/2 top-full z-10 mt-2 w-64 -translate-x-1/2 rounded-sm border border-ink-faint/30 bg-page-deep px-3 py-2 text-left text-sm shadow-sm"
        >
          <span className="block italic tracking-wide text-ink-muted">
            {pada.iast}
          </span>
          <span className={`mt-1 block text-ink ${glossClass}`}>{gloss}</span>
        </span>
      )}
    </span>
  );
}
