"use client";
import { useState } from "react";
import { IndianRupee, Save, CheckCircle2, Zap, Percent, Settings2, ShieldCheck } from "lucide-react";

export default function PricingPage() {
  const [basePriceKw, setBasePriceKw] = useState(65000);
  const [subsidyPercent, setSubsidyPercent] = useState(40);
  const [installationFee, setInstallationFee] = useState(5000);
  const [showSubsidy, setShowSubsidy] = useState(true);
  const [status, setStatus] = useState<"idle" | "saving" | "saved">("idle");

  const handleSave = () => {
    setStatus("saving");
    setTimeout(() => {
      setStatus("saved");
      setTimeout(() => setStatus("idle"), 2000);
    }, 1500);
  };

  const calculatePrice = (kw: number) => {
    const total = (basePriceKw * kw) + installationFee;
    const subsidyAmount = showSubsidy ? (total * (subsidyPercent / 100)) : 0;
    return (total - subsidyAmount).toLocaleString('en-IN');
  };

  return (
    // overflow-x-hidden lagaya taaki screen ke bahar na nikle
    <div className="bg-gray-50 min-h-screen p-4 md:p-6 lg:p-8 w-full overflow-x-hidden font-sans">
      <div className="max-w-7xl mx-auto w-full">
        
        {/* Header - Phone pe neeche button aayega, Laptop pe side mein */}
        <div className="mb-6 flex flex-col sm:flex-row sm:justify-between sm:items-end gap-4">
          <div>
            <h1 className="text-2xl md:text-4xl font-black text-gray-900 tracking-tight flex items-center gap-3">
              <Settings2 className="w-8 h-8 md:w-10 md:h-10 text-green-600" /> Master Pricing
            </h1>
            <p className="text-sm md:text-base text-gray-500 font-medium mt-1 md:mt-2">Set universal rates. Website updates instantly.</p>
          </div>
          <button onClick={handleSave} className={`px-6 py-3 rounded-xl font-bold text-white transition-all flex items-center justify-center gap-2 w-full sm:w-auto ${status === "saved" ? "bg-gray-900" : "bg-green-600 hover:bg-green-500 shadow-md"}`}>
             {status === "idle" && <><Save className="w-5 h-5" /> Save Changes</>}
             {status === "saving" && "Syncing..."}
             {status === "saved" && <><CheckCircle2 className="w-5 h-5 text-green-400" /> Synced!</>}
          </button>
        </div>

        {/* Layout split: xl screen aane pe left-right hoga, warna upar-neeche */}
        <div className="flex flex-col xl:flex-row gap-6 lg:gap-8 w-full">
          
          {/* THE CONTROL PANEL (Chota kiya size) */}
          <div className="w-full xl:w-5/12 space-y-6">
            <div className="bg-white p-5 md:p-8 rounded-[2rem] shadow-sm border border-gray-100">
              <h3 className="font-bold text-lg md:text-xl mb-6 text-gray-900 border-b pb-4">Global Variables</h3>
              
              <div className="space-y-5">
                {/* Variable 1 */}
                <div>
                  <label className="text-xs font-bold text-gray-500 uppercase flex items-center gap-2 mb-2"><IndianRupee className="w-4 h-4"/> Base Price (Per kW)</label>
                  <div className="flex items-center bg-gray-50 border border-gray-200 rounded-xl focus-within:border-green-500 transition-colors px-4">
                    <span className="text-gray-400 font-bold">₹</span>
                    <input type="number" value={basePriceKw} onChange={(e)=>setBasePriceKw(Number(e.target.value))} className="w-full p-3 bg-transparent outline-none font-black text-lg md:text-xl text-gray-900" />
                  </div>
                </div>

                {/* Variable 2 */}
                <div className="grid grid-cols-2 gap-3 md:gap-4">
                  <div>
                    <label className="text-xs font-bold text-gray-500 uppercase flex items-center gap-2 mb-2"><Percent className="w-4 h-4"/> Subsidy</label>
                    <div className="flex items-center bg-gray-50 border border-gray-200 rounded-xl px-4">
                      <input type="number" value={subsidyPercent} onChange={(e)=>setSubsidyPercent(Number(e.target.value))} className="w-full py-3 bg-transparent outline-none font-bold text-base md:text-lg text-gray-900" />
                      <span className="text-gray-400 font-bold">%</span>
                    </div>
                  </div>
                  <div>
                    <label className="text-xs font-bold text-gray-500 uppercase mb-2 block text-center">Status</label>
                    <button onClick={() => setShowSubsidy(!showSubsidy)} className={`w-full py-3 rounded-xl font-bold text-sm md:text-base transition-colors ${showSubsidy ? 'bg-green-100 text-green-700 border border-green-500' : 'bg-gray-100 text-gray-400 border border-transparent'}`}>
                      {showSubsidy ? 'Active' : 'Hidden'}
                    </button>
                  </div>
                </div>

                {/* Variable 3 */}
                <div>
                  <label className="text-xs font-bold text-gray-500 uppercase flex items-center gap-2 mb-2"><ShieldCheck className="w-4 h-4"/> Installation Fee</label>
                  <div className="flex items-center bg-gray-50 border border-gray-200 rounded-xl px-4">
                    <span className="text-gray-400 font-bold">₹</span>
                    <input type="number" value={installationFee} onChange={(e)=>setInstallationFee(Number(e.target.value))} className="w-full py-3 bg-transparent outline-none font-bold text-base md:text-lg text-gray-900" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* LIVE PREVIEW SECTION */}
          <div className="w-full xl:w-7/12">
            <div className="bg-gray-950 rounded-[2.5rem] p-5 md:p-8 text-white h-full border-4 border-gray-900 border-dashed relative overflow-hidden w-full">
              <div className="absolute top-4 right-4 bg-green-500 text-gray-950 px-3 py-1 rounded-full text-[10px] md:text-xs font-black uppercase tracking-widest shadow-lg">
                Live Preview
              </div>

              <h3 className="text-xl md:text-2xl font-black mb-6 mt-6 md:mt-0">Customer View:</h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* 1kW Preview */}
                <div className="bg-gray-900 p-5 rounded-2xl border border-gray-800 flex flex-col justify-between">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-gray-400 font-bold text-sm md:text-base">Starter Kit</span>
                    <span className="bg-gray-800 text-green-400 px-2 py-1 rounded-md text-xs font-black flex items-center gap-1"><Zap className="w-3 h-3"/> 1 kW</span>
                  </div>
                  {/* truncate class add ki jisse bada number box na tode */}
                  <div className="text-2xl md:text-3xl font-black truncate">₹{calculatePrice(1)}</div>
                  {showSubsidy && <div className="text-[10px] md:text-xs text-green-400 mt-2 bg-green-400/10 inline-block px-2 py-1 rounded w-fit">*{subsidyPercent}% Subsidy Applied</div>}
                </div>

                {/* 3kW Preview */}
                <div className="bg-gray-900 p-5 rounded-2xl border border-gray-800 flex flex-col justify-between">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-gray-400 font-bold text-sm md:text-base">Family Pack</span>
                    <span className="bg-gray-800 text-green-400 px-2 py-1 rounded-md text-xs font-black flex items-center gap-1"><Zap className="w-3 h-3"/> 3 kW</span>
                  </div>
                  <div className="text-2xl md:text-3xl font-black truncate">₹{calculatePrice(3)}</div>
                  {showSubsidy && <div className="text-[10px] md:text-xs text-green-400 mt-2 bg-green-400/10 inline-block px-2 py-1 rounded w-fit">*{subsidyPercent}% Subsidy Applied</div>}
                </div>

                {/* 5kW Preview */}
                <div className="bg-gray-900 p-5 rounded-2xl border border-gray-800 flex flex-col justify-between sm:col-span-2 md:col-span-1 xl:col-span-2">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-gray-400 font-bold text-sm md:text-base">Business Pro</span>
                    <span className="bg-gray-800 text-green-400 px-2 py-1 rounded-md text-xs font-black flex items-center gap-1"><Zap className="w-3 h-3"/> 5 kW</span>
                  </div>
                  <div className="text-2xl md:text-3xl font-black truncate">₹{calculatePrice(5)}</div>
                  {showSubsidy && <div className="text-[10px] md:text-xs text-green-400 mt-2 bg-green-400/10 inline-block px-2 py-1 rounded w-fit">*{subsidyPercent}% Subsidy Applied</div>}
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}