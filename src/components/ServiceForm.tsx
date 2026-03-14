"use client";

import { useState } from "react";

export default function ServiceForm() {
  const [formData, setFormData] = useState({ name: '', phone: '', address: '', issue: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const res = await fetch('/api/services', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setStatus('success');
        setFormData({ name: '', phone: '', address: '', issue: '' });
        setTimeout(() => setStatus('idle'), 5000);
      } else {
        setStatus('error');
      }
    } catch (error) {
      console.error(error);
      setStatus('error');
    }
  };

  return (
    <section className="py-12 px-6 w-full max-w-2xl bg-white rounded-3xl mt-12 mb-8 border border-gray-100 shadow-sm mx-auto">
      <h2 className="text-3xl font-black text-eco-green mb-2 text-center">
        Request Maintenance
      </h2>
      <p className="text-center text-gray-600 mb-8">
        Need help with your existing panels? Fill out the form below.
      </p>

      {status === 'success' ? (
        <div className="bg-green-50 text-eco-green p-6 rounded-2xl text-center border border-green-200">
          <svg className="w-12 h-12 mx-auto mb-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          <h3 className="text-xl font-bold mb-2">Request Received!</h3>
          <p>Our team will contact you within 24 hours.</p>
        </div>
      ) : (
        <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
          <div>
            <label className="block text-eco-green font-bold mb-2">Full Name</label>
            <input 
              required
              type="text" 
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              placeholder="Your Name" 
              className="w-full p-4 rounded-xl border border-gray-200 focus:outline-none focus:border-eco-yellow focus:ring-2 focus:ring-yellow-200 transition-all font-medium" 
            />
          </div>
          
          <div>
            <label className="block text-eco-green font-bold mb-2">Phone Number</label>
            <input 
              required
              type="tel" 
              value={formData.phone}
              onChange={(e) => setFormData({...formData, phone: e.target.value})}
              placeholder="Your Phone Number" 
              className="w-full p-4 rounded-xl border border-gray-200 focus:outline-none focus:border-eco-yellow focus:ring-2 focus:ring-yellow-200 transition-all font-medium" 
            />
          </div>
          
          <div>
            <label className="block text-eco-green font-bold mb-2">Installation Address</label>
            <input 
              required
              type="text" 
              value={formData.address}
              onChange={(e) => setFormData({...formData, address: e.target.value})}
              placeholder="Your Address" 
              className="w-full p-4 rounded-xl border border-gray-200 focus:outline-none focus:border-eco-yellow focus:ring-2 focus:ring-yellow-200 transition-all font-medium" 
            />
          </div>

          <div>
            <label className="block text-eco-green font-bold mb-2">Issue Description</label>
            <textarea 
              required
              rows={4} 
              value={formData.issue}
              onChange={(e) => setFormData({...formData, issue: e.target.value})}
              placeholder="Describe the issue you are facing..." 
              className="w-full p-4 rounded-xl border border-gray-200 focus:outline-none focus:border-eco-yellow focus:ring-2 focus:ring-yellow-200 transition-all font-medium resize-none"
            ></textarea>
          </div>
          
          <button 
            type="submit" 
            disabled={status === 'loading'}
            className="mt-4 bg-eco-green hover:bg-[#043427] disabled:bg-gray-400 text-white text-lg font-bold py-4 rounded-xl shadow-md transition-transform transform hover:scale-[1.02] active:scale-[0.98]"
          >
            {status === 'loading' ? 'Submitting...' : 'Submit Request'}
          </button>
          
          {status === 'error' && (
            <p className="text-red-500 text-center font-bold">Failed to submit. Please try again.</p>
          )}
        </form>
      )}
    </section>
  );
}
