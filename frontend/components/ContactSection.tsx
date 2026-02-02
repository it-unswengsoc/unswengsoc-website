'use client';

import { Mail, MapPin, Instagram, Linkedin, Facebook } from 'lucide-react';

export default function ContactSection() {
  return (
    <section id="contact" className="relative z-10 py-12 md:py-20 px-4 md:px-8">
      <div id="contact-inner" className="max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl lg:text-5xl text-white mb-2 tracking-tight font-bold">
          Contact Us
        </h2>
        <p className="text-[#94a3b8] text-xs md:text-sm mb-8 md:mb-12 font-light">
          [ Get in touch with the team ]
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {/* Contact Info */}
          <div className="space-y-6">
            <div className="border border-[rgba(65,145,220,0.15)] p-6 bg-[rgba(65,145,220,0.03)]">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-10 h-10 border border-[rgba(65,145,220,0.3)] flex items-center justify-center">
                  <Mail className="w-5 h-5 text-[#4191dc]" />
                </div>
                <div>
                  <h3 className="text-white font-medium">Email</h3>
                  <p className="text-sm text-[#94a3b8] font-light">General enquiries</p>
                </div>
              </div>
              <a
                href="mailto:contact@engsoc.unsw.edu.au"
                className="text-[#4191dc] hover:text-white transition-colors text-sm font-light"
              >
                contact@engsoc.unsw.edu.au
              </a>
            </div>

            <div className="border border-[rgba(65,145,220,0.15)] p-6 bg-[rgba(65,145,220,0.03)]">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-10 h-10 border border-[rgba(65,145,220,0.3)] flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-[#4191dc]" />
                </div>
                <div>
                  <h3 className="text-white font-medium">Location</h3>
                  <p className="text-sm text-[#94a3b8] font-light">Find us on campus</p>
                </div>
              </div>
              <p className="text-[#94a3b8] text-sm font-light">
                UNSW Kensington Campus<br />
                Sydney, NSW 2052
              </p>
            </div>
          </div>

          {/* Social Links */}
          <div className="border border-[rgba(65,145,220,0.15)] p-6 bg-[rgba(65,145,220,0.03)]">
            <h3 className="text-white mb-6 font-medium">Follow Us</h3>
            <div className="space-y-4">
              <a
                href="https://instagram.com/unswengsoc"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-3 border border-[rgba(65,145,220,0.15)] hover:border-[#4191dc] hover:bg-[rgba(65,145,220,0.08)] transition-all"
              >
                <Instagram className="w-5 h-5 text-[#4191dc]" />
                <span className="text-white">@unswengsoc</span>
              </a>
              <a
                href="https://linkedin.com/company/unswengsoc"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-3 border border-[rgba(65,145,220,0.15)] hover:border-[#4191dc] hover:bg-[rgba(65,145,220,0.08)] transition-all"
              >
                <Linkedin className="w-5 h-5 text-[#4191dc]" />
                <span className="text-white">UNSW Engineering Society</span>
              </a>
              <a
                href="https://facebook.com/unswengsoc"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-3 border border-[rgba(65,145,220,0.15)] hover:border-[#4191dc] hover:bg-[rgba(65,145,220,0.08)] transition-all"
              >
                <Facebook className="w-5 h-5 text-[#4191dc]" />
                <span className="text-white">UNSW EngSoc</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
