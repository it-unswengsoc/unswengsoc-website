import { ReactNode } from 'react';

export type Section = 'about' | 'events' | 'team' | 'programs' | 'jobs' | null;

export interface SectionData {
  title: string;
  content: string;
}

export interface SectionConfig {
  id: string;
  layoutId: Section;
  label: string;
  sectionLetter: string;
  title: string;
  icon: ReactNode;
}
