import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const { title, content, slug } = await req.json();

    if (!title || !content) {
      return NextResponse.json({ error: "Missing title or content" }, { status: 400 });
    }

    // Upsert a default admin user to bind the post to, so the Prisma relation doesn't fail.
    // In a real app, authorId comes from session.
    const author = await prisma.user.upsert({
      where: { email: 'tony@dulaidila.com' },
      update: {},
      create: {
        email: 'tony@dulaidila.com',
        password: 'dummy_password', // Mock
        name: 'Tony Jin',
        role: 'ADMIN',
      }
    });

    // Handle slug uniqueness (super simple approach for prototype)
    const uniqueSlug = `${slug}-${Date.now().toString().slice(-4)}`;

    const post = await prisma.post.create({
      data: {
        title,
        content,
        slug: uniqueSlug,
        authorId: author.id,
        published: true, // Auto publish for this MVP
      },
    });

    return NextResponse.json(post, { status: 201 });
  } catch (error: any) {
    console.error("Failed to create post:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET() {
  try {
    const posts = await prisma.post.findMany({
      orderBy: { createdAt: 'desc' },
      include: { author: true }
    });
    return NextResponse.json(posts);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
