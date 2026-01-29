import { cn } from '@/lib/utils';
import { SectionData, Event, Sponsor, Job, Program } from './types';
import TeamSection from './TeamSection';

// Events data
const events: Event[] = [
  {
    title: 'Industry Night 2026',
    date: 'March 15, 2026',
    description: 'Connect with leading engineering firms and explore career opportunities.',
  },
  {
    title: 'Hackathon: Build the Future',
    date: 'April 8-9, 2026',
    description: '48 hours of innovation, collaboration, and creating solutions for real-world problems.',
  },
  {
    title: 'Engineering Ball',
    date: 'May 20, 2026',
    description: 'Our annual formal celebration of engineering excellence and community.',
  },
  {
    title: 'Workshop Series: CAD Mastery',
    date: 'Ongoing',
    description: 'Weekly hands-on sessions covering SolidWorks, AutoCAD, and Fusion 360.',
  },
];

// Sponsors data
const sponsors: Sponsor[] = [
  { name: 'Atlassian', tier: 'gold' },
  { name: 'Google', tier: 'gold' },
  { name: 'Canva', tier: 'silver' },
  { name: 'Commonwealth Bank', tier: 'silver' },
  { name: 'Aurecon', tier: 'silver' },
  { name: 'WSP', tier: 'bronze' },
  { name: 'AECOM', tier: 'bronze' },
  { name: 'Arup', tier: 'bronze' },
];

// Jobs data
const jobs: Job[] = [
  {
    title: 'Software Engineering Intern',
    company: 'Atlassian',
    type: 'internship',
    description: 'Join our Sydney team for a 12-week summer internship program.',
  },
  {
    title: 'Graduate Mechanical Engineer',
    company: 'Aurecon',
    type: 'graduate',
    description: '2-year graduate program with rotations across infrastructure projects.',
  },
  {
    title: 'Data Engineering Intern',
    company: 'Commonwealth Bank',
    type: 'internship',
    description: 'Work on real-world data pipelines and analytics platforms.',
  },
  {
    title: 'Civil Engineering Graduate',
    company: 'WSP',
    type: 'graduate',
    description: 'Graduate opportunity in our transport and infrastructure division.',
  },
];

// Programs data
const programs: Program[] = [
  {
    title: 'Peer Mentoring Program',
    description: 'Connect with senior students for academic and career guidance.',
    status: 'open',
  },
  {
    title: 'Industry Mentoring',
    description: 'Be paired with industry professionals in your field of interest.',
    status: 'coming-soon',
  },
  {
    title: 'Technical Workshop Series',
    description: 'Hands-on workshops covering CAD, coding, and engineering tools.',
    status: 'open',
  },
  {
    title: 'Leadership Development',
    description: 'Develop leadership skills through projects and team experiences.',
    status: 'coming-soon',
  },
];

