import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { Section } from './types';

interface BlueprintSectionProps {
  id: string;
  layoutId: Section;
  label: string;
  sectionLetter: string;
  title: string;
  icon: ReactNode;
  onClick: () => void;
  className?: string;
}

export default function BlueprintSection({
  id,
  layoutId,
  label,
  sectionLetter,
  title,
  icon,
  onClick,
  className = 'h-64'
}: BlueprintSectionProps) {
  return (
    <motion.div
      layoutId={layoutId ?? undefined}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`blueprint-box ${className} cursor-pointer relative overflow-hidden`}
    >
      <div className="absolute top-2 left-2 text-xs text-white">{id}</div>
      <div className="absolute top-2 right-2 text-xs text-white">{sectionLetter}</div>
      
      {/* Blueprint Icon */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center">
          {icon}
          <div className="mt-12">
            <span className="blueprint-box-label text-sm block">{title}</span>
          </div>
        </div>
      </div>
      
      {/* Corner markers */}
      <div className="absolute bottom-2 left-2 w-3 h-3 border-l-2 border-b-2 border-white"></div>
      <div className="absolute bottom-2 right-2 w-3 h-3 border-r-2 border-b-2 border-white"></div>
    </motion.div>
  );
}
