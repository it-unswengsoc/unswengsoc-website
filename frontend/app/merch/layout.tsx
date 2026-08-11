import { NIGHTSHIFT_BLACK } from '@/lib/merchProducts';

// Applies to every route under /merch (product pages, success page, and any
// future /merch catalog route) — a black backdrop of last resort so the shared
// site-wide navy background (globals.css) never shows through here, regardless
// of whether a given page remembers to set its own background.
export default function MerchLayout({ children }: { children: React.ReactNode }) {
  return <div style={{ backgroundColor: NIGHTSHIFT_BLACK, minHeight: '100vh' }}>{children}</div>;
}
