#!/usr/bin/env tsx
/**
 * Build-time fidelity gate. Runs `npm run validate:content` (also wired
 * into `npm run build`). Exits non-zero on any schema violation so that
 * unsourced or malformed content cannot reach a deployed reading view.
 */

import {
  loadConcepts,
  loadSourcePassages,
  loadPurvapaksaPositions,
} from '../src/lib/content';

function header(s: string): void {
  // eslint-disable-next-line no-console
  console.log(`\n— ${s} —`);
}

async function main(): Promise<void> {
  let hadErrors = false;

  header('Concept nodes');
  const concepts = await loadConcepts();
  // eslint-disable-next-line no-console
  console.log(`  validated: ${concepts.valid.length}`);
  if (concepts.errors.length > 0) {
    hadErrors = true;
    for (const e of concepts.errors) {
      // eslint-disable-next-line no-console
      console.error(`  ✗ ${e.file}\n    ${e.error}`);
    }
  }

  header('Source passages');
  const sources = await loadSourcePassages();
  // eslint-disable-next-line no-console
  console.log(`  validated: ${sources.valid.length}`);
  if (sources.errors.length > 0) {
    hadErrors = true;
    for (const e of sources.errors) {
      // eslint-disable-next-line no-console
      console.error(`  ✗ ${e.file}: ${e.error}`);
    }
  }

  header('Purvapaksa positions');
  const positions = await loadPurvapaksaPositions();
  const approved = positions.valid.filter(
    (p) => p.approved_by_shastrika && p.approved_at !== null,
  ).length;
  // eslint-disable-next-line no-console
  console.log(`  validated: ${positions.valid.length} (${approved} approved for live dialogue)`);
  if (positions.errors.length > 0) {
    hadErrors = true;
    for (const e of positions.errors) {
      // eslint-disable-next-line no-console
      console.error(`  ✗ ${e.file}: ${e.error}`);
    }
  }

  // Cross-reference: every ConceptNode.source_refs.locator should resolve
  // to a SourcePassage. We warn but do not fail while the source corpus
  // is being ingested. Once `text_key: prashastapada` has any entries,
  // an unresolved reference is a build failure.
  const sourcesByText = new Map<string, Set<string>>();
  for (const s of sources.valid) {
    if (!sourcesByText.has(s.text_key)) sourcesByText.set(s.text_key, new Set());
    sourcesByText.get(s.text_key)!.add(s.locator);
  }
  for (const { node, file } of concepts.valid) {
    for (const ref of node.source_refs) {
      const known = sourcesByText.get(ref.text);
      if (known && !known.has(ref.locator)) {
        hadErrors = true;
        // eslint-disable-next-line no-console
        console.error(
          `  ✗ ${file}: source_refs entry ${ref.text}:${ref.locator} does not resolve to a known passage`,
        );
      }
    }
  }

  if (hadErrors) {
    // eslint-disable-next-line no-console
    console.error('\nContent validation failed. See errors above.');
    process.exit(1);
  }
  // eslint-disable-next-line no-console
  console.log('\nContent OK.');
}

main().catch((e) => {
  // eslint-disable-next-line no-console
  console.error(e);
  process.exit(1);
});
