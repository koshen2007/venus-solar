import prisma from '@/lib/db';
import { cookies } from 'next/headers';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function ServicesPage() {
  const cookieStore = await cookies();
  const phone = cookieStore.get('session_phone')?.value;

  // Retrieve user service requests implicitly by phone number match
  const requests = await prisma.serviceRequest.findMany({
    where: { phone: phone },
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div className="p-6 md:p-12 max-w-5xl mx-auto">
      <div className="mb-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-4xl font-black text-eco-green tracking-tight mb-3">Service Requests</h1>
          <p className="text-gray-500 text-lg">View your past maintenance logs and current engineering statuses.</p>
        </div>
        <Link href="/" className="bg-eco-green hover:bg-[#033024] text-white px-6 py-3 rounded-full font-bold shadow-sm transition-transform hover:scale-105 active:scale-95 whitespace-nowrap">
          + Request New Service
        </Link>
      </div>

      {requests.length === 0 ? (
        <div className="bg-white p-12 text-center rounded-3xl border border-gray-100 shadow-sm flex flex-col items-center">
          <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mb-6">
            <svg className="w-10 h-10 text-green-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
          </div>
          <h3 className="text-2xl font-black text-gray-800 mb-2">No Service Requests!</h3>
          <p className="text-gray-500 max-w-md">Your solar installation is running smoothly. Our team has not recorded any active maintenance requests from your phone number.</p>
        </div>
      ) : (
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100 text-sm font-bold text-gray-400 uppercase tracking-widest">
                  <th className="p-6 font-bold">Request Date</th>
                  <th className="p-6 font-bold">Issue Reported</th>
                  <th className="p-6 font-bold">Location</th>
                  <th className="p-6 font-bold text-right">Status</th>
                </tr>
              </thead>
              <tbody>
                {requests.map((req) => (
                  <tr key={req.id} className="border-b border-gray-50 hover:bg-green-50/30 transition-colors group">
                    <td className="p-6 text-gray-700 whitespace-nowrap font-medium">
                      {new Date(req.createdAt).toLocaleDateString('en-IN', {
                        day: 'numeric', month: 'short', year: 'numeric'
                      })}
                    </td>
                    <td className="p-6 text-gray-800 font-bold max-w-xs truncate" title={req.issue}>
                      {req.issue}
                    </td>
                    <td className="p-6 text-gray-500 max-w-xs truncate" title={req.address}>
                      {req.address}
                    </td>
                    <td className="p-6 text-right">
                      <span className={`px-4 py-1.5 rounded-full text-xs font-black tracking-wide uppercase shadow-sm inline-block
                        ${req.status === 'PENDING' ? 'bg-yellow-100 text-yellow-700' : ''}
                        ${req.status === 'IN_PROGRESS' ? 'bg-blue-100 text-blue-700' : ''}
                        ${req.status === 'RESOLVED' ? 'bg-green-100 text-green-700' : ''}
                        ${!['PENDING', 'IN_PROGRESS', 'RESOLVED'].includes(req.status) ? 'bg-gray-100 text-gray-700' : ''}
                      `}>
                        {req.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
