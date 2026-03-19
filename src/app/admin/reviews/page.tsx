import { db } from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function ReviewsPage() {
  const reviews = await db.review.findMany({
    orderBy: { createdAt: "desc" }
  });

  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <h1 className="text-3xl font-black text-eco-green">Review Moderation</h1>
        <button className="bg-eco-green hover:bg-[#033024] text-white px-5 py-2.5 rounded-full font-bold text-sm shadow-sm transition-all">
          + Add Dummy Review
        </button>
      </div>
      <p className="text-gray-500 mb-8">Approve or reject customer reviews before they appear on the live site.</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {reviews.length === 0 ? (
          <div className="col-span-full bg-white p-12 text-center rounded-2xl border border-gray-100 shadow-sm text-gray-400">
            No reviews submitted yet.
          </div>
        ) : (
          reviews.map((rev) => (
            <div key={rev.id} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between h-full hover:border-eco-yellow transition-all">
              <div>
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-bold text-lg text-eco-green">{rev.author}</h3>
                    <div className="flex text-eco-yellow text-sm mt-1 gap-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <span key={i} className={i < rev.rating ? "opacity-100" : "opacity-30"}>★</span>
                      ))}
                    </div>
                  </div>
                  {rev.isApproved ? (
                    <span className="bg-green-100 text-green-700 text-xs font-bold px-2.5 py-1 rounded-full border border-green-200">Live</span>
                  ) : (
                    <span className="bg-amber-100 text-amber-700 text-xs font-bold px-2.5 py-1 rounded-full border border-amber-200">Pending</span>
                  )}
                </div>
                <p className="text-gray-600 mb-6 italic">"{rev.text}"</p>
              </div>
              
              <div className="flex gap-3 pt-4 border-t border-gray-50">
                {!rev.isApproved && (
                  <button className="flex-1 bg-eco-green/10 hover:bg-eco-green/20 text-eco-green font-bold py-2 rounded-xl text-sm transition-colors">
                    Approve
                  </button>
                )}
                <button className="flex-1 bg-red-50 hover:bg-red-100 text-red-600 font-bold py-2 rounded-xl text-sm transition-colors border border-red-100/50">
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
