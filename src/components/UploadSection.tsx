"use client";

import { UploadButton } from "@uploadthing/react";
import { OurFileRouter } from "@/app/api/uploadthing/core";
import { useRouter } from "next/navigation";

export default function UploadSection() {
  const router = useRouter();

  return (
    <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-3xl sticky top-10 shadow-xl">
      <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-white">
        Upload New Photo
      </h2>
      <UploadButton<OurFileRouter, "imageUploader">
        endpoint="imageUploader"
        onClientUploadComplete={() => {
          alert("Mubarak ho! Photo chadh gayi.");
          router.refresh(); // Ye bina reload kiye photo dikha dega
        }}
        onUploadError={(error: Error) => alert(`Error: ${error.message}`)}
        appearance={{
          button: "bg-yellow-600 hover:bg-yellow-500 w-full text-sm font-bold py-2 rounded-lg",
        }}
      />
    </div>
  );
}