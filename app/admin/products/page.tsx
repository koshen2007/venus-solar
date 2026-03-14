import prisma from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function ProductsPage() {
  const products = await prisma.product.findMany({
    orderBy: { createdAt: "desc" }
  });

  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <h1 className="text-3xl font-black text-eco-green">Products & Pricing</h1>
        <button className="bg-eco-green hover:bg-[#033024] text-white px-5 py-2.5 rounded-full font-bold text-sm shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2">
          + Add New Product
        </button>
      </div>
      <p className="text-gray-500 mb-8">Manage solar packages, their capacities, and estimated pricing shown on the live site.</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.length === 0 ? (
          <div className="col-span-full bg-white p-12 text-center rounded-2xl border border-gray-100 shadow-sm text-gray-400">
            No products added yet. Click "+ Add New Product" to get started!
          </div>
        ) : (
          products.map((product) => (
            <div key={product.id} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:border-eco-green hover:shadow-md transition-all group flex flex-col justify-between h-full">
              
              <div className="mb-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-black text-eco-green pr-4">{product.name}</h3>
                  <div className="bg-green-50 text-eco-green px-2 py-1 rounded-md text-xs font-bold whitespace-nowrap">
                    {product.capacity}
                  </div>
                </div>
                
                <h4 className="text-2xl font-bold text-gray-800 mb-3">{product.price}</h4>
                
                <div className="bg-gray-50 rounded-lg p-3 text-sm text-gray-600 border border-gray-100 italic">
                  <strong>Optimal For:</strong> {product.optimalFor}
                </div>
              </div>

              <div className="flex gap-2 border-t border-gray-50 pt-4 mt-auto">
                <button className="w-1/2 bg-gray-50 hover:bg-gray-100 text-gray-700 py-2 rounded-xl text-sm font-bold border border-gray-200 transition-colors">
                  Edit
                </button>
                <button className="w-1/2 bg-red-50 hover:bg-red-100 text-red-600 py-2 rounded-xl text-sm font-bold border border-red-100 transition-colors">
                  Delete
                </button>
              </div>

            </div>
          ))
        )}
      </div>
    </div>
  );
}
