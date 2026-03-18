import React from "react";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Ye raha tera asali SEO mantar!
export const metadata: Metadata = {
  title: "Venus Solar Energy | Best Solar Installers in Rajasthan",
  description: "Zero grid dependency with Venus Solar. Top-rated solar installation in Siwana, Jodhpur, and across Rajasthan. Get your free quote today!",
  keywords: ["Solar panels Siwana", "Solar installation Rajasthan", "Venus Solar Energy", "Best solar company Jodhpur", "Solar subsidy Rajasthan"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col bg-gray-950`}>
        <Header />
        
        {/* Mobile aur Laptop dono ke liye perfect spacing */}
        <main className="flex-grow w-full max-w-7xl mx-auto px-4 md:px-12 py-6 md:py-10">
          {children}
        </main>
        
        <Footer />
        <FloatingWhatsApp />
      </body>
    </html>
  );
}