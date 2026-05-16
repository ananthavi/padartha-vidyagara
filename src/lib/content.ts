/**
 * Content loader. Reads MDX/JSON content from /content, validates against
 * the Zod schemas in ./schema, and returns typed records.
 *
 * Invariant: nothing leaves this module unless it has passed schema
 * validation. The reading view consumes the *Published view, which filters
 * by status (`published_<locale>`).
 */

import fs from 'node:fs/promises';
import path from 'node:path';
import matter from 'gray-matter';
import {
  ConceptNode,
  PurvapaksaPosition,
  SourcePassage,
  type ConceptNode as ConceptNodeT,
  type PurvapaksaPosition as PurvapaksaPositionT,
  type SourcePassage as SourcePassageT,
} from './schema';

const CONTENT_DIR = path.join(process.cwd(), 'content');

export type LoadResult<T> = {
  valid: T[];
  errors: { file: string; error: string }[];
};

async function listFiles(dir: string, extensions: string[]): Promise<string[]> {
  try {
    const entries = await fs.readdir(dir, { withFileTypes: true });
    const out: string[] = [];
    for (const e of entries) {
      const full = path.join(dir, e.name);
      if (e.isDirectory()) {
        out.push(...(await listFiles(full, extensions)));
      } else if (extensions.some((ext) => e.name.endsWith(ext))) {
        out.push(full);
      }
    }
    return out;
  } catch {
    return [];
  }
}

/* ------------------------------------------------------------------ */
/* Concepts (MDX with Zod-validated frontmatter)                      */
/* ------------------------------------------------------------------ */

export async function loadConcepts(): Promise<
  LoadResult<{ node: ConceptNodeT; body: string; file: string }>
> {
  const dir = path.join(CONTENT_DIR, 'concepts');
  const files = await listFiles(dir, ['.mdx']);
  const valid: { node: ConceptNodeT; body: string; file: string }[] = [];
  const errors: { file: string; error: string }[] = [];

  for (const file of files) {
    const raw = await fs.readFile(file, 'utf-8');
    const { data, content } = matter(raw);
    const parsed = ConceptNode.safeParse(data);
    if (parsed.success) {
      valid.push({ node: parsed.data, body: content, file });
    } else {
      errors.push({
        file: path.relative(process.cwd(), file),
        error: parsed.error.issues
          .map((i) => `${i.path.join('.') || '<root>'}: ${i.message}`)
          .join('\n    '),
      });
    }
  }

  return { valid, errors };
}

/**
 * Concepts visible in the reading view for a given locale. A concept is
 * surfaced only if at least one depth is published in the target locale.
 * Drafts and `under_review_*` content are invisible outside the authoring
 * console (vision Part III.2).
 */
export async function loadPublishedConcepts(
  locale: 'en' | 'ml',
): Promise<{ node: ConceptNodeT; body: string; file: string }[]> {
  const { valid } = await loadConcepts();
  const target = locale === 'en' ? 'published_en' : 'published_ml';
  return valid.filter(({ node }) => {
    const statuses = [
      node.depths.karika.status,
      node.depths.bhashya.status,
      node.depths.vritti.status,
      node.depths.tika.status,
    ];
    return statuses.includes(target);
  });
}

export async function findConcept(slug: string): Promise<{
  node: ConceptNodeT;
  body: string;
  file: string;
} | null> {
  const { valid } = await loadConcepts();
  return valid.find((c) => c.node.slug === slug) ?? null;
}

/* ------------------------------------------------------------------ */
/* Source passages (JSON registry)                                    */
/* ------------------------------------------------------------------ */

export async function loadSourcePassages(): Promise<LoadResult<SourcePassageT>> {
  const dir = path.join(CONTENT_DIR, 'sources');
  const files = await listFiles(dir, ['.json']);
  const valid: SourcePassageT[] = [];
  const errors: { file: string; error: string }[] = [];

  for (const file of files) {
    const raw = await fs.readFile(file, 'utf-8');
    let json: unknown;
    try {
      json = JSON.parse(raw);
    } catch (e) {
      errors.push({ file, error: `invalid JSON: ${(e as Error).message}` });
      continue;
    }
    const entries = Array.isArray(json) ? json : [json];
    for (const entry of entries) {
      const parsed = SourcePassage.safeParse(entry);
      if (parsed.success) valid.push(parsed.data);
      else
        errors.push({
          file: path.relative(process.cwd(), file),
          error: parsed.error.issues.map((i) => i.message).join('; '),
        });
    }
  }

  return { valid, errors };
}

/* ------------------------------------------------------------------ */
/* Purvapaksa positions (JSON, gated by shastrika approval)           */
/* ------------------------------------------------------------------ */

export async function loadPurvapaksaPositions(): Promise<LoadResult<PurvapaksaPositionT>> {
  const dir = path.join(CONTENT_DIR, 'purvapaksa');
  const files = await listFiles(dir, ['.json']);
  const valid: PurvapaksaPositionT[] = [];
  const errors: { file: string; error: string }[] = [];

  for (const file of files) {
    const raw = await fs.readFile(file, 'utf-8');
    let json: unknown;
    try {
      json = JSON.parse(raw);
    } catch (e) {
      errors.push({ file, error: `invalid JSON: ${(e as Error).message}` });
      continue;
    }
    const entries = Array.isArray(json) ? json : [json];
    for (const entry of entries) {
      const parsed = PurvapaksaPosition.safeParse(entry);
      if (parsed.success) valid.push(parsed.data);
      else
        errors.push({
          file: path.relative(process.cwd(), file),
          error: parsed.error.issues.map((i) => i.message).join('; '),
        });
    }
  }

  return { valid, errors };
}

/**
 * Positions admitted to live AI dialogue. The dialectic engine MUST source
 * from this filtered list and no other (vision Part VI: "Live AI dialogue
 * is permitted only within the bounds of approved positions").
 */
export async function loadApprovedPurvapaksa(): Promise<PurvapaksaPositionT[]> {
  const { valid } = await loadPurvapaksaPositions();
  return valid.filter((p) => p.approved_by_shastrika && p.approved_at !== null);
}
