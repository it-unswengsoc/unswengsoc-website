import Image from 'next/image';
import { cn } from '@/lib/utils';
import { Program } from '../types';

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

export default function ProgramsSection() {
  return (
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
  );
}
