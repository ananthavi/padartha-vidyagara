/**
 * Reviewer-facing mount for the samavāya/saṃyoga visualization.
 *
 * Path: /_visualizations/samavaya
 *
 * This route sits OUTSIDE the locale-aware reading column on purpose
 * (vision Part I, commitment 3: the reading view stays free of any UI
 * that competes with the text). It exists so shastrika reviewers can
 * inspect the visualization in isolation; once approved, the component
 * is consumed from inside a ConceptNode depth, not from this route.
 */

import { SamavayaDemo } from '@/components/visualizations/__demo__/samavaya-demo';

export const metadata = {
  title: 'Samavāya / Saṃyoga — visualization preview',
};

export default function Page() {
  return <SamavayaDemo />;
}
