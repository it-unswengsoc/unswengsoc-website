'use client';

import { useEffect } from 'react';
import { X, ChevronDown } from 'lucide-react';
import { motion } from 'framer-motion';
import { SectionData, Section } from './types';
import { BlueprintGrid } from './BlueprintGrid';
import AnimatedSprite from './AnimatedSprite';

// Sprite configurations (same as BlueprintMap)
const LOGO_SPRITE_CONFIG = {
  src: '/eng-logo-sprite.png',
  frameWidth: 541,
  frameHeight: 577,
  columns: 7,
  rows: 7,
  totalFrames: 49,
};

const HELMET_SPRITE_CONFIG = {
  src: '/helmet-sprite.png',
  frameWidth: 600,
  frameHeight: 600,
  columns: 6,
  rows: 4,
  totalFrames: 22,
};

const COG_SPRITE_CONFIG = {
  src: '/cog-sprite.png',
  frameWidth: 600,
  frameHeight: 600,
  columns: 4,
  rows: 5,
  totalFrames: 19,
};

// SVG Components for background
const FLASK_SPRITE_CONFIG = {
  src: '/flask-sprite.png',
  frameWidth: 448,
  frameHeight: 635,
  columns: 5,
  rows: 3,
  totalFrames: 13,
};

const BRIEF_SPRITE_CONFIG = {
  src: '/brief-sprite.png',
  frameWidth: 600,
  frameHeight: 600,
  columns: 5,
  rows: 4,
  totalFrames: 19,
};

// Background element renderer
function SectionBackground({ section }: { section: Section }) {
  if (!section) return null;

  const spriteConfigs: Record<string, typeof LOGO_SPRITE_CONFIG> = {
    about: LOGO_SPRITE_CONFIG,
    sponsors: HELMET_SPRITE_CONFIG,
    programs: COG_SPRITE_CONFIG,
    events: FLASK_SPRITE_CONFIG,
    job: BRIEF_SPRITE_CONFIG
  };

  const config = spriteConfigs[section];

  // For sprite-based sections
  if (config) {
    return (
      <AnimatedSprite
        src={config.src}
        frameWidth={config.frameWidth}
        frameHeight={config.frameHeight}
        columns={config.columns}
        rows={config.rows}
        totalFrames={config.totalFrames}
        isHovered={false}
        displaySize={300}
        className="detail-bg-sprite"
      />
    );
  }

  return null;
}

interface DetailViewProps {
  data: SectionData;
  section: Section;
  onClose: () => void;
}

export default function DetailView({ data, section, onClose }: DetailViewProps) {
  // Lock body scroll when detail view is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  return (
    <motion.div
      key="detail"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-40"
    >
      {/* Blueprint grid background - lowest layer */}
      <div className="fixed inset-0 z-0 pointer-events-none bg-background">
        <BlueprintGrid />
      </div>

      {/* Zoomed section background element */}
      <motion.div
        initial={{ opacity: 0, scale: 2 }}
        animate={{ opacity: 0.25, scale: 3 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="fixed top-1/2 right-0 -translate-y-1/2 translate-x-[-40%] z-[5] pointer-events-none"
      >
        <SectionBackground section={section} />
      </motion.div>

      {/* Semi-transparent overlay for readability - above grid */}
      <div className="fixed inset-0 z-10 bg-background/50 pointer-events-none" />

      {/* Close button - highest layer */}
      <motion.button
        type="button"
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="fixed top-6 right-6 z-50 p-2 border border-[rgba(65,145,220,0.15)] bg-background/80 backdrop-blur-sm hover:bg-[rgba(65,145,220,0.1)] transition-colors"
        aria-label="Close section"
      >
        <X className="w-5 h-5 text-white" />
      </motion.button>

      {/* Content area - above overlay */}
      <div className="absolute inset-0 z-20 overflow-y-auto px-8 pt-24 pb-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="max-w-4xl w-full ml-8 md:ml-16 lg:ml-24"
        >
          {/* Section title */}
          <div className="mb-8">
            <h2 className="font-sans font-bold text-4xl md:text-5xl text-white mb-2 tracking-tight">
              {data.title}
            </h2>
            <p className="font-mono text-[#94a3b8] text-sm">
              [ {data.subtitle} ]
            </p>
          </div>

          {/* Section content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            {data.content}
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="fixed bottom-8 left-1/2 -translate-x-1/2 z-20 animate-bounce"
      >
        <ChevronDown className="w-6 h-6 text-[#94a3b8]" />
      </motion.div>
    </motion.div>
  );
}
