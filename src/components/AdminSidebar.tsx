"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Users, Wrench, Tag, Star, Image as ImageIcon, Menu, X, Home, Film } from "lucide-react";

export default function AdminSidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  // ✨ FIX: Teri saari purani aur nayi links ek saath sahi format mein
  const menuItems = [
    { name: "Dashboard", icon: LayoutDashboard, href: "/admin" },
    { name: "Leads (Signups)", icon: Users, href: "/admin/leads" },
    { name: "Gallery Studio", icon: ImageIcon, href: "/admin/gallery" },
    { name: "Portfolio Manager", icon: Film, href: "/admin/portfolio" }, // <-- Ye raha naya wala
    { name: "Service Requests", icon: Wrench, href: "/admin/services" },
    { name: "Products & Pricing", icon: Tag, href: "/admin/products" },
    { name: "Reviews", icon: Star, href: "/admin/reviews" },
  ];

  return (
    <>
      {/* MOBILE 3-LINE BUTTON */}
      <button 
        onClick={() => setIsOpen(true)}
        className="md:hidden fixed top-3 left-4 z-40 p-2 bg-gray-900 text-white rounded-lg shadow-lg hover:bg-green-600 transition-colors"
      >
        <Menu className="w-6 h-6" />
      </button>

      {/* KALA PARDA (OVERLAY) */}
      {isOpen && (
        <div 
          onClick={() => setIsOpen(false)} 
          className="md:hidden fixed inset-0 bg-black/60 z-40 backdrop-blur-sm transition-opacity"
        />
      )}

      {/* MAIN SIDEBAR */}
      <div className={`fixed md:sticky top-0 left-0 h-screen w-64 bg-gray-950 text-white flex flex-col border-r border-gray-900 z-50 transition-transform duration-300 ease-in-out ${
        isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
      }`}>
        
        {/* MOBILE CROSS BUTTON */}
        <button 
          onClick={() => setIsOpen(false)}
          className="md:hidden absolute top-4 right-4 text-gray-500 hover:text-white bg-gray-900 p-2 rounded-lg"
        >
          <X className="w-5 h-5" />
        </button>

        {/* LOGO AREA */}
        <div className="p-6 mt-12 md:mt-0">
          <div className="text-2xl font-black text-green-500 tracking-tighter">
            VENUS <span className="text-white">ADMIN</span>
          </div>
        </div>
        
        {/* NAVIGATION LINKS */}
        <nav className="flex flex-col gap-2 px-4 overflow-y-auto">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            
            return (
              <Link 
                key={item.name} 
                href={item.href} 
                onClick={() => setIsOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-bold ${
                  isActive ? 'bg-green-600 text-white shadow-lg' : 'text-gray-400 hover:bg-gray-900 hover:text-white'
                }`}
              >
                <item.icon className="w-5 h-5" /> {item.name}
              </Link>
            )
          })}
        </nav>

        {/* RETURN TO LIVE SITE (Tera purana feature) */}
        <div className="mt-auto p-6 border-t border-gray-900">
          <Link href="/" className="flex items-center gap-2 text-sm text-gray-500 hover:text-green-500 transition-colors font-bold">
            <Home className="w-4 h-4" /> Return to Live Site
          </Link>
        </div>

      </div>
    </>
  );
}