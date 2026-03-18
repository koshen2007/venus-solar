import { Phone } from "lucide-react";
import Link from "next/link";

export default function Header() {
  return (
    // 'fixed' ki jagah 'sticky' kar diya hai, ab raita nahi phailega!
    <header className="sticky top-0 w-full z-50 bg-gray-950/80 backdrop-blur-md border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 md:px-6 h-16 md:h-20 flex items-center justify-between">
        
        {/* Logo - Phone pe thoda chota dikhega */}
        <Link href="/" className="text-xl md:text-2xl font-black text-white tracking-tighter">
          VENUS<span className="text-green-500">SOLAR</span>
        </Link>
        
        {/* Call Button - Phone pe sirf 'Call' likha aayega ya icon dikhega taaki jagah bache */}
        <a href="tel:+919024424633" className="flex items-center gap-2 bg-green-600 text-white px-3 py-2 md:px-4 md:py-2 rounded-lg md:rounded-xl text-sm md:text-base font-bold hover:bg-green-500 transition-colors shadow-lg hover:-translate-y-1">
          <Phone className="w-4 h-4" /> 
          <span className="hidden sm:inline">+91 9024424633</span>
          <span className="sm:hidden">Call Now</span>
        </a>

      </div>
    </header>
  );
}