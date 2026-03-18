"use client";
import { ArrowRight, ShieldCheck, Zap } from "lucide-react";

interface HeroProps {
  onBookClick?: () => void;
}

export default function Hero({ onBookClick }: HeroProps) {
  return (
    <section className="relative w-full h-[90vh] min-h-[600px] flex items-center justify-center overflow-hidden bg-gray-950">
      
      {/* Background Image / Glow Effects for Premium Feel */}
      <div className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-40 mix-blend-overlay" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1509391366360-1e97f52ce074?q=80&w=2000&auto=format&fit=crop')" }}></div>
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-green-600/30 rounded-full blur-[120px] pointer-events-none"></div>
      
      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto flex flex-col items-center mt-16">
        
        {/* Trust Badge - BHAROSA */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/30 text-green-400 font-bold text-sm mb-8 animate-fade-in-up tracking-wide">
          <ShieldCheck className="w-4 h-4" /> 100% Guaranteed Tier-1 Solar Technology
        </div>

        {/* Main Headline - VIP FEEL & GREED */}
        <h1 className="text-5xl md:text-7xl font-black text-white tracking-tight mb-6 leading-tight animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
          Unlock <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-500">Infinite</span> Clean Energy.
        </h1>

        {/* Sub-headline - AALAS, LALACH, AND SOLUTION */}
        <p className="text-xl md:text-2xl text-gray-300 mb-10 max-w-3xl font-medium leading-relaxed animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          Make a <span className="text-white font-bold">smart investment</span> today. Experience <span className="text-white font-bold border-b-2 border-green-500">zero grid dependency</span> with our effortless, done-for-you installations across Rajasthan.
        </p>

        {/* CTA Buttons - URGENCY & VALUE */}
        <div className="flex flex-col sm:flex-row gap-5 w-full justify-center animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
          <button 
            onClick={onBookClick}
            className="relative inline-flex items-center justify-center gap-2 px-8 py-4 font-bold text-lg rounded-full transition-all duration-300 transform hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(22,163,74,0.4)] active:translate-y-0 active:shadow-lg bg-green-600 text-white overflow-hidden group border border-green-500"
          >
            <span className="absolute inset-0 w-full h-full transition-all duration-300 scale-0 group-hover:scale-100 group-hover:bg-white/10 rounded-full"></span>
            <Zap className="w-5 h-5 group-hover:animate-pulse" /> Claim Your Free Custom Quote
          </button>

          <button 
            onClick={() => {
              // Scroll to portfolio section smoothly
              window.scrollTo({ top: document.body.scrollHeight / 2, behavior: 'smooth' });
            }}
            className="relative inline-flex items-center justify-center gap-2 px-8 py-4 font-bold text-lg rounded-full transition-all duration-300 transform hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(255,255,255,0.1)] active:translate-y-0 active:shadow-lg bg-white/5 text-white backdrop-blur-md border border-white/10 hover:bg-white/10"
          >
            View Proven Results <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
        
        {/* Risk-Free Guarantee text at the bottom */}
        <div className="mt-12 flex flex-wrap justify-center gap-4 md:gap-8 text-gray-400 text-sm font-bold animate-fade-in-up uppercase tracking-wider" style={{ animationDelay: '0.4s' }}>
          <span>⚡ Lifetime Peace of Mind</span>
          <span className="hidden md:inline">•</span>
          <span>🚫 No Hidden Costs</span>
          <span className="hidden md:inline">•</span>
          <span>🛡️ 25-Year Performance Warranty</span>
        </div>

      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up { 
          opacity: 0;
          animation: fadeInUp 0.8s ease-out forwards; 
        }
      `}</style>
    </section>
  );
}