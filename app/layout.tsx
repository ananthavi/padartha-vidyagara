import type { Metadata } from 'next';
import { Manjari, Noto_Serif_Devanagari, Source_Serif_4, Inter } from 'next/font/google';
import './globals.css';

/*
 * Three coexisting scripts. The vision (Part VII) calls for:
 *   - a serif with full Devanagari support for Sanskrit
 *   - a Malayalam font with strong conjunct rendering
 *   - a clean sans for English UI, with a serif for English body
 *
 * Choices below: Noto Serif Devanagari (Sanskrit), Manjari (Malayalam),
 * Source Serif 4 (English body), Inter (English UI). All available via
 * Google Fonts — no third-party loaders.
 */

const en_serif = Source_Serif_4({
  subsets: ['latin'],
  variable: '--font-en-serif',
  display: 'swap',
});

const en_sans = Inter({
  subsets: ['latin'],
  variable: '--font-en-sans',
  display: 'swap',
});

const sa = Noto_Serif_Devanagari({
  subsets: ['devanagari', 'latin'],
  variable: '--font-sa',
  display: 'swap',
});

const ml = Manjari({
  subsets: ['malayalam', 'latin'],
  weight: ['400', '700'],
  variable: '--font-ml',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Padārtha-Vidyāgāra',
  description:
    "A contemplative bilingual study environment for Praśastapāda's Padārthadharmasaṅgraha with Śrīdhara's Nyāyakandalī.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${en_serif.variable} ${en_sans.variable} ${sa.variable} ${ml.variable}`}>
      <body className="font-serif">{children}</body>
    </html>
  );
}
