'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

interface Director {
  name: string;
  role: string;
}

interface Subteam {
  name: string;
  description: string;
  directors: Director[];
}

const subteams: Subteam[] = [
  {
    name: 'Cabinet',
    description: 'Leading the society and overseeing all operations',
    directors: [
      { name: 'Alex Lum', role: 'President' },
      { name: 'Jenny Tang', role: 'Secretary' },
      { name: 'Isabella Tsui', role: 'Treasurer' },
      { name: 'Jenny Liu', role: 'Arc Delegate' },
    ],
  },
  {
    name: 'Careers',
    description: 'Connecting students with industry opportunities',
    directors: [
      { name: 'Mark Chen', role: 'Vice President Careers' },
      { name: 'Anna Chen', role: 'Careers Officer' },
    ],
  },
  {
    name: 'HR',
    description: 'Supporting our team and fostering culture',
    directors: [
      { name: 'Jessica Nguyen', role: 'HR Director' },
      { name: 'Tom Wilson', role: 'HR Officer' },
    ],
  },
  {
    name: 'IT',
    description: 'Building and maintaining our digital presence',
    directors: [
      { name: 'Rachel Thompson', role: 'IT Director' },
      { name: 'Kevin Zhang', role: 'IT Officer' },
    ],
  },
  {
    name: 'Marketing',
    description: 'Promoting events and growing our community',
    directors: [
      { name: 'Sophie Lee', role: 'Marketing Director' },
      { name: 'Daniel Kim', role: 'Marketing Officer' },
    ],
  },
  {
    name: 'Programs',
    description: 'Running mentorship and development initiatives',
    directors: [
      { name: 'David Kumar', role: 'Programs Director' },
      { name: 'Lisa Wang', role: 'Programs Officer' },
    ],
  },
  {
    name: 'Publications',
    description: 'Creating content and managing communications',
    directors: [
      { name: 'Emma Brown', role: 'Publications Director' },
      { name: 'Ryan Patel', role: 'Publications Officer' },
    ],
  },
  {
    name: 'Socials',
    description: 'Organising social events and building connections',
    directors: [
      { name: 'Chris Taylor', role: 'Socials Director' },
      { name: 'Mia Johnson', role: 'Socials Officer' },
    ],
  },
  {
    name: 'Sponsorships',
    description: 'Building partnerships with industry leaders',
    directors: [
      { name: 'Nathan Lee', role: 'Sponsorships Director' },
      { name: 'Olivia Chen', role: 'Sponsorships Officer' },
    ],
  },
];

export default function TeamSection() {
  const [selectedTeam, setSelectedTeam] = useState<string | null>(null);

  const selectedSubteam = subteams.find((t) => t.name === selectedTeam);

  return (
    <div className="mt-6 md:mt-8 pt-6 md:pt-8 border-t border-[rgba(65,145,220,0.15)]">
      <h3 className="text-xs md:text-sm text-[#4191dc] mb-3 md:mb-4 font-light">Our Team</h3>
      <p className="text-[#94a3b8] text-sm md:text-base leading-relaxed mb-4 md:mb-6">
        Meet the dedicated subteams who work tirelessly to create memorable experiences
        and opportunities for our engineering community.
      </p>

      <div className="flex flex-col md:flex-row gap-4 md:gap-6">
        {/* Subteams grid */}
        <div className={cn(
          'grid grid-cols-1 sm:grid-cols-2 gap-2 md:gap-3 transition-all duration-300',
          selectedTeam ? 'md:w-1/2' : 'w-full'
        )}>
          {subteams.map((team) => (
            <button
              key={team.name}
              onClick={() => setSelectedTeam(selectedTeam === team.name ? null : team.name)}
              className={cn(
                'border p-3 md:p-4 text-left transition-all duration-200',
                selectedTeam === team.name
                  ? 'border-[#4191dc] bg-[rgba(65,145,220,0.15)]'
                  : 'border-[rgba(65,145,220,0.15)] bg-[rgba(65,145,220,0.03)] hover:bg-[rgba(65,145,220,0.08)] hover:border-[rgba(65,145,220,0.3)]'
              )}
            >
              <h4 className="text-white text-xs md:text-sm font-medium">{team.name}</h4>
              <p className="text-xs text-[#94a3b8] mt-1 line-clamp-2 font-light">
                {team.description}
              </p>
            </button>
          ))}
        </div>

        {/* Directors panel */}
        <AnimatePresence>
          {selectedTeam && selectedSubteam && (
            <motion.div
              initial={{ opacity: 0, x: 20, width: 0 }}
              animate={{ opacity: 1, x: 0, width: '100%' }}
              exit={{ opacity: 0, x: 20, width: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden md:w-1/2"
            >
              <div className="border border-[#4191dc] bg-[rgba(65,145,220,0.05)] p-3 md:p-4 h-full">
                <div className="flex justify-between items-start mb-3 md:mb-4">
                  <div>
                    <h4 className="text-white text-sm md:text-base font-medium">{selectedSubteam.name}</h4>
                    <p className="text-xs text-[#94a3b8] mt-1 font-light">
                      {selectedSubteam.description}
                    </p>
                  </div>
                  <button
                    onClick={() => setSelectedTeam(null)}
                    className="text-[#94a3b8] hover:text-white transition-colors text-sm ml-2"
                  >
                    ✕
                  </button>
                </div>

                <div className="space-y-2 md:space-y-3 mt-3 md:mt-4">
                  {selectedSubteam.directors.map((director) => (
                    <div
                      key={director.name}
                      className="flex items-center gap-2 md:gap-3 border border-[rgba(65,145,220,0.15)] p-2 md:p-3 bg-[rgba(65,145,220,0.03)]"
                    >
                      <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-[rgba(65,145,220,0.1)] border border-[rgba(65,145,220,0.15)] flex items-center justify-center flex-shrink-0">
                        <span className="text-xs text-[#4191dc] font-light">
                          {director.name.split(' ').map((n) => n[0]).join('')}
                        </span>
                      </div>
                      <div>
                        <h5 className="text-white text-xs md:text-sm font-medium">{director.name}</h5>
                        <p className="text-xs text-[#94a3b8] font-light">{director.role}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
