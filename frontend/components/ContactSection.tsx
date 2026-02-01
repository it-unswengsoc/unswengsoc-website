'use client';

import { Mail, MapPin, Instagram, Linkedin, Facebook } from 'lucide-react';

export default function ContactSection() {
  return (
    <section id="contact" className="relative z-10 py-20 px-8">
      <div id="contact-inner" className="max-w-4xl mx-auto">
        <h2 className="font-sans font-bold text-4xl md:text-5xl text-white mb-2 tracking-tight">
          Contact Us
        </h2>
        <p className="font-mono text-[#94a3b8] text-sm mb-12">
          [ Get in touch with the team ]
        </p>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Contact Info */}
          <div className="space-y-6">
            <div className="border border-[rgba(65,145,220,0.15)] p-6 bg-[rgba(65,145,220,0.03)]">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-10 h-10 border border-[rgba(65,145,220,0.3)] flex items-center justify-center">
                  <Mail className="w-5 h-5 text-[#4191dc]" />
                </div>
                <div>
                  <h3 className="font-semibold text-white">Email</h3>
                  <p className="text-sm text-[#94a3b8]">General enquiries</p>
                </div>
              </div>
              <a
                href="mailto:contact@engsoc.unsw.edu.au"
                className="text-[#4191dc] hover:text-white transition-colors font-mono text-sm"
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
                  <h3 className="font-semibold text-white">Location</h3>
                  <p className="text-sm text-[#94a3b8]">Find us on campus</p>
                </div>
              </div>
              <p className="text-[#94a3b8] font-mono text-sm">
                UNSW Kensington Campus<br />
                Sydney, NSW 2052
              </p>
            </div>
          </div>

          {/* Social Links */}
          <div className="border border-[rgba(65,145,220,0.15)] p-6 bg-[rgba(65,145,220,0.03)]">
            <h3 className="font-semibold text-white mb-6">Follow Us</h3>
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
