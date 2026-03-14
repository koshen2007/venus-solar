import AdminSidebar from "@/components/AdminSidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-gray-50 flex-col md:flex-row">
      <AdminSidebar />
      <main className="flex-1 w-full mx-auto">
        {/* Mobile Header logic here if needed */}
        <div className="md:hidden p-4 bg-eco-green text-eco-yellow font-black text-xl text-center">
          Venus Solar Admin (Desktop Preferred)
        </div>
        
        <div className="p-6 md:p-10 max-w-6xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
