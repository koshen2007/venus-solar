import { NextResponse } from "next/server";
import prisma from "@/lib/db";

export async function GET() {
  try {
    const products = await prisma.product.findMany({ orderBy: { createdAt: 'desc' } });
    return NextResponse.json(products);
  } catch (error) {
    return NextResponse.json({ error: "Data nahi mila" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { name, price, capacity, optimalFor, location } = await req.json();
    const product = await prisma.product.create({
      data: { name, price, capacity, optimalFor, location },
    });
    return NextResponse.json(product);
  } catch (error) {
    return NextResponse.json({ error: "Save nahi hua" }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { id } = await req.json();
    await prisma.product.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Delete nahi hua" }, { status: 500 });
  }
}