"use client";
import { useState, useEffect } from "react";
import { X, PlayCircle } from "lucide-react";

export default function Portfolio() {
  const [filter, setFilter] = useState('All');
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedMedia, setSelectedMedia] = useState<any>(null);

  // Database se Live photos lana
  useEffect(() => {
    fetch("/api/portfolio")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setItems(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching live portfolio:", err);
        setLoading(false);
      });
  }, []);

  const filteredItems = filter === 'All' 
    ? items 
    : items.filter(item => item.type === filter);

  return (
    <section className="bg-white py-16 md:py-24 px-4 w-full overflow-hidden font-sans">
      <div className="max-w-7xl mx-auto">
        
        <div className="text-center mb-10 md:mb-16 pt-4">
          <h2 className="text-5xl md:text-7xl font-black text-gray-950 tracking-tighter mb-4 leading-tight">
            Installation <br className="md:hidden" /> Gallery
          </h2>
          <p className="text-base md:text-xl text-gray-500 max-w-2xl mx-auto font-medium px-2">
            A visual showcase of our premier solar projects across Rajasthan. Quality that speaks for itself.
          </p>
        </div>

        {/* ✨ ANIMATED FILTER BUTTONS ✨ */}
        <div className="flex flex-wrap justify-center gap-3 mb-12 px-2">
          {['All', 'Videos', 'Photos'].map((btn) => (
            <button 
              key={btn}
              onClick={() => setFilter(btn)}
              /* ✨ FIX: Animation classes added for hover and tap effects */
              className={`px-8 py-3.5 rounded-full font-bold text-sm md:text-base transition-all duration-300 ease-out transform
                ${filter === btn 
                  ? 'bg-green-600 text-white shadow-lg scale-100' // Active state
                  : 'bg-gray-950 text-white hover:bg-gray-800' // Inactive state
                }
                hover:scale-105 active:scale-95 /* ✨ Hover badhega, Click pe dabega */
                hover:shadow-xl active:shadow-md /* ✨ Hover pe shadow badhegi, Click pe kam hogi */
                focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 /* ✨ Accessibility for keyboard users */
              `}
            >
              {btn}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="w-full text-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
            <p className="text-gray-500 font-bold">Loading live projects...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item) => (
              <div 
                key={item.id} 
                onClick={() => setSelectedMedia(item)}
                className="bg-gray-100 rounded-[2rem] h-64 md:h-80 relative overflow-hidden flex items-end p-6 shadow-md hover:shadow-2xl transition-all group cursor-pointer"
              >
                  {item.coverImage && (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img src={item.coverImage} alt={item.title} className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  )}
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-950/90 via-gray-900/40 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  <div className="relative z-10 text-white w-full transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                      <div className="flex justify-between items-end">
                        <div>
                          <h3 className="font-bold text-lg md:text-xl line-clamp-1">{item.title}</h3>
                          <p className="text-gray-300 text-sm mt-1">{item.category}</p>
                        </div>
                        {item.type === "Videos" && (
                          <div className="bg-green-600 text-white p-2 rounded-full shadow-lg">
                            <PlayCircle className="w-5 h-5" />
                          </div>
                        )}
                      </div>
                  </div>
              </div>
            ))}

            {filteredItems.length === 0 && (
              <div className="col-span-full text-center py-10 border-2 border-dashed border-gray-200 rounded-3xl">
                <p className="text-gray-500 font-bold text-lg">Coming Soon!</p>
                <p className="text-gray-400 text-sm mt-1">We are updating our live projects here.</p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* FULL SCREEN MODAL (LIGHTBOX) - Unchanged */}
      {selectedMedia && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-sm p-4 md:p-10 transition-all"
          onClick={() => setSelectedMedia(null)}
        >
          <button 
            className="absolute top-4 right-4 md:top-8 md:right-8 text-white/50 hover:text-white transition-colors z-[101] bg-black/50 p-2 rounded-full"
            onClick={() => setSelectedMedia(null)}
          >
            <X className="w-8 h-8 md:w-10 md:h-10" />
          </button>

          <div 
            className="relative max-w-5xl w-full max-h-[85vh] flex flex-col items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
              src={selectedMedia.coverImage} 
              alt={selectedMedia.title} 
              className="max-w-full max-h-[75vh] object-contain rounded-xl shadow-2xl" 
            />
            
            <div className="text-center mt-6">
              <h3 className="text-2xl md:text-3xl font-bold text-white tracking-tight">{selectedMedia.title}</h3>
              <p className="text-green-400 font-medium mt-2">{selectedMedia.category}</p>
            </div>
          </div>
        </div>
      )}

    </section>
  );
}