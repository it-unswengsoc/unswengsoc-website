import Image from 'next/image';
import { cn } from '@/lib/utils';
import { SectionData, Event, Sponsor, Job, Program } from './types';
import TeamSection from './TeamSection';

// Events data
const events: Event[] = [
  {
    title: 'Industry Night 2026',
    date: 'March 15, 2026',
    description: 'Connect with leading engineering firms and explore career opportunities.',
    image: '/events/industry-night.jpg',
  },
  {
    title: 'Hackathon: Build the Future',
    date: 'April 8-9, 2026',
    description: '48 hours of innovation, collaboration, and creating solutions for real-world problems.',
    image: '/events/hackathon.jpg',
  },
  {
    title: 'Engineering Ball',
    date: 'May 20, 2026',
    description: 'Our annual formal celebration of engineering excellence and community.',
    image: '/events/ball.jpg',
  },
  {
    title: 'Workshop Series: CAD Mastery',
    date: 'Ongoing',
    description: 'Weekly hands-on sessions covering SolidWorks, AutoCAD, and Fusion 360.',
    image: '/events/workshop.jpg',
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
    image: '/programs/peer-mentoring.jpg',
  },
  {
    title: 'Industry Mentoring',
    description: 'Be paired with industry professionals in your field of interest.',
    status: 'coming-soon',
    image: '/programs/industry-mentoring.jpg',
  },
  {
    title: 'Technical Workshop Series',
    description: 'Hands-on workshops covering CAD, coding, and engineering tools.',
    status: 'open',
    image: '/programs/workshops.jpg',
  },
  {
    title: 'Leadership Development',
    description: 'Develop leadership skills through projects and team experiences.',
    status: 'coming-soon',
    image: '/programs/leadership.jpg',
  },
];

