"use client";
import { Zap, ArrowRight, ShieldCheck } from "lucide-react";

export default function Hero({ onBookClick }: { onBookClick?: () => void }) {
  return (
    <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-gray-950 pt-20">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1509391366360-1e97f52ce074?q=80&w=2000')] opacity-30 mix-blend-overlay"></div>
      
      <div className="relative z-10 text-center px-4 md:px-6 max-w-5xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-full bg-green-500/10 border border-green-500/30 text-green-400 font-bold text-[10px] md:text-sm mb-6 md:mb-8 tracking-wide">
          <ShieldCheck className="w-3 h-3 md:w-4 md:h-4" /> 100% Guaranteed Tier-1 Tech
        </div>

        <h1 className="text-4xl md:text-7xl font-black text-white tracking-tight mb-6 leading-[1.1]">
          Unlock <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-500">Infinite</span> Clean Energy.
        </h1>

        <p className="text-base md:text-xl text-gray-400 mb-10 max-w-2xl mx-auto font-medium">
          Make a smart investment. Experience <span className="text-white">zero grid dependency</span> with Rajasthan's most trusted solar installers.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button onClick={onBookClick} className="w-full sm:w-auto px-8 py-4 bg-green-600 text-white rounded-full font-bold text-lg hover:bg-green-500 transition-all flex items-center justify-center gap-2">
            <Zap className="w-5 h-5" /> Claim Free Quote
          </button>
          <button className="w-full sm:w-auto px-8 py-4 bg-white/5 text-white border border-white/10 rounded-full font-bold text-lg hover:bg-white/10 transition-all flex items-center justify-center gap-2">
            View Results <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
}