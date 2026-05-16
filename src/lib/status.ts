/**
 * Status-gating helpers. The reading UI consults these — never the raw
 * status strings — so the rule that "the reading UI only ever displays
 * published_* content" (vision Part III.2) is enforced in one place.
 */

import type { ContentStatus } from './schema';

export type Locale = 'en' | 'ml';

export function isPublishedFor(status: ContentStatus, locale: Locale): boolean {
  if (status === 'published') return true;
  return locale === 'en' ? status === 'published_en' : status === 'published_ml';
}

export function isDraft(status: ContentStatus): boolean {
  return status === 'draft';
}

export function isUnderReview(status: ContentStatus): boolean {
  return status === 'under_review_en' || status === 'under_review_ml';
}

/**
 * Locales for which the given status set has at least one published depth.
 * Useful for the locale switcher (do not show 'ml' if no Malayalam content exists yet).
 */
export function availableLocales(statuses: ContentStatus[]): Locale[] {
  const out: Locale[] = [];
  if (statuses.includes('published_en')) out.push('en');
  if (statuses.includes('published_ml')) out.push('ml');
  return out;
}
