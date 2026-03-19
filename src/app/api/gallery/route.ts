import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const images = await db.galleryImage.findMany({
      orderBy: { createdAt: "desc" }
    });
    return NextResponse.json(images);
  } catch (error) {
    return NextResponse.json([], { status: 500 });
  }
}