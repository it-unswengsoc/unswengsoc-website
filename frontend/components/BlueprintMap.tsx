import { motion } from 'framer-motion';
import BlueprintSection from './BlueprintSection';
import { sectionConfigs } from './sectionData';
import { Section } from './types';

interface BlueprintMapProps {
  onSectionClick: (section: Section) => void;
}

export default function BlueprintMap({ onSectionClick }: BlueprintMapProps) {
  return (
    <motion.div
      key="map"
      className="border-2 border-white p-8 h-full"
    >
      <div className="grid grid-cols-2 gap-6 h-full">
        {/* Top Row - About Us and Events */}
        <BlueprintSection
          {...sectionConfigs[0]}
          onClick={() => onSectionClick('about')}
        />
        <BlueprintSection
          {...sectionConfigs[1]}
          onClick={() => onSectionClick('events')}
        />

        {/* Bottom Row - Team, Programs, Jobs */}
        <div className="col-span-2 grid grid-cols-3 gap-6">
          <BlueprintSection
            {...sectionConfigs[2]}
            onClick={() => onSectionClick('team')}
            className="h-72"
          />
          <BlueprintSection
            {...sectionConfigs[3]}
            onClick={() => onSectionClick('programs')}
            className="h-72"
          />
          <BlueprintSection
            {...sectionConfigs[4]}
            onClick={() => onSectionClick('jobs')}
            className="h-72"
          />
        </div>
      </div>
    </motion.div>
  );
}
