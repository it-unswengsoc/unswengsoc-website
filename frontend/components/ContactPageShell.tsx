'use client';

import { motion } from 'framer-motion';
import Navbar from './Navbar';
import { BlueprintGrid } from './BlueprintGrid';
import ContactSection from './ContactSection';

// The /contact route's chrome — same behaviour as the SPA's in-app Contact
// screen (app/page.tsx), just reachable directly instead of only after Title.
export default function ContactPageShell() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen text-white relative"
      style={{ background: 'var(--background)' }}
    >
      <div className="fixed inset-0 z-0 pointer-events-none">
        <BlueprintGrid />
      </div>

      <Navbar currentScreen="contact" />

      <div className="relative z-10 pt-24">
        <ContactSection />
      </div>
    </motion.div>
  );
}
