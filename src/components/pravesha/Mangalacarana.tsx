/**
 * Maṅgalācaraṇa — the benedictory header opening the praveśa sequence.
 *
 * Currently text-only: Devanagari + IAST + a plain English gloss of the
 * salutation, no audio. An earlier draft carried an <audio> element
 * pointing at `/audio/mangalacarana.mp3`; that file was never recorded
 * and the empty <audio> control rendered as a broken control on the
 * deployed site. Audio is welcome to return later as a separate track
 * (a śāstrika's recitation, properly attributed); until then the
 * written maṅgala stands alone.
 *
 * The Sanskrit text is supplied by the caller (vision Part I commitment 2:
 * no authored Sanskrit beyond the seven padārtha terms). A conservative
 * default — the universally-uncontroversial Vāsudeva salutation — is
 * provided so the component renders meaningfully in isolation.
 */

import type { FC } from 'react';

export interface MangalacaranaProps {
  /** Devanagari benedictory phrase. Defaulted to the most uncontroversial. */
  textSa?: string;
  /** IAST transliteration of the same. */
  textIast?: string;
  /** Plain English gloss, shown small under the IAST. */
  gloss?: string;
  /** Optional Malayalam gloss in maṇipravāḷam register. */
  glossMl?: string;
}

const DEFAULT_SA = 'ॐ नमो भगवते वासुदेवाय';
const DEFAULT_IAST = 'oṃ namo bhagavate vāsudevāya';
const DEFAULT_GLOSS = 'salutation to the blessed Vāsudeva';
const DEFAULT_GLOSS_ML = 'ഭഗവാൻ വാസുദേവനു നമസ്കാരം';

export const Mangalacarana: FC<MangalacaranaProps> = ({
  textSa = DEFAULT_SA,
  textIast = DEFAULT_IAST,
  gloss = DEFAULT_GLOSS,
  glossMl = DEFAULT_GLOSS_ML,
}) => {
  return (
    <section
      aria-labelledby="mangalacarana-heading"
      className="mx-auto max-w-prose px-6 pt-24 pb-12 text-center"
    >
      <h2
        id="mangalacarana-heading"
        className="text-xs uppercase tracking-[0.3em] text-ink-faint mb-8"
      >
        maṅgalācaraṇa
      </h2>
      <p className="sa text-3xl text-ink mb-4 leading-snug">{textSa}</p>
      <p className="text-sm italic text-ink-muted mb-2">{textIast}</p>
      <p className="text-xs text-ink-faint">{gloss}</p>
      <p className="ml text-xs text-ink-faint mt-1">{glossMl}</p>
    </section>
  );
};

export default Mangalacarana;
