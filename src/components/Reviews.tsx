"use client";
import { Star } from 'lucide-react';

export default function Reviews() {
  const reviews = [
    { name: "Rajesh S.", loc: "Balotra", text: "Best decision ever. My electricity bill is literally zero now. The installation was super clean." },
    { name: "Amit M.", loc: "Siwana", text: "Professional team, top-notch equipment. Venus Solar handled everything from start to finish." },
    { name: "Vikram R.", loc: "Pali", text: "The custom 5kW system works flawlessly for my factory. Highly recommend their heavy-duty setup." }
  ];

  return (
    <section className="py-24 bg-green-50/50 px-6 border-t border-gray-100">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 tracking-tight">Trusted by Locals</h2>
        <p className="text-gray-500 mb-16 text-lg font-medium">Don't just take our word for it. Here's what our clients have to say.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((r, i) => (
            <div key={i} className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100 hover:-translate-y-2 transition-transform duration-300">
              <div className="flex justify-center gap-1 text-yellow-400 mb-6">
                {[...Array(5)].map((_, i) => <Star key={i} className="fill-current w-5 h-5" />)}
              </div>
              <p className="text-gray-600 font-medium mb-8 leading-relaxed">"{r.text}"</p>
              <h4 className="font-extrabold text-gray-900 text-lg">{r.name}</h4>
              <span className="text-sm text-green-600 font-bold tracking-wider uppercase">{r.loc}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}