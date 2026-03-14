import prisma from "@/lib/db";
import Link from "next/link";
import { FaInbox, FaTools, FaStar } from "react-icons/fa";

export default async function AdminDashboard() {
  const leadsCount = await prisma.lead.count();
  const serviceCount = await prisma.serviceRequest.count();
  const reviewsCount = await prisma.review.count({ where: { isApproved: false } });

  return (
    <div>
      <h1 className="text-3xl font-black text-eco-green mb-8">Dashboard Overview</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        <Link href="/admin/leads" className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:border-eco-green hover:shadow-md transition-all flex items-center justify-between group">
          <div>
            <p className="text-gray-500 font-medium mb-1">Total Leads</p>
            <h2 className="text-4xl font-black text-eco-green">{leadsCount}</h2>
          </div>
          <div className="bg-blue-50 p-4 rounded-xl text-blue-500 group-hover:bg-blue-100 transition-colors">
            <FaInbox className="w-8 h-8" />
          </div>
        </Link>
        
        <Link href="/admin/services" className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:border-eco-green hover:shadow-md transition-all flex items-center justify-between group">
          <div>
            <p className="text-gray-500 font-medium mb-1">Service Requests</p>
            <h2 className="text-4xl font-black text-eco-green">{serviceCount}</h2>
          </div>
          <div className="bg-yellow-50 p-4 rounded-xl text-yellow-600 group-hover:bg-yellow-100 transition-colors">
            <FaTools className="w-8 h-8" />
          </div>
        </Link>
        
        <Link href="/admin/reviews" className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:border-eco-green hover:shadow-md transition-all flex items-center justify-between group">
          <div>
            <p className="text-gray-500 font-medium mb-1">Pending Reviews</p>
            <h2 className="text-4xl font-black text-eco-green">{reviewsCount}</h2>
          </div>
          <div className="bg-purple-50 p-4 rounded-xl text-purple-500 group-hover:bg-purple-100 transition-colors">
            <FaStar className="w-8 h-8" />
          </div>
        </Link>

      </div>
    </div>
  );
}
