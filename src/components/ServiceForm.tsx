"use client";
import { useState } from "react";

export default function ServiceForm() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [verifyPhone, setVerifyPhone] = useState(""); 
  const [location, setLocation] = useState(""); 
  const [issueType, setIssueType] = useState("Panel Cleaning"); // NAYA: Dropdown state
  const [error, setError] = useState("");
  const [isShaking, setIsShaking] = useState(false); 

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (phone !== verifyPhone) {
      setError("Phone numbers do not match. Please verify.");
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 500);
      return; 
    }
    
    setError("");
    alert("Maintenance request logged successfully! Our Siwana support team will reach out soon.");
    
    // Reset Form
    setName(""); setPhone(""); setVerifyPhone(""); setLocation(""); setIssueType("Panel Cleaning");
  };

  const handleNumberInput = (e: React.ChangeEvent<HTMLInputElement>, setter: (val: string) => void) => {
    setter(e.target.value.replace(/\D/g, ''));
  };

  return (
    <div className="bg-white p-8 sm:p-10 rounded-3xl shadow-xl border border-gray-100">
      
      <style jsx>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-10px); }
          50% { transform: translateX(10px); }
          75% { transform: translateX(-10px); }
        }
        .shake-animation { animation: shake 0.4s ease-in-out; }
      `}</style>

      <h2 className="text-3xl font-extrabold text-center text-gray-900 mb-3">
        Solar Maintenance Request
      </h2>
      <p className="text-center text-gray-500 mb-8 font-medium">
        Keep your solar system running at peak efficiency. Request a service today.
      </p>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">Full Name</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter your full name" className="w-full border border-gray-200 p-4 rounded-xl bg-gray-50 outline-none focus:ring-2 focus:ring-blue-600" required />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Phone Number</label>
            <input type="tel" value={phone} onChange={(e) => handleNumberInput(e, setPhone)} placeholder="10-digit mobile number" className="w-full border border-gray-200 p-4 rounded-xl bg-gray-50 outline-none focus:ring-2 focus:ring-blue-600" required maxLength={10} minLength={10} />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Confirm Phone Number</label>
            <input 
              type="tel" 
              value={verifyPhone} 
              onChange={(e) => handleNumberInput(e, setVerifyPhone)} 
              placeholder="Re-enter phone number" 
              className={`w-full border p-4 rounded-xl outline-none focus:ring-2 focus:ring-blue-600 transition-all ${
                isShaking ? 'shake-animation border-red-500 bg-red-100 text-red-700' : 'border-gray-200 bg-gray-50 text-gray-900'
              }`} 
              required 
              maxLength={10} 
              minLength={10} 
            />
          </div>
        </div>
        
        {error && <p className={`text-red-500 text-sm font-bold mt-1 ${isShaking ? 'shake-animation' : ''}`}>{error}</p>}

        {/* NAYA: Service Type Dropdown */}
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">Type of Service Required</label>
          <select 
            value={issueType} 
            onChange={(e) => setIssueType(e.target.value)}
            className="w-full border border-gray-200 p-4 rounded-xl bg-gray-50 text-gray-900 outline-none focus:ring-2 focus:ring-blue-600 cursor-pointer"
          >
            <option value="Panel Cleaning">Deep Panel Cleaning</option>
            <option value="Inverter Check">Inverter Inspection / Fault</option>
            <option value="Wiring Issue">Wiring / Connection Issue</option>
            <option value="Routine Maintenance">Complete Routine Maintenance</option>
            <option value="Other">Other / Not Sure</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">Site Address</label>
          <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} placeholder="Enter the complete site address" className="w-full border border-gray-200 p-4 rounded-xl bg-gray-50 outline-none focus:ring-2 focus:ring-blue-600" required />
        </div>

        {/* Note: Maintenance button is Blue to differentiate from the Green Sales button */}
        <button type="submit" className="w-full bg-blue-700 text-white py-4 rounded-xl font-bold text-lg hover:bg-blue-800 shadow-lg transition-transform hover:-translate-y-1">
          Submit Service Request
        </button>
      </form>
    </div>
  );
}