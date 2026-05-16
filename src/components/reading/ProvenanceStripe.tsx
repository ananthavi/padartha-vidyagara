/**
 * Marginal provenance indicator (vision Part III.4).
 *
 * Three tones, one per provenance kind. The stripe is the only place
 * provenance is communicated; we never interrupt the reading flow with
 * inline annotations. The visual rule lives in app/globals.css under
 * `.provenance-stripe[data-kind=...]`; this component is just the
 * typed React wrapper around that rule.
 *
 * Pure / server-renderable: no state, no client-only APIs.
 */

import type { ReactNode } from 'react';
import type { Provenance } from '@/lib/schema';

export function ProvenanceStripe({
  kind,
  children,
  as: Tag = 'div',
  className = '',
}: {
  kind: Provenance;
  children: ReactNode;
  as?: keyof JSX.IntrinsicElements;
  className?: string;
}) {
  return (
    <Tag
      className={`provenance-stripe ${className}`.trim()}
      data-kind={kind}
    >
      {children}
    </Tag>
  );
}
