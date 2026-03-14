import Link from 'next/link';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import LogoutButton from '@/components/LogoutButton';

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies();
  const phone = cookieStore.get('session_phone')?.value;

  if (!phone) {
    redirect('/');
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row">
      {/* Sidebar */}
      <nav className="w-full md:w-72 bg-eco-green text-white flex flex-col py-8 px-6 shadow-xl z-10 sticky top-0 md:h-screen">
        <Link href="/" className="mb-12 flex flex-col items-center gap-3 group">
          <div className="w-16 h-16 bg-eco-yellow rounded-full flex items-center justify-center transform group-hover:scale-105 transition-transform shadow-lg">
            <span className="text-3xl font-black text-eco-green leading-none">V</span>
          </div>
          <span className="font-bold text-xl tracking-tight">Return Home</span>
        </Link>
        
        <div className="flex flex-col w-full gap-3">
          <div className="text-xs font-bold text-white/50 uppercase tracking-widest px-4 mb-2">My Account</div>
          
          <Link href="/dashboard/installation" className="w-full px-5 py-4 hover:bg-[#043427] rounded-xl flex items-center gap-4 font-medium transition-colors border border-transparent hover:border-white/10">
            <svg className="w-5 h-5 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
            Installation Status
          </Link>
          
          <Link href="/dashboard/documents" className="w-full px-5 py-4 hover:bg-[#043427] rounded-xl flex items-center gap-4 font-medium transition-colors border border-transparent hover:border-white/10">
            <svg className="w-5 h-5 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
            My Documents
          </Link>
          
          <Link href="/dashboard/services" className="w-full px-5 py-4 hover:bg-[#043427] rounded-xl flex items-center gap-4 font-medium transition-colors border border-transparent hover:border-white/10">
            <svg className="w-5 h-5 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
            Service History
          </Link>
        </div>
        
        <div className="mt-auto pt-8 border-t border-white/10 w-full text-center">
          <p className="text-xs text-white/50 mb-1 uppercase tracking-wider">Logged in as</p>
          <p className="text-sm font-bold text-white mb-6">+{phone.replace(/(\d{2})(\d{5})(\d{5})/, "$1 $2 $3")}</p>
          <LogoutButton />
        </div>
      </nav>
      
      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
