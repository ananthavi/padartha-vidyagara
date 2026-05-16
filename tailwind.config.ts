import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx,mdx}',
    './src/**/*.{ts,tsx,mdx}',
    './content/**/*.{mdx,md}',
  ],
  theme: {
    extend: {
      fontFamily: {
        // Three coexisting scripts. Composition over crowding.
        // Loaded via next/font in app/layout.tsx; these names mirror the CSS variables.
        sans: ['var(--font-en-sans)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        serif: ['var(--font-en-serif)', 'ui-serif', 'Georgia', 'serif'],
        devanagari: ['var(--font-sa)', 'ui-serif', 'serif'],
        malayalam: ['var(--font-ml)', 'ui-sans-serif', 'sans-serif'],
      },
      colors: {
        // Restrained palette. The page recedes; the text leads.
        ink: {
          DEFAULT: '#1a1814',
          muted: '#5a554c',
          faint: '#8a8378',
        },
        page: {
          DEFAULT: '#fbf7ee', // warm parchment
          deep: '#f3ecdc',
        },
        // Provenance stripes (Part III.4): three tones, subtle.
        provenance: {
          traditional: '#7a6a3a', // gold-brown for direct rendering of source
          paraphrase: '#5a7a6a', // muted teal for faithful re-expression
          bridge: '#7a5a5a',     // muted terracotta for modern bridge
        },
        // Rasa accents — used sparingly, never as feature labels.
        adbhuta: '#3a5a7a',
        shanta: '#5a7a5a',
        vira: '#7a4a3a',
      },
      maxWidth: {
        prose: '38rem', // a single column. Contemplation prefers narrow.
      },
      typography: {
        DEFAULT: {
          css: {
            color: '#1a1814',
            maxWidth: '38rem',
          },
        },
      },
    },
  },
  plugins: [],
};

export default config;
