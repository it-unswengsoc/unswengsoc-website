'use client';

import { useState } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import { BlueprintGrid } from '@/components/BlueprintGrid';
import LoadingScreen from '@/components/LoadingScreen';
import TitleAnimations from '@/components/TitleAnimations';
import TrueFocus from '@/components/TrueFocus';

// The root route is just the Title screen — Blueprint, Merchandise and
// Contact each have their own directly-linkable routes now (/blueprint,
// /merch, /contact), so visiting them no longer requires passing through
// this loading screen first.
export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="min-h-screen h-screen text-white overflow-hidden relative" style={{ background: 'var(--background)' }}>
      <AnimatePresence>
        {isLoading && (
          <LoadingScreen onLoadingComplete={() => setIsLoading(false)} />
        )}
      </AnimatePresence>

      <Navbar currentScreen="title" />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="fixed inset-0 z-10"
      >
        <div className="absolute inset-0 z-0 pointer-events-none bg-background">
          <BlueprintGrid />
          <TitleAnimations />
        </div>

        <div className="relative z-10 h-full flex flex-col items-start justify-center px-8 md:px-16 lg:px-24">
          <div className="mb-8">
            <TrueFocus
              sentence="UNSW|ENGINEERING SOCIETY"
              lineSeparator="|"
              manualMode={false}
              blurAmount={5}
              borderColor="#4191dc"
              glowColor="rgba(65, 145, 220, 0.6)"
              animationDuration={0.5}
              pauseBetweenAnimations={1.5}
            />
          </div>
          <p className="subtitle mb-8">Innovate. Create. Engineer.</p>
          <Link href="/blueprint" className="open-blueprint-btn">
            Open Blueprint
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
