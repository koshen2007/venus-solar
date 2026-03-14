export default function Header() {
  return (
    <header className="w-full py-3 px-6 md:px-10 flex justify-between items-center sticky top-0 z-50"
      style={{ backgroundColor: '#0a1628' }}>
      <div className="flex items-center">
        {/* Venus Solar Energy Logo — circular crop */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/logo.png"
          alt="Venus Solar Energy"
          className="h-12 w-12 rounded-full border-2 border-white object-cover shadow-sm"
        />
      </div>
      <div className="flex items-center gap-4">
        <a
          href="tel:+919024424633"
          className="flex items-center gap-2 text-white font-bold hover:text-yellow-400 transition-colors text-sm md:text-base"
        >
          <svg className="w-4 h-4 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
          </svg>
          <span className="hidden sm:inline">+91 9024424633</span>
        </a>
      </div>
    </header>
  );
}
