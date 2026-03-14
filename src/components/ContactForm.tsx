"use client";

import { forwardRef, useState } from "react";

export const ContactForm = forwardRef<HTMLElement>((props, ref) => {
  const [formData, setFormData] = useState({ name: '', phone: '', address: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setStatus('success');
        setFormData({ name: '', phone: '', address: '' });
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
    <section ref={ref} className="py-12 px-6 w-full max-w-2xl bg-gray-50 rounded-3xl mt-12 mb-8 border border-gray-100 shadow-sm mx-auto scroll-mt-24">
      <h2 className="text-3xl font-black text-eco-green mb-2 text-center">
        Get Started
      </h2>
      <p className="text-center text-gray-600 mb-8">
        Leave your details and we'll handle the rest.
      </p>
      
      {status === 'success' ? (
        <div className="bg-green-50 text-eco-green p-6 rounded-2xl text-center border border-green-200">
          <svg className="w-12 h-12 mx-auto mb-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          <h3 className="text-xl font-bold mb-2">Details Submitted Successfully!</h3>
        </div>
      ) : (
        <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
          <div>
            <label className="block text-eco-green font-bold mb-2 text-lg">Full Name</label>
            <input 
              required
              type="text" 
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              placeholder="Tanveer Ahmed" 
              className="w-full p-4 rounded-xl border border-gray-200 focus:outline-none focus:border-eco-yellow focus:ring-2 focus:ring-yellow-200 transition-all text-lg" 
            />
          </div>
          
          <div>
            <label className="block text-eco-green font-bold mb-2 text-lg">Phone Number</label>
            <input 
              required
              type="tel" 
              value={formData.phone}
              onChange={(e) => setFormData({...formData, phone: e.target.value})}
              placeholder="+91 9024424633" 
              className="w-full p-4 rounded-xl border border-gray-200 focus:outline-none focus:border-eco-yellow focus:ring-2 focus:ring-yellow-200 transition-all text-lg" 
            />
          </div>
          
          <div>
            <label className="block text-eco-green font-bold mb-2 text-lg">Installation Address</label>
            <textarea 
              required
              rows={3} 
              value={formData.address}
              onChange={(e) => setFormData({...formData, address: e.target.value})}
              placeholder="Plot 42, Sector 4..." 
              className="w-full p-4 rounded-xl border border-gray-200 focus:outline-none focus:border-eco-yellow focus:ring-2 focus:ring-yellow-200 transition-all text-lg resize-none"
            ></textarea>
          </div>
          
          <button 
            type="submit" 
            disabled={status === 'loading'}
            className="mt-6 bg-eco-green hover:bg-[#043427] disabled:bg-gray-400 text-white text-xl font-bold py-5 rounded-xl shadow-md transition-transform transform hover:scale-[1.02] active:scale-[0.98]"
          >
            {status === 'loading' ? 'Submitting...' : 'Submit Details'}
          </button>

          {status === 'error' && (
            <p className="text-red-500 text-center font-bold">Failed to submit. Please try again.</p>
          )}
        </form>
      )}
    </section>
  );
});

ContactForm.displayName = 'ContactForm';

export default ContactForm;
