"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Image as ImageIcon, IndianRupee } from "lucide-react";

export default function AdminSidebar() {
  const pathname = usePathname();
  
  const menuItems = [
    { name: "Business Stats", icon: LayoutDashboard, href: "/admin" },
    { name: "Gallery Studio", icon: ImageIcon, href: "/admin/gallery" },
    { name: "Pricing Manager", icon: IndianRupee, href: "/admin/pricing" },
  ];

  return (
    <div className="w-64 bg-gray-950 text-white min-h-screen p-4 flex flex-col gap-2 border-r border-gray-900">
      <div className="text-2xl font-black text-green-500 mb-8 px-4 mt-4 tracking-tighter">VENUS <span className="text-white">ADMIN</span></div>
      
      {menuItems.map((item) => {
        const isActive = pathname === item.href;
        return (
          <Link 
            key={item.name} 
            href={item.href} 
            className={`flex items-center gap-3 px-4 py-4 rounded-2xl transition-all font-bold ${
              isActive ? 'bg-green-600 text-white shadow-lg' : 'text-gray-400 hover:bg-gray-900 hover:text-white'
            }`}
          >
            <item.icon className="w-5 h-5" /> {item.name}
          </Link>
        )
      })}
    </div>
  );
}