import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-950 text-gray-400 py-16 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-10">
        <div>
          <h3 className="text-white text-2xl font-black tracking-tighter mb-4">VENUS<span className="text-green-500">SOLAR</span></h3>
          <p className="font-medium">Empowering Rajasthan with infinite clean energy.</p>
        </div>
        <div>
          <h3 className="text-white text-xl font-bold mb-4">Headquarters</h3>
          <p className="mb-2">📍 J-K Nagar, Jodhpur, Rajasthan</p>
          <p>📞 +91 9024424633</p>
        </div>
        <div>
          <h3 className="text-white text-xl font-bold mb-4">Legal</h3>
          <Link href="/privacy" className="block mb-2 hover:text-white transition-colors">Privacy Policy</Link>
          <Link href="/terms" className="block mb-2 hover:text-white transition-colors">Terms of Service</Link>
          <p className="mt-6 text-sm">© 2026 Venus Solar. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}