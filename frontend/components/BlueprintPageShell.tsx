'use client';

import { useCallback, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Navbar from './Navbar';
import BlueprintBackground from './BlueprintBackground';
import BlueprintMap from './BlueprintMap';
import DetailView from './DetailView';
import { Section } from './types';
import { sectionDetails } from './sectionData';

// The /blueprint route's chrome — same behaviour as the SPA's in-app Blueprint
// screen (app/page.tsx), just reachable directly instead of only after Title.
export default function BlueprintPageShell() {
  const [activeSection, setActiveSection] = useState<Section>(null);
  const [bgReady, setBgReady] = useState(false);

  const handleDrawComplete = useCallback(() => setBgReady(true), []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen h-screen text-white overflow-hidden relative"
      style={{ background: 'var(--background)' }}
    >
      <Navbar currentScreen="blueprint" hidden={activeSection !== null} />

      <BlueprintBackground animateIn onDrawComplete={handleDrawComplete} />

      {bgReady && (
        <div className="absolute inset-0">
          <AnimatePresence mode="wait">
            {!activeSection ? (
              <BlueprintMap key="map" onSectionClick={setActiveSection} />
            ) : (
              <DetailView
                key="detail"
                data={sectionDetails[activeSection]}
                section={activeSection}
                onClose={() => setActiveSection(null)}
              />
            )}
          </AnimatePresence>
        </div>
      )}
    </motion.div>
  );
}
