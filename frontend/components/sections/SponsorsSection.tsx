import Image from 'next/image';

interface Sponsor {
  name: string;
  logo: string;
  url: string;
  invert?: boolean;
  scale?: number;
}

const sponsors: Sponsor[] = [
  { name: 'Jane Street', logo: '/sponsors/jane-street.png', url: 'https://www.janestreet.com/', invert: true, scale: 0.7},
  { name: 'BHP', logo: '/sponsors/bhp.png', url: 'https://www.bhp.com/', scale: 0.4 },
  { name: 'EYPS', logo: '/sponsors/ey-ps.svg', url: 'https://www.ey.com/en_au/services/strategy/parthenon', invert: true, scale: 1. },
  { name: 'Optiver', logo: '/sponsors/optiver.svg', url: 'https://www.optiver.com/', scale: 0.8},
  { name: 'Stantec', logo: '/sponsors/stantec.png', url: 'https://www.stantec.com/', invert: true, scale: 1.8 },
  { name: 'Partners in Performance', logo: '/sponsors/pip.png', url: 'https://www.partnersinperformance.com/', scale: 1.8, invert: true},
  { name: 'Engineers Australia', logo: '/sponsors/engineers-australia.png', url: 'https://www.engineersaustralia.org.au/', invert: true, scale: 1.2},
  { name: 'Atlassian', logo: '/sponsors/atlassian.svg.png', url: 'https://www.atlassian.com/' },
  { name: 'Westpac', logo: '/sponsors/westpac.png', url: 'https://www.westpac.com.au/', scale: 1.4, invert: true },
  { name: 'ConnelGriffin', logo: '/sponsors/connelgriffin.png', url: 'https://www.connellgriffin.com/' },
];

const outreachSponsors: Sponsor[] = [
  { name: 'Hatch', logo: '/sponsors/hatch.png', url: 'https://www.hatch.com/', scale: 0.6 },
];

export default function SponsorsSection() {
  return (
    <div className="space-y-6">
      <p className="text-white leading-relaxed font-light">
        Our sponsors make it possible for us to deliver exceptional experiences to our members.
        We&apos;re proud to partner with industry leaders who share our commitment to developing
        the next generation of engineers.
      </p>

      {/* Main Sponsors */}
      <div className="mt-8">
        <h3 className="text-xl mb-8 uppercase tracking-wider font-bold text-[#4191dc]">
          Our Sponsors
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-10">
          {sponsors.map((sponsor) => (
            <a
              key={sponsor.name}
              href={sponsor.url}
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 flex items-center justify-center h-32 transition-all duration-200 hover:scale-110"
            >
              <div
                className="relative w-full h-full"
                style={{ transform: sponsor.scale ? `scale(${sponsor.scale})` : undefined }}
              >
                <Image
                  src={sponsor.logo}
                  alt={sponsor.name}
                  fill
                  className={`object-contain ${sponsor.invert ? 'brightness-0 invert' : ''}`}
                />
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* Outreach Partners */}
      <div className="mt-12">
        <h3 className="text-xl mb-8 uppercase tracking-wider font-bold text-[#4191dc]">
          Outreach Partners
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {outreachSponsors.map((sponsor) => (
            <a
              key={sponsor.name}
              href={sponsor.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center h-24 transition-all duration-200 hover:scale-110"
            >
              <div 
                className="relative w-full h-full"
                style={{ transform: sponsor.scale ? `scale(${sponsor.scale})` : undefined }}
              >
                <Image
                  src={sponsor.logo}
                  alt={sponsor.name}
                  fill
                  className="object-contain"
                />
              </div>
            </a>
          ))}
        </div>
      </div>

      <div className="border border-[rgba(65,145,220,0.3)] p-4 bg-[rgba(65,145,220,0.05)] mt-10 p-5">
        <p className="text-xl text-white text-center font-bold">
          Interested in partnering with us? <br />
          <span className="text-[#4191dc]">sponsorship@engsoc.unsw.edu.au</span>
        </p>
      </div>
    </div>
  );
}
