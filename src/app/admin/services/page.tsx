import { db } from "@/lib/db";

export default async function ServicesPage() {
  // Yahan 'prisma' ki jagah 'db' aayega 👇
  const services = await db.serviceRequest.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    // ... tera baaki ka HTML code same rahega
    <div>
      <h1 className="text-3xl font-black text-eco-green mb-2">Service Requests</h1>
      <p className="text-gray-500 mb-8">View and manage maintenance requests from existing customers.</p>
      
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100 text-gray-500 text-sm">
                <th className="px-6 py-4 font-bold">Date</th>
                <th className="px-6 py-4 font-bold">Name & Phone</th>
                <th className="px-6 py-4 font-bold">Address</th>
                <th className="px-6 py-4 font-bold">Issue Description</th>
                <th className="px-6 py-4 font-bold text-center">Status</th>
              </tr>
            </thead>
            <tbody>
              {services.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-gray-400">
                    No service requests yet.
                  </td>
                </tr>
              ) : (
                services.map((req) => (
                  <tr key={req.id} className="border-b border-gray-50 hover:bg-gray-50/50">
                    <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-500">
                      {new Date(req.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-bold text-eco-green">{req.name}</div>
                      <div className="font-medium text-gray-500 text-sm mt-1">{req.phone}</div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600 max-w-[200px]">
                      {req.address}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700 font-medium max-w-sm">
                      <div className="bg-orange-50 text-orange-800 p-3 rounded-xl border border-orange-100/50">
                        {req.issue}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="inline-flex items-center justify-center min-w-[100px] px-3 py-1.5 rounded-full text-xs font-bold capitalize bg-yellow-50 text-yellow-700 border border-yellow-200">
                        {req.status === 'PENDING' ? 'Pending' : req.status.toLowerCase().replace('_', ' ')}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
