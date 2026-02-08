'use client';

import Image from 'next/image';

interface Executive {
  name: string;
  role: string;
  initials: string;
  image?: string;
}

const executives: Executive[] = [
  { name: 'Alex Lum', role: 'President', initials: 'AL', image: '/team/alex.jpg' },
  { name: 'Jenny Tang', role: 'Secretary', initials: 'JT', image: '/team/jenny-tang.jpg' },
  { name: 'Isabella Tsui', role: 'Treasurer', initials: 'IT', image: '/team/isabella.jpg' },
  { name: 'Jenny Liu', role: 'Arc Delegate', initials: 'JL', image: '/team/jenny-liu.jpg' },
  { name: 'Alicia Ong', role: 'Vice President Marketing', initials: 'AO', image: '/team/alica.jpg' },
  { name: 'Zachary Abran', role: 'Vice President IT', initials: 'ZA', image: '/team/zac.jpg' },
  { name: 'Mark Chen', role: 'Vice President Careers', initials: 'MC', image: '/team/mark.jpg' },
  { name: 'Riwaz Bhattachan ', role: 'Vice President Publications ', initials: 'RB', image: '/team/riwaz.jpg' },
  { name: 'Jesse Vella', role: 'Vice President Sponsorships', initials: 'JV', image: '/team/jesse.jpg' },
  { name: 'Sameen Jubayed', role: 'Vice President Programs', initials: 'SJ', image: '/team/sameen.jpg' },
  { name: 'Sean Wang', role: 'Vice President Socials', initials: 'SW', image: '/team/sean.jpg' }
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
            <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-[rgba(65,145,220,0.1)] border-2 border-[rgba(65,145,220,0.3)] flex items-center justify-center mb-4 overflow-hidden relative">
              {exec.image ? (
                <Image
                  src={exec.image}
                  alt={exec.name}
                  fill
                  className="object-cover"
                  onError={(e) => {
                    // Hide the image on error, fallback to initials
                    e.currentTarget.style.display = 'none';
                  }}
                />
              ) : null}
              <span className="text-2xl md:text-3xl text-[#4191dc] font-medium">
                {exec.initials}
              </span>
            </div>
            <h4 className="text-white text-sm md:text-base font-medium">{exec.name}</h4>
            <p className="text-xs md:text-sm text-[#4191dc] mt-1 font-light">{exec.role}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
