/**
 * Maṅgalācaraṇa — the benedictory header opening the praveśa sequence.
 *
 * The Sanskrit text is supplied by the caller (vision Part I commitment 2:
 * no authored Sanskrit beyond the seven padārtha terms). A conservative
 * default is provided so the component renders meaningfully in isolation.
 * The audio source points to public/audio/mangalacarana.mp3, which is out
 * of scope for this track; if the file is missing the <audio> element
 * silently fails its load and renders only as a degraded inert control.
 *
 * Audio behaviour: no autoplay. The learner chooses to listen. Honors the
 * "no interference" commitment (Part I.3) — sound is offered, not imposed.
 */

import type { FC } from 'react';

export interface MangalacaranaProps {
  /** Devanagari benedictory phrase. Defaulted to the most uncontroversial. */
  textSa?: string;
  /** IAST transliteration of the same. */
  textIast?: string;
  /** Path under /public to the audio file. */
  audioSrc?: string;
}

const DEFAULT_SA = 'ॐ नमो भगवते वासुदेवाय';
const DEFAULT_IAST = 'oṃ namo bhagavate vāsudevāya';
const DEFAULT_AUDIO = '/audio/mangalacarana.mp3';

export const Mangalacarana: FC<MangalacaranaProps> = ({
  textSa = DEFAULT_SA,
  textIast = DEFAULT_IAST,
  audioSrc = DEFAULT_AUDIO,
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
      <p className="text-sm italic text-ink-muted mb-10">{textIast}</p>
      <audio
        controls
        preload="none"
        className="mx-auto block w-full max-w-xs opacity-70"
        aria-label="maṅgalācaraṇa recitation"
      >
        <source src={audioSrc} type="audio/mpeg" />
      </audio>
    </section>
  );
};

export default Mangalacarana;
