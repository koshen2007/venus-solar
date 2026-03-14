import prisma from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function LeadsPage() {
  const leads = await prisma.lead.findMany({
    orderBy: { createdAt: "desc" }
  });

  return (
    <div>
      <h1 className="text-3xl font-black text-eco-green mb-2">Lead Management</h1>
      <p className="text-gray-500 mb-8">View contact form submissions from potential customers.</p>
      
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100 text-gray-500 text-sm">
                <th className="px-6 py-4 font-bold">Date</th>
                <th className="px-6 py-4 font-bold">Name</th>
                <th className="px-6 py-4 font-bold">Phone Number</th>
                <th className="px-6 py-4 font-bold">Address/Info</th>
                <th className="px-6 py-4 font-bold text-center">Status</th>
              </tr>
            </thead>
            <tbody>
              {leads.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-gray-400">
                    No leads generated yet. Check back later!
                  </td>
                </tr>
              ) : (
                leads.map((lead) => (
                  <tr key={lead.id} className="border-b border-gray-50 hover:bg-gray-50/50">
                    <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-500">
                      {new Date(lead.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 font-bold text-eco-green">
                      {lead.name}
                    </td>
                    <td className="px-6 py-4 font-medium text-gray-700">
                      <a href={`tel:${lead.phone}`} className="hover:text-eco-green hover:underline">
                        {lead.phone}
                      </a>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600 max-w-sm">
                      {lead.address}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold capitalize bg-blue-50 text-blue-700 border border-blue-200">
                        {lead.status.toLowerCase()}
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
