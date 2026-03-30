import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const comments = await prisma.comment.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        post: { select: { title: true } }
      }
    });
    return NextResponse.json({ comments }, { status: 200 });
  } catch (error) {
    console.error("Error fetching admin comments:", error);
    return NextResponse.json({ error: "Failed to load comments" }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    const { id, status } = body;

    if (!id || !status) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const updated = await prisma.comment.update({
      where: { id },
      data: { status }
    });

    return NextResponse.json({ success: true, comment: updated }, { status: 200 });
  } catch (error) {
    console.error("Error updating comment status:", error);
    return NextResponse.json({ error: "Failed to update comment" }, { status: 500 });
  }
}