export const sectionDetails: Record<string, SectionData> = {
  about: {
    title: 'About Us',
    subtitle: 'Engineering excellence since 1963',
    content: (
      <div className="space-y-6">
        <p className="text-white leading-relaxed font-light">
          The UNSW Engineering Society is one of the largest and most active student societies
          at the University of New South Wales. For over 60 years, we&apos;ve been the home for
          engineering students across all disciplines.
        </p>
        <div className="grid gap-4 mt-8">
          <div className="border border-[rgba(65,145,220,0.15)] p-4 bg-[rgba(10,25,41,0.6)]">
            <h3 className="text-sm text-[#4191dc] mb-2 font-light">Our Mission</h3>
            <p className="text-sm text-white font-light">
              To foster a vibrant engineering community that supports academic excellence,
              professional development, and lifelong friendships.
            </p>
          </div>
          <div className="border border-[rgba(65,145,220,0.15)] p-4 bg-[rgba(10,25,41,0.6)]">
            <h3 className="text-sm text-[#4191dc] mb-2 font-light">What We Do</h3>
            <ul className="text-sm text-white space-y-1 font-light">
              <li>- Industry networking events</li>
              <li>- Technical workshops and competitions</li>
              <li>- Social events and camps</li>
              <li>- Career development programs</li>
              <li>- Peer mentoring initiatives</li>
            </ul>
          </div>
          <div className="border border-[rgba(65,145,220,0.15)] p-4 bg-[rgba(10,25,41,0.6)]">
            <h3 className="text-sm text-[#4191dc] mb-2 font-light">By The Numbers</h3>
            <div className="grid grid-cols-3 gap-4 mt-2">
              <div className="text-center">
                <div className="text-2xl text-white font-bold">5000+</div>
                <div className="text-xs text-white font-light">Members</div>
              </div>
              <div className="text-center">
                <div className="text-2xl text-white font-bold">50+</div>
                <div className="text-xs text-white font-light">Events/Year</div>
              </div>
              <div className="text-center">
                <div className="text-2xl text-white font-bold">60+</div>
                <div className="text-xs text-white font-light">Years Active</div>
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
        <p className="text-white leading-relaxed font-light">
          From industry networking nights to hands-on workshops, our events are designed to
          complement your engineering education with real-world experience and connections.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 mt-8">
          {events.map((event) => (
            <div
              key={event.title}
              className="border border-[rgba(65,145,220,0.3)] bg-[rgba(10,25,41,0.6)] overflow-hidden transition-all duration-200 hover:bg-[rgba(10,25,41,0.8)] hover:border-[rgba(65,145,220,0.5)]"
            >
              {/* Event Image */}
              <div className="relative w-full aspect-[4/3] bg-[rgba(65,145,220,0.1)]">
                {event.image ? (
                  <Image
                    src={event.image}
                    alt={event.title}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-[#4191dc] text-4xl font-light opacity-30">
                      {event.title.charAt(0)}
                    </span>
                  </div>
                )}
              </div>
              {/* Event Details */}
              <div className="p-4">
                <span className="text-xs text-[#4191dc] font-light">{event.date}</span>
                <h3 className="text-white font-medium mt-1 mb-2">{event.title}</h3>
                <p className="text-sm text-white font-light">{event.description}</p>
              </div>
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
        <p className="text-white leading-relaxed font-light">
          Browse internship and graduate opportunities from our industry partners.
          These positions are exclusively shared with UNSW Engineering Society members.
        </p>
        <div className="grid gap-4 mt-8">
          {jobs.map((job) => (
            <div
              key={job.title}
              className="border border-[rgba(65,145,220,0.15)] p-4 bg-[rgba(10,25,41,0.6)]"
            >
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="text-white font-medium">{job.title}</h3>
                  <p className="text-xs text-white font-light">{job.company}</p>
                </div>
                <span className={cn(
                  'text-xs px-2 py-1 rounded font-light',
                  job.type === 'internship' && 'bg-[rgba(65,145,220,0.2)] text-[#4191dc]',
                  job.type === 'graduate' && 'bg-[rgba(100,200,100,0.2)] text-[#64c864]',
                  job.type === 'part-time' && 'bg-[rgba(200,150,50,0.2)] text-[#c89632]'
                )}>
                  {job.type}
                </span>
              </div>
              <p className="text-sm text-white font-light">{job.description}</p>
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
        <p className="text-white leading-relaxed font-light">
          Explore our mentorship programs, skill development workshops, and industry partnerships
          designed to accelerate your engineering journey.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 mt-8">
          {programs.map((program) => (
            <div
              key={program.title}
              className="border border-[rgba(65,145,220,0.3)] bg-[rgba(10,25,41,0.6)] overflow-hidden transition-all duration-200 hover:bg-[rgba(10,25,41,0.8)] hover:border-[rgba(65,145,220,0.5)]"
            >
              {/* Program Image */}
              <div className="relative w-full aspect-[4/3] bg-[rgba(65,145,220,0.1)]">
                {program.image ? (
                  <Image
                    src={program.image}
                    alt={program.title}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-[#4191dc] text-4xl font-light opacity-30">
                      {program.title.charAt(0)}
                    </span>
                  </div>
                )}
              </div>
              {/* Program Details */}
              <div className="p-4">
                <span className={cn(
                  'text-xs px-2 py-1 rounded font-light',
                  program.status === 'open' && 'bg-[rgba(100,200,100,0.2)] text-[#64c864]',
                  program.status === 'coming-soon' && 'bg-[rgba(200,150,50,0.2)] text-[#c89632]',
                  program.status === 'closed' && 'bg-[rgba(200,100,100,0.2)] text-[#c86464]'
                )}>
                  {program.status === 'coming-soon' ? 'Coming Soon' : program.status}
                </span>
                <h3 className="text-white font-medium mt-2 mb-2">{program.title}</h3>
                <p className="text-sm text-white font-light">{program.description}</p>
              </div>
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
        <p className="text-white leading-relaxed font-light">
          Our sponsors make it possible for us to deliver exceptional experiences to our members.
          We&apos;re proud to partner with industry leaders who share our commitment to developing
          the next generation of engineers.
        </p>
        <div className="space-y-6 mt-8">
          {(['gold', 'silver', 'bronze'] as const).map((tier) => (
            <div key={tier}>
              <h3 className={cn(
                'text-sm mb-3 uppercase tracking-wider font-light',
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
                      className="border border-[rgba(65,145,220,0.15)] p-4 bg-[rgba(10,25,41,0.6)] text-center"
                    >
                      <span className="text-white font-medium">{sponsor.name}</span>
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>
        <div className="border border-[rgba(65,145,220,0.3)] p-4 bg-[rgba(65,145,220,0.05)] mt-8">
          <p className="text-sm text-white text-center font-light">
            Interested in partnering with us? <br />
            <span className="text-[#4191dc]">sponsorship@engsoc.unsw.edu.au</span>
          </p>
        </div>
      </div>
    ),
  },
};
