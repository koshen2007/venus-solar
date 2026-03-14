"use client";

import { useState, useRef } from "react";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import ContactForm from "@/components/ContactForm";
import AuthModal from "@/components/AuthModal";
import SavingsCalculator from "@/components/SavingsCalculator";
import ServiceForm from "@/components/ServiceForm";
import Portfolio from "@/components/Portfolio";
import FAQ from "@/components/FAQ";

export default function Home() {
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const contactFormRef = useRef<HTMLElement>(null);

  const handleBookClick = () => {
    if (!isLoggedIn) {
      setIsAuthOpen(true);
    } else {
      contactFormRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
    setIsAuthOpen(false);
    setTimeout(() => {
      contactFormRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 300);
  };

  return (
    <>
      {/* 1. Hero */}
      <Hero onBookClick={handleBookClick} />

      {/* 2. Pricing / Services */}
      <Services onContactClick={handleBookClick} />

      {/* 3. Recent Works / Portfolio */}
      <div className="w-full max-w-lg mx-auto border-t-2 border-gray-100 my-4"></div>
      <Portfolio />

      {/* 4. FAQ */}
      <div className="w-full max-w-lg mx-auto border-t-2 border-gray-100 my-4"></div>
      <FAQ />

      {/* 5. Contact / Booking Form */}
      <div className="w-full max-w-lg mx-auto border-t-2 border-gray-100 my-4"></div>
      <ContactForm ref={contactFormRef} />

      {/* 6. Service / Maintenance Request Form */}
      <div className="w-full max-w-lg mx-auto border-t-2 border-gray-100 my-4"></div>
      <ServiceForm />

      {/* 7. Solar Savings Calculator (bottom of page) */}
      <div className="w-full max-w-lg mx-auto border-t-2 border-gray-100 my-4"></div>
      <SavingsCalculator />

      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onLogin={handleLogin}
      />
    </>
  );
}
