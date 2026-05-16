/**
 * Tiny utilitarian badge for a ContentStatus value. Used inside the
 * shastrika authoring console only. No motion, no flourish — this is a
 * tool surface (vision Part VI), not the reading view.
 */

import type { ContentStatus } from '@/lib/schema';

const STATUS_CLASSES: Record<ContentStatus, string> = {
  draft: 'bg-zinc-200 text-zinc-700 border-zinc-300',
  under_review_en: 'bg-amber-100 text-amber-800 border-amber-300',
  under_review_ml: 'bg-amber-100 text-amber-800 border-amber-300',
  published_en: 'bg-emerald-100 text-emerald-800 border-emerald-300',
  published_ml: 'bg-emerald-100 text-emerald-800 border-emerald-300',
  published: 'bg-emerald-200 text-emerald-900 border-emerald-400',
};

const STATUS_LABEL: Record<ContentStatus, string> = {
  draft: 'draft',
  under_review_en: 'review·en',
  under_review_ml: 'review·ml',
  published_en: 'pub·en',
  published_ml: 'pub·ml',
  published: 'pub',
};

export function StatusBadge({ status }: { status: ContentStatus }) {
  return (
    <span
      className={`inline-block rounded border px-1.5 py-0.5 font-mono text-[10px] leading-none tracking-tight ${STATUS_CLASSES[status]}`}
      title={status}
    >
      {STATUS_LABEL[status]}
    </span>
  );
}
