import Image from 'next/image';
import { Event } from '../types';

const events: Event[] = [
  {
    title: 'The Push-Up Challenge',
    date: 'June 3rd - June 26th, 2026',
    description: 'Join the Team of Engineering Societies at UNSW in one of the biggest mental health and fitness events in Australia 💪💪. The goal is to take on 3,307 push-ups over 24 days to honour the 3307 lives lost to suicide in Australia in 2024.💙🧡',
    image: '/events/push-upchallenge.png',
    link: 'https://www.facebook.com/events/1310540057881685',
  },
  {
    title: 'Celestial Tides Cruise',
    date: 'June 19th, 2026',
    description: "The stars have aligned, the tide is rising, and the harbour is calling your name. 🌊✨ Unlimited drinks 🍺🍷, a photobooth to immortalise the moment 📸, and an afterparty that'll keep the stars burning long after the cruise docks. Because the night doesn't end when the tide comes in, it's only just beginning. 🎉 ",
    image: '/events/cruise.png',
    link: 'https://www.facebook.com/events/964848139917940',
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
