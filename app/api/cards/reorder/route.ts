import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function PATCH(request: Request) {
  const session = await auth();
  if (!session) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  const payload: Array<{ id: number; order_index: number }> = await request.json();

  await prisma.$transaction(
    payload.map((item) =>
      prisma.card.update({
        where: { id: item.id },
        data: { order_index: item.order_index }
      })
    )
  );

  return NextResponse.json({ success: true });
}
