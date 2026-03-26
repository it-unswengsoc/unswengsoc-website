import TeamSection from '../TeamSection';

export default function AboutSection() {
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <p className="text-white leading-relaxed font-light">
          The UNSW Engineering Society (EngSoc) serves as the representative body for the diverse community of engineering students at UNSW. Since 2011, we have grown into the largest engineering society in the Southern Hemisphere, supporting a network of over 20,000 students and alumni across all engineering disciplines.
        </p>
        <p className="text-white leading-relaxed font-light">
          As a society run by students, for students, our goal is to create a community where every engineer feels welcomed, supported, and connected throughout their university journey. We aim to bring students together across degrees, years, and interests, helping them build friendships, discover opportunities, and feel part of a community.
        </p>
        <p className="text-white leading-relaxed font-light">
          At the same time, EngSoc works to bridge the gap between university and industry. Through our programs and partnerships, we help students gain insight into the professional world, develop industry skills, and feel confident about their future careers.
        </p>
      </div>

      <div className="grid gap-4 mt-8">
        <div className="border border-[rgba(65,145,220,0.15)] p-8 bg-[rgba(10,25,41,0.6)]">
          <h3 className="text-xl text-[#4191dc] mb-4 font-bold">Our Mission</h3>
          <p className="text-m text-white font-light mb-3">
            To help students enter the workforce confidently, backed by a strong community and real-world skills. We create a balanced university experience that supports the social, academic, and professional development of engineering students.
          </p>
        </div>

        <div className="border border-[rgba(65,145,220,0.15)] p-8 bg-[rgba(10,25,41,0.6)]">
          <h3 className="text-xl text-[#4191dc] mb-6 font-bold">What We Do</h3>
          <div className="space-y-4 text-m text-white font-light">
            <div>
              <p className="font-semibold text-[#4191dc] mb-2">Industry Networking & Professional Development</p>
              <p>Networking events, case competitions, and skills workshops that give students the opportunity to interact directly with leading companies and industry professionals.</p>
            </div>
            <div>
              <p className="font-semibold text-[#4191dc] mb-2">Community Programs</p>
              <p>All Years Camp and Peer Mentoring Program designed to help new students settle into university life and build friendships early on.</p>
            </div>
            <div>
              <p className="font-semibold text-[#4191dc] mb-2">Social Events</p>
              <p>Fortnightly events including BBQs, games nights, the Engineering Ball, and ski trips that bring students together and foster community.</p>
            </div>
            <div>
              <p className="font-semibold text-[#4191dc] mb-2">Digital Resources</p>
              <p>Online platforms and communities that provide engineering students with helpful information and connection opportunities with the wider UNSW engineering network.</p>
            </div>
            <div>
              <p className="font-semibold text-[#4191dc] mb-2">Inclusive Initiatives</p>
              <p>Initiatives that promote awareness, representation, and support for underrepresented groups within engineering, creating a welcoming community for all.</p>
            </div>
          </div>
        </div>

        <div className="border border-[rgba(65,145,220,0.15)] p-8 bg-[rgba(10,25,41,0.6)]">
          <h3 className="text-xl text-[#4191dc] mb-2 font-bold">By The Numbers</h3>
          <div className="grid grid-cols-3 gap-4 mt-8 mb-5">
            <div className="text-center">
              <div className="text-2xl text-white font-bold">20,000+</div>
              <div className="text-m text-white font-light">Students & Alumni</div>
            </div>
            <div className="text-center">
              <div className="text-2xl text-white font-bold">50+</div>
              <div className="text-m text-white font-light">Events/Year</div>
            </div>
            <div className="text-center">
              <div className="text-2xl text-white font-bold">15+</div>
              <div className="text-m text-white font-light">Years EngSoc Era</div>
            </div>
          </div>
        </div>

        <div className="border border-[rgba(65,145,220,0.15)] p-8 bg-[rgba(10,25,41,0.6)]">
          <h3 className="text-xl text-[#4191dc] mb-4 font-bold">Vision for 2026</h3>
          <p className="text-m text-white font-light mb-3">
            We aim to expand outreach and prioritise Equality, Diversity, and Inclusivity in our events to foster an inclusive, industry-ready student community. With strengthened sponsor partnerships, we aim to provide diverse networking and mentorship opportunities that reflect today&apos;s workplace values, empowering all UNSW engineering students for impactful careers in industry, academia and beyond.
          </p>
        </div>
      </div>

      {/* Team section within About */}
      <TeamSection />
    </div>
  );
}
