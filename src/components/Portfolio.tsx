"use client";
import { useState } from "react";

export default function Portfolio() {
  const [filter, setFilter] = useState('All');

  // Dummy data - make sure your image links work!
  const items = [
    { id: 1, type: 'Videos', title: 'Residential Setup - Balotra', category: 'Video Case Study', src: '' },
    { id: 2, type: 'Photos', title: 'Commercial Array - Pali', category: 'Project Photo', src: 'https://images.unsplash.com/photo-1509391366360-1e97f52ce074?w=500&q=80' },
  ];

  return (
    <section className="bg-white py-16 md:py-24 px-4 w-full overflow-hidden">
      <div className="max-w-7xl mx-auto">
        
        {/* FIX 1: Padding top badhai taaki text na kate */}
        <div className="text-center mb-10 md:mb-16 pt-4">
          <h2 className="text-5xl md:text-7xl font-black text-gray-950 tracking-tighter mb-4 leading-tight">
            Installation <br className="md:hidden" /> Gallery
          </h2>
          <p className="text-base md:text-xl text-gray-500 max-w-2xl mx-auto font-medium px-2">
            A visual showcase of our premier solar projects across Rajasthan. Quality that speaks for itself.
          </p>
        </div>

        {/* FIX 2: flex-wrap lagaya taaki buttons phone pe niche aa jayein agar jagah na ho */}
        <div className="flex flex-wrap justify-center gap-3 mb-12 px-2">
          {['All', 'Videos', 'Photos'].map((btn) => (
            <button 
              key={btn}
              onClick={() => setFilter(btn)}
              className={`px-8 py-3.5 rounded-full font-bold text-sm md:text-base transition-all ${
                filter === btn ? 'bg-green-600 text-white shadow-lg' : 'bg-gray-950 text-white hover:bg-gray-800'
              }`}
            >
              {btn}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item) => (
             <div key={item.id} className="bg-gray-100 rounded-[2rem] h-64 md:h-80 relative overflow-hidden flex items-end p-6">
                {/* Agar image nahi hai toh ye gray box dikhega */}
                {item.src && <img src={item.src} alt={item.title} className="absolute inset-0 w-full h-full object-cover" />}
                <div className="absolute inset-0 bg-gradient-to-t from-gray-950/90 to-transparent"></div>
                <div className="relative z-10 text-white">
                    <h3 className="font-bold text-lg md:text-xl">{item.title}</h3>
                    <p className="text-gray-300 text-sm">{item.category}</p>
                </div>
             </div>
          ))}
        </div>

      </div>
    </section>
  );
}