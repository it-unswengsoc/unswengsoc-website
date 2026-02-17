import { cn } from '@/lib/utils';
import { Job } from '../types';

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

export default function JobsSection() {
  return (
    <div className="space-y-6">
      <p className="text-white leading-relaxed font-light">
        Browse internship and graduate opportunities from our industry partners.
        These positions are exclusively shared with UNSW Engineering Society members.
      </p>
      <div className="grid gap-4 mt-8">
        {jobs.map((job) => (
          <div
            key={job.title}
            className="border border-[rgba(65,145,220,0.15)] p-8 bg-[rgba(10,25,41,0.6)] hover:bg-[rgba(10,25,41,0.8)] hover:border-[rgba(65,145,220,0.5)] hover:scale-105 transition-all duration-200"
          >
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="text-white font-medium text-lg">{job.title}</h3>
                <p className="text-m text-white font-bold mt-2 ">{job.company}</p>
              </div>
              <span className={cn(
                'text-sm px-2 py-1 rounded font-light',
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
  );
}
