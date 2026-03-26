import { NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

function getIdFromParams(params: { id: string }) {
  return Number(params.id);
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const body = await request.json();

  const card = await prisma.card.update({
    where: { id: getIdFromParams({ id }) },
    data: {
      title: body.title,
      category: body.category,
      description: body.description || null,
      tag: body.tag || null,
      metric: body.metric || null,
      image_url: body.image_url || null,
      image_public_id: body.image_public_id || null,
      is_visible: body.is_visible ?? true
    }
  });

  return NextResponse.json(card);
}

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const body = await request.json();

  const card = await prisma.card.update({
    where: { id: getIdFromParams({ id }) },
    data: {
      is_visible: Boolean(body.is_visible)
    }
  });

  return NextResponse.json(card);
}

export async function DELETE(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const numericId = getIdFromParams({ id });
  const card = await prisma.card.findUnique({ where: { id: numericId } });

  if (!card) return NextResponse.json({ message: "Not found" }, { status: 404 });

  if (card.image_public_id) {
    await cloudinary.uploader.destroy(card.image_public_id);
  }

  await prisma.card.delete({ where: { id: numericId } });

  return NextResponse.json({ success: true });
}
