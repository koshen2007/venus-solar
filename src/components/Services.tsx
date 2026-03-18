"use client";
import { useState } from "react";
import { CheckCircle2, Zap, ArrowRight, ShieldCheck, Settings2 } from "lucide-react";

const ArtButton = ({ children, onClick }: { children: React.ReactNode; onClick?: () => void }) => (
  <button 
    onClick={onClick} 
    className="relative w-full md:w-auto inline-flex items-center justify-center gap-2 px-10 py-5 font-bold text-lg rounded-full transition-all duration-300 ease-out transform hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(22,163,74,0.3)] active:translate-y-0 active:shadow-lg overflow-hidden group bg-green-600 text-white"
  >
    <span className="absolute inset-0 w-full h-full transition-all duration-300 scale-0 group-hover:scale-100 group-hover:bg-white/10 rounded-full"></span>
    {children} <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
  </button>
);

export default function Services({ onContactClick }: { onContactClick?: () => void }) {
  const [activeTab, setActiveTab] = useState(1);
  const [customKw, setCustomKw] = useState(10); // Default slider value

  const tiers = [
    { id: 0, name: "Starter Kit", kw: "1 kW", price: "75,000", desc: "Perfect for basic loads. Runs fans, lights, and a TV effortlessly.", features: ["3-4 Premium Solar Panels", "1.5 kVA Smart Inverter", "150 Ah Tall Tubular Battery", "Standard Installation"], optimalFor: "Small Homes (1-2 BHK)", isCustom: false },
    { id: 1, name: "Family Pack", kw: "3 kW", price: "2,10,000", desc: "The sweet spot. Easily handles a 1.5 Ton AC along with your regular home appliances.", features: ["8-10 High-Efficiency Panels", "3 kVA MPPT Inverter", "2x 150 Ah Solar Batteries", "Complete Setup & Wiring", "5-Year Free Maintenance"], optimalFor: "Medium Homes (3-4 BHK)", isCustom: false },
    { id: 2, name: "Business Pro", kw: "5 kW", price: "3,30,000", desc: "Heavy duty performance. Run multiple ACs, heavy motors, or commercial loads with zero grid dependency.", features: ["14-16 Mono PERC Panels", "5 kVA Heavy Duty Inverter", "4x 150 Ah Battery Bank", "Premium Structure & Installation", "5-Year Warranty", "App-based Monitoring"], optimalFor: "Large Homes / Showrooms", isCustom: false },
    // NAYA: Custom Power Option
    { id: 3, name: "Custom Power", kw: "Build Your Own", isCustom: true, optimalFor: "Factories, Farms & Large Estates" }
  ];

  const activeData = tiers[activeTab];

  // Dynamic calculations for the Custom Slider
  // (Assuming roughly ₹65,000 per kW for larger systems)
  const customPrice = (customKw * 65000).toLocaleString('en-IN');
  const customPanels = `${Math.ceil(customKw * 2.5)} to ${Math.ceil(customKw * 3)} High-Efficiency Panels`;
  const customInverter = `${customKw} kVA Heavy Duty Inverter`;
  const customBattery = `${Math.max(4, Math.ceil(customKw * 0.8))}x 150 Ah Battery Bank`;

  return (
    <section className="bg-white py-24 px-6 md:px-12 border-t border-gray-100">
      <div className="max-w-6xl mx-auto">
        
        <div className="mb-16 md:mb-24">
          <h2 className="text-5xl md:text-7xl font-extrabold text-gray-950 tracking-tighter mb-6">Choose Your Power.</h2>
          <p className="text-xl text-gray-500 max-w-2xl font-medium">
  Take absolute control of your power generation. Choose your system size and unlock lifetime savings today.
</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-16 items-start">
          
          {/* Left Side: Sleek Selector */}
          <div className="w-full lg:w-1/3 flex flex-col gap-4">
            {tiers.map((tier) => (
              <button 
                key={tier.id}
                onClick={() => setActiveTab(tier.id)}
                className={`text-left p-6 rounded-3xl transition-all duration-300 border-2 ${
                  activeTab === tier.id 
                  ? 'border-green-600 bg-green-50 shadow-lg scale-105' 
                  : 'border-transparent bg-gray-50 hover:bg-gray-100 hover:scale-105'
                }`}
              >
                <div className="flex justify-between items-center mb-2">
                  <span className={`font-bold text-2xl ${activeTab === tier.id ? 'text-green-800' : 'text-gray-400'}`}>
                    {tier.kw}
                  </span>
                  {activeTab === tier.id && !tier.isCustom && <Zap className="text-green-600 w-6 h-6 animate-pulse" />}
                  {activeTab === tier.id && tier.isCustom && <Settings2 className="text-green-600 w-6 h-6 animate-spin-slow" />}
                </div>
                <h3 className={`font-extrabold text-xl ${activeTab === tier.id ? 'text-gray-900' : 'text-gray-500'}`}>{tier.name}</h3>
              </button>
            ))}
          </div>

          {/* Right Side: Display Area */}
          <div className="w-full lg:w-2/3 bg-gray-950 rounded-[3rem] p-10 md:p-16 text-white shadow-2xl relative overflow-hidden transition-all duration-500 min-h-[500px]">
            {/* Background Glow Effect */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-green-600/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>

            <div className="relative z-10 key={activeData.id} animate-fade-in-up">
                <div className="flex items-center gap-3 text-green-400 font-bold tracking-widest uppercase text-sm mb-6">
                    <ShieldCheck className="w-5 h-5" /> Optimal for {activeData.optimalFor}
                </div>
                
                {/* 🌟 CUSTOM CALCULATOR UI 🌟 */}
                {activeData.isCustom ? (
                  <div className="mb-12">
                    <p className="text-gray-300 mb-6 font-medium text-lg">Slide to select your required capacity (kW):</p>
                    
                    <div className="flex items-center gap-6 mb-8">
                      <input 
                        type="range" 
                        min="6" 
                        max="50" 
                        step="1" 
                        value={customKw} 
                        onChange={(e) => setCustomKw(parseInt(e.target.value))}
                        className="w-full h-3 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-green-500"
                      />
                      <span className="text-4xl font-black text-green-400 w-24">{customKw} kW</span>
                    </div>

                    <div className="flex items-baseline gap-2 mb-8">
                      <span className="text-5xl md:text-7xl font-black tracking-tighter">₹{customPrice}</span>
                      <span className="text-gray-500 font-medium text-lg">/est.</span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                      <div className="flex items-center gap-4 text-gray-200 font-medium">
                          <div className="bg-green-600/20 p-2 rounded-full"><CheckCircle2 className="w-5 h-5 text-green-400" /></div>
                          {customPanels}
                      </div>
                      <div className="flex items-center gap-4 text-gray-200 font-medium">
                          <div className="bg-green-600/20 p-2 rounded-full"><CheckCircle2 className="w-5 h-5 text-green-400" /></div>
                          {customInverter}
                      </div>
                      <div className="flex items-center gap-4 text-gray-200 font-medium">
                          <div className="bg-green-600/20 p-2 rounded-full"><CheckCircle2 className="w-5 h-5 text-green-400" /></div>
                          {customBattery}
                      </div>
                      <div className="flex items-center gap-4 text-gray-200 font-medium">
                          <div className="bg-green-600/20 p-2 rounded-full"><CheckCircle2 className="w-5 h-5 text-green-400" /></div>
                          Industrial Grade Installation
                      </div>
                    </div>
                  </div>
                ) : (
                  // 🌟 STANDARD UI (For 1kW, 3kW, 5kW) 🌟
                  <>
                    <div className="flex items-baseline gap-2 mb-6">
                        <span className="text-6xl md:text-8xl font-black tracking-tighter">₹{activeData.price}</span>
                    </div>
                    
                    <p className="text-xl text-gray-400 mb-12 max-w-lg leading-relaxed">{activeData.desc}</p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                        {activeData.features?.map(f => (
                            <div key={f} className="flex items-center gap-4 text-gray-200 font-medium">
                                <div className="bg-green-600/20 p-2 rounded-full"><CheckCircle2 className="w-5 h-5 text-green-400" /></div>
                                {f}
                            </div>
                        ))}
                    </div>
                  </>
                )}

                {/* Buttons & Subtle Disclaimer */}
                <div>
                  <ArtButton onClick={onContactClick}>
                    {activeData.isCustom ? "Request Custom Quote" : "Deploy This System"}
                  </ArtButton>
                  
                  {/* Ye rahi teri 'subtle' wali line, sirf custom tab mein aayegi */}
                  {activeData.isCustom && (
                    <p className="text-sm text-gray-500 italic mt-4 max-w-md">
                      *Displayed value is an estimated calculation. For a solid, exact quote tailored to your site, please submit a request.
                    </p>
                  )}
                </div>

            </div>
          </div>

        </div>
      </div>
      
      <style jsx>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up { animation: fadeInUp 0.4s ease-out forwards; }
        
        .animate-spin-slow {
          animation: spin 4s linear infinite;
        }
      `}</style>
    </section>
  );
}