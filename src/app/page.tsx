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
  // Popups (Modals) ko control karne wale switches
  const [showContactModal, setShowContactModal] = useState(false);
  const [showServiceModal, setShowServiceModal] = useState(false);

  // Products State
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setProducts(data);
      })
      .catch((err) => console.error("Kalesh:", err));
  }, []);

  // Jab koi "Book Now" dabaye, toh Contact Popup kholo
  const handleBookClick = () => setShowContactModal(true);

  return (
    <main className="relative bg-white text-gray-900 pb-20">
      
      {/* 1. Hero */}
      <Hero onBookClick={handleBookClick} />

      {/* 2. Estimated Price */}
      <Services onContactClick={handleBookClick} />

      {/* 3. Our Recent Works */}
      <div className="w-full max-w-6xl mx-auto border-t-2 border-gray-100 my-8"></div>
      <Portfolio />

      {/* 4. Our Live Products */}
      <div className="w-full max-w-6xl mx-auto py-12 px-4 border-t-2 border-gray-100 mt-8">
        <h2 className="text-4xl font-bold text-center mb-10 text-green-800">Our Live Solar Solutions</h2>
        {products.length === 0 ? (
          <p className="text-center text-gray-500">Loading live products...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {products.map((p: any) => (
              <div key={p.id} className="border-2 border-gray-100 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all flex flex-col">
                <div className="h-48 bg-green-50 rounded-xl mb-6 flex items-center justify-center border border-green-100">
                  <span className="text-green-800 font-bold">Photo aayegi</span>
                </div>
                <h3 className="text-2xl font-bold mb-2">{p.name}</h3>
                <p className="text-green-600 font-extrabold text-3xl mb-4">₹{p.price}</p>
                <div className="space-y-2 mb-6 flex-grow">
                  <p className="text-sm font-medium">⚡ Capacity: {p.capacity}</p>
                  <p className="text-sm font-medium">🏠 Optimal For: {p.optimalFor}</p>
                </div>
                <button onClick={handleBookClick} className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-bold transition-colors mt-auto">
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

    {/* 6. Action Buttons (Popup kholne ke liye) */}
      <div className="w-full max-w-lg mx-auto py-16 flex flex-col gap-6 px-4">
         <button 
            onClick={() => setShowContactModal(true)} 
            className="relative w-full px-8 py-5 font-extrabold text-xl rounded-full transition-all duration-300 ease-out transform hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(37,99,235,0.4)] active:translate-y-0 active:shadow-lg overflow-hidden group bg-blue-600 text-white shadow-[0_10px_20px_rgba(37,99,235,0.3)] border border-blue-500"
         >
            <span className="absolute inset-0 w-full h-full transition-all duration-300 scale-0 group-hover:scale-100 group-hover:bg-white/10 rounded-full"></span>
            🚀 Book Solar Installation
         </button>
         
         <button 
            onClick={() => setShowServiceModal(true)} 
            className="relative w-full px-8 py-5 font-extrabold text-xl rounded-full transition-all duration-300 ease-out transform hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(0,0,0,0.4)] active:translate-y-0 active:shadow-lg overflow-hidden group bg-gray-900 text-white shadow-[0_10px_20px_rgba(0,0,0,0.3)] border border-gray-700"
         >
            <span className="absolute inset-0 w-full h-full transition-all duration-300 scale-0 group-hover:scale-100 group-hover:bg-white/10 rounded-full"></span>
            🔧 Request Maintenance
         </button>
      </div>

      {/* 7. FAQ */}
      <div className="w-full max-w-6xl mx-auto border-t-2 border-gray-100 my-8"></div>
      <FAQ />

      {/* ========================================= */}
      {/* HIDDEN POPUPS (Sirf button dabane pe dikhenge) */}
      {/* ========================================= */}

      {/* Contact Form Popup */}
      {showContactModal && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto relative shadow-2xl">
            <button onClick={() => setShowContactModal(false)} className="absolute top-4 right-6 text-4xl font-bold text-red-500 hover:text-red-700 z-10">&times;</button>
            <div className="p-8 pt-12">
              <ContactForm />
            </div>
          </div>
        </div>
      )}

      {/* Maintenance Form Popup */}
      {showServiceModal && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto relative shadow-2xl">
            <button onClick={() => setShowServiceModal(false)} className="absolute top-4 right-6 text-4xl font-bold text-red-500 hover:text-red-700 z-10">&times;</button>
            <div className="p-8 pt-12">
              <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Need Maintenance?</h2>
              <ServiceForm />
              <div className="mt-6 text-center p-4 bg-green-50 rounded-xl border border-green-200">
                 <p className="text-green-800 font-bold">Form bharne ke baad upar 'X' daba ke band kar dena. Thank you! 🙏</p>
              </div>
            </div>
          </div>
        </div>
      )}

    </main>
  );
}