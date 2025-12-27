import { motion } from 'framer-motion';
import { Section, SectionData } from './types';

interface DetailViewProps {
  section: Section;
  data: SectionData;
  onClose: () => void;
}

export default function DetailView({ section, data, onClose }: DetailViewProps) {
  return (
    <motion.div
      key="detail"
      layoutId={section ?? undefined}
      className="absolute inset-0 flex items-center justify-center"
    >
      <motion.div 
        className="border-2 border-white p-12 bg-[#030712] max-w-4xl w-full relative"
        transition={{ 
          type: 'spring', 
          stiffness: 100, 
          damping: 20,
          mass: 0.8
        }}
      >
        {/* Back Button */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onClose}
          className="absolute top-4 right-4 border-2 border-dashed border-white px-4 py-2 text-sm hover:bg-white hover:text-[#030712] transition-colors"
        >
          ← BACK TO MAP
        </motion.button>

        {/* Section Content */}
        <motion.div 
          className="mt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="border-2 border-dashed border-white px-4 py-2 text-sm inline-block mb-6">
            SECTION DETAILS
          </div>
          <h2 className="text-4xl tracking-widest uppercase mb-6">
            {data.title}
          </h2>
          <div className="border-t-2 border-dashed border-white pt-6">
            <p className="text-lg text-[#94a3b8] leading-relaxed mb-8">
              {data.content}
            </p>
            
            {/* Placeholder content boxes */}
            <div className="grid grid-cols-2 gap-4">
              <div className="border-2 border-dashed border-white p-6 h-32">
                <span className="text-sm text-[#94a3b8]">Content Area 1</span>
              </div>
              <div className="border-2 border-dashed border-white p-6 h-32">
                <span className="text-sm text-[#94a3b8]">Content Area 2</span>
              </div>
              <div className="border-2 border-dashed border-white p-6 h-32">
                <span className="text-sm text-[#94a3b8]">Content Area 3</span>
              </div>
              <div className="border-2 border-dashed border-white p-6 h-32">
                <span className="text-sm text-[#94a3b8]">Content Area 4</span>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
