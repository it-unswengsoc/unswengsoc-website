'use client';

import Image from 'next/image';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative z-10 border-t border-[rgba(65,145,220,0.15)] bg-[rgba(65,145,220,0.03)]">
      <div className="max-w-6xl mx-auto px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Logo & Description */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <Image
                src="/icon.png"
                alt="EngSoc Logo"
                width={32}
                height={32}
                className="object-contain"
              />
              <span className="font-bold text-white">UNSW Engineering Society</span>
            </div>
            <p className="text-sm text-[#94a3b8] leading-relaxed">
              Empowering the next generation of engineers through events,
              networking, and professional development opportunities.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-white mb-4 text-sm tracking-wider uppercase">
              Quick Links
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="text-[#94a3b8] hover:text-[#4191dc] transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="text-[#94a3b8] hover:text-[#4191dc] transition-colors">
                  Events
                </a>
              </li>
              <li>
                <a href="#" className="text-[#94a3b8] hover:text-[#4191dc] transition-colors">
                  Programs
                </a>
              </li>
              <li>
                <a href="#" className="text-[#94a3b8] hover:text-[#4191dc] transition-colors">
                  Jobs Board
                </a>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-semibold text-white mb-4 text-sm tracking-wider uppercase">
              Resources
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="text-[#94a3b8] hover:text-[#4191dc] transition-colors">
                  Sponsorship
                </a>
              </li>
              <li>
                <a href="#" className="text-[#94a3b8] hover:text-[#4191dc] transition-colors">
                  Join the Team
                </a>
              </li>
              <li>
                <a href="#" className="text-[#94a3b8] hover:text-[#4191dc] transition-colors">
                  Constitution
                </a>
              </li>
              <li>
                <a href="#contact" className="text-[#94a3b8] hover:text-[#4191dc] transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-[rgba(65,145,220,0.15)] flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-[#94a3b8] font-mono">
            © {currentYear} UNSW Engineering Society.
          </p>
          <p className="text-xs text-[#94a3b8] font-mono">
            Made with ♡ by EngSoc IT
          </p>
        </div>
      </div>
    </footer>
  );
}