export const sectionDetails: Record<string, SectionData> = {
  about: {
    title: 'About Us',
    subtitle: 'Engineering excellence since 1963',
    content: (
      <div className="space-y-6">
        <p className="text-[#94a3b8] leading-relaxed">
          The UNSW Engineering Society is one of the largest and most active student societies
          at the University of New South Wales. For over 60 years, we&apos;ve been the home for
          engineering students across all disciplines.
        </p>
        <div className="grid gap-4 mt-8">
          <div className="border border-[rgba(65,145,220,0.15)] p-4 bg-[rgba(65,145,220,0.03)]">
            <h3 className="font-mono text-sm text-[#4191dc] mb-2">Our Mission</h3>
            <p className="text-sm text-[#94a3b8]">
              To foster a vibrant engineering community that supports academic excellence,
              professional development, and lifelong friendships.
            </p>
          </div>
          <div className="border border-[rgba(65,145,220,0.15)] p-4 bg-[rgba(65,145,220,0.03)]">
            <h3 className="font-mono text-sm text-[#4191dc] mb-2">What We Do</h3>
            <ul className="text-sm text-[#94a3b8] space-y-1">
              <li>- Industry networking events</li>
              <li>- Technical workshops and competitions</li>
              <li>- Social events and camps</li>
              <li>- Career development programs</li>
              <li>- Peer mentoring initiatives</li>
            </ul>
          </div>
          <div className="border border-[rgba(65,145,220,0.15)] p-4 bg-[rgba(65,145,220,0.03)]">
            <h3 className="font-mono text-sm text-[#4191dc] mb-2">By The Numbers</h3>
            <div className="grid grid-cols-3 gap-4 mt-2">
              <div className="text-center">
                <div className="text-2xl font-bold text-white">5000+</div>
                <div className="text-xs text-[#94a3b8]">Members</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white">50+</div>
                <div className="text-xs text-[#94a3b8]">Events/Year</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white">60+</div>
                <div className="text-xs text-[#94a3b8]">Years Active</div>
              </div>
            </div>
          </div>
        </div>

        {/* Team section within About */}
        <TeamSection />
      </div>
    ),
  },
  events: {
    title: 'Events',
    subtitle: 'Where innovation meets opportunity',
    content: (
      <div className="space-y-6">
        <p className="text-[#94a3b8] leading-relaxed">
          From industry networking nights to hands-on workshops, our events are designed to
          complement your engineering education with real-world experience and connections.
        </p>
        <div className="grid gap-4 mt-8">
          {events.map((event) => (
            <div
              key={event.title}
              className="border border-[rgba(65,145,220,0.15)] p-4 bg-[rgba(65,145,220,0.03)]"
            >
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-semibold text-white">{event.title}</h3>
                <span className="font-mono text-xs text-[#4191dc]">{event.date}</span>
              </div>
              <p className="text-sm text-[#94a3b8]">{event.description}</p>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  jobs: {
    title: 'Jobs Board',
    subtitle: 'Launch your engineering career',
    content: (
      <div className="space-y-6">
        <p className="text-[#94a3b8] leading-relaxed">
          Browse internship and graduate opportunities from our industry partners.
          These positions are exclusively shared with UNSW Engineering Society members.
        </p>
        <div className="grid gap-4 mt-8">
          {jobs.map((job) => (
            <div
              key={job.title}
              className="border border-[rgba(65,145,220,0.15)] p-4 bg-[rgba(65,145,220,0.03)]"
            >
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-semibold text-white">{job.title}</h3>
                  <p className="font-mono text-xs text-[#94a3b8]">{job.company}</p>
                </div>
                <span className={cn(
                  'font-mono text-xs px-2 py-1 rounded',
                  job.type === 'internship' && 'bg-[rgba(65,145,220,0.2)] text-[#4191dc]',
                  job.type === 'graduate' && 'bg-[rgba(100,200,100,0.2)] text-[#64c864]',
                  job.type === 'part-time' && 'bg-[rgba(200,150,50,0.2)] text-[#c89632]'
                )}>
                  {job.type}
                </span>
              </div>
              <p className="text-sm text-[#94a3b8]">{job.description}</p>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  programs: {
    title: 'Programs',
    subtitle: 'Grow your skills and network',
    content: (
      <div className="space-y-6">
        <p className="text-[#94a3b8] leading-relaxed">
          Explore our mentorship programs, skill development workshops, and industry partnerships
          designed to accelerate your engineering journey.
        </p>
        <div className="grid gap-4 mt-8">
          {programs.map((program) => (
            <div
              key={program.title}
              className="border border-[rgba(65,145,220,0.15)] p-4 bg-[rgba(65,145,220,0.03)]"
            >
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-semibold text-white">{program.title}</h3>
                <span className={cn(
                  'font-mono text-xs px-2 py-1 rounded',
                  program.status === 'open' && 'bg-[rgba(100,200,100,0.2)] text-[#64c864]',
                  program.status === 'coming-soon' && 'bg-[rgba(200,150,50,0.2)] text-[#c89632]',
                  program.status === 'closed' && 'bg-[rgba(200,100,100,0.2)] text-[#c86464]'
                )}>
                  {program.status === 'coming-soon' ? 'Coming Soon' : program.status}
                </span>
              </div>
              <p className="text-sm text-[#94a3b8]">{program.description}</p>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  sponsors: {
    title: 'Sponsors',
    subtitle: 'Partners in engineering excellence',
    content: (
      <div className="space-y-6">
        <p className="text-[#94a3b8] leading-relaxed">
          Our sponsors make it possible for us to deliver exceptional experiences to our members.
          We&apos;re proud to partner with industry leaders who share our commitment to developing
          the next generation of engineers.
        </p>
        <div className="space-y-6 mt-8">
          {(['gold', 'silver', 'bronze'] as const).map((tier) => (
            <div key={tier}>
              <h3 className={cn(
                'font-mono text-sm mb-3 uppercase tracking-wider',
                tier === 'gold' && 'text-yellow-400',
                tier === 'silver' && 'text-gray-300',
                tier === 'bronze' && 'text-orange-400'
              )}>
                {tier} Partners
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {sponsors
                  .filter((s) => s.tier === tier)
                  .map((sponsor) => (
                    <div
                      key={sponsor.name}
                      className="border border-[rgba(65,145,220,0.15)] p-4 bg-[rgba(65,145,220,0.03)] text-center"
                    >
                      <span className="text-white font-medium">{sponsor.name}</span>
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>
        <div className="border border-[rgba(65,145,220,0.3)] p-4 bg-[rgba(65,145,220,0.05)] mt-8">
          <p className="text-sm text-[#94a3b8] text-center">
            Interested in partnering with us? <br />
            <span className="text-[#4191dc]">sponsorship@engsoc.unsw.edu.au</span>
          </p>
        </div>
      </div>
    ),
  },
};
