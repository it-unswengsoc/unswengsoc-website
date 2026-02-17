import Image from 'next/image';
import { Event } from '../types';

const events: Event[] = [
  {
    title: 'Industry Night 2026',
    date: 'March 15, 2026',
    description: 'Connect with leading engineering firms and explore career opportunities.',
    image: '/events/industry-night.jpg',
  },
  {
    title: 'Hackathon: Build the Future',
    date: 'April 8-9, 2026',
    description: '48 hours of innovation, collaboration, and creating solutions for real-world problems.',
    image: '/events/hackathon.jpg',
  },
  {
    title: 'Engineering Ball',
    date: 'May 20, 2026',
    description: 'Our annual formal celebration of engineering excellence and community.',
    image: '/events/ball.jpg',
  },
  {
    title: 'Workshop Series: CAD Mastery',
    date: 'Ongoing',
    description: 'Weekly hands-on sessions covering SolidWorks, AutoCAD, and Fusion 360.',
    image: '/events/workshop.jpg',
  },
];

export default function EventsSection() {
  return (
    <div className="space-y-6">
      <p className="text-white leading-relaxed font-light">
        From industry networking nights to hands-on workshops, our events are designed to
        complement your engineering education with real-world experience and connections.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 mt-8">
        {events.map((event) => (
          <div
            key={event.title}
            className="border border-[rgba(65,145,220,0.3)] bg-[rgba(10,25,41,0.6)] overflow-hidden transition-all duration-200 hover:bg-[rgba(10,25,41,0.8)] hover:border-[rgba(65,145,220,0.5)] hover:scale-103"
          >
            {/* Event Image */}
            <div className="relative w-full aspect-[4/3] bg-[rgba(65,145,220,0.1)]">
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
            {/* Event Details */}
            <div className="p-5">
              <span className="text-sm text-[#4191dc] font-medium">{event.date}</span>
              <h3 className="text-white font-medium mt-1 mb-2">{event.title}</h3>
              <p className="text-m text-white font-light">{event.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
