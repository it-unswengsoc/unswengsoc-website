import { SectionConfig, SectionData } from './types';

export const sectionDetails: Record<string, SectionData> = {
  about: {
    title: 'About Us',
    content: 'Learn about UNSW Engineering Society, our mission, and our impact on the engineering community.',
  },
  events: {
    title: 'Events',
    content: 'Discover upcoming workshops, networking sessions, competitions, and social events.',
  },
  team: {
    title: 'Our Team',
    content: 'Meet the dedicated team members who make Engineering Society possible.',
  },
  programs: {
    title: 'Programs',
    content: 'Explore our mentorship programs, skill development workshops, and industry partnerships.',
  },
  jobs: {
    title: 'Jobs Board',
    content: 'Browse internship and graduate opportunities from our industry partners.',
  },
};

export const sectionConfigs: SectionConfig[] = [
  {
    id: 'A-01',
    layoutId: 'about',
    label: 'SECTION A',
    sectionLetter: 'SECTION A',
    title: 'About Us',
    icon: (
      <svg className="w-20 h-20 mx-auto text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    id: 'E-01',
    layoutId: 'events',
    label: 'SECTION B',
    sectionLetter: 'SECTION B',
    title: 'Events',
    icon: (
      <svg className="w-20 h-20 mx-auto text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    id: 'T-01',
    layoutId: 'team',
    label: 'SECTION C',
    sectionLetter: 'SECTION C',
    title: 'Our Team',
    icon: (
      <svg className="w-20 h-20 mx-auto text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
  },
  {
    id: 'P-01',
    layoutId: 'programs',
    label: 'SECTION D',
    sectionLetter: 'SECTION D',
    title: 'Programs',
    icon: (
      <svg className="w-20 h-20 mx-auto text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
  },
  {
    id: 'J-01',
    layoutId: 'jobs',
    label: 'SECTION E',
    sectionLetter: 'SECTION E',
    title: 'Jobs Board',
    icon: (
      <svg className="w-20 h-20 mx-auto text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
];
