"use client";

import { useState } from "react";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: () => void;
}

export default function AuthModal({ isOpen, onClose, onLogin }: AuthModalProps) {
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (!isOpen) return null;

  const handlePhoneLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const digits = phone.replace(/\D/g, "");
    if (digits.length < 10) {
      setError("Please enter a valid 10-digit phone number.");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone: digits }),
      });
      if (res.ok) {
        onLogin();
      } else {
        const data = await res.json();
        setError(data.error || "Failed to login.");
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md relative overflow-hidden">

        {/* Top Accent Bar */}
        <div className="h-2 w-full bg-eco-green" />

        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-9 h-9 flex items-center justify-center bg-gray-100 rounded-full text-gray-600 hover:bg-gray-200 font-bold transition-colors"
          aria-label="Close"
        >
          ✕
        </button>

        <div className="p-8 pb-10">
          {/* Logo + Title */}
          <div className="flex flex-col items-center text-center mb-8">
            <div className="w-16 h-16 bg-eco-green rounded-2xl mb-4 flex items-center justify-center shadow-lg">
              <span className="text-3xl font-black text-eco-yellow leading-none">V</span>
            </div>
            <h2 className="text-2xl font-black text-gray-900 mb-1">Welcome Back</h2>
            <p className="text-gray-500 text-sm px-4">
              Enter your phone number to access your dashboard and book installations.
            </p>
          </div>

          {/* Phone Form */}
          <form onSubmit={handlePhoneLogin} className="flex flex-col gap-4">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Phone Number
              </label>
              <div className="flex gap-3 items-center border-2 border-gray-200 rounded-xl px-4 py-3 focus-within:border-eco-green transition-colors">
                <span className="text-gray-500 font-medium text-sm whitespace-nowrap">🇮🇳 +91</span>
                <div className="w-px h-5 bg-gray-200"></div>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="9024424633"
                  maxLength={10}
                  className="flex-1 bg-transparent text-gray-900 font-medium text-lg focus:outline-none placeholder:text-gray-300"
                  autoFocus
                />
              </div>
            </div>

            {error && (
              <p className="text-red-600 text-sm font-medium bg-red-50 px-4 py-3 rounded-xl border border-red-100">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 rounded-xl bg-eco-green hover:bg-[#033024] text-white font-black text-lg transition-all hover:scale-[1.02] active:scale-95 disabled:opacity-70 disabled:hover:scale-100 shadow-md mt-2"
            >
              {loading ? "Logging in..." : "Login with Phone →"}
            </button>

            <p className="text-center text-xs text-gray-400 mt-1">
              No account needed — we&apos;ll create one automatically for new numbers.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
