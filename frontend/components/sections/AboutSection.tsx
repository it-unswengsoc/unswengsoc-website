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
              <p className="font-semibold text-[#4191dc] mb-2">Industry Networking & Professional Development Workshops</p>
              <p>Workshops and industry events give students the opportunity to interact directly with leading companies and industry professionals. Through networking nights, case competitions and skills workshops, students gain insight into potential career pathways while developing the confidence and practical skills needed to enter the workforce.</p>
            </div>
            <div>
              <p className="font-semibold text-[#4191dc] mb-2">Community Programs</p>
              <p>Including All Years Camp and our Peer Mentoring Program, these are designed to help new engineering students settle into university life. These initiatives provide guidance, support, and opportunities to build friendships early on, ensuring that students feel welcomed and connected in their degree.</p>
            </div>
            <div>
              <p className="font-semibold text-[#4191dc] mb-2">Fortnightly Social Events</p>
              <p>From BBQs and games nights, to major events such as the Engineering Ball and ski trips. These events bring students together outside the classroom, strengthening friendships and fostering the strong sense of community that EngSoc is known for.</p>
            </div>
            <div>
              <p className="font-semibold text-[#4191dc] mb-2">Online Resources and Student Platforms</p>
              <p>Our website and digital communities provide engineering students with helpful information and opportunities to stay connected with the wider UNSW engineering network.</p>
            </div>
            <div>
              <p className="font-semibold text-[#4191dc] mb-2">Inclusive Initiatives and Events</p>
              <p>These promote awareness, representation, and support for underrepresented groups within engineering, helping to create a welcoming community where all students feel they belong.</p>
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
            Looking toward 2026, we aim to expand outreach and prioritise Equality, Diversity, and Inclusivity in our events to foster an inclusive, industry-ready student community. With strengthened sponsor partnerships, we aim to provide diverse networking and mentorship opportunities that reflect today’s workplace values. These initiatives aim to continue empowering all UNSW engineering students for impactful careers in industry, academia and beyond.
          </p>
        </div>
      </div>

      {/* Team section within About */}
      <TeamSection />
    </div>
  );
}
