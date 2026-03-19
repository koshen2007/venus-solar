import { db } from "@/lib/db";
import Image from "next/image";

export default async function PublicGallery() {
  const images = await db.galleryImage.findMany({
    orderBy: { createdAt: "desc" },
  });

  if (images.length === 0) return null;

  return (
    <section className="py-12">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-yellow-500 mb-8 text-center">Our Solar Installations ☀️</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {images.map((img) => (
            <div key={img.id} className="relative aspect-video rounded-xl overflow-hidden border border-zinc-800 shadow-lg">
              <Image 
                src={img.url} 
                alt={img.name} 
                fill 
                className="object-cover hover:scale-105 transition-transform duration-500" 
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}