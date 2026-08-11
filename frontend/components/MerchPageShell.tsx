'use client';

import { useState, type CSSProperties } from 'react';
import { motion } from 'framer-motion';
import Navbar from './Navbar';
import { BlueprintGrid } from './BlueprintGrid';
import MerchSection from './MerchSection';
import { hexToRgba, shade } from '@/lib/utils';
import { NIGHTSHIFT_BLACK } from '@/lib/merchProducts';

// The /merch route's chrome — same Navbar and the same retheme-able persistent
// blueprint-grid backdrop the SPA (app/page.tsx) used to provide for its in-app
// merch screen, before "Merchandise" became a real link straight to this route.
export default function MerchPageShell() {
  const [merchAccent, setMerchAccent] = useState<string | null>(null);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen text-white relative"
      style={
        merchAccent
          ? ({
              background: 'var(--background)',
              '--grid-line': hexToRgba(merchAccent, 0.12),
              '--grid-line-major': hexToRgba(merchAccent, 0.22),
              '--accent-glow': hexToRgba(merchAccent, 0.45),
              '--accent-blue': merchAccent,
              // Black is the primary backdrop regardless of which colourway's accent
              // is active — only the grid lines/glow above take on the accent colour.
              '--blueprint-dark': NIGHTSHIFT_BLACK,
              '--blueprint-mid': shade(NIGHTSHIFT_BLACK, 15),
              transition: 'all 0.7s ease',
            } as CSSProperties)
          : { background: 'var(--background)' }
      }
    >
      <div className="fixed inset-0 z-0 pointer-events-none">
        <BlueprintGrid />
      </div>

      <Navbar currentScreen="merch" accentColor={merchAccent ?? undefined} />

      <div className="relative z-10 pt-24">
        <MerchSection onThemeChange={setMerchAccent} />
      </div>
    </motion.div>
  );
}
