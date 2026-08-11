'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { Screen } from './types';
import CornerBrackets from './CornerBrackets';

interface NavbarProps {
  currentScreen: Screen;
  hidden?: boolean;
  accentColor?: string;
}

export default function Navbar({ currentScreen, hidden = false, accentColor }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <AnimatePresence>
      {!hidden && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed top-0 left-0 right-0 z-30 pointer-events-none p-4 md:p-6"
        >
          {/* Left: Logo */}
          <Link
            href="/"
            className="pointer-events-auto absolute top-4 md:top-6 left-4 md:left-6 hover:opacity-80 transition-opacity cursor-pointer"
          >
            <span className="tracking-widest text-lg md:text-lg text-white uppercase font-extrabold">EngSoc</span>
          </Link>

          {/* Desktop Nav links */}
          <div className="hidden md:flex pointer-events-auto absolute top-6 right-6 gap-6 text-m tracking-widest">
            <Link
              href="/blueprint"
              className={`relative transition-colors font-bold px-2 py-1 cursor-pointer ${currentScreen === 'blueprint' ? 'text-white' : 'text-white/60 hover:text-white'}`}
            >
              <CornerBrackets visible={currentScreen === 'blueprint'} />
              Blueprint
            </Link>
            <Link
              href="/merch"
              className={`relative transition-colors font-bold px-2 py-1 cursor-pointer ${currentScreen === 'merch' ? 'text-white' : 'text-white/60 hover:text-white'}`}
            >
              <CornerBrackets visible={currentScreen === 'merch'} color={accentColor} />
              Merchandise
            </Link>
            <Link
              href="/contact"
              className={`relative transition-colors font-bold px-2 py-1 cursor-pointer ${currentScreen === 'contact' ? 'text-white' : 'text-white/60 hover:text-white'}`}
            >
              <CornerBrackets visible={currentScreen === 'contact'} />
              Contact
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden pointer-events-auto absolute top-4 right-4 text-white hover:text-[#4191dc] transition-colors cursor-pointer"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Mobile Menu */}
          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.2 }}
                className="md:hidden pointer-events-auto absolute top-16 right-4 bg-[#0a1929] border border-[rgba(65,145,220,0.3)] p-4 min-w-[200px]"
              >
                <div className="flex flex-col gap-4 text-sm tracking-widest">
                  <Link
                    href="/blueprint"
                    onClick={() => setMobileMenuOpen(false)}
                    className={`relative text-left transition-colors font-bold px-2 py-1 cursor-pointer ${currentScreen === 'blueprint' ? 'text-white' : 'text-white/60 hover:text-white'}`}
                  >
                    <CornerBrackets visible={currentScreen === 'blueprint'} />
                    Blueprint
                  </Link>
                  <Link
                    href="/merch"
                    onClick={() => setMobileMenuOpen(false)}
                    className={`relative text-left transition-colors font-bold px-2 py-1 cursor-pointer ${currentScreen === 'merch' ? 'text-white' : 'text-white/60 hover:text-white'}`}
                  >
                    <CornerBrackets visible={currentScreen === 'merch'} color={accentColor} />
                    Merchandise
                  </Link>
                  <Link
                    href="/contact"
                    onClick={() => setMobileMenuOpen(false)}
                    className={`relative text-left transition-colors font-bold px-2 py-1 cursor-pointer ${currentScreen === 'contact' ? 'text-white' : 'text-white/60 hover:text-white'}`}
                  >
                    <CornerBrackets visible={currentScreen === 'contact'} />
                    Contact
                  </Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
