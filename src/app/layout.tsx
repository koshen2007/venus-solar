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

// 🚀 THE ULTIMATE RAJASTHAN SEO ENGINE 🚀
export const metadata: Metadata = {
  metadataBase: new URL('https://venus-solar-wlzw.vercel.app'), // Apni live link yahan confirm kar lena
  title: {
    default: "Venus Solar Energy | Best Solar Installers in Jodhpur, Pali & Rajasthan",
    template: "%s | Venus Solar Energy"
  },
  description: "Experience zero grid dependency! Venus Solar Energy is the #1 Top-Rated solar panel installation company in Jodhpur, Pali, Siwana, and across all of Rajasthan. Get your free solar quote, maintenance, and expert installation today.",
  keywords: [
    // Main Targets
    "Best Solar company in Rajasthan", "Solar installers in Jodhpur", "Solar panels in Pali",
    // Regional Targets
    "Solar plant installation Siwana", "Solar agency near me", "Top solar provider in Marwar",
    // Product & Services
    "Solar subsidy Rajasthan 2024", "Commercial solar installation", "Residential solar panels", 
    "Solar maintenance services", "On-grid solar systems", "Off-grid solar Rajasthan",
    // Brand
    "Venus Solar", "Venus Solar Energy", "Venus Solar Jodhpur"
  ],
  authors: [{ name: "Venus Solar Energy" }],
  creator: "Venus Solar Energy",
  publisher: "Venus Solar Energy",
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://venus-solar-wlzw.vercel.app",
    title: "Venus Solar Energy | Best Solar Installers in Rajasthan",
    description: "Switch to clean energy with Rajasthan's most trusted solar experts. Serving Jodhpur, Pali, and beyond.",
    siteName: "Venus Solar Energy",
    images: [
      {
        url: "https://images.unsplash.com/photo-1509391366360-1e97f52ce074?w=1200&h=630&fit=crop", // WhatsApp/Facebook pe link share karne pe ye photo aayegi
        width: 1200,
        height: 630,
        alt: "Venus Solar Energy Installation Rajasthan",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Venus Solar Energy | Top Solar Installers in Jodhpur & Pali",
    description: "Switch to clean energy with Rajasthan's most trusted solar experts.",
    images: ["https://images.unsplash.com/photo-1509391366360-1e97f52ce074?w=1200&h=630&fit=crop"],
  },
  alternates: {
    canonical: "https://venus-solar-wlzw.vercel.app",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  // 🚀 THE ULTIMATE GOOGLE BOT MANIPULATOR (JSON-LD STRUCTURED DATA) 🚀
  // Ye code Google ke bots ko directly data feed karta hai
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness", // Google ko pata chalega ki ye solar/construction type business hai
    "name": "Venus Solar Energy",
    "image": "https://images.unsplash.com/photo-1509391366360-1e97f52ce074?w=1200&h=630&fit=crop",
    "@id": "https://venus-solar-wlzw.vercel.app",
    "url": "https://venus-solar-wlzw.vercel.app",
    "telephone": "+919024424633", // Tera official number Google direct uthayega
    "priceRange": "₹₹₹",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Venus Solar Energy Office",
      "addressLocality": "Siwana",
      "addressRegion": "Rajasthan",
      "postalCode": "344044", 
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 25.6387, // Siwana ke aas paas ka map coordinate
      "longitude": 72.4137
    },
    "areaServed": [
      { "@type": "City", "name": "Jodhpur" },
      { "@type": "City", "name": "Pali" },
      { "@type": "City", "name": "Barmer" },
      { "@type": "State", "name": "Rajasthan" }
    ],
    "description": "Zero grid dependency! Venus Solar Energy is the #1 Top-Rated solar panel installation company in Jodhpur, Pali, Siwana, and across all of Rajasthan.",
    "sameAs": [
      "https://www.instagram.com/", // Yahan baad mein apne Insta/FB ke link daal dena
      "https://www.facebook.com/"
    ]
  };

  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col bg-gray-950`}>
        
        {/* ✨ YE HAI WO HIDDEN SCRIPT JO SIRF GOOGLE KE BOTS PADH PAAENGE ✨ */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        <Header />
        <main className="flex-grow w-full">
          {children}
        </main>
        <Footer />
        <FloatingWhatsApp />
      </body>
    </html>
  );
}