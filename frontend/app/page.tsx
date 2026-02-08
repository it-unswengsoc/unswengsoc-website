'use client';

import { useState, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import BlueprintMap from '@/components/BlueprintMap';
import BlueprintBackground from '@/components/BlueprintBackground';
import { BlueprintGrid } from '@/components/BlueprintGrid';
import DetailView from '@/components/DetailView';
import LoadingScreen from '@/components/LoadingScreen';
import ContactSection from '@/components/ContactSection';
import TitleAnimations from '@/components/TitleAnimations';
import { Section, Screen } from '@/components/types';
import { sectionDetails } from '@/components/sectionData';

function TitleScreen({ onOpenBlueprint }: { onOpenBlueprint: () => void }) {
  return (
    <motion.div
      key="title"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 z-10"
    >
      <div className="absolute inset-0 z-0 pointer-events-none bg-background">
        <BlueprintGrid />
        <TitleAnimations />
      </div>

      <div className="relative z-10 h-full flex flex-col items-center justify-center px-4">
        <h1 className="main-title text-center">UNSW ENGINEERING SOCIETY</h1>
        <p className="subtitle mb-8 text-center">
          Innovate. Create. Engineer.
        </p>
        <button onClick={onOpenBlueprint} className="open-blueprint-btn">
          Open Blueprint
        </button>
      </div>
    </motion.div>
  );
}

function BlueprintScreen({
  activeSection,
  onSectionClick,
  onCloseDetail,
}: {
  activeSection: Section;
  onSectionClick: (s: Section) => void;
  onCloseDetail: () => void;
}) {
  const [bgReady, setBgReady] = useState(false);

  const handleDrawComplete = useCallback(() => {
    setBgReady(true);
  }, []);

  return (
    <motion.div
      key="blueprint"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 z-10"
    >
      <BlueprintBackground animateIn onDrawComplete={handleDrawComplete} />

      {bgReady && (
        <div className="absolute inset-0">
          <AnimatePresence mode="wait">
            {!activeSection ? (
              <BlueprintMap key="map" onSectionClick={onSectionClick} />
            ) : (
              <DetailView
                key="detail"
                data={sectionDetails[activeSection]}
                section={activeSection}
                onClose={onCloseDetail}
              />
            )}
          </AnimatePresence>
        </div>
      )}
    </motion.div>
  );
}

function ContactScreen() {
  return (
    <motion.div
      key="contact"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 z-10 overflow-y-auto"
    >
      <div className="absolute inset-0 z-0 pointer-events-none bg-background">
        <BlueprintGrid />
      </div>

      <div className="relative z-10 pt-24">
        <ContactSection />
      </div>
    </motion.div>
  );
}

export default function Home() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('title');
  const [activeSection, setActiveSection] = useState<Section>(null);
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="min-h-screen h-screen text-white overflow-hidden relative" style={{ background: 'var(--background)' }}>
      <AnimatePresence>
        {isLoading && <LoadingScreen onLoadingComplete={() => setIsLoading(false)} />}
      </AnimatePresence>

      <Navbar
        currentScreen={currentScreen}
        onNavigate={setCurrentScreen}
        hidden={currentScreen === 'blueprint' && activeSection !== null}
      />

      <AnimatePresence mode="wait">
        {currentScreen === 'title' && (
          <TitleScreen onOpenBlueprint={() => setCurrentScreen('blueprint')} />
        )}
        {currentScreen === 'blueprint' && (
          <BlueprintScreen
            activeSection={activeSection}
            onSectionClick={setActiveSection}
            onCloseDetail={() => setActiveSection(null)}
          />
        )}
        {currentScreen === 'contact' && <ContactScreen />}
      </AnimatePresence>
    </div>
  );
}
