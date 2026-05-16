/**
 * Source-corpus index for the `/read` browser surface.
 *
 * Groups every `SourcePassage` by `(text_key, chapter)` — where chapter
 * is the second segment of the id (`pp.<chapter>.<N>` or
 * `nk.<chapter>.<N>`). Passages are sorted by the numeric trailing
 * segment of the locator.
 *
 * This module is independent of the ConceptNode pipeline. It surfaces
 * the corpus directly for sequential reading; concept-node binding
 * remains the canonical reading path at `/[locale]/concept/<slug>`.
 */

import { loadSourcePassages } from './content';
import type { SourcePassage, TextKey } from './schema';

/** Display titles for the chapter slugs. Order matters — they are the
 *  natural sequence in which Praśastapāda's bhāṣya unfolds. */
export const CHAPTER_ORDER: { slug: string; title_en: string; title_ml: string }[] = [
  { slug: 'introduction', title_en: 'Introduction', title_ml: 'പ്രസ്താവന' },
  { slug: 'enumeration-of-categories', title_en: 'Enumeration of Categories', title_ml: 'പദാർത്ഥ-ഗണനം' },
  { slug: 'sadharmya-vaidharmya', title_en: 'Sādharmya & Vaidharmya', title_ml: 'സാധർമ്മ്യ-വൈധർമ്മ്യം' },
  { slug: 'visesha-dravya', title_en: 'Special Substances', title_ml: 'വിശേഷ-ദ്രവ്യങ്ങൾ' },
  { slug: 'mahabhutas', title_en: 'The Mahābhūtas', title_ml: 'മഹാഭൂതങ്ങൾ' },
  { slug: 'guna', title_en: 'Guṇa — Qualities', title_ml: 'ഗുണപദാർത്ഥം' },
  { slug: 'karma', title_en: 'Karma — Actions', title_ml: 'കർമ്മപദാർത്ഥം' },
  { slug: 'samanya', title_en: 'Sāmānya — Community', title_ml: 'സാമാന്യപദാർത്ഥം' },
  { slug: 'vishesha', title_en: 'Viśeṣa — Ultimate Particularity', title_ml: 'വിശേഷപദാർത്ഥം' },
  { slug: 'samavaya', title_en: 'Samavāya — Inherence', title_ml: 'സമവായപദാർത്ഥം' },
];

export const TEXT_TITLES: Record<TextKey, { en: string; ml: string; sa: string }> = {
  prashastapada: {
    en: "Praśastapāda's Padārthadharmasaṃgraha",
    ml: 'പ്രശസ്തപാദ-വിരചിത പദാർത്ഥധർമ്മസംഗ്രഹം',
    sa: 'पदार्थधर्मसंग्रहः',
  },
  nyayakandali: {
    en: "Śrīdhara's Nyāyakandalī",
    ml: 'ശ്രീധര-വിരചിത ന്യായകന്ദലി',
    sa: 'न्यायकन्दली',
  },
};

export type ChapterEntry = {
  text: TextKey;
  chapter: string;
  title_en: string;
  title_ml: string;
  passageCount: number;
};

export type ChapterContents = ChapterEntry & {
  passages: SourcePassage[];
};

function parseChapter(id: string): string | null {
  const parts = id.split('.');
  return parts[1] ?? null;
}

function parseTrailingNumber(locator: string): number {
  // locator may be "guna.46" or "gloss.guna.46" — last segment is numeric
  const tail = locator.split('.').pop() ?? '0';
  const n = parseInt(tail, 10);
  return Number.isFinite(n) ? n : 0;
}

/**
 * Returns one ChapterEntry per (text, chapter) pair with at least one
 * passage. Ordered: texts (Praśastapāda, then Nyāyakandalī), then
 * chapter in canonical CHAPTER_ORDER. Empty chapters are omitted.
 */
export async function listChapters(): Promise<ChapterEntry[]> {
  const { valid } = await loadSourcePassages();
  const counts = new Map<string, number>();
  for (const p of valid) {
    const chapter = parseChapter(p.id);
    if (!chapter) continue;
    const key = `${p.text_key}/${chapter}`;
    counts.set(key, (counts.get(key) ?? 0) + 1);
  }
  const orderIdx = new Map(CHAPTER_ORDER.map((c, i) => [c.slug, i]));
  const titleByslug = new Map(CHAPTER_ORDER.map((c) => [c.slug, c]));
  const out: ChapterEntry[] = [];
  for (const [key, n] of counts) {
    const [text, chapter] = key.split('/') as [TextKey, string];
    const t = titleByslug.get(chapter);
    out.push({
      text,
      chapter,
      title_en: t?.title_en ?? chapter,
      title_ml: t?.title_ml ?? chapter,
      passageCount: n,
    });
  }
  out.sort((a, b) => {
    if (a.text !== b.text) return a.text === 'prashastapada' ? -1 : 1;
    return (orderIdx.get(a.chapter) ?? 99) - (orderIdx.get(b.chapter) ?? 99);
  });
  return out;
}

/**
 * All passages for one (text, chapter) pair, sorted by the numeric
 * trailing segment of the locator.
 */
export async function loadChapter(
  text: TextKey,
  chapter: string,
): Promise<ChapterContents | null> {
  const { valid } = await loadSourcePassages();
  const filtered = valid.filter(
    (p) => p.text_key === text && parseChapter(p.id) === chapter,
  );
  if (filtered.length === 0) return null;
  filtered.sort((a, b) => parseTrailingNumber(a.locator) - parseTrailingNumber(b.locator));
  const t = CHAPTER_ORDER.find((c) => c.slug === chapter);
  return {
    text,
    chapter,
    title_en: t?.title_en ?? chapter,
    title_ml: t?.title_ml ?? chapter,
    passageCount: filtered.length,
    passages: filtered,
  };
}
