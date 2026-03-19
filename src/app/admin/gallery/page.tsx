import { db } from "@/lib/db";
import Image from "next/image";
import { Trash2, ExternalLink, ImageIcon } from "lucide-react";
import { deleteImage } from "./actions"; 
import { revalidatePath } from "next/cache";
import UploadSection from "@/components/UploadSection"; // <--- Naya component import kiya

export default async function GalleryPage() {
  const images = await db.galleryImage.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="min-h-screen bg-[#09090b] text-zinc-100 p-6 md:p-10">
      {/* HEADER */}
      <div className="max-w-7xl mx-auto flex justify-between items-center mb-10">
        <h1 className="text-4xl font-extrabold text-white flex items-center gap-3">
          <ImageIcon className="text-yellow-500 w-10 h-10" />
          Venus Solar Gallery
        </h1>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-10">
        {/* LEFT: UPLOAD BOX (Ab client component use ho raha hai) */}
        <div className="lg:col-span-1">
          <UploadSection />
        </div>

        {/* RIGHT: PHOTO GRID */}
        <div className="lg:col-span-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
            {images.map((img) => (
              <div key={img.id} className="group bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden shadow-lg">
                <div className="relative aspect-video w-full">
                  <Image src={img.url} alt={img.name} fill className="object-cover" />
                </div>
                <div className="p-4">
                  <form action={async () => {
                    "use server";
                    await deleteImage(img.id);
                    revalidatePath("/admin/gallery");
                  }}>
                    <button className="w-full flex items-center justify-center gap-2 py-2 text-xs font-bold bg-zinc-800 hover:bg-red-600 text-zinc-400 hover:text-white rounded-lg transition-all">
                      <Trash2 size={14} />
                      Delete Photo
                    </button>
                  </form>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}