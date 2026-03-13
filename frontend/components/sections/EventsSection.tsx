import Image from 'next/image';
import { Event } from '../types';

const events: Event[] = [
  {
    title: 'High Tea with Industry',
    date: 'April 2, 2026',
    description: 'Join us at Engsoc’s annual ✨High Tea with Industry✨ where you can network 🗣️ with company representatives and gain those valuable linkedin connections 🤝. Discover new opportunities and gain insights into the recruitment process 💼 from potential future employers.',
    image: '/events/high-tea-with-industry.jpg',
    link: 'https://www.facebook.com/share/1CdQ8TAQ4z/',
  },
  {
    title: 'Director Meet n Greet',
    date: 'March 5, 2026',
    description: '🔥 Come along to our 𝐃𝐢𝐫𝐞𝐜𝐭𝐨𝐫 𝐌𝐞𝐞𝐭 𝐧 𝐆𝐫𝐞𝐞𝐭 and hear directly from each portfolio about what they do, what they’re planning, and how you can get involved. Ask questions, suss out where you’d fit best, and grab a snag while you’re at it 🌭',
    image: '/events/dmg.jpg',
    link: 'https://fb.me/e/3VmejSaJV',
  },
  {
    title: '2026 Subcommittee Recruitment',
    date: 'March 10, 2026',
    description: 'Your chance to join the team is here - 𝐄𝐧𝐠𝐒𝐨𝐜 𝐒𝐮𝐛𝐜𝐨𝐦𝐦𝐢𝐭𝐭𝐞𝐞 𝐀𝐩𝐩𝐥𝐢𝐜𝐚𝐭𝐢𝐨𝐧𝐬 𝐚𝐫𝐞 𝐧𝐨𝐰 𝐨𝐩𝐞𝐧! Want to run flagship events, help bring in sponsors, design content that actually pops, or pick up skills that’ll carry into internships and beyond? 𝐓𝐡𝐞𝐫𝐞’𝐬 𝐚 𝐫𝐨𝐥𝐞 𝐭𝐡𝐚𝐭 𝐟𝐢𝐭𝐬 𝐲𝐨𝐮𝐫 𝐛𝐮𝐢𝐥𝐝.',
    image: '/events/26-subcom-recruitment.jpg',
    link: 'https://fb.me/e/485WGbxVg',
  },
  {
    title: 'All Years Camp: The Odyssey',
    date: 'Feb 27, 2026',
    description: 'Across 𝐓𝐇𝐑𝐄𝐄 𝐟𝐚𝐭𝐞-𝐜𝐡𝐚𝐧𝐠𝐢𝐧𝐠 𝐝𝐚𝐲𝐬 🌄 and 𝐓𝐖𝐎 𝐦𝐲𝐭𝐡-𝐰𝐨𝐫𝐭𝐡𝐲 𝐧𝐢𝐠𝐡𝐭𝐬 🌙, prepare for a quest so iconic you’ll be saying 🗣️ “𝘣𝘳𝘰… 𝘵𝘩𝘢𝘵 𝘤𝘢𝘮𝘱 𝘸𝘢𝘴 𝘢𝘤𝘵𝘶𝘢𝘭𝘭𝘺 𝘢 𝘭𝘦𝘨𝘦𝘯𝘥” 😤🔥. Rally ⚔️ your fellow heroes 🫂, find your divine crew 👑🤝, and uncover bonds stronger than Zeus’ lightning ⚡️ — because every demigod needs their party.',
    image: '/events/ayc.jpg',
    link: 'https://fb.me/e/5A6dJelu7',
  },
];

// Parse a date string like "March 15, 2026" or "April 8-9, 2026" into a Date.
// Returns null for "Ongoing" (always treated as upcoming).
function parseEventDate(dateStr: string): Date | null {
  if (dateStr === 'Ongoing') return null;
  // Handle ranges like "April 8-9, 2026" — take the last day
  const normalised = dateStr.replace(/(\d+)-\d+(,)/, '$1$2');
  const parsed = new Date(normalised);
  return isNaN(parsed.getTime()) ? null : parsed;
}

function isPast(dateStr: string): boolean {
  const parsed = parseEventDate(dateStr);
  if (!parsed) return false;
  return parsed < new Date();
}

function EventCard({ event }: { event: Event }) {
  const Wrapper = event.link ? 'a' : 'div';
  const wrapperProps = event.link
    ? { href: event.link, target: '_blank', rel: 'noopener noreferrer' }
    : {};

  return (
    <Wrapper
      {...wrapperProps}
      className={`block border overflow-hidden transition-all duration-200 border-[rgba(65,145,220,0.3)] bg-[rgba(10,25,41,0.6)] hover:bg-[rgba(10,25,41,0.8)] hover:border-[rgba(65,145,220,0.5)] hover:scale-105 ${event.link ? 'cursor-pointer' : ''}`}
    >
      <div className="relative w-full aspect-[1920/1002] bg-[rgba(65,145,220,0.1)]">
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
      <div className="p-5">
        <span className="text-sm text-[#4191dc] font-medium">{event.date}</span>
        <h3 className="text-white font-bold mt-1 mb-2">{event.title}</h3>
        <p className="text-sm text-white font-light">{event.description}</p>
      </div>
    </Wrapper>
  );
}

export default function EventsSection() {
  const upcoming = events.filter((e) => !isPast(e.date));
  const past = events.filter((e) => isPast(e.date));

  return (
    <div className="space-y-6">
      <p className="text-white leading-relaxed font-light">
        From industry networking nights to hands-on workshops, our events are designed to
        complement your engineering education with real-world experience and connections. Click for more details!
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 mt-8">
        {upcoming.map((event) => (
          <EventCard key={event.title} event={event} />
        ))}
      </div>

      <div className="mt-10">
        <h2 className="text-xl md:text-2xl lg:text-3xl text-white mb-10 tracking-tight font-bold">
          Past Events
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
          {past.map((event) => (
            <EventCard key={event.title} event={event} />
          ))}
        </div>
      </div>
    </div>
  );
}
