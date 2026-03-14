"use client";

import { useState } from "react";

// ─── Official Venus Solar Specs ──────────────────────────────────────────────
// Base Cost: ₹32,500 per kW (excl. GST)
// Generation: 1 kW → 5 units/day → ~1,500 units/year
// Savings Rate: ₹8 per unit (avg Rajasthan tariff)
// ─────────────────────────────────────────────────────────────────────────────

const COST_PER_KW = 32500;
const UNITS_PER_KW_YEAR = 1500;   // 5 units/day × 300 sunny days
const RATE_PER_UNIT = 8;          // ₹8 per unit

function fmt(n: number) {
  return n.toLocaleString("en-IN");
}

export default function SavingsCalculator() {
  const [kw, setKw] = useState(3);

  const yearlySavings = kw * UNITS_PER_KW_YEAR * RATE_PER_UNIT;
  const totalCost     = kw * COST_PER_KW;
  const paybackYears  = totalCost / yearlySavings;
  const unitsPerYear  = kw * UNITS_PER_KW_YEAR;
  const monthlySavings = yearlySavings / 12;

  return (
    <section className="py-16 w-full">
      {/* ── Section Header ─────────────────────────────────────────── */}
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-black text-eco-green mb-3 tracking-tight">
          Solar Savings Calculator
        </h2>
        <p className="text-gray-500 max-w-xl mx-auto">
          Based on <span className="font-bold text-eco-green">official Venus Solar pricing</span>.
          Move the slider to your system size and see your exact numbers.
        </p>
      </div>

      <div className="max-w-5xl mx-auto flex flex-col gap-8">

        {/* ── Slider Input ───────────────────────────────────────────── */}
        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8 md:p-10">
          <div className="flex justify-between items-center mb-3">
            <label className="text-gray-700 font-bold text-lg">Select System Size</label>
            <div className="bg-eco-green text-white px-5 py-2 rounded-full font-black text-xl shadow">
              {kw} kW
            </div>
          </div>

          <input
            type="range"
            min={1}
            max={20}
            value={kw}
            onChange={(e) => setKw(Number(e.target.value))}
            className="w-full h-3 rounded-full appearance-none cursor-pointer accent-eco-green"
            style={{
              background: `linear-gradient(to right, #064e3b ${(kw - 1) / 19 * 100}%, #e5e7eb ${(kw - 1) / 19 * 100}%)`
            }}
          />
          <div className="flex justify-between text-xs text-gray-400 font-bold mt-2">
            <span>1 kW</span>
            <span>5 kW</span>
            <span>10 kW</span>
            <span>15 kW</span>
            <span>20 kW</span>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-4 text-sm text-gray-500">
            <div className="bg-gray-50 rounded-xl px-4 py-3">
              <span className="font-bold text-gray-700">Daily Generation</span>
              <p className="text-eco-green font-black text-xl mt-1">{kw * 5} Units / Day</p>
            </div>
            <div className="bg-gray-50 rounded-xl px-4 py-3">
              <span className="font-bold text-gray-700">Yearly Generation</span>
              <p className="text-eco-green font-black text-xl mt-1">{fmt(unitsPerYear)} Units / Year</p>
            </div>
          </div>
        </div>

        {/* ── Results Card ───────────────────────────────────────────── */}
        <div className="bg-eco-green rounded-3xl p-8 md:p-10 shadow-xl relative overflow-hidden">
          {/* Background glow */}
          <div className="absolute top-0 right-0 w-72 h-72 bg-eco-yellow rounded-full mix-blend-multiply filter blur-3xl opacity-10 transform translate-x-1/3 -translate-y-1/3 pointer-events-none"></div>

          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 bg-eco-yellow rounded-xl flex items-center justify-center flex-shrink-0">
              <span className="font-black text-eco-green text-lg">V</span>
            </div>
            <div>
              <h3 className="font-black text-white text-xl leading-tight">Venus Solar — Your Estimate</h3>
              <p className="text-white/60 text-sm">Based on {kw} kW system · ₹{RATE_PER_UNIT}/unit Rajasthan tariff</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
            <div className="bg-white/10 border border-white/10 rounded-2xl p-6">
              <p className="text-eco-yellow text-xs font-bold uppercase tracking-widest mb-2">Yearly Savings</p>
              <p className="text-white font-black text-3xl">₹{fmt(yearlySavings)}</p>
              <p className="text-white/60 text-sm mt-1">≈ ₹{fmt(Math.round(monthlySavings))} / month</p>
            </div>
            <div className="bg-white/10 border border-white/10 rounded-2xl p-6">
              <p className="text-eco-yellow text-xs font-bold uppercase tracking-widest mb-2">Total Cost (Excl. GST)</p>
              <p className="text-white font-black text-3xl">₹{fmt(totalCost)}</p>
              <p className="text-white/60 text-sm mt-1">@ ₹32,500 per kW</p>
            </div>
            <div className="bg-eco-yellow rounded-2xl p-6">
              <p className="text-eco-green text-xs font-bold uppercase tracking-widest mb-2">Payback Period</p>
              <p className="text-eco-green font-black text-3xl">{paybackYears.toFixed(1)} Years</p>
              <p className="text-eco-green/70 text-sm mt-1">Then 20+ years of free power</p>
            </div>
          </div>

          {/* Premium Hardware + O&M */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-t border-white/10 pt-6">
            <div>
              <p className="text-eco-yellow text-xs font-black uppercase tracking-widest mb-3">🏆 Premium Hardware</p>
              <ul className="text-white/80 text-sm space-y-1.5">
                <li className="flex items-start gap-2">
                  <span className="text-eco-yellow mt-0.5">✦</span>
                  <span><strong className="text-white">WAAREE / RAYZON / LUMINOUS</strong> N-Type Topcon Twin Peak Technology</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-eco-yellow mt-0.5">✦</span>
                  <span>25+ Year Panel Performance Warranty</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-eco-yellow mt-0.5">✦</span>
                  <span>Highest Efficiency — Up to 22% Module Efficiency</span>
                </li>
              </ul>
            </div>
            <div>
              <p className="text-eco-yellow text-xs font-black uppercase tracking-widest mb-3">🛠 Operation &amp; Maintenance</p>
              <ul className="text-white/80 text-sm space-y-1.5">
                <li className="flex items-start gap-2">
                  <span className="text-eco-yellow mt-0.5">✦</span>
                  <span><strong className="text-white">5 Years Free O&amp;M</strong> included in every package</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-eco-yellow mt-0.5">✦</span>
                  <span>Annual inspection, cleaning &amp; minor repairs</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-eco-yellow mt-0.5">✦</span>
                  <span>PM Surya Ghar subsidy assistance included</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
