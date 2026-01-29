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
    <div className="mt-8 pt-8 border-t border-[rgba(65,145,220,0.15)]">
      <h3 className="font-mono text-sm text-[#4191dc] mb-4">Our Team</h3>
      <p className="text-[#94a3b8] leading-relaxed mb-6">
        Meet the dedicated subteams who work tirelessly to create memorable experiences
        and opportunities for our engineering community.
      </p>

      <div className="flex gap-6">
        {/* Subteams grid */}
        <div className={cn(
          'grid grid-cols-2 gap-3 transition-all duration-300',
          selectedTeam ? 'w-1/2' : 'w-full'
        )}>
          {subteams.map((team) => (
            <button
              key={team.name}
              onClick={() => setSelectedTeam(selectedTeam === team.name ? null : team.name)}
              className={cn(
                'border p-4 text-left transition-all duration-200',
                selectedTeam === team.name
                  ? 'border-[#4191dc] bg-[rgba(65,145,220,0.15)]'
                  : 'border-[rgba(65,145,220,0.15)] bg-[rgba(65,145,220,0.03)] hover:bg-[rgba(65,145,220,0.08)] hover:border-[rgba(65,145,220,0.3)]'
              )}
            >
              <h4 className="font-semibold text-white text-sm">{team.name}</h4>
              <p className="font-mono text-xs text-[#94a3b8] mt-1 line-clamp-2">
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
              animate={{ opacity: 1, x: 0, width: '50%' }}
              exit={{ opacity: 0, x: 20, width: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="border border-[#4191dc] bg-[rgba(65,145,220,0.05)] p-4 h-full">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h4 className="font-semibold text-white">{selectedSubteam.name}</h4>
                    <p className="font-mono text-xs text-[#94a3b8] mt-1">
                      {selectedSubteam.description}
                    </p>
                  </div>
                  <button
                    onClick={() => setSelectedTeam(null)}
                    className="text-[#94a3b8] hover:text-white transition-colors text-sm"
                  >
                    ✕
                  </button>
                </div>

                <div className="space-y-3 mt-4">
                  {selectedSubteam.directors.map((director) => (
                    <div
                      key={director.name}
                      className="flex items-center gap-3 border border-[rgba(65,145,220,0.15)] p-3 bg-[rgba(65,145,220,0.03)]"
                    >
                      <div className="w-10 h-10 rounded-full bg-[rgba(65,145,220,0.1)] border border-[rgba(65,145,220,0.15)] flex items-center justify-center flex-shrink-0">
                        <span className="font-mono text-xs text-[#4191dc]">
                          {director.name.split(' ').map((n) => n[0]).join('')}
                        </span>
                      </div>
                      <div>
                        <h5 className="font-semibold text-white text-sm">{director.name}</h5>
                        <p className="font-mono text-xs text-[#94a3b8]">{director.role}</p>
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
