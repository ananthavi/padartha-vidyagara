/**
 * Praveśa entry — the *adbhuta*-governed opening sequence.
 *
 * Authority: docs/VISION.md Part II Phase 1.
 *
 * Composition order is the doctrinal one:
 *   1. Maṅgalācaraṇa — the benedictory header.
 *   2. SevenPadarthasGraph — the categorial map, unfolding node by node.
 *   3. AnubandhaCatuṣṭaya — viṣaya, adhikārī, sambandha, prayojana.
 *   4. ContemplationPrompts — the adhikārī-prakāśana mirror.
 *
 * No "next up" footer, no progress bar, no related links (vision Part XI).
 * The page recedes once the learner has entered.
 */

import Link from 'next/link';
import Mangalacarana from '@/components/pravesha/Mangalacarana';
import SevenPadarthasGraph from '@/components/pravesha/SevenPadarthasGraph';
import AnubandhaCatushtaya from '@/components/pravesha/AnubandhaCatushtaya';
import ContemplationPrompts from '@/components/pravesha/ContemplationPrompts';

export default function PraveshaPage({ params }: { params: { locale: string } }) {
  const locale = params.locale === 'ml' ? 'ml' : 'en';

  return (
    <div className="pb-32">
      <Mangalacarana />
      <SevenPadarthasGraph locale={locale} />
      <AnubandhaCatushtaya locale={locale} />
      <ContemplationPrompts />

      {/*
        A quiet doorway forward. Not a "next up" rail (vision Part XI
        forbids that) — a single named link to the first node. The
        learner moves; the environment offers.
      */}
      <nav
        aria-label={locale === 'ml' ? 'ഗ്രന്ഥത്തിലേക്ക്' : 'into the text'}
        className="mx-auto mt-16 max-w-prose px-6 text-center"
      >
        <Link
          href={`/${locale}/concept/samavaya`}
          className="text-sm text-ink-faint underline-offset-4 transition-colors hover:text-ink-muted hover:underline"
        >
          {locale === 'ml' ? 'സമവായം →' : 'samavāya →'}
        </Link>
      </nav>
    </div>
  );
}
