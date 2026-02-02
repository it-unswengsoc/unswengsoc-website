import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { Screen } from './types';

interface NavbarProps {
  currentScreen: Screen;
  onNavigate: (screen: Screen) => void;
  hidden?: boolean;
}

export default function Navbar({ currentScreen, onNavigate, hidden = false }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavigate = (screen: Screen) => {
    onNavigate(screen);
    setMobileMenuOpen(false);
  };

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
          <button
            onClick={() => handleNavigate('title')}
            className="pointer-events-auto absolute top-4 md:top-6 left-4 md:left-6 hover:opacity-80 transition-opacity"
          >
            <span className="font-bold tracking-widest text-xs md:text-sm text-white uppercase">EngSoc</span>
          </button>

          {/* Desktop Nav links */}
          <div className="hidden md:flex pointer-events-auto absolute top-6 right-6 gap-6 text-sm tracking-widest uppercase">
            <button
              onClick={() => onNavigate('blueprint')}
              className={`transition-colors ${currentScreen === 'blueprint' ? 'text-[#4191dc]' : 'text-white/60 hover:text-white'}`}
            >
              [ Blueprint ]
            </button>
            <button
              onClick={() => onNavigate('contact')}
              className={`transition-colors ${currentScreen === 'contact' ? 'text-[#4191dc]' : 'text-white/60 hover:text-white'}`}
            >
              [ Contact ]
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden pointer-events-auto absolute top-4 right-4 text-white hover:text-[#4191dc] transition-colors"
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
                <div className="flex flex-col gap-4 text-sm tracking-widest uppercase">
                  <button
                    onClick={() => handleNavigate('blueprint')}
                    className={`text-left transition-colors ${currentScreen === 'blueprint' ? 'text-[#4191dc]' : 'text-white/60 hover:text-white'}`}
                  >
                    [ Blueprint ]
                  </button>
                  <button
                    onClick={() => handleNavigate('contact')}
                    className={`text-left transition-colors ${currentScreen === 'contact' ? 'text-[#4191dc]' : 'text-white/60 hover:text-white'}`}
                  >
                    [ Contact ]
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
