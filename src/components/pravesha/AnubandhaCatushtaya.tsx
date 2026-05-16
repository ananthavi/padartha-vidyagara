/**
 * Anubandha-catuṣṭaya — the four preliminary anchors of a śāstric work.
 *
 * Authority: docs/VISION.md Part II Phase 1. Four small panels: viṣaya
 * (subject matter), adhikārī (the qualified learner), sambandha (the
 * relation between subject and means), prayojana (the purpose).
 *
 * The descriptions are adapted to a modern reader (vision Part I.1) but
 * do not paraphrase Sanskrit beyond the four termini technici themselves.
 * Where a faithful 1–2 sentence formulation of a panel is not entirely
 * settled, the body is left as a placeholder with a TODO note, per the
 * track brief.
 */

import type { FC } from 'react';

interface Anubandha {
  key: 'vishaya' | 'adhikari' | 'sambandha' | 'prayojana';
  title_sa: string;
  title_iast: string;
  body_en: string;
  body_ml: string;
}

const ITEMS: Anubandha[] = [
  {
    key: 'vishaya',
    title_sa: 'विषय',
    title_iast: 'viṣaya',
    body_en:
      "The subject matter: Praśastapāda's Padārthadharmasaṅgraha, surveyed in the seven padārthas (substance, quality, motion, universal, ultimate particular, inherence, absence), with Śrīdhara's Nyāyakandalī as the surfaced commentary.",
    body_ml:
      'വിഷയം: പ്രശസ്തപാദന്റെ പദാർത്ഥധർമ്മസംഗ്രഹം — സപ്ത പദാർത്ഥങ്ങൾ (ദ്രവ്യം, ഗുണം, കർമ്മം, സാമാന്യം, വിശേഷം, സമവായം, അഭാവം) — ശ്രീധരന്റെ ന്യായകന്ദലിയോടു ചേർന്ന്.',
  },
  {
    key: 'adhikari',
    title_sa: 'अधिकारी',
    title_iast: 'adhikārī',
    body_en:
      'The qualified learner: a scientifically educated adult, without prior Sanskrit, willing to be slowed down. Intellectual discipline is presupposed; specialist training is not.',
    body_ml:
      'അധികാരി: ശാസ്ത്രീയ വിദ്യാഭ്യാസമുള്ള ഒരു മുതിർന്ന വിദ്യാർത്ഥി — സംസ്കൃതപരിചയം ഇല്ലെങ്കിലും ധൈര്യപൂർവ്വം പതുക്കെ പഠിക്കാൻ തയ്യാർ.',
  },
  {
    key: 'sambandha',
    title_sa: 'सम्बन्ध',
    title_iast: 'sambandha',
    // The relation between text and reader: pratipādya-pratipādaka. A
    // faithful one-sentence rendering of this is straightforward; the
    // standard pratipādya/pratipādaka pairing is preserved.
    body_en:
      'The relation: between the text as that-which-conveys (pratipādaka) and the seven padārthas as that-which-is-conveyed (pratipādya). Reading the text is the means; understanding the categories is the end the text intends.',
    body_ml:
      'സംബന്ധം: പ്രതിപാദക-പ്രതിപാദ്യ-സംബന്ധം — ഗ്രന്ഥം പ്രതിപാദകം, സപ്ത പദാർത്ഥങ്ങൾ പ്രതിപാദ്യം.',
  },
  {
    key: 'prayojana',
    title_sa: 'प्रयोजन',
    title_iast: 'prayojana',
    body_en:
      'The purpose: a clear, structured grasp of what there is — the categorial map that Vaiśeṣika offers — so the learner can read later commentaries, debates, and replies without losing the ground.',
    body_ml:
      'പ്രയോജനം: വൈശേഷിക ദർശനത്തിലെ പദാർത്ഥഘടനയുടെ വ്യക്തമായ ധാരണ — അതുവഴി പിന്നീടുള്ള ഭാഷ്യങ്ങളും വാദങ്ങളും നഷ്ടപ്പെടാതെ വായിക്കാൻ.',
  },
];

export const AnubandhaCatushtaya: FC<{ locale?: 'en' | 'ml' }> = ({ locale = 'en' }) => {
  return (
    <section
      aria-labelledby="anubandha-heading"
      className="mx-auto max-w-3xl px-6 py-20"
    >
      <h2
        id="anubandha-heading"
        className="text-xs uppercase tracking-[0.3em] text-ink-faint text-center mb-12"
      >
        anubandha-catuṣṭaya
      </h2>
      <div className="grid gap-8 sm:grid-cols-2">
        {ITEMS.map((item) => (
          <article
            key={item.key}
            className="border-l-2 border-shanta/60 pl-5 py-1"
          >
            <p className="sa text-xl text-ink leading-snug">{item.title_sa}</p>
            <p className="text-xs italic text-ink-faint tracking-wide mt-0.5 mb-3">
              {item.title_iast}
            </p>
            <p
              className={
                locale === 'ml'
                  ? 'ml text-sm text-ink-muted leading-relaxed'
                  : 'text-sm text-ink-muted leading-relaxed'
              }
            >
              {locale === 'ml' ? item.body_ml : item.body_en}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
};

export default AnubandhaCatushtaya;
