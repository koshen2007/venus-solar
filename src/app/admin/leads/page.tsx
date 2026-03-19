"use client";
import { useState } from "react";
import { Users, Phone, MessageCircle } from "lucide-react";

export default function LeadsPage() {
  // Ye tera dummy data hai (Baad mein asli database se aayega)
  const [leads, setLeads] = useState([
    { id: 1, name: "Ramesh Kumar", phone: "+919876543210", req: "5kW Residential Setup", status: "New Lead", date: "Today, 06:15 AM" },
    { id: 2, name: "Kamar Tanveer", phone: "+919024424633", req: "Solar for Factory", status: "Contacted", date: "Yesterday" }
  ]);

  return (
    <div className="p-4 md:p-8 max-w-6xl mx-auto font-sans">
      <h2 className="text-2xl md:text-3xl font-black mb-8 text-gray-900 flex items-center gap-3">
        <Users className="text-green-600 w-8 h-8" /> Leads Manager
      </h2>

      <div className="bg-white rounded-[2rem] shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-900 text-white text-sm uppercase tracking-wider">
                <th className="p-4 font-bold">Client Name</th>
                <th className="p-4 font-bold">Requirement</th>
                <th className="p-4 font-bold">Status</th>
                <th className="p-4 font-bold text-center">Action (Call/Chat)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {leads.map((lead) => (
                <tr key={lead.id} className="hover:bg-gray-50 transition-colors">
                  <td className="p-4">
                    <div className="font-bold text-gray-900 text-lg">{lead.name}</div>
                    <div className="text-xs font-bold text-gray-500 mt-1">{lead.date}</div>
                  </td>
                  <td className="p-4 font-bold text-gray-600">{lead.req}</td>
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-lg text-xs font-black uppercase ${
                      lead.status === 'New Lead' ? 'bg-red-100 text-red-600 border border-red-200' : 'bg-green-100 text-green-600 border border-green-200'
                    }`}>
                      {lead.status}
                    </span>
                  </td>
                  <td className="p-4 flex items-center justify-center gap-3">
                    {/* Direct Call Button */}
                    <a href={`tel:${lead.phone}`} className="p-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-green-500 hover:text-white transition-all shadow-sm hover:shadow-md hover:-translate-y-1">
                      <Phone className="w-5 h-5" />
                    </a>
                    {/* Direct WhatsApp Button */}
                    <a href={`https://wa.me/${lead.phone.replace('+','')}`} target="_blank" rel="noreferrer" className="p-3 bg-green-100 text-green-600 rounded-xl hover:bg-green-500 hover:text-white transition-all shadow-sm hover:shadow-md hover:-translate-y-1">
                      <MessageCircle className="w-5 h-5" />
                    </a>
                  </td>
                </tr>
              ))}
              {leads.length === 0 && (
                <tr>
                  <td colSpan={4} className="p-8 text-center text-gray-500 font-bold">Abhi tak koi grahak nahi aaya Seth!</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}