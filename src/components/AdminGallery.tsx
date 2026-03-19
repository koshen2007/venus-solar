"use client";
import { useState } from "react";
import { UploadButton } from "@uploadthing/react";
// Ye line error degi agar tune Step 1 (folder theek karna) nahi kiya toh!
import type { OurFileRouter } from "@/app/api/uploadthing/core"; 
import "@uploadthing/react/styles.css";
import { Image as ImageIcon, CheckCircle2 } from "lucide-react";

export default function AdminGallery() {
  const [imageUrl, setImageUrl] = useState("");
  const [category, setCategory] = useState("Residential Setup");
  const [status, setStatus] = useState("idle");

  const handlePublish = () => {
     if(!imageUrl) return alert("Pehle photo toh upload kar Seth!");
     setStatus("saved");
     // Baad mein hum ise database mein save karenge, abhi bas UI hai
     setTimeout(() => { setStatus("idle"); setImageUrl(""); }, 2000);
  };

  return (
    <div className="p-4 md:p-8 max-w-4xl mx-auto font-sans">
      <h2 className="text-2xl md:text-3xl font-black mb-8 text-gray-900 flex items-center gap-3">
        <ImageIcon className="text-green-600 w-8 h-8" /> Gallery Studio
      </h2>

      <div className="bg-white p-6 md:p-8 rounded-[2rem] shadow-sm border border-gray-100 mb-8">
        <h3 className="font-bold text-lg mb-6 text-gray-800">Add New Project</h3>

        <div className="space-y-6">
          <div>
            <label className="text-xs font-bold text-gray-500 uppercase">Category Label</label>
            <input type="text" value={category} onChange={(e)=>setCategory(e.target.value)} className="w-full mt-1 p-4 bg-gray-50 border-2 border-transparent rounded-xl focus:border-green-500 outline-none font-medium text-gray-900" />
          </div>

          {/* THE MAGIC UPLOAD SECTION */}
          <div>
            <label className="text-xs font-bold text-gray-500 uppercase block mb-2">Upload Photo</label>
            <div className="border-2 border-dashed border-gray-200 rounded-2xl p-6 md:p-10 flex flex-col items-center justify-center bg-gray-50/50 min-h-[200px]">
              {imageUrl ? (
                <div className="text-center">
                  <img src={imageUrl} alt="Uploaded" className="h-40 rounded-xl mb-3 object-cover shadow-sm mx-auto" />
                  <p className="text-sm font-bold text-green-600 flex items-center gap-1 justify-center"><CheckCircle2 className="w-4 h-4" /> Uploaded Successfully</p>
                </div>
              ) : (
                // Ye hai tera premium "Choose File" button
                <UploadButton<OurFileRouter, "imageUploader">
                  endpoint="imageUploader"
                  onClientUploadComplete={(res) => {
                    setImageUrl(res[0].url);
                    alert("Photo aagayi godown mein! 🎉");
                  }}
                  onUploadError={(error: Error) => {
                    alert(`Kalesh ho gaya: ${error.message}`);
                  }}
                  className="ut-button:bg-gray-900 ut-button:ut-readying:bg-gray-900/50 ut-button:hover:bg-black ut-allowed-content:text-gray-500"
                />
              )}
            </div>
          </div>

          <button onClick={handlePublish} className={`w-full p-4 rounded-xl font-bold text-white transition-all flex items-center justify-center gap-2 ${imageUrl ? 'bg-green-600 hover:bg-green-500 hover:-translate-y-1 shadow-md' : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}>
            {status === "idle" ? "Publish to Gallery" : "Published!"}
          </button>
        </div>
      </div>
    </div>
  );
}