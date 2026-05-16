'use client';

/**
 * Minimal play / pause control for a recitation audio file.
 *
 * If `audioRef` is null the component renders nothing — silence is the
 * default, and absent audio should not occupy visual space (vision
 * Part V: no decoration, no placeholder controls).
 *
 * No scrubber, no time display, no volume slider, no waveform. The
 * vritti is for hearing the mūla; the control is for letting that
 * happen, not for ornamenting it.
 */

import { useEffect, useRef, useState } from 'react';
import type { Locale } from '@/lib/status';

export function RecitationControl({
  audioRef,
  locale,
}: {
  audioRef: string | null;
  locale: Locale;
}) {
  const elRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const el = elRef.current;
    if (!el) return;
    const onPlay = () => setPlaying(true);
    const onPause = () => setPlaying(false);
    const onEnded = () => setPlaying(false);
    el.addEventListener('play', onPlay);
    el.addEventListener('pause', onPause);
    el.addEventListener('ended', onEnded);
    return () => {
      el.removeEventListener('play', onPlay);
      el.removeEventListener('pause', onPause);
      el.removeEventListener('ended', onEnded);
    };
  }, []);

  if (!audioRef) return null;

  const toggle = () => {
    const el = elRef.current;
    if (!el) return;
    if (el.paused) void el.play();
    else el.pause();
  };

  const label = playing
    ? locale === 'ml'
      ? 'പാരായണം നിർത്തുക'
      : 'pause recitation'
    : locale === 'ml'
      ? 'പാരായണം കേൾക്കുക'
      : 'play recitation';

  return (
    <div className="inline-flex items-center gap-2 text-sm text-ink-muted">
      <button
        type="button"
        onClick={toggle}
        aria-label={label}
        className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-ink-faint/40 text-ink-muted transition-colors hover:border-ink-muted hover:text-ink"
      >
        {playing ? (
          // pause glyph (two bars)
          <svg width="10" height="12" viewBox="0 0 10 12" aria-hidden="true">
            <rect x="0" y="0" width="3" height="12" fill="currentColor" />
            <rect x="7" y="0" width="3" height="12" fill="currentColor" />
          </svg>
        ) : (
          // play glyph (triangle)
          <svg width="10" height="12" viewBox="0 0 10 12" aria-hidden="true">
            <path d="M0 0 L10 6 L0 12 Z" fill="currentColor" />
          </svg>
        )}
      </button>
      <span className={locale === 'ml' ? 'ml' : ''}>{label}</span>
      <audio ref={elRef} src={audioRef} preload="none" />
    </div>
  );
}
