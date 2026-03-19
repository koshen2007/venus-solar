import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET() {
  try {
    // Database se saare latest projects nikalna
    const projects = await db.portfolio.findMany({
      orderBy: { createdAt: "desc" }
    });
    return NextResponse.json(projects);
  } catch (error) {
    console.error("Portfolio Data Error:", error);
    return NextResponse.json([], { status: 500 });
  }
}