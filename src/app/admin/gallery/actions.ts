"use server";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function deleteImage(id: string) {
  await db.galleryImage.delete({
    where: { id },
  });
  revalidatePath("/admin/gallery");
}