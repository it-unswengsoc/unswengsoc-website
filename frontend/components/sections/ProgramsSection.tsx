import Image from 'next/image';
import { cn } from '@/lib/utils';
import { Program } from '../types';

const programs: Program[] = [
  {
    title: 'EngSoc x Stantec: Build-A-CV',
    date: 'July 29, 2026',
    description: "Are you still struggling to piece together your resume? 😩📄 Not sure what employers are really looking for when recruiting interns and graduates? 🤔❓ We've got you covered! Bring your CV and join UNSW EngSoc x Stantec for an interactive workshop. 🤩 Refactor it. 📋 Optimise it. 📇 Stress-test it with real engineers 🛠️ - and an Early Careers Lead who reviews thousands of CVs every year.",
    status: 'open',
    image: '/programs/build_a_cv.png',
    link: 'https://www.facebook.com/events/1030973922671364/',
  },
  {
    title: 'Case Crack Competition with ConnellGriffin',
    date: 'July 9 - July 13, 2026',
    description: 'UNSW ENGSOC 🤝 MSOC are excited to partner with ConnellGriffin to bring you an intensive 36-hour Case Crack—an incredible opportunity to challenge yourself, develop practical problem-solving skills, and showcase your ability to think like an industry professional.',
    status: 'closed',
    image: '/programs/case_crack.png',
    link: 'https://www.facebook.com/events/2480652515744302',
  },
  {
    title: 'EngSoc x NDY Case Competition',
    date: 'June 30 - July 17, 2026',
    description: 'Work alongside your team to tackle a real-world case inspired by the kinds of problems faced by NDY consultants and engineers. You’ll combine analytical thinking, technical knowledge, and creativity to develop a solution — then pitch your ideas directly to industry professionals.',
    status: 'closed',
    image: '/programs/ndy_case_comp.png',
    link: 'https://www.facebook.com/events/993745220135537/',
  },
  {
    title: 'Applied Consulting for Engineers',
    date: 'June 4 - July 6, 2026',
    description: 'A unique opportunity to apply engineering principles to real-world problems through an exciting design challenge. You’ll work in teams, be mentored by experienced consultants, and develop vital skills in problem-solving 🧠, presenting 🧑‍🏫, and teamwork 🤝. Whether you’re interested in consulting, design, or just want to challenge yourself, ACE is your gateway to becoming a more confident and well-rounded engineer. No prior experience is needed – just bring your curiosity and growth mindset! 🌱',
    status: 'closed',
    image: '/programs/ace.png',
    link: 'https://www.facebook.com/events/2460743524366028',
  },
  {
    title: 'EngSoc Professional Development Program',
    date: 'May 27 - August 5, 2026',
    description: '🌊 Excited to dive into your future career? 😬 Unsure how to make the leap from university to the workforce? 🐚 Not sure which direction to explore as you navigate your professional journey? If that’s you, then get ready to plunge into the 🌊 depths 🌊 of your professional career, as we guide you through uncharted waters at EngSoc’s Professional Development Program (PDP)!',
    status: 'closed',
    image: '/programs/pdp.png',
    link: 'https://www.facebook.com/events/2111191069721738/',
  },
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
            sizes="(max-width: 640px) 100vw, 50vw"
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
