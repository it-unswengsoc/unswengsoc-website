import { ReactNode } from 'react';

// Section types - updated mapping:
// - about: About Us / Our Team (center, animated sprite)
// - events: Events (flask)
// - jobs: Jobs Board (briefcase)
// - programs: Programs (gear)
// - sponsors: Sponsors (helmet)
export type Section = 'about' | 'events' | 'jobs' | 'programs' | 'sponsors' | null;

export type Screen = 'title' | 'blueprint' | 'contact';

export interface SectionData {
  title: string;
  subtitle: string;
  content: ReactNode;
  sectionKey?: Section;
}

export interface SectionConfig {
  id: string;
  layoutId: Section;
  label: string;
  sectionLetter: string;
  title: string;
  icon: ReactNode;
}

export interface TeamMember {
  name: string;
  role: string;
}

export interface Event {
  title: string;
  date: string;
  description: string;
  image?: string;
}

export interface Sponsor {
  name: string;
  tier: 'gold' | 'silver' | 'bronze';
}

export interface Job {
  title: string;
  company: string;
  type: 'internship' | 'graduate' | 'part-time';
  description: string;
}

export interface Program {
  title: string;
  description: string;
  status: 'open' | 'coming-soon' | 'closed';
  image?: string;
}
