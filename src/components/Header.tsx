import { Phone } from 'lucide-react';
import Link from 'next/link';

export default function Header() {
  return (
    <header className="fixed top-0 w-full z-50 bg-gray-950/80 backdrop-blur-md border-b border-gray-800 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link href="/" className="text-2xl font-black text-white tracking-tighter">
          VENUS<span className="text-green-500">SOLAR</span>
        </Link>
        <a href="tel:+919024424633" className="hidden md:flex items-center gap-2 bg-green-600 text-white px-6 py-2.5 rounded-full font-bold hover:bg-green-500 transition-colors">
          <Phone className="w-4 h-4" /> +91 9024424633
        </a>
      </div>
    </header>
  );
}