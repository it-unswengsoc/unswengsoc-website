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
  {
    title: 'The Push-Up Challenge',
    date: 'June 3 - 26, 2026',
    description: 'Join the Team of Engineering Societies at UNSW in one of the biggest mental health and fitness events in Australia 💪💪. The goal is to take on 3,307 push-ups over 24 days to honour the 3307 lives lost to suicide in Australia in 2024.💙🧡',
    image: '/events/push-upchallenge.png',
    link: 'https://www.facebook.com/events/1310540057881685',
  },
  
  {
    title: 'Celestial Tides Cruise',
    date: 'June 19, 2026',
    description: "The stars have aligned, the tide is rising, and the harbour is calling your name. 🌊✨ Unlimited drinks 🍺🍷, a photobooth to immortalise the moment 📸, and an afterparty that'll keep the stars burning long after the cruise docks. Because the night doesn't end when the tide comes in, it's only just beginning. 🎉 ",
    image: '/events/cruise.png',
    link: 'https://www.facebook.com/events/964848139917940',
  },
  {
    title: "Smi-SKI's Escape",
    date: 'September 4 - 7, 2026',
    description: "⛷️❄️ 𝐄𝐍𝐆𝐒𝐎𝐂 𝐏𝐑𝐄𝐒𝐄𝐍𝐓𝐒: 𝐒𝐌𝐈𝐒𝐊𝐈’𝐒 𝐄𝐒𝐂𝐀𝐏𝐄! 👻🏔️ Pack your gear and get ready for an unforgettable few days in the snow! Whether you're a seasoned skier 🎿, a first-time snowboarder 🏂, or simply joining for the mountain views 🏔️ and great company 🫶, the EngSoc Smiski Ski Trip is the perfect winter getaway.",
    image: '/events/ski_trip.png',
    link: 'https://www.facebook.com/events/1047948830988807',
  },
  {
    title: 'EngSoc Tied With Pride',
    date: 'June 24, 2026',
    description: "Pride Month is here 🏳️‍🌈✨ and EngSoc, SapphoSoc, and QSIS are teaming up to bring you Tied With Pride 🌈📿 a friendship bracelet making event full of good vibes and even better people! 💖🎀 Whether you’re a bracelet pro or a total beginner, everyone is welcome 🫶🏳️‍🌈 ",
    image: '/events/tied_with_pride.png',
    link: 'https://www.facebook.com/events/1538925411581105/',
  },
  {
    title: 'Term 2 BBQ',
    date: 'June 10, 2026',
    description: "Term 2 is officially underway🎈🎉! Fire up your appetite because EngSoc’s BBQ is back 🌭🥳! Whether it's an excuse to get some free lunch on campus, meet new people or catch up with some friends, Engsoc BBQ is a great place to be. There will be fresh snags and drinks🥤, a perfect way to spend the time between your classes. Bring your friends 👥 and we hope to see you there ☀️😁!!",
    image: '/events/term2_bbq.png',
    link: 'https://www.facebook.com/events/1471503034259509/',
  },
   {
    title: 'Wings4Lyfe',
    date: 'May 10, 2026',
    description: "ENGSOC is teaming up with Red Bull’s Wings for Life World Run – a global race where 💯% of all entry fees & donations go directly to life-changing spinal cord research 🧠💙 🚨 THE TWIST? No finish line. No limits. Just YOU vs the Virtual Catcher Car 🚗💨 Run with your friends, track your pace on the app, and keep going until you’re caught 🚨!",
    image: '/events/wings4lyfe.png',
    link: 'https://www.facebook.com/events/954889640490070/',
  },
  {
    title: 'Sahara After Dark Pubcrawl',
    date: 'April 24, 2026',
    description: "A night where the sands shift 🌪️, the beats drop 🎶🔥, and the spice flows freely… ✨🌶️ For the ones who move like shadows 🌑💃, dance like a desert storm 🌪️🕺, and burn brighter than the sun ☀️❤️‍🔥 This isn’t just a night out…",
    image: '/events/sahara_after_dark_pubcrawl.png',
    link: 'https://www.facebook.com/events/26614551894897531/',
  },
  {
    title: 'CSESoc x BITSA x EngSoc Wheelchair Basketball',
    date: 'April 2, 2026',
    description: "Grab your team of 3–8 people, get ready to compete in a round robin tournament🔥, and enjoy a BBQ with everyone after🌭. Whether you’re playing to win or just here for a good time, it’s the perfect chance to get active, meet new people, and enjoy the day at Village Green. ",
    image: '/events/wheelchair_basketball.png',
    link: 'https://www.facebook.com/events/1681330199535005/',
  },
  {
    title: "International Women's Day Networking Night",
    date: 'March 4, 2026',
    description: "Join us for an evening of empowering conversations, good vibes, and plenty of networking opportunities with students, professionals, and inspiring women in STEM 👩‍💻🔧. Whether you're looking to grow your network, engage with panelists, or just celebrate IWD with an amazing community, this is the night for you! ",
    image: '/events/international_women_day_networking_night.png',
    link: 'https://www.facebook.com/events/2443056966133546/',
  },
  {
    title: "EngSoc Charity Cake Sale",
    date: 'July 29, 2026',
    description: "Join UNSW EngSoc for our Charity Bake Sale and decorate your very own cupcake while supporting a great cause! 💙 Every cupcake you decorate helps make a difference, with 100% of proceeds going to World Vision Australia 🌏❤️ Bring your friends, satisfy your sweet tooth, and support a meaningful cause—we can’t wait to see you there! 🧁✨ ",
    image: '/events/charity_cake_sale.png',
    link: 'https://www.facebook.com/events/925327070591859/',
  },
   {
    title: "Overcooked Pubcrawl",
    date: 'July 17, 2026',
    description: "🔥 ORDER UP! 🔥 The kitchen’s in chaos and the chefs have escaped… straight to the pub. 👨‍🍳🍻 Get your aprons, chef hats, rats, waiters, onions, tomatoes, or whatever cursed Overcooked creation you can think of, because EngSoc’s Overcooked Pub Crawl is serving up a night of absolute mayhem. 🍅🧀🔥 ",
    image: '/events/overcooked_pubcrawl.png',
    link: 'https://www.facebook.com/events/1999584254185515/',
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
