import { motion, AnimatePresence } from 'framer-motion';
import { Screen } from './types';

interface NavbarProps {
  currentScreen: Screen;
  onNavigate: (screen: Screen) => void;
  hidden?: boolean;
}

export default function Navbar({ currentScreen, onNavigate, hidden = false }: NavbarProps) {
  return (
    <AnimatePresence>
      {!hidden && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed top-0 left-0 right-0 z-30 pointer-events-none p-6"
        >
          {/* Left: Logo */}
          <button
            onClick={() => onNavigate('title')}
            className="pointer-events-auto absolute top-6 left-6 hover:opacity-80 transition-opacity"
          >
            <span className="font-bold tracking-widest text-sm text-white uppercase">EngSoc</span>
          </button>

          {/* Right: Nav links */}
          <div className="pointer-events-auto absolute top-6 right-6 flex gap-6 text-sm tracking-widest uppercase">
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
        </motion.div>
      )}
    </AnimatePresence>
  );
}
