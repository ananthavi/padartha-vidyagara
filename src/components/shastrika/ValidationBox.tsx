/**
 * Renders the issues from a Zod `safeParse` result in a quiet,
 * non-decorative box for the shastrika console. Surfaces validation;
 * does not fix it.
 *
 * The shastrika console does not bypass schema validation (vision
 * Part III). A failing node still shows up in the index so the
 * editor sees what to fix.
 */

import type { SafeParseReturnType } from 'zod';

type AnyResult = SafeParseReturnType<unknown, unknown>;

export function ValidationBox({
  result,
  label = 'schema validation',
}: {
  result: AnyResult;
  label?: string;
}) {
  if (result.success) {
    return (
      <div className="border border-emerald-300 bg-emerald-50 px-3 py-2 text-xs text-emerald-900">
        <span className="font-mono uppercase tracking-wider text-[10px]">{label}</span>
        <span className="ml-2">passes</span>
      </div>
    );
  }

  return (
    <div className="border border-rose-300 bg-rose-50 px-3 py-2 text-xs text-rose-900">
      <div className="font-mono uppercase tracking-wider text-[10px] mb-1">
        {label} — {result.error.issues.length} issue
        {result.error.issues.length === 1 ? '' : 's'}
      </div>
      <ul className="space-y-1 font-mono text-[11px] leading-snug">
        {result.error.issues.map((issue, idx) => (
          <li key={idx} className="flex gap-2">
            <span className="text-rose-700 shrink-0">
              {issue.path.length === 0 ? '<root>' : issue.path.join('.')}
            </span>
            <span className="text-rose-900">{issue.message}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
