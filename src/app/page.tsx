"use client";

import { useState, useEffect } from "react";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import ContactForm from "@/components/ContactForm";
import SavingsCalculator from "@/components/SavingsCalculator";
import ServiceForm from "@/components/ServiceForm";
import Portfolio from "@/components/Portfolio";
import FAQ from "@/components/FAQ";

export default function Home() {
  const [showContactModal, setShowContactModal] = useState(false);
  const [showServiceModal, setShowServiceModal] = useState(false);
  const [products, setProducts] = useState<any[]>([]);
  const [gallery, setGallery] = useState<any[]>([]);

  useEffect(() => {
    fetch("/api/products")
      .then((res) => {
        const contentType = res.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
          throw new TypeError("Oops, API ne JSON ki jagah HTML bhej diya!");
        }
        return res.json();
      })
      .then((data) => {
        if (Array.isArray(data)) setProducts(data);
      })
      .catch((err) => console.log("Products ka data nahi mila: ", err));

    fetch("/api/gallery")
      .then((res) => {
        const contentType = res.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
          throw new TypeError("Oops, Gallery API ne JSON nahi bheja!");
        }
        return res.json();
      })
      .then((data) => {
        if (Array.isArray(data)) setGallery(data);
      })
      .catch((err) => console.log("Gallery ka data nahi mila: ", err));
  }, []);

  const handleBookClick = () => setShowContactModal(true);

  return (
    <main className="relative w-full overflow-x-hidden bg-white text-gray-900 pb-20">
      
      {/* 1. Hero */}
      <Hero onBookClick={handleBookClick} />

      {/* 2. Estimated Price */}
      <Services onContactClick={handleBookClick} />

      {/* 3. Our Recent Works */}
      <div className="w-full max-w-6xl mx-auto border-t-2 border-gray-100 my-8"></div>
      <Portfolio />

      {/* ✨ LIVE GALLERY SECTION ✨ */}
      <div id="portfolio" className="w-full max-w-6xl mx-auto py-12 px-4">
        <h2 className="text-4xl font-bold text-center mb-10 text-green-800">Our Live Installations</h2>
        {gallery.length === 0 ? (
           <p className="text-center text-gray-500">Loading live gallery...</p>
        ) : (
           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
             {gallery.map((img: any) => (
               <div key={img.id} className="relative aspect-video rounded-xl overflow-hidden shadow-lg border-2 border-gray-100 group">
                 {/* eslint-disable-next-line @next/next/no-img-element */}
                 <img src={img.url} alt={img.name} className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500" />
               </div>
             ))}
           </div>
        )}
      </div>

      {/* 4. Our Live Products */}
      <div className="w-full max-w-6xl mx-auto py-12 px-4 border-t-2 border-gray-100 mt-8">
        <h2 className="text-4xl font-bold text-center mb-10 text-green-800">Our Live Solar Solutions</h2>
        {products.length === 0 ? (
           <p className="text-center text-gray-500">Loading live products...</p>
        ) : (
           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
             {products.map((p: any) => (
               <div key={p.id} className="border-2 border-gray-100 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all">
                 <div className="h-48 bg-green-50 rounded-xl mb-6 flex items-center justify-center">
                   <span className="text-green-800 font-bold">Photo aayegi</span>
                 </div>
                 <h3 className="text-2xl font-bold mb-2">{p.name}</h3>
                 <p className="text-green-600 font-extrabold text-3xl mb-4">₹{p.price}</p>
                 <div className="space-y-2 mb-6 flex-grow">
                   <p className="text-sm font-medium">⚡ Capacity: {p.capacity}</p>
                   <p className="text-sm font-medium">🏠 Optimal For: {p.optimalFor}</p>
                 </div>
                 <button onClick={handleBookClick} className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-xl transition-all">
                   Book Now
                 </button>
               </div>
             ))}
           </div>
        )}
      </div>

      {/* 5. Solar Savings Calculator */}
      <div className="w-full max-w-6xl mx-auto border-t-2 border-gray-100 my-8"></div>
      <SavingsCalculator />

      {/* 6. Action Buttons */}
      <div className="w-full max-w-lg mx-auto py-16 flex flex-col gap-6 px-4">
        <button
          onClick={() => setShowContactModal(true)}
          suppressHydrationWarning={true}
          className="relative w-full px-8 py-5 font-extrabold text-xl rounded-full bg-green-600 text-white transition-all duration-300 ease-out transform hover:scale-105 active:scale-95 shadow-xl hover:shadow-2xl hover:bg-green-500 active:shadow-md focus:outline-none focus:ring-4 focus:ring-green-500/50"
        >
          🚀 Book Solar Installation
        </button>

        <button
          onClick={() => setShowServiceModal(true)}
          suppressHydrationWarning={true}
          className="relative w-full px-8 py-5 font-extrabold text-xl rounded-full bg-gray-950 text-white transition-all duration-300 ease-out transform hover:scale-105 active:scale-95 shadow-xl hover:shadow-2xl hover:bg-gray-800 active:shadow-md focus:outline-none focus:ring-4 focus:ring-gray-900/50"
        >
          🛠️ Request Maintenance
        </button>
      </div>

      {/* 7. FAQ */}
      <div className="w-full max-w-6xl mx-auto border-t-2 border-gray-100 my-8"></div>
      <FAQ />

      {/* POPUPS */}
      {showContactModal && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto relative shadow-2xl">
            <button onClick={() => setShowContactModal(false)} className="absolute top-4 right-6 text-4xl text-gray-500 hover:text-black">&times;</button>
            <div className="p-8 pt-12">
              <ContactForm />
            </div>
          </div>
        </div>
      )}

      {showServiceModal && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto relative shadow-2xl">
            <button onClick={() => setShowServiceModal(false)} className="absolute top-4 right-6 text-4xl text-gray-500 hover:text-black">&times;</button>
            <div className="p-8 pt-12">
              <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Need Maintenance?</h2>
              <ServiceForm />
              <div className="mt-6 text-center p-4 bg-green-50 rounded-xl border border-green-200">
                <p className="text-green-800 font-bold">Form bharne ke baad upar 'X' daba ke band karein.</p>
              </div>
            </div>
          </div>
        </div>
      )}

    </main>
  );
}// Vercel please kaam kar ja bhai