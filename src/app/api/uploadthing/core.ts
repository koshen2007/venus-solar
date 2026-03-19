import { createUploadthing, type FileRouter } from "uploadthing/next";
import { db } from "@/lib/db"; 

const f = createUploadthing();

export const ourFileRouter = {
  imageUploader: f({ image: { maxFileSize: "8MB" } })
    .onUploadComplete(async ({ file }) => {
      // Ye line URL ko database (Munim) mein phenk degi
      try {
        await db.galleryImage.create({
          data: {
            url: file.url,
            name: file.name,
          },
        });
        console.log("Database mein entries ho gayi, Seth ji!", file.url);
      } catch (error) {
        console.error("Galla (DB) mein entry fail ho gayi:", error);
      }

      return { url: file.url };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;