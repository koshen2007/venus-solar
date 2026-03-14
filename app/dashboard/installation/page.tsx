import prisma from '@/lib/db';
import { cookies } from 'next/headers';

export const dynamic = 'force-dynamic';

export default async function InstallationStatusPage() {
  const cookieStore = await cookies();
  const phone = cookieStore.get('session_phone')?.value;

  // Retrieve user and their installation status
  const user = await prisma.user.findUnique({
    where: { phone },
    include: { installationStatus: true }
  });

  const progress = user?.installationStatus?.progress || 10;
  const statusLine = user?.installationStatus?.status || "Processing";

  const steps = [
    { name: "Order Placed", minProgress: 10 },
    { name: "Site Inspection Complete", minProgress: 25 },
    { name: "Materials Dispatched", minProgress: 50 },
    { name: "Installation Scheduled", minProgress: 75 },
    { name: "System Activated", minProgress: 100 }
  ];

  return (
    <div className="p-6 md:p-12 max-w-5xl mx-auto">
      <div className="mb-10">
        <h1 className="text-4xl font-black text-eco-green tracking-tight mb-3">Installation Tracker</h1>
        <p className="text-gray-500 text-lg">Track the real-time progress of your solar system installation.</p>
      </div>

      <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-gray-100 relative overflow-hidden">
        {/* Background glow */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-eco-yellow rounded-full mix-blend-multiply filter blur-3xl opacity-10 transform translate-x-1/3 -translate-y-1/3"></div>

        <div className="mb-12 flex justify-between items-end">
          <div>
            <h2 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-1">Current Status</h2>
            <p className="text-3xl font-black text-eco-green">{statusLine}</p>
          </div>
          <div className="text-right">
            <h2 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-1">Completion</h2>
            <p className="text-4xl font-black text-eco-yellow">{progress}%</p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="relative w-full h-4 bg-gray-100 rounded-full mb-16 overflow-hidden">
          <div 
            className="absolute top-0 left-0 h-full bg-eco-green transition-all duration-1000 ease-out rounded-full"
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        {/* Steps List */}
        <div className="space-y-6 relative">
          <div className="absolute left-[15px] top-2 bottom-2 w-0.5 bg-gray-100"></div>
          
          {steps.map((step, idx) => {
            const isCompleted = progress >= step.minProgress;
            const isCurrent = progress === step.minProgress;
            
            return (
              <div key={idx} className={`flex items-center gap-6 relative ${isCompleted ? 'opacity-100' : 'opacity-40'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center z-10 
                  ${isCompleted ? 'bg-eco-green text-white shadow-md' : 'bg-gray-200 text-gray-400'}
                  ${isCurrent ? 'ring-4 ring-green-100' : ''}`}>
                  {isCompleted ? (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                  ) : (
                    <span className="text-xs font-bold">{idx + 1}</span>
                  )}
                </div>
                <div>
                  <h3 className={`font-bold text-lg ${isCompleted ? 'text-gray-800' : 'text-gray-500'}`}>{step.name}</h3>
                  {isCurrent && <p className="text-sm text-eco-green font-semibold mt-1">We are currently working on this step.</p>}
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
}
