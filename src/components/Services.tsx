"use client";
import { useState } from "react";
import { CheckCircle2, Zap, ArrowRight, ShieldCheck, Settings2 } from "lucide-react";

export default function Services({ onContactClick }: { onContactClick?: () => void }) {
  const [activeTab, setActiveTab] = useState(1);
  const [customKw, setCustomKw] = useState(10);

  const tiers = [
    { id: 0, name: "Starter Kit", kw: "1 kW", price: "75,000", desc: "Basic loads. Fans, lights, and a TV.", features: ["3-4 Premium Panels", "1.5 kVA Inverter", "150 Ah Battery"], optimalFor: "Small Homes (1-2 BHK)" },
    { id: 1, name: "Family Pack", kw: "3 kW", price: "2,10,000", desc: "Handles a 1.5 Ton AC with other appliances.", features: ["8-10 panels", "3 kVA MPPT Inverter", "2x 150 Ah Batteries"], optimalFor: "Medium Homes (3-4 BHK)" },
    { id: 2, name: "Business Pro", kw: "5 kW", price: "3,30,000", desc: "Heavy commercial loads. Zero grid dependency.", features: ["14-16 panels", "5 kVA Inverter", "4x Battery Bank"], optimalFor: "Large Homes / Showrooms" },
    { id: 3, name: "Custom Power", kw: "Max", isCustom: true, optimalFor: "Factories & Large Estates" }
  ];

  const activeData = tiers[activeTab];
  const customPrice = (customKw * 65000).toLocaleString('en-IN');

  return (
    <section className="bg-white py-12 md:py-24 px-4 md:px-12 border-t border-gray-100 overflow-hidden w-full">
      <div className="max-w-7xl mx-auto w-full">
        <h2 className="text-4xl md:text-6xl font-black text-gray-950 tracking-tighter mb-8 md:mb-16 text-center lg:text-left leading-tight">
          Choose Your Power.
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-10 items-start w-full">
          
          {/* Tabs Container - Scrollbar ko permanently gaayab kiya */}
          <div 
            className="lg:col-span-4 w-full flex lg:flex-col gap-4 overflow-x-auto pb-2 lg:pb-0 snap-x snap-mandatory px-1 pt-1"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {tiers.map((t) => (
              <button 
                key={t.id} 
                onClick={() => setActiveTab(t.id)} 
                className={`flex-shrink-0 w-[150px] lg:w-full snap-center text-left p-5 rounded-[2rem] border-2 transition-all duration-300 ${
                  activeTab === t.id 
                  ? 'border-green-500 bg-green-50 shadow-md' 
                  : 'border-gray-200 bg-white hover:border-gray-300' /* Yahan grey border diya inactive ko */
                }`}
              >
                <div className="flex justify-between items-center mb-1">
                    <span className={`block font-bold text-xl ${activeTab === t.id ? 'text-green-700' : 'text-gray-400'}`}>{t.kw}</span>
                    {activeTab === t.id && (t.isCustom ? <Settings2 className="text-green-600 w-5 h-5 animate-spin-slow" /> : <Zap className="text-green-600 w-5 h-5 animate-pulse" />)}
                </div>
                <span className={`block font-extrabold text-sm ${activeTab === t.id ? 'text-gray-900' : 'text-gray-500'}`}>{t.name}</span>
              </button>
            ))}
          </div>

          {/* Black Card Container */}
          <div className="lg:col-span-8 w-full bg-gray-950 rounded-[2.5rem] p-6 md:p-12 text-white relative overflow-hidden min-h-[450px]">
            <div className="relative z-10 w-full">
              <div className="flex items-center gap-2 text-green-400 font-bold tracking-widest uppercase text-[10px] md:text-sm mb-6">
                <ShieldCheck className="w-4 h-4 flex-shrink-0" /> Optimal for {activeData.optimalFor}
              </div>
              
              {activeData.isCustom ? (
                <div className="mb-8 w-full">
                  <div className="flex items-center gap-4 mb-6">
                    <input type="range" min="6" max="50" step="1" value={customKw} onChange={(e) => setCustomKw(parseInt(e.target.value))} className="w-full h-2 bg-gray-700 rounded-lg accent-green-500" />
                    <span className="text-2xl font-black text-green-400 w-20">{customKw}kW</span>
                  </div>
                  <span className="text-5xl md:text-7xl font-black tracking-tighter truncate block w-full">₹{customPrice}</span>
                </div>
              ) : (
                <div className="mb-8 w-full">
                  <span className="text-5xl md:text-7xl font-black tracking-tighter truncate block w-full">₹{activeData.price}</span>
                  <p className="text-sm md:text-lg text-gray-400 mt-4 leading-relaxed">{activeData.desc}</p>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
                {(activeData.features || ["High-Efficiency Setup", "Inverter Included", "Premium Installation"]).map(f => (
                  <div key={f} className="flex items-center gap-3 text-gray-200 text-sm font-medium">
                    <CheckCircle2 className="w-4 h-4 text-green-400 flex-shrink-0" /> {f}
                  </div>
                ))}
              </div>

              <button onClick={onContactClick} className="w-full md:w-auto px-8 py-4 bg-green-600 text-white rounded-full font-bold hover:bg-green-500 transition-all flex items-center justify-center gap-2">
                Deploy System Now <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Brave browser ke scrollbar ka permanent ilaaj */}
      <style dangerouslySetInnerHTML={{__html: `
        ::-webkit-scrollbar { display: none; }
      `}} />
    </section>
  );
}