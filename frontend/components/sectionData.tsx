import { SectionData } from './types';
import {
  AboutSection,
  EventsSection,
  JobsSection,
  ProgramsSection,
  SponsorsSection,
} from './sections';

export const sectionDetails: Record<string, SectionData> = {
  about: {
    title: 'About Us',
    subtitle: 'Engineering excellence since 1963',
    content: <AboutSection />,
  },
  events: {
    title: 'Events',
    subtitle: 'Where innovation meets opportunity',
    content: <EventsSection />,
  },
  jobs: {
    title: 'Jobs Board',
    subtitle: 'Launch your engineering career',
    content: <JobsSection />,
  },
  programs: {
    title: 'Programs',
    subtitle: 'Grow your skills and network',
    content: <ProgramsSection />,
  },
  sponsors: {
    title: 'Sponsors',
    subtitle: 'Partners in engineering excellence',
    content: <SponsorsSection />,
  },
};
