'use client';

/**
 * Four-depth selector: kārikā · bhāṣya · vṛtti · ṭīkā.
 *
 * This is a SELECTOR. It is not a tracker. There is no "25% complete",
 * no checkmarks for "read", no streak indicator, no badge (vision Part
 * XI). It is always visible because depth is the reader's choice at
 * every moment, but it never demands attention.
 *
 * Unpublished depths are still listed — their existence is part of the
 * doctrinal structure — but rendered dimmed and disabled, with a quiet
 * tooltip indicating they are being prepared. This honours commitment
 * 4 (Sanskrit is primary): the four-layer architecture is shown even
 * when only some layers are yet visible.
 */

import clsx from 'clsx';
import type { Locale } from '@/lib/status';

export type Depth = 'karika' | 'bhashya' | 'vritti' | 'tika';

export const DEPTHS: Depth[] = ['karika', 'bhashya', 'vritti', 'tika'];

const SANSKRIT_LABEL: Record<Depth, string> = {
  karika: 'kārikā',
  bhashya: 'bhāṣya',
  vritti: 'vṛtti',
  tika: 'ṭīkā',
};

export function DepthSelector({
  current,
  onChange,
  availability,
  locale,
}: {
  current: Depth;
  onChange: (next: Depth) => void;
  /** Whether each depth is available (published) in the current locale. */
  availability: Record<Depth, boolean>;
  locale: Locale;
}) {
  const unavailableTitle =
    locale === 'ml'
      ? 'ഈ സ്തരം തയ്യാറാക്കുന്നു.'
      : 'this depth is being prepared';

  return (
    <nav
      aria-label={locale === 'ml' ? 'സ്തരം തിരഞ്ഞെടുക്കുക' : 'select depth'}
      className="flex flex-wrap items-baseline gap-x-5 gap-y-2 text-sm"
    >
      {DEPTHS.map((d) => {
        const available = availability[d];
        const active = d === current;
        return (
          <button
            key={d}
            type="button"
            onClick={() => available && onChange(d)}
            disabled={!available}
            aria-current={active ? 'true' : undefined}
            aria-disabled={!available}
            title={!available ? unavailableTitle : undefined}
            className={clsx(
              'sa tracking-wide transition-colors',
              active && 'text-ink underline decoration-ink-muted underline-offset-4',
              !active && available && 'text-ink-muted hover:text-ink',
              !available && 'cursor-not-allowed text-ink-faint/60',
            )}
          >
            {SANSKRIT_LABEL[d]}
          </button>
        );
      })}
    </nav>
  );
}
