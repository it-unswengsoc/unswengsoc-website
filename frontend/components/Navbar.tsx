export default function Navbar() {
  return (
    <nav className="relative z-30 border-b-2 border-dashed border-white p-6">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="border-2 border-dashed border-white px-6 py-3">
          <h1 className="text-sm tracking-widest uppercase">Engineering Society</h1>
        </div>
        <div className="flex gap-8 text-sm tracking-widest uppercase">
          <a href="#blueprint" className="hover:text-gray-300 transition-colors">Blueprint</a>
          <a href="#contact" className="hover:text-gray-300 transition-colors">Contact</a>
          <a href="#join" className="hover:text-gray-300 transition-colors">Join Us</a>
        </div>
      </div>
    </nav>
  );
}
