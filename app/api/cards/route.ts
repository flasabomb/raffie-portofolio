import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const session = await auth();
  if (!session) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  const cards = await prisma.card.findMany({ orderBy: { order_index: "asc" } });
  return NextResponse.json(cards);
}

export async function POST(request: Request) {
  const session = await auth();
  if (!session) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  const body = await request.json();

  const card = await prisma.card.create({
    data: {
      title: body.title,
      category: body.category,
      description: body.description || null,
      tag: body.tag || null,
      metric: body.metric || null,
      image_url: body.image_url || null,
      image_public_id: body.image_public_id || null,
      is_visible: body.is_visible ?? true,
      order_index: body.order_index ?? 0
    }
  });

  return NextResponse.json(card, { status: 201 });
}
