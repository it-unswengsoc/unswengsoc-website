import type { Metadata } from 'next';
import MerchPageShell from '@/components/MerchPageShell';

// A plain, directly-linkable route for the merch catalog (public_url/merch),
// reusing the same Navbar + retheme-able blueprint-grid backdrop the SPA
// (app/page.tsx) used to provide for its in-app merch screen.
export const metadata: Metadata = {
  title: 'Merch — UNSW Engineering Society',
  description: 'EngSoc Nightshift 2026 merch drop — double-zip hoodies and Clicky Enoch blind bag keychains.',
};

export default function MerchCatalogPage() {
  return <MerchPageShell />;
}
