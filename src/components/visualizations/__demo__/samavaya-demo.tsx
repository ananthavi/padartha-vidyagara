/**
 * Samavaya / Samyoga visualization demo wrapper.
 *
 * This is a reviewer-facing surface, not part of the reading view. It is
 * mounted at /_visualizations/samavaya so a shastrika reviewer can inspect
 * the visualization in isolation without it leaking into the locale-aware
 * reading column.
 *
 * The DisanalogyPanel phrasings here are intentionally conservative.
 * They follow the spec for Fanout Track B3 and are not yet bound to a
 * source_ref; before this visualization can be referenced from a
 * published depth, the phrasings need shastrika sign-off and a binding
 * to Prashastapada/Nyayakandali via SourcePassage (vision Part VIII).
 */

import { DisanalogyPanel } from '../DisanalogyPanel';
import { SamavayaSamyoga } from '../SamavayaSamyoga';

export function SamavayaDemo() {
  return (
    <main className="mx-auto w-full max-w-4xl px-4 py-10">
      <header className="mb-6">
        <h1 className="font-serif text-2xl text-ink">
          Samavāya, contrasted with saṃyoga
        </h1>
        <p className="mt-1 text-sm text-ink-muted">
          Hover or tap either panel to apply the same lifting gesture. The
          two outcomes are the doctrine.
        </p>
      </header>

      <DisanalogyPanel
        reveals={{
          en:
            'Samavāya holds parts and whole, qualities and substance, in a ' +
            'relation that cannot be undone without one of the relata ceasing to be.',
          // TODO(shastrika): Malayalam rendering of the doctrinal "reveals"
          // phrase. Holding open until the technical phrasing is reviewed,
          // since "ceasing to be" requires care (asat / abhāva distinctions).
        }}
        falsifies={{
          en:
            'This is not magnetism, not chemical bonding, not topological ' +
            'linkage. The relation is not a force in spacetime; it is a ' +
            'categorial relation whose denial leaves the substance unintelligible.',
          // TODO(shastrika): a faithful Malayalam line for the "falsifies"
          // clause. The technical terms ("categorial relation",
          // "unintelligible") need shastrika-vetted Malayalam equivalents
          // before we render them; a forced gloss would distort.
        }}
      >
        <SamavayaSamyoga />
      </DisanalogyPanel>

      <section className="mx-auto mt-10 max-w-prose text-sm text-ink-muted">
        <h2 className="font-sans text-xs uppercase tracking-widest text-ink-faint">
          reviewer notes
        </h2>
        <ul className="mt-2 list-disc space-y-2 pl-5">
          <li>
            The same gesture (a single upward pull at the centre) is applied
            to both panels. On the left (saṃyoga) it lifts the blanket
            cleanly off the floor; both relata persist, only the contact
            relation fades. On the right (samavāya) it does not lift a
            "cloth" off "threads" — there is no cloth standing apart from
            its threads to be lifted. The weave loosens, the warps droop,
            the rectangular boundary disintegrates, and the relatum{' '}
            <em>paṭa</em> ceases to be (<em>ayutasiddha</em>).
          </li>
          <li>
            No analogy to chemical bonding, set-membership, magnetism, or
            topology is offered. The DisanalogyPanel above states these
            explicitly as falsifications.
          </li>
        </ul>
      </section>
    </main>
  );
}

export default SamavayaDemo;
