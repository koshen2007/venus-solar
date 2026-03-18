"use client";
import { useState } from "react";
import { Image as ImageIcon, Film, UploadCloud, Trash2, Eye, CheckCircle2 } from "lucide-react";

export default function AdminGallery() {
  const [mediaType, setMediaType] = useState<"Photos" | "Videos">("Photos");
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Residential Setup");
  const [url, setUrl] = useState("");
  const [status, setStatus] = useState<"idle" | "saving" | "saved">("idle");

  // Ye sirf UI check karne ke liye dummy list hai, baad mein Prisma se aayegi
  const [items, setItems] = useState([
    { id: "1", title: "Pali Factory Grid", type: "Photos", category: "Commercial Array", url: "https://images.unsplash.com/photo-1509391366360-1e97f52ce074?w=500&q=80" }
  ]);

  const handlePublish = (e: React.FormEvent) => {
    e.preventDefault();
    if (!url || !title) return;
    
    setStatus("saving");
    setTimeout(() => {
      setItems([{ id: Date.now().toString(), title, type: mediaType, category, url }, ...items]);
      setStatus("saved");
      setTitle(""); setUrl(""); // Form clear
      setTimeout(() => setStatus("idle"), 2000);
    }, 1000);
  };

  return (
    <div className="bg-gray-50 min-h-screen p-4 md:p-8 font-sans">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-5xl font-black text-gray-900 tracking-tight">Gallery Studio</h1>
          <p className="text-gray-500 font-medium mt-2">Publish new projects like an Instagram story.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* LEFT: THE CONTROL PANEL (Form) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white p-6 md:p-8 rounded-[2rem] shadow-sm border border-gray-100">
              <form onSubmit={handlePublish} className="flex flex-col gap-6">
                
                {/* 1. Media Type Toggle (Like Insta Filters) */}
                <div>
                  <label className="text-sm font-bold text-gray-700 block mb-3">Format</label>
                  <div className="flex bg-gray-100 p-1 rounded-2xl">
                    <button type="button" onClick={() => setMediaType("Photos")} className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-bold transition-all ${mediaType === "Photos" ? 'bg-white text-green-600 shadow-sm' : 'text-gray-500 hover:text-gray-900'}`}>
                      <ImageIcon className="w-5 h-5" /> Photo
                    </button>
                    <button type="button" onClick={() => setMediaType("Videos")} className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-bold transition-all ${mediaType === "Videos" ? 'bg-white text-green-600 shadow-sm' : 'text-gray-500 hover:text-gray-900'}`}>
                      <Film className="w-5 h-5" /> Video
                    </button>
                  </div>
                </div>

                {/* 2. Project Details */}
                <div>
                  <label className="text-sm font-bold text-gray-700 block mb-2">Project Title</label>
                  <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required placeholder="e.g., 5kW Setup in Balotra" className="w-full p-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:border-green-500 focus:bg-white focus:outline-none transition-all font-medium" />
                </div>

                <div>
                  <label className="text-sm font-bold text-gray-700 block mb-2">Category Label</label>
                  <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full p-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:border-green-500 focus:bg-white focus:outline-none transition-all font-medium appearance-none cursor-pointer">
                    <option>Residential Setup</option>
                    <option>Commercial Array</option>
                    <option>Industrial Plant</option>
                    <option>Video Case Study</option>
                  </select>
                </div>

                {/* 3. Media Link */}
                <div>
                  <label className="text-sm font-bold text-gray-700 block mb-2">Paste {mediaType} Link</label>
                  <input type="url" value={url} onChange={(e) => setUrl(e.target.value)} required placeholder="https://..." className="w-full p-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:border-green-500 focus:bg-white focus:outline-none transition-all font-medium" />
                  <p className="text-xs text-gray-400 mt-2">*Upload to Imgur/YouTube first, then paste link here.</p>
                </div>

                {/* Publish Button */}
                <button type="submit" disabled={status === "saving" || !url || !title} className={`mt-4 w-full p-5 rounded-2xl font-black text-white transition-all flex items-center justify-center gap-2 ${status === "saved" ? "bg-gray-900" : "bg-green-600 hover:bg-green-500 hover:shadow-lg hover:-translate-y-1"}`}>
                  {status === "idle" && <><UploadCloud className="w-5 h-5" /> Publish to Gallery</>}
                  {status === "saving" && "Publishing..."}
                  {status === "saved" && <><CheckCircle2 className="w-5 h-5 text-green-400" /> Published Live!</>}
                </button>
              </form>
            </div>
          </div>

          {/* RIGHT: LIVE PREVIEW & RECENT POSTS */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* The "Instagram Story" Live Preview Area */}
            <div className="bg-gray-950 rounded-[2.5rem] p-6 md:p-8 text-white flex flex-col items-center justify-center relative overflow-hidden min-h-[300px] border-4 border-gray-900 border-dashed">
              <div className="absolute top-4 left-4 bg-black/50 backdrop-blur-md px-3 py-1 rounded-full flex items-center gap-2 text-xs font-bold text-gray-300 z-20">
                <Eye className="w-4 h-4 text-green-400" /> Live Preview
              </div>
              
              {url ? (
                 <div className="relative w-full max-w-sm rounded-3xl overflow-hidden shadow-2xl aspect-[4/5] bg-gray-900 border border-gray-800">
                    {mediaType === "Photos" ? (
                      <img src={url} alt="Preview" className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gray-800"><Film className="w-16 h-16 text-gray-600" /></div>
                    )}
                    <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/90 to-transparent p-6 pt-20 text-left">
                      <h3 className="font-bold text-xl text-white leading-tight">{title || "Your Title Here"}</h3>
                      <p className="text-green-400 text-sm font-medium mt-1">{category}</p>
                    </div>
                 </div>
              ) : (
                <div className="text-center opacity-40">
                  <ImageIcon className="w-16 h-16 mx-auto mb-4" />
                  <p className="font-medium">Paste a link to see the magic.</p>
                </div>
              )}
            </div>

            {/* Recent Posts Grid (Quick Delete) */}
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-4 px-2">Recently Published</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {items.map(item => (
                  <div key={item.id} className="group relative rounded-2xl overflow-hidden aspect-square bg-gray-200">
                    <img src={item.url} className="w-full h-full object-cover" alt="post" />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <button onClick={() => setItems(items.filter(i => i.id !== item.id))} className="bg-red-500 text-white p-3 rounded-full hover:bg-red-600 hover:scale-110 transition-transform">
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}