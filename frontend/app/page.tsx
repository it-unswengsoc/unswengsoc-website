'use client';

import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import Navbar from '@/components/Navbar';
import BlueprintMap from '@/components/BlueprintMap';
import DetailView from '@/components/DetailView';
import { Section } from '@/components/types';
import { sectionDetails } from '@/components/sectionData';

export default function Home() {
  const [activeSection, setActiveSection] = useState<Section>(null);

  return (
    <div className="h-screen bg-[#030712] text-white font-mono overflow-hidden relative">
      {/* Blueprint Grid Background */}
      <div className="absolute inset-0 opacity-5" style={{
        backgroundImage: `
          linear-gradient(white 1px, transparent 1px),
          linear-gradient(90deg, white 1px, transparent 1px)
        `,
        backgroundSize: '50px 50px'
      }}></div>

      <Navbar />

      {/* Main Content */}
      <main className="relative w-full flex items-center justify-center p-12" style={{ height: 'calc(100vh - 88px)' }}>
        <div className="relative w-full h-full max-w-7xl">
          <AnimatePresence mode="wait">
            {!activeSection ? (
              <BlueprintMap onSectionClick={setActiveSection} />
            ) : (
              <DetailView 
                section={activeSection}
                data={sectionDetails[activeSection]}
                onClose={() => setActiveSection(null)}
              />
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
