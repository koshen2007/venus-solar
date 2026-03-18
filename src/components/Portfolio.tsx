"use client";

import { useState } from "react";

// Professional Buttons Component
interface ArtButtonProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'primary' | 'secondary';
  onClick?: () => void;
}

const ArtButton: React.FC<ArtButtonProps> = ({ children, className = "", variant = 'primary', onClick }) => {
  const baseClass = "relative px-8 py-4 font-bold text-lg rounded-full transition-all duration-300 ease-out transform hover:-translate-y-1 hover:shadow-2xl active:translate-y-0 active:shadow-lg overflow-hidden group";
  
  const primaryClass = "bg-green-600 text-white hover:bg-green-700 shadow-[0_10px_20px_rgba(22,163,74,0.3)]";
  const secondaryClass = "bg-gray-900 text-white hover:bg-black shadow-[0_10px_20px_rgba(0,0,0,0.2)]";

  return (
    <button onClick={onClick} className={`${baseClass} ${variant === 'primary' ? primaryClass : secondaryClass} ${className}`}>
      {/* Glow Effect */}
      <span className="absolute inset-0 w-full h-full transition-all duration-300 scale-0 group-hover:scale-100 group-hover:bg-white/10 rounded-full"></span>
      {children}
    </button>
  );
};

export default function Portfolio() {
  const projects = [
    { id: 1, type: "video", title: "Residential Setup — Balotra", src: "https://www.w3schools.com/html/mov_bbb.mp4", thumbnail: "/projects/res-balotra.jpg" },
    { id: 2, type: "image", title: "Commercial Array — Pali", src: "/projects/comm-pali.jpg" },
    { id: 3, type: "video", title: "Industrial Plant — Barmer", src: "https://www.w3schools.com/html/movie.mp4", thumbnail: "/projects/ind-barmer.jpg" },
  ];

  const [activeTab, setActiveTab] = useState<'all' | 'video' | 'image'>('all');

  const filteredProjects = projects.filter(p => activeTab === 'all' || p.type === activeTab);

  return (
    <section className="bg-white py-24 px-6 md:px-12 border-t-2 border-gray-100"> {/* Saans lene ki jagah */}
      <div className="max-w-7xl mx-auto">
        <h2 className="text-5xl font-extrabold text-center text-gray-950 mb-4 tracking-tight">Installation Gallery</h2>
        <p className="text-center text-gray-600 mb-12 text-lg max-w-2xl mx-auto font-medium">
          A visual showcase of our premier solar projects across Rajasthan. Quality that speaks for itself.
        </p>

        {/* Filter Buttons */}
        <div className="flex justify-center gap-6 mb-16">
          <ArtButton onClick={() => setActiveTab('all')} variant={activeTab === 'all' ? 'primary' : 'secondary'}>All</ArtButton>
          <ArtButton onClick={() => setActiveTab('video')} variant={activeTab === 'video' ? 'primary' : 'secondary'}>Videos</ArtButton>
          <ArtButton onClick={() => setActiveTab('image')} variant={activeTab === 'image' ? 'primary' : 'secondary'}>Photos</ArtButton>
        </div>

        {/* Grid Container */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {filteredProjects.map((project) => (
            <div key={project.id} className="relative group rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-300 aspect-[16/10] bg-gray-50 border border-gray-100">
              
              {project.type === "video" ? (
                // Modern Video Player
                <video 
                  controls 
                  poster={project.thumbnail} 
                  className="w-full h-full object-cover"
                >
                  <source src={project.src} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              ) : (
                // Image with Hover Effect
                <img 
                  src={project.src} 
                  alt={project.title} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                />
              )}

              {/* Gradient & Text Overlay */}
              <div className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-black/90 via-black/40 to-transparent">
                <h3 className="text-white font-bold text-xl tracking-tight">{project.title}</h3>
                <p className="text-gray-300 text-sm mt-1">{project.type === 'video' ? 'Video Case Study' : 'Project Photo'}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}