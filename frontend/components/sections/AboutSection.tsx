import TeamSection from '../TeamSection';

export default function AboutSection() {
  return (
    <div className="space-y-6">
      <p className="text-white leading-relaxed font-light">
        The UNSW Engineering Society is one of the largest and most active student societies
        at the University of New South Wales. For over 60 years, we&apos;ve been the home for
        engineering students across all disciplines.
      </p>
      <div className="grid gap-4 mt-8">
        <div className="border border-[rgba(65,145,220,0.15)] p-8 bg-[rgba(10,25,41,0.6)]">
          <h3 className="text-xl text-[#4191dc] mb-4 font-bold">Our Mission</h3>
          <p className="text-m text-white font-light mb-3">
            To foster a vibrant engineering community that supports academic excellence,
            professional development, and lifelong friendships.
          </p>
        </div>
        <div className="border border-[rgba(65,145,220,0.15)] p-8 bg-[rgba(10,25,41,0.6)]">
          <h3 className="text-xl text-[#4191dc] mb-6 font-bold">What We Do</h3>
          <ul className="text-m text-white space-y-1 font-light mb-3">
            <li>- Industry networking events</li>
            <li>- Technical workshops and competitions</li>
            <li>- Social events and camps</li>
            <li>- Career development programs</li>
            <li>- Peer mentoring initiatives</li>
          </ul>
        </div>
        <div className="border border-[rgba(65,145,220,0.15)] p-8 bg-[rgba(10,25,41,0.6)]">
          <h3 className="text-xl text-[#4191dc] mb-2 font-bold">By The Numbers</h3>
          <div className="grid grid-cols-3 gap-4 mt-8 mb-5">
            <div className="text-center">
              <div className="text-2xl text-white font-bold">5000+</div>
              <div className="text-m text-white font-light">Members</div>
            </div>
            <div className="text-center">
              <div className="text-2xl text-white font-bold">50+</div>
              <div className="text-m text-white font-light">Events/Year</div>
            </div>
            <div className="text-center">
              <div className="text-2xl text-white font-bold">60+</div>
              <div className="text-m text-white font-light">Years Active</div>
            </div>
          </div>
        </div>
      </div>

      {/* Team section within About */}
      <TeamSection />
    </div>
  );
}
