"use client";
import { useState } from "react";

export default function ContactForm() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [verifyPhone, setVerifyPhone] = useState(""); 
  const [location, setLocation] = useState(""); 
  const [error, setError] = useState("");
  
  // NAYA: Form ko hilane wala switch
  const [isShaking, setIsShaking] = useState(false); 

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Agar number match nahi hue toh form hilega aur SUBMIT NAHI HOGA
    if (phone !== verifyPhone) {
      setError("Phone numbers do not match. Please check again.");
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 500); // Aadhe second baad hilna band
      return; 
    }
    
    setError("");
    alert("Thank you! Your request has been successfully submitted.");
    setName(""); setPhone(""); setVerifyPhone(""); setLocation("");
  };

  const handleNumberInput = (e: React.ChangeEvent<HTMLInputElement>, setter: (val: string) => void) => {
    setter(e.target.value.replace(/\D/g, ''));
  };

  return (
    <div className="bg-white p-8 sm:p-10 rounded-3xl shadow-xl border border-gray-100">
      
      {/* NAYA: CSS Animation (Jugaad for Shake) */}
      <style jsx>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-10px); }
          50% { transform: translateX(10px); }
          75% { transform: translateX(-10px); }
        }
        .shake-animation { animation: shake 0.4s ease-in-out; }
      `}</style>

      <h2 className="text-3xl font-extrabold text-center text-gray-900 mb-3">Book Your Solar Installation</h2>
      <p className="text-center text-gray-500 mb-8 font-medium">Leave your details below and our energy experts will handle the rest.</p>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">Full Name</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter your full name" className="w-full border border-gray-200 p-4 rounded-xl bg-gray-50 outline-none focus:ring-2 focus:ring-green-600" required />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Phone Number</label>
            <input type="tel" value={phone} onChange={(e) => handleNumberInput(e, setPhone)} placeholder="10-digit mobile number" className="w-full border border-gray-200 p-4 rounded-xl bg-gray-50 outline-none focus:ring-2 focus:ring-green-600" required maxLength={10} minLength={10} />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Confirm Phone Number</label>
            {/* YAHAN LAGA HAI SHAKE EFFECT */}
            <input 
              type="tel" 
              value={verifyPhone} 
              onChange={(e) => handleNumberInput(e, setVerifyPhone)} 
              placeholder="Re-enter phone number" 
              className={`w-full border p-4 rounded-xl outline-none focus:ring-2 focus:ring-green-600 transition-all ${
                isShaking ? 'shake-animation border-red-500 bg-red-100 text-red-700' : 'border-gray-200 bg-gray-50 text-gray-900'
              }`} 
              required 
              maxLength={10} 
              minLength={10} 
            />
          </div>
        </div>
        
        {error && <p className={`text-red-500 text-sm font-bold mt-1 ${isShaking ? 'shake-animation' : ''}`}>{error}</p>}

        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">Installation Address</label>
          <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} placeholder="Enter your complete address" className="w-full border border-gray-200 p-4 rounded-xl bg-gray-50 outline-none focus:ring-2 focus:ring-green-600" required />
        </div>

        <button type="submit" className="w-full bg-green-700 text-white py-4 rounded-xl font-bold text-lg hover:bg-green-800 shadow-lg">Submit Request</button>
      </form>
    </div>
  );
}