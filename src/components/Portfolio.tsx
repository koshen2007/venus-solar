export default function Portfolio() {
  const videos = [
    { label: "Residential Installation — Jaipur" },
    { label: "Commercial Rooftop — 10kW System" },
    { label: "Village Solar Project, 2024" },
  ];

  const photos = [
    { src: "/portfolio/photo1.jpg", label: "Rooftop Array — Pali, Rajasthan", real: true },
    { src: "/portfolio/photo2.jpg", label: "Inverter & DC Panel Setup", real: true },
    { src: null, label: "More Photos Coming Soon", real: false },
    { src: null, label: "More Photos Coming Soon", real: false },
  ];

  return (
    <section className="py-16 w-full">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-black text-eco-green mb-3 tracking-tight">
          Our Recent Works
        </h2>
        <p className="text-gray-500 max-w-xl mx-auto">
          Real installations. Real results. Delivered across Rajasthan with pride.
        </p>
      </div>

      {/* Videos */}
      <div className="mb-10">
        <h3 className="text-lg font-black text-gray-700 mb-4 uppercase tracking-widest text-center">
          Installation Videos
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {videos.map((v, idx) => (
            <div
              key={idx}
              className="group relative rounded-2xl overflow-hidden bg-gray-900 aspect-video flex items-center justify-center border-2 border-dashed border-gray-700 cursor-pointer hover:border-eco-yellow transition-colors"
            >
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-white p-4">
                <div className="w-14 h-14 bg-eco-yellow rounded-full flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg">
                  <svg className="w-6 h-6 text-eco-green ml-1" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
                <p className="text-sm font-bold text-white/80 text-center">{v.label}</p>
                <span className="text-xs text-white/40 italic">Video will be uploaded soon</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Photos */}
      <div>
        <h3 className="text-lg font-black text-gray-700 mb-4 uppercase tracking-widest text-center">
          Photo Gallery
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {photos.map((p, idx) =>
            p.real && p.src ? (
              <div key={idx} className="group relative rounded-2xl overflow-hidden aspect-square shadow-sm hover:shadow-md transition-all">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={p.src}
                  alt={p.label}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent px-3 py-3">
                  <p className="text-white text-xs font-bold leading-tight">{p.label}</p>
                </div>
              </div>
            ) : (
              <div
                key={idx}
                className="group relative rounded-2xl overflow-hidden bg-gradient-to-br from-green-50 to-green-100 aspect-square flex items-center justify-center border-2 border-dashed border-green-200 hover:border-eco-green transition-all"
              >
                <div className="flex flex-col items-center gap-2 text-eco-green p-4 text-center">
                  <svg className="w-10 h-10 opacity-40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                  </svg>
                  <span className="text-[11px] text-gray-400 font-medium">{p.label}</span>
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </section>
  );
}

