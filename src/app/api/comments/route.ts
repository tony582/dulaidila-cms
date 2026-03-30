import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const postId = searchParams.get('postId');

  if (!postId) {
    return NextResponse.json({ error: "Missing postId" }, { status: 400 });
  }

  try {
    const comments = await prisma.comment.findMany({
      where: {
        postId,
        status: { in: ['APPROVED', 'FEATURED'] } // Only return public ones
      },
      orderBy: { createdAt: 'desc' },
      include: {
        replies: {
          where: { status: { in: ['APPROVED', 'FEATURED'] } }
        }
      }
    });

    return NextResponse.json({ comments }, { status: 200 });
  } catch (error) {
    console.error("Error fetching comments:", error);
    return NextResponse.json({ error: "Failed to fetch comments" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { postId, authorName, authorEmail, content, parentId } = body;

    if (!postId || !authorName || !content) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const comment = await prisma.comment.create({
      data: {
        postId,
        authorName,
        authorEmail,
        content,
        parentId, // Optional, for replies
        status: 'PENDING' // Newly submitted comments need manual approval from Admin
      }
    });

    return NextResponse.json({ success: true, comment }, { status: 201 });
  } catch (error) {
    console.error("Error adding comment:", error);
    return NextResponse.json({ error: "Failed to add comment" }, { status: 500 });
  }
}
