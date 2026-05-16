import { redirect } from 'next/navigation';

/**
 * Root entry. The vision treats English as the lead authoring language for
 * MVP (Part VII), so an unqualified visit lands at /en. The locale switcher
 * is global and instant once at least one ml-published depth exists.
 */
export default function RootPage(): never {
  redirect('/en');
}
