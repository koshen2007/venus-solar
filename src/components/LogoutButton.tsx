"use client";

import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();
  
  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      router.push('/');
      router.refresh();
    } catch(err) {
      console.error(err);
    }
  };

  return (
    <button 
      onClick={handleLogout}
      className="text-sm font-bold text-eco-yellow hover:text-yellow-300 transition-colors w-full p-2 bg-white/5 rounded-lg"
    >
      Log Out
    </button>
  );
}
