import Link from "next/link";
import { FaInbox, FaTools, FaTags, FaStar, FaHome } from "react-icons/fa";

export default function AdminSidebar() {
  const menuItems = [
    { name: "Dashboard", icon: FaHome, href: "/admin" },
    { name: "Leads (Signups)", icon: FaInbox, href: "/admin/leads" },
    { name: "Service Requests", icon: FaTools, href: "/admin/services" },
    { name: "Products & Pricing", icon: FaTags, href: "/admin/products" },
    { name: "Review Moderation", icon: FaStar, href: "/admin/reviews" },
  ];

  return (
    <aside className="w-64 bg-eco-green text-white flex flex-col min-h-screen shadow-xl hidden md:flex">
      <div className="p-6">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-8 h-8 rounded-full bg-eco-yellow flex items-center justify-center">
            <span className="text-eco-green font-bold text-xl leading-none">V</span>
          </div>
          <h1 className="text-xl font-black text-eco-yellow tracking-tight">Admin Area</h1>
        </div>

        <nav className="flex flex-col gap-2">
          {menuItems.map((item) => (
            <Link 
              key={item.href} 
              href={item.href}
              className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/10 transition-colors text-sm font-medium"
            >
              <item.icon className="w-5 h-5 opacity-75" />
              {item.name}
            </Link>
          ))}
        </nav>
      </div>

      <div className="mt-auto p-6 text-sm text-green-200/50">
        <p>Return to <Link href="/" className="underline hover:text-white">Live Site</Link></p>
      </div>
    </aside>
  );
}
