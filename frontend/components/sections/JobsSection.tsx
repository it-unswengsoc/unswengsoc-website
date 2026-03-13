import Image from 'next/image';
import { cn } from '@/lib/utils';
import { Job } from '../types';

const jobs: Job[] = [
  {
    title: 'Software Engineering Intern',
    company: 'Atlassian',
    type: 'internship',
    description: 'Apply your Java, Python, or C++ skills on cloud-based software projects for Jira, Confluence, Trello, and Bitbucket.',
    location: '2026 Summer, Sydney',
    link: 'https://www.atlassian.com/company/careers/details/23861',
    logo: '/sponsors/atlassian_logo.svg',
  },
  {
    title: '2026/27 AEMO Graduate Program',
    company: 'Australian Energy Market Operator (AEMO)',
    type: 'graduate',
    description: 'Apply your engineering, data science, and IT skills on projects that shape Australia’s energy future.',
    link: 'https://www.linkedin.com/jobs/view/4372333959/'
  },
  {
    title: 'Trading Desk Operations Engineer',
    company: 'Jane Street',
    type: 'internship',
    description: 'Apply your programming and analytical skills on optimizing trading operations and infrastructure management projects.',
    link: 'https://www.janestreet.com/join-jane-street/position/8168747002/',
    logo: '/sponsors/jane-street.png',
  },
];

export default function JobsSection() {
  return (
    <div className="space-y-6">
      <p className="text-white leading-relaxed font-light">
        Browse internship and graduate opportunities from our industry partners.
        These positions are exclusively shared with UNSW Engineering Society members.
      </p>
      <div className="grid gap-4 mt-8">
        {jobs.map((job) => {
          const Wrapper = job.link ? 'a' : 'div';
          const wrapperProps = job.link
            ? { href: job.link, target: '_blank', rel: 'noopener noreferrer' }
            : {};
          return (
          <Wrapper
            key={job.title}
            {...wrapperProps}
            className={`block border border-[rgba(65,145,220,0.15)] p-8 bg-[rgba(10,25,41,0.6)] hover:bg-[rgba(10,25,41,0.8)] hover:border-[rgba(65,145,220,0.5)] hover:scale-105 transition-all duration-200 ${job.link ? 'cursor-pointer' : ''}`}
          >
            <div className="flex justify-between items-start mb-2">
              <div className="flex-1">
                <div className="flex items-center gap-3 flex-wrap">
                  <h3 className="text-white font-medium text-lg">{job.title}</h3>
                  <span className={cn(
                    'text-sm px-2 py-1 rounded font-light',
                    job.type === 'internship' && 'bg-[rgba(65,145,220,0.2)] text-[#4191dc]',
                    job.type === 'graduate' && 'bg-[rgba(100,200,100,0.2)] text-[#64c864]',
                    job.type === 'part-time' && 'bg-[rgba(200,150,50,0.2)] text-[#c89632]'
                  )}>
                    {job.type}
                  </span>
                  {job.location && (
                    <span className="text-sm px-2 py-1 rounded font-light bg-[rgba(180,180,180,0.1)] text-[rgba(180,200,220,0.8)]">
                      {job.location}
                    </span>
                  )}
                </div>
                <p className="text-m text-white font-bold mt-2">{job.company}</p>
              </div>
              {job.logo && (
                <div className="ml-4 flex-shrink-0">
                  <Image src={job.logo} alt={job.company} width={80} height={40} className="object-contain" />
                </div>
              )}
            </div>
            <p className="text-sm text-white font-light">{job.description}</p>
          </Wrapper>
          );
        })}
      </div>
    </div>
  );
}
