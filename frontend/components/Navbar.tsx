import Image from 'next/image';

export default function Navbar() {
  return (
    <nav className="relative z-30 border-b border-[rgba(65,145,220,0.15)] bg-[rgba(65,145,220,0.03)] p-6">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
          {/* <Image
            src="/icon.png"
            alt="EngSoc Logo"
            width={40}
            height={40}
            className="object-contain"
          /> */}
          {/* <h1 className="font-bold tracking-widest text-xl md:text-2xl text-white">UNSW Engineering Society</h1> */}
        </div>
        <div className="flex gap-8 text-sm tracking-widest uppercase">
          <a href="#blueprint" className="hover:text-gray-300 transition-colors">[ Blueprint ]</a>
          <a href="#contact" className="hover:text-gray-300 transition-colors">[ Contact ]</a>
        </div>
      </div>
    </nav>
  );
}
