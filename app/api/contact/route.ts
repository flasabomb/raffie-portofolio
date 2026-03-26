import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const session = await auth();
  if (!session) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  const contact = await prisma.contactInfo.findUnique({ where: { id: 1 } });
  return NextResponse.json(contact);
}

export async function PUT(request: Request) {
  const session = await auth();
  if (!session) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  const body = await request.json();

  const contact = await prisma.contactInfo.upsert({
    where: { id: 1 },
    create: { id: 1, ...body },
    update: body
  });

  return NextResponse.json(contact);
}
