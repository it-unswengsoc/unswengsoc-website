'use client';

import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import Navbar from '@/components/Navbar';
import BlueprintMap from '@/components/BlueprintMap';
import DetailView from '@/components/DetailView';
import LoadingScreen from '@/components/LoadingScreen';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import { Section } from '@/components/types';
import { sectionDetails } from '@/components/sectionData';
import BlueprintBackground from '@/components/BlueprintBackground';

export default function Home() {
  const [activeSection, setActiveSection] = useState<Section>(null);
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="min-h-screen text-white font-mono overflow-x-hidden relative" style={{ background: 'var(--background)' }}>
      {/* Loading Screen */}
      <AnimatePresence>
        {isLoading && <LoadingScreen onLoadingComplete={() => setIsLoading(false)} />}
      </AnimatePresence>

      {/* Blueprint Background */}
      <BlueprintBackground />

      <Navbar />

      {/* Blueprint Map Section */}
      <section id="blueprint" className="relative w-full flex items-center justify-center p-5 min-h-[calc(100vh-88px)]">
        <div className="relative w-full h-[calc(100vh-128px)]">
          <AnimatePresence mode="wait">
            {!activeSection ? (
              <BlueprintMap onSectionClick={setActiveSection} />
            ) : (
              <DetailView
                data={sectionDetails[activeSection]}
                section={activeSection}
                onClose={() => setActiveSection(null)}
              />
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Contact Section */}
      <ContactSection />

      {/* Footer */}
      <Footer />
    </div>
  );
}
