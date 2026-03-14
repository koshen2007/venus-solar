"use client";

import { useState } from "react";

const faqs = [
  {
    q: "How much government subsidy is available?",
    a: "Under the PM Surya Ghar Yojana (2024), central subsidies cover ₹30,000 for 1 kW, ₹60,000 for 2 kW, and ₹78,000 for 3 kW or higher systems. Many states offer additional subsidies on top of this. We will help you claim all eligible benefits during installation.",
  },
  {
    q: "What is the annual maintenance cost?",
    a: "Solar panels require very little maintenance. Basic cleaning and an annual inspection typically cost between ₹1,500–₹3,000/year. Venus Solar Energy offers affordable Annual Maintenance Contracts (AMC) that cover inspection, cleaning, and minor repairs.",
  },
  {
    q: "How long does installation take?",
    a: "A typical residential installation (1–5 kW) is completed within 1–3 working days after site inspection and material delivery. The entire process from booking to activation takes approximately 7–14 days.",
  },
  {
    q: "What is the payback period for solar panels?",
    a: "Most of our customers recover their investment within 4–6 years through electricity bill savings. Panels have a 25-year performance warranty, meaning 19+ years of virtually free electricity after payback.",
  },
  {
    q: "Do you provide warranty on your panels?",
    a: "Yes. We provide a 10-year product warranty and a 25-year performance warranty on all solar panels. Inverters come with a 5-year warranty. All warranties and certificates are delivered digitally through your customer dashboard.",
  },
  {
    q: "Will solar work during cloudy or rainy days?",
    a: "Yes! Solar panels continue to generate electricity on cloudy days — they generate about 10–25% of their rated capacity. On-grid systems also use grid electricity as a backup when generation is insufficient, so you are never without power.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-16 w-full">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-black text-eco-green mb-3 tracking-tight">
          Frequently Asked Questions
        </h2>
        <p className="text-gray-500 max-w-xl mx-auto">
          Everything you need to know before going solar. Still have questions?{" "}
          <a href="tel:+919024424633" className="text-eco-green font-bold hover:underline">Call us</a>.
        </p>
      </div>

      <div className="flex flex-col gap-4 max-w-3xl mx-auto">
        {faqs.map((faq, idx) => (
          <div
            key={idx}
            className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:border-eco-green/30 hover:shadow-md transition-all overflow-hidden"
          >
            <button
              onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
              className="w-full px-7 py-5 text-left flex items-center justify-between gap-4 focus:outline-none"
            >
              <h3 className="text-gray-800 font-bold text-base md:text-lg leading-snug pr-4">
                {faq.q}
              </h3>
              <span
                className={`flex-shrink-0 w-8 h-8 rounded-full bg-green-50 text-eco-green flex items-center justify-center font-bold text-lg transition-transform duration-300 ${
                  openIndex === idx ? "rotate-45" : ""
                }`}
              >
                +
              </span>
            </button>

            {openIndex === idx && (
              <div className="px-7 pb-6">
                <div className="border-t border-gray-100 pt-4">
                  <p className="text-gray-600 leading-relaxed">{faq.a}</p>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
