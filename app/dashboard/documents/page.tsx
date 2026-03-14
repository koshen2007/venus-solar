export const dynamic = 'force-dynamic';

export default function DocumentsPage() {
  const documents = [
    { title: "Solar Installation Invoice", date: "Oct 12, 2023", size: "2.4 MB", type: "PDF", status: "Available" },
    { title: "Panel 10-Year Warranty", date: "Oct 15, 2023", size: "1.1 MB", type: "PDF", status: "Available" },
    { title: "Inverter 5-Year Warranty", date: "Oct 15, 2023", size: "0.8 MB", type: "PDF", status: "Available" },
    { title: "Grid Sync Completion Certificate", date: "Pending generation", size: "--", type: "PDF", status: "Processing" }
  ];

  return (
    <div className="p-6 md:p-12 max-w-5xl mx-auto">
      <div className="mb-10">
        <h1 className="text-4xl font-black text-eco-green tracking-tight mb-3">My Documents</h1>
        <p className="text-gray-500 text-lg">Download your invoices, warranties, and official certificates here.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {documents.map((doc, idx) => (
          <div key={idx} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:border-eco-yellow hover:shadow-md transition-all group flex items-start gap-5">
            
            <div className="w-14 h-14 rounded-xl bg-green-50 text-eco-green flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"></path></svg>
            </div>
            
            <div className="flex-1">
              <h3 className="text-lg font-bold text-gray-800 mb-1 leading-tight">{doc.title}</h3>
              <div className="flex items-center gap-3 text-sm text-gray-500 mb-4">
                <span className="font-medium text-eco-yellow">{doc.type}</span>
                <span>•</span>
                <span>{doc.size}</span>
                <span>•</span>
                <span>{doc.date}</span>
              </div>
              
              {doc.status === 'Available' ? (
                <button className="text-sm font-bold text-eco-green bg-green-50 px-4 py-2 rounded-lg hover:bg-green-100 transition-colors flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
                  Download
                </button>
              ) : (
                <span className="text-sm font-bold text-gray-400 bg-gray-50 px-4 py-2 rounded-lg border border-gray-100">
                  Currently Processing...
                </span>
              )}
            </div>
            
          </div>
        ))}
      </div>
    </div>
  );
}
