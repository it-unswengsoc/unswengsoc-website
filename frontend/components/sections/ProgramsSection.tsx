import Image from 'next/image';
import { cn } from '@/lib/utils';
import { Program } from '../types';

const programs: Program[] = [
  {
    title: 'Peer Mentoring Recruitment',
    description: 'Apply today and be the mentor you wish you had and help shape someone’s uni experience in 2026! 🎉☺️',
    status: 'closed',
    image: '/programs/peer-mentor-recruitment.jpg',
    link: 'https://fb.me/e/5VcXs1Uaa'
  },
];

function ProgramCard({ program }: { program: Program }) {
  const Wrapper = program.link ? 'a' : 'div';
  const wrapperProps = program.link
    ? { href: program.link, target: '_blank', rel: 'noopener noreferrer' }
    : {};

  return (
    <Wrapper
      {...wrapperProps}
      className={`block border overflow-hidden transition-all duration-200 border-[rgba(65,145,220,0.3)] bg-[rgba(10,25,41,0.6)] hover:bg-[rgba(10,25,41,0.8)] hover:border-[rgba(65,145,220,0.5)] hover:scale-105 ${program.link ? 'cursor-pointer' : ''}`}
    >
      <div className="relative w-full aspect-[1920/1002] bg-[rgba(65,145,220,0.1)]">
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
      <div className="p-5">
        <span className={cn(
          'text-xs px-2 py-1 font-light',
          program.status === 'open' && 'bg-[rgba(100,200,100,0.2)] text-[#64c864]',
          program.status === 'coming-soon' && 'bg-[rgba(200,150,50,0.2)] text-[#c89632]',
          program.status === 'closed' && 'bg-[rgba(200,100,100,0.2)] text-[#c86464]'
        )}>
          {program.status === 'coming-soon' ? 'Coming Soon' : program.status}
        </span>
        <h3 className="text-white font-bold mt-2 mb-2">{program.title}</h3>
        <p className="text-sm text-white font-light">{program.description}</p>
      </div>
    </Wrapper>
  );
}

export default function ProgramsSection() {
  return (
    <div className="space-y-6">
      <p className="text-white leading-relaxed font-light">
        Explore our mentorship programs, skill development workshops, and industry partnerships
        designed to accelerate your engineering journey.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 mt-8">
        {programs.map((program) => (
          <ProgramCard key={program.title} program={program} />
        ))}
      </div>
    </div>
  );
}
