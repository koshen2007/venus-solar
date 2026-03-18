"use client";
import { useState, useEffect } from "react";

export default function ProductsPage() {
  const [showForm, setShowForm] = useState(false);
  const [products, setProducts] = useState<any[]>([]);
  
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [capacity, setCapacity] = useState("");
  const [optimalFor, setOptimalFor] = useState("");
  const [location, setLocation] = useState(""); 

  const fetchProducts = async () => {
    const res = await fetch("/api/products");
    if (res.ok) setProducts(await res.json());
  };

  useEffect(() => { fetchProducts(); }, []);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const res = await fetch("/api/products", {
      method: "POST",
      body: JSON.stringify({ name, price, capacity, optimalFor, location }),
      headers: { "Content-Type": "application/json" },
    });
    if (res.ok) {
      setShowForm(false);
      setName(""); setPrice(""); setCapacity(""); setOptimalFor(""); setLocation("");
      fetchProducts();
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Bhai pakka udana hai isko?")) return;
    const res = await fetch("/api/products", {
      method: "DELETE",
      body: JSON.stringify({ id }),
      headers: { "Content-Type": "application/json" }
    });
    if (res.ok) fetchProducts();
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen text-gray-900">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-green-800">Venus Admin (Products)</h1>
        <button onClick={() => setShowForm(true)} className="bg-green-600 text-white px-6 py-2 rounded-xl font-bold">+ Add New Product</button>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50">
          <div className="bg-white p-8 rounded-2xl w-full max-w-md relative">
            <button onClick={() => setShowForm(false)} className="absolute top-4 right-6 text-3xl font-bold text-red-500">×</button>
            <h2 className="text-2xl font-bold mb-6">Add Product</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" className="w-full border p-3 rounded-lg" required />
              <input value={price} onChange={(e) => setPrice(e.target.value)} placeholder="Price" className="w-full border p-3 rounded-lg" required />
              <input value={capacity} onChange={(e) => setCapacity(e.target.value)} placeholder="Capacity" className="w-full border p-3 rounded-lg" required />
              <input value={optimalFor} onChange={(e) => setOptimalFor(e.target.value)} placeholder="Optimal For" className="w-full border p-3 rounded-lg" required />
              <input value={location} onChange={(e) => setLocation(e.target.value)} placeholder="Delivery Location (e.g. Siwana)" className="w-full border p-3 rounded-lg" required />
              <button type="submit" className="w-full bg-green-600 text-white p-3 rounded-lg font-bold">Save Product</button>
            </form>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {products.map((p) => (
          <div key={p.id} className="bg-white p-6 rounded-2xl shadow-sm border relative">
            <button onClick={() => handleDelete(p.id)} className="absolute top-4 right-4 bg-red-100 hover:bg-red-500 text-red-600 hover:text-white w-8 h-8 rounded-full flex items-center justify-center">🗑️</button>
            <div className="h-40 bg-gray-100 rounded-xl mb-4 flex items-center justify-center text-gray-400">Image aayegi</div>
            <h3 className="font-bold text-xl mb-1 pr-8">{p.name}</h3>
            <p className="text-green-600 font-extrabold text-2xl mb-2">₹{p.price}</p>
            <p className="text-sm">⚡ {p.capacity} | 🏠 {p.optimalFor}</p>
            {p.location && <p className="text-xs mt-2 text-gray-600">📍 {p.location}</p>}
          </div>
        ))}
      </div>
    </div>
  );
}