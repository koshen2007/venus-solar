"use client";
import { useState, useEffect } from "react";

export default function ProductsPage() {
  const [showForm, setShowForm] = useState(false);
  const [products, setProducts] = useState<any[]>([]);
  // File state defined
  const [file, setFile] = useState<File | null>(null);

  const fetchProducts = async () => {
    const res = await fetch("/api/products");
    const data = await res.json();
    setProducts(Array.isArray(data) ? data : []);
  };

  useEffect(() => { fetchProducts(); }, []);

  async function handleSubmit(e: any) {
    e.preventDefault();
    const formData = new FormData(e.target);
    
    // Convert all form fields to a JSON object
    const data = Object.fromEntries(formData);
    
    // Add the file to FormData if it exists
    if (file) {
      formData.append("image", file);
    }

    // Since we are sending FormData, we don't need 'headers': { 'Content-Type': 'application/json' }
    // Next.js handles it automatically when passing FormData in 'body'
    const res = await fetch("/api/products", {
      method: "POST",
      body: formData,
    });

    if (res.ok) {
      alert("Product add ho gaya!");
      setShowForm(false);
      fetchProducts();
      setFile(null); // Clear the file state
    } else {
      alert("Database kalesh! check terminal.");
    }
  }

  return (
    <div className="p-8 bg-gray-100 min-h-screen text-gray-900">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Products & Pricing</h1>
        <button onClick={() => setShowForm(true)} className="bg-green-600 text-white px-4 py-2 rounded-lg font-bold">+ Add New Product</button>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white p-6 rounded-xl shadow-xl w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Add New Product</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input name="name" placeholder="Product Name" className="w-full border border-gray-300 p-2 rounded text-gray-900 bg-white" required />
              <input name="capacity" placeholder="Capacity (e.g. 5kW)" className="w-full border border-gray-300 p-2 rounded text-gray-900 bg-white" required />
              <input name="price" placeholder="Price" className="w-full border border-gray-300 p-2 rounded text-gray-900 bg-white" required />
              <input name="optimalFor" placeholder="Optimal For (e.g. 2BHK)" className="w-full border border-gray-300 p-2 rounded text-gray-900 bg-white" required />
              
              {/* Photo Input: Add a file type input */}
              <input 
                name="image" 
                type="file" 
                accept="image/*"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
                className="w-full border border-gray-300 p-2 rounded text-gray-900 bg-white" 
              />
              
              <div className="flex gap-2">
                <button type="submit" className="flex-1 bg-green-600 text-white p-2 rounded font-bold">Save</button>
                <button type="button" onClick={() => setShowForm(false)} className="flex-1 bg-gray-200 p-2 rounded">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Product List Display */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.length === 0 ? (
          <p className="col-span-full text-center py-20 text-gray-500">Abhi tak koi product nahi hai.</p>
        ) : (
          products.map((p: any) => (
            <div key={p.id} className="bg-white p-4 rounded-xl shadow border border-gray-200">
              {p.image && <img src={p.image} alt={p.name} className="w-full h-32 object-cover rounded mb-2" />}
              <h3 className="font-bold text-gray-900">{p.name}</h3>
              <p className="text-green-600 font-bold">₹{p.price}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}