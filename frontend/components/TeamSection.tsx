'use client';

import Image from 'next/image';

interface Executive {
  name: string;
  role: string;
  initials: string;
  image?: string;
  degree?: string;
  linkedin?: string;
}

const executives: Executive[] = [
  { name: 'Alex Lum', role: 'President', initials: 'AL', image: '/team/alex-lum.jpg', degree: 'Electrical Engineering (Honours) / Computer Science', linkedin: 'https://www.linkedin.com/in/alex-lum-806a15336/' },
  { name: 'Jenny Tang', role: 'Secretary', initials: 'JT', image: '/team/jenny-tang.jpg', degree: 'Quantum Engineering (Honours) / Computer Science', linkedin: 'https://www.linkedin.com/in/jenny-tang-9b874a238/' },
  { name: 'Isabella Tsui', role: 'Treasurer', initials: 'IT', image: '/team/isabella-tsui.jpg', degree: 'Mechanical Engineering (Honours) / Biomedical Engineering (Honours)', linkedin: 'https://www.linkedin.com/in/isabella-tsui-491564332/' },
  { name: 'Jenny Liu', role: 'Arc Delegate', initials: 'JL', image: '/team/jenny-liu.jpg', degree: 'Computer Science', linkedin: 'https://www.linkedin.com/in/jenny-liu-813763270/' },
  { name: 'Alicia Ong', role: 'Vice President Marketing', initials: 'AO', image: '/team/alicia-ong.jpg', degree: 'Civil Engineering (Honours)', linkedin: 'https://www.linkedin.com/in/alicia-ong-289b432bb/' },
  { name: 'Zachary Abran', role: 'Vice President Information Technology', initials: 'ZA', image: '/team/zac-abran.jpg', degree: 'Software Engineering (Honours)', linkedin: 'https://www.linkedin.com/in/zachary-abran-950239352/' },
  { name: 'Mark Chen', role: 'Vice President Careers', initials: 'MC', image: '/team/mark-chen.jpg', degree: 'Mechanical Engineering (Honours)', linkedin: 'https://www.linkedin.com/in/mark-c-7b6348292/' },
  { name: 'Riwaz Bhattachan', role: 'Vice President Publications', initials: 'RB', image: '/team/riwaz-b.jpg', degree: 'Computer Science', linkedin: 'https://www.linkedin.com/in/riwaz-b-2036b0256/' },
  { name: 'Jesse Vella', role: 'Vice President Sponsorships', initials: 'JV', image: '/team/jesse-vella.jpg', degree: 'Electrical Engineering (Honours) / Computer Science', linkedin: 'https://www.linkedin.com/in/jesse-vella66/' },
  { name: 'Sameen Jubayed', role: 'Vice President Programs', initials: 'SJ', image: '/team/sameen.png', degree: 'Mechanical Engineering (Honours) / Computer Science ', linkedin: 'https://www.linkedin.com/in/sameen-jubayed-815142313/' },
  { name: 'Sean Wang', role: 'Vice President Socials', initials: 'SW', image: '/team/sean-wang.jpg', degree: 'Biomedical Engineering (Honours)', linkedin: 'https://www.linkedin.com/in/sean-wang-a507ab265/' },
];

export default function TeamSection() {
  return (
    <div className="mt-6 md:mt-8 pt-6 md:pt-8">
      <h3 className="text-2xl md:text-2xl text-[#4191dc] mb-3 md:mb-4 font-bold">Our Executive Team</h3>
      <p className="text-white text-sm md:text-base leading-relaxed mb-4 md:mb-6 font-light">
        Meet the executive team leading UNSW Engineering Society in 2026.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
        {executives.map((exec) => (
          <div
            key={exec.name}
            className="border border-[rgba(65,145,220,0.3)] bg-[rgba(10,25,41,0.6)] p-4 md:p-6 flex flex-col items-center text-center transition-all duration-200 hover:bg-[rgba(10,25,41,0.8)] hover:border-[rgba(65,145,220,0.5)]"
          >
            <div className="w-32 h-32 md:w-48 md:h-48 rounded-full bg-[rgba(65,145,220,0.1)] border-2 border-[rgba(65,145,220,0.3)] flex items-center justify-center mb-4 overflow-hidden relative">
              {exec.image ? (
                <Image
                  src={exec.image}
                  alt={exec.name}
                  fill
                  className="object-cover"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
              ) : null}
              <span className="text-2xl md:text-3xl text-[#4191dc] font-medium">
                {exec.initials}
              </span>
            </div>
            <h4 className="text-white text-2xl font-bold">{exec.name}</h4>
            <p className="text-md md:text-md text-[#4191dc] mt-2 font-medium">{exec.role}</p>
            {exec.degree && (
              <p className="text-sm text-[rgb(180,200,220)] mt-3 font-medium">{exec.degree}</p>
            )}
            {exec.linkedin && (
              <a
                href={exec.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-block hover:opacity-75 transition-opacity"
              >
                <Image src="/linkedin.png" alt="LinkedIn" width={70} height={70} />
              </a>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
