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
    </div>
  );
}
