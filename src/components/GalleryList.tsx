import { db } from "@/lib/db";
import Image from "next/image";

export default async function GalleryList() {
  // Database se saari photos nikal lo
  const images = await db.galleryImage.findMany({
    orderBy: { createdAt: "desc" },
  });

  if (images.length === 0) {
    return <p className="text-zinc-500 text-center">Abhi koi photo nahi hai, Seth ji!</p>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
      {images.map((img) => (
        <div key={img.id} className="relative aspect-video rounded-xl overflow-hidden border border-zinc-800 bg-zinc-900 group">
          <Image
            src={img.url}
            alt={img.name}
            fill
            className="object-cover transition-transform group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
            <p className="text-sm truncate font-medium">{img.name}</p>
          </div>
        </div>
      ))}
    </div>
  );
}