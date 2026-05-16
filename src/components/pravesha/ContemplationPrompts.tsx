'use client';

/**
 * ContemplationPrompts — the adhikārī-prakāśana mirror.
 *
 * Authority: docs/VISION.md Part II Phase 1 ("three contemplative
 * questions that reflect the learner's existing assumptions … NOT an
 * assessment. NO score. NO progress."); Part XI anti-patterns (no
 * streaks, badges, progress bars, nudges).
 *
 * Three prompts, one at a time. The learner clicks "continue" to move
 * forward. There is deliberately no "1 of 3" indicator, no progress
 * bar, no completion celebration: the prompts are mirrors, not levels.
 *
 * Bilingual: English and Malayalam are shown together because both are
 * doorways to the same Sanskrit doctrine (Part I.4); neither is the
 * primary text. Sanskrit termini are preserved inline.
 *
 * The save action stubs to console.log — the svādhyāya store is a
 * future track. We do not pretend persistence we have not built.
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Prompt {
  id: string;
  en: string;
  ml: string;
}

// The first prompt is the cup question from the vision, verbatim in
// register. The second is the substance/quality question implied by it
// (the property-cluster problem). The third asks after abhāva — the
// existence question Vaiśeṣika answers by admitting absence as a
// padārtha.
const PROMPTS: Prompt[] = [
  {
    id: 'cup',
    en: 'Look at the cup in front of you. What, exactly, is it that you are seeing — the cup, or the qualities of the cup, or something else?',
    ml: 'നിങ്ങളുടെ മുന്നിലുള്ള പാത്രത്തെ നോക്കുക. നിങ്ങൾ കാണുന്നത് യഥാർത്ഥത്തിൽ എന്താണ് — പാത്രമോ, പാത്രത്തിന്റെ ഗുണങ്ങളോ, അതോ മറ്റെന്തെങ്കിലുമോ?',
  },
  {
    id: 'substance-quality',
    en: 'If every visible feature of an object — its colour, weight, shape — were stripped away one by one, would anything remain to be called the object itself? Or are the features all there is?',
    ml: 'ഒരു വസ്തുവിന്റെ എല്ലാ ഗുണങ്ങളും — നിറം, ഭാരം, ആകൃതി — ഓരോന്നായി മാറ്റിയാൽ, വസ്തു എന്നു വിളിക്കാൻ പിന്നെ എന്തെങ്കിലും ശേഷിക്കുമോ? അതോ ഗുണങ്ങൾ മാത്രമാണോ ഉള്ളത്?',
  },
  {
    id: 'absence',
    en: 'When you walk into a room and notice that the keys are not on the table, what is it that you are noticing? Is the absence of the keys itself a kind of thing you encounter, or only a thought you form?',
    ml: 'ഒരു മുറിയിൽ കയറുമ്പോൾ താക്കോലുകൾ മേശയിൽ ഇല്ലെന്ന് നിങ്ങൾ കാണുന്നു. അവിടെ നിങ്ങൾ കാണുന്നത് എന്താണ്? താക്കോലിന്റെ അഭാവം ഒരു യാഥാർത്ഥ്യമായി നിങ്ങൾ കണ്ടെത്തുകയാണോ, അതോ വെറുമൊരു ചിന്ത മാത്രമോ?',
  },
];

export interface ContemplationPromptsProps {
  /** Optional save handler. Defaults to console.log; svādhyāya store is a future track. */
  onSave?: (promptId: string, response: string) => void;
}

export function ContemplationPrompts({ onSave }: ContemplationPromptsProps) {
  const [index, setIndex] = useState(0);
  const [response, setResponse] = useState('');
  // After the last prompt, the panel rests on a closing line — not a
  // congratulation, not a "you've completed it". Just a still page.
  const [closed, setClosed] = useState(false);

  const current = PROMPTS[index];
  const isLast = index === PROMPTS.length - 1;

  const handleContinue = () => {
    if (isLast) {
      setClosed(true);
    } else {
      setIndex((i) => i + 1);
      setResponse('');
    }
  };

  const handleSave = () => {
    if (!current) return;
    if (onSave) {
      onSave(current.id, response);
    } else {
      // Stub. The svādhyāya notebook is a future track; until then we
      // do not pretend to persist.
      // eslint-disable-next-line no-console
      console.log('[svadhyaya stub] prompt:', current.id, 'response:', response);
    }
  };

  return (
    <section
      aria-labelledby="prompts-heading"
      className="mx-auto max-w-prose px-6 py-20"
    >
      <h2
        id="prompts-heading"
        className="text-xs uppercase tracking-[0.3em] text-ink-faint text-center mb-12"
      >
        adhikārī-prakāśana
      </h2>

      <AnimatePresence mode="wait">
        {closed || !current ? (
          <motion.div
            key="closed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
            className="text-center text-ink-muted text-sm italic leading-relaxed"
          >
            <p className="mb-2">
              Sit with the question. The text will be here when you return.
            </p>
            <p className="ml text-ink-faint">
              ചോദ്യത്തോടു കൂടെ ഇരിക്കുക. ഗ്രന്ഥം നിങ്ങൾ വരുന്നതുവരെ കാത്തിരിക്കും.
            </p>
          </motion.div>
        ) : (
          <motion.div
            key={current.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            // 900ms — the contemplative end of the band. The vision
            // expressly forbids snappy 100ms transitions here.
            transition={{ duration: 0.9, ease: 'easeOut' }}
          >
            <p className="text-lg text-ink leading-relaxed mb-4">{current.en}</p>
            <p className="ml text-base text-ink-muted leading-relaxed mb-8">
              {current.ml}
            </p>

            <label className="block">
              <span className="sr-only">Your reflection</span>
              <textarea
                value={response}
                onChange={(e) => setResponse(e.target.value)}
                rows={5}
                className="w-full rounded-sm border border-ink-faint/40 bg-page-deep/40 p-4 text-base text-ink focus:border-shanta focus:outline-none resize-y"
                placeholder="…"
              />
            </label>

            <div className="mt-6 flex items-center gap-6 justify-end">
              <button
                type="button"
                onClick={handleSave}
                disabled={response.trim().length === 0}
                className="text-sm text-ink-muted underline-offset-4 hover:underline hover:text-ink disabled:opacity-40 disabled:no-underline disabled:cursor-not-allowed"
              >
                save to my notebook
              </button>
              <button
                type="button"
                onClick={handleContinue}
                className="text-sm text-shanta underline-offset-4 hover:underline"
              >
                continue →
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

export default ContemplationPrompts;
