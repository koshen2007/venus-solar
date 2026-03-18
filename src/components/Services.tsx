"use client";
import { useState } from "react";
import { CheckCircle2, Zap, ArrowRight, ShieldCheck, Settings2 } from "lucide-react";

const ArtButton = ({ children, onClick }: { children: React.ReactNode; onClick?: () => void }) => (
  <button 
    onClick={onClick} 
    className="relative w-full md:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 md:px-10 md:py-5 font-bold text-base md:text-lg rounded-full transition-all duration-300 ease-out transform hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(22,163,74,0.3)] active:translate-y-0 active:shadow-lg overflow-hidden group bg-green-600 text-white"
  >
    <span className="absolute inset-0 w-full h-full transition-all duration-300 scale-0 group-hover:scale-100 group-hover:bg-white/10 rounded-full"></span>
    {children} <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
  </button>
);

export default function Services({ onContactClick }: { onContactClick?: () => void }) {
  const [activeTab, setActiveTab] = useState(1);
  const [customKw, setCustomKw] = useState(10);

  const tiers = [
    { id: 0, name: "Starter Kit", kw: "1 kW", price: "75,000", desc: "Perfect for basic loads. Runs fans, lights, and a TV effortlessly.", features: ["3-4 Premium Solar Panels", "1.5 kVA Smart Inverter", "150 Ah Battery", "Standard Installation"], optimalFor: "Small Homes (1-2 BHK)", isCustom: false },
    { id: 1, name: "Family Pack", kw: "3 kW", price: "2,10,000", desc: "The sweet spot. Easily handles a 1.5 Ton AC along with your regular home appliances.", features: ["8-10 High-Efficiency Panels", "3 kVA MPPT Inverter", "2x 150 Ah Batteries", "5-Year Maintenance"], optimalFor: "Medium Homes (3-4 BHK)", isCustom: false },
    { id: 2, name: "Business Pro", kw: "5 kW", price: "3,30,000", desc: "Heavy duty performance. Run multiple ACs or commercial loads with zero grid dependency.", features: ["14-16 Mono PERC Panels", "5 kVA Heavy Duty Inverter", "4x 150 Ah Battery Bank", "App-based Monitoring"], optimalFor: "Large Homes / Showrooms", isCustom: false },
    { id: 3, name: "Custom Power", kw: "Max", isCustom: true, optimalFor: "Factories & Large Estates" }
  ];

  const activeData = tiers[activeTab];
  const customPrice = (customKw * 65000).toLocaleString('en-IN');

  return (
    <section className="bg-white py-16 md:py-24 px-4 md:px-12 border-t border-gray-100 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        
        <div className="mb-12 md:mb-20">
          <h2 className="text-4xl md:text-7xl font-black text-gray-950 tracking-tighter mb-4 md:mb-6">Choose Your Power.</h2>
          <p className="text-lg md:text-xl text-gray-500 max-w-2xl font-medium">Customize your solar plant for unmatched performance and lifetime savings.</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 md:gap-16 items-start">
          
          {/* 📱 MOBILE: Horizontal Tabs | 💻 LAPTOP: Vertical Sidebar */}
          <div className="w-full lg:w-1/3 flex lg:flex-col gap-3 overflow-x-auto pb-4 lg:pb-0 no-scrollbar snap-x snap-mandatory">
            {tiers.map((tier) => (
              <button 
                key={tier.id}
                onClick={() => setActiveTab(tier.id)}
                className={`flex-shrink-0 w-[160px] lg:w-full snap-start text-left p-5 md:p-6 rounded-[2rem] transition-all duration-300 border-2 ${
                  activeTab === tier.id 
                  ? 'border-green-600 bg-green-50 shadow-lg scale-[1.02]' 
                  : 'border-transparent bg-gray-50'
                }`}
              >
                <div className="flex justify-between items-center mb-1">
                  <span className={`font-bold text-xl md:text-2xl ${activeTab === tier.id ? 'text-green-800' : 'text-gray-400'}`}>{tier.kw}</span>
                  {activeTab === tier.id && (tier.isCustom ? <Settings2 className="text-green-600 w-5 h-5 animate-spin-slow" /> : <Zap className="text-green-600 w-5 h-5 animate-pulse" />)}
                </div>
                <h3 className={`font-extrabold text-sm md:text-lg ${activeTab === tier.id ? 'text-gray-900' : 'text-gray-500'}`}>{tier.name}</h3>
              </button>
            ))}
          </div>

          {/* 🌟 DISPLAY AREA: Responsive Magic */}
          <div className="w-full lg:w-2/3 bg-gray-950 rounded-[2.5rem] md:rounded-[3rem] p-8 md:p-16 text-white shadow-2xl relative overflow-hidden transition-all duration-500 min-h-[500px]">
            <div className="absolute top-0 right-0 w-64 h-64 md:w-96 md:h-96 bg-green-600/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>

            <div className="relative z-10 key={activeData.id} animate-fade-in-up">
                <div className="flex items-center gap-3 text-green-400 font-bold tracking-widest uppercase text-[10px] md:text-sm mb-6">
                    <ShieldCheck className="w-4 h-4 md:w-5 md:h-5" /> Optimal for {activeData.optimalFor}
                </div>
                
                {activeData.isCustom ? (
                  <div className="mb-10">
                    <p className="text-gray-300 mb-6 font-medium text-sm md:text-lg">Select capacity (kW):</p>
                    <div className="flex items-center gap-4 md:gap-6 mb-8">
                      <input type="range" min="6" max="50" step="1" value={customKw} onChange={(e) => setCustomKw(parseInt(e.target.value))} className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-green-500" />
                      <span className="text-2xl md:text-4xl font-black text-green-400 w-20 md:w-24">{customKw}kW</span>
                    </div>
                    <div className="flex items-baseline gap-2 mb-8">
                      <span className="text-5xl md:text-8xl font-black tracking-tighter">₹{customPrice}</span>
                      <span className="text-gray-500 font-medium text-sm md:text-lg">/est.</span>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="flex items-baseline gap-2 mb-6">
                        <span className="text-6xl md:text-8xl font-black tracking-tighter">₹{activeData.price}</span>
                    </div>
                    <p className="text-base md:text-xl text-gray-400 mb-10 max-w-lg leading-relaxed">{activeData.desc}</p>
                  </>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-12">
                    {(activeData.features || ["High-Efficiency Setup", `${customKw} kVA Heavy Duty Inverter`, "Premium Installation"]).map(f => (
                        <div key={f} className="flex items-center gap-3 text-gray-200 font-medium text-sm md:text-base">
                            <div className="bg-green-600/20 p-1.5 rounded-full flex-shrink-0"><CheckCircle2 className="w-4 h-4 text-green-400" /></div>
                            {f}
                        </div>
                    ))}
                </div>

                <div className="flex flex-col gap-4">
                  <ArtButton onClick={onContactClick}>{activeData.isCustom ? "Request Custom Quote" : "Deploy This System"}</ArtButton>
                  {activeData.isCustom && <p className="text-[10px] md:text-sm text-gray-500 italic max-w-xs md:max-w-md">*Exact quote provided after site inspection.</p>}
                </div>
            </div>
          </div>

        </div>
      </div>
      
      <style jsx>{`
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fade-in-up { animation: fadeInUp 0.4s ease-out forwards; }
        .animate-spin-slow { animation: spin 4s linear infinite; }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </section>
  );
}