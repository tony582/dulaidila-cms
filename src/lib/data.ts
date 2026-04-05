import { cache } from "react";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

/**
 * Fetches a single post by slug.
 * Wrapped in React `cache` so generateMetadata and the page itself
 * share one database round-trip per request.
 */
export const getPostBySlug = cache(async (slug: string) => {
  return prisma.post.findUnique({
    where: { slug },
    include: { author: true },
  });
});

/**
 * Fetches all published posts (newest first).
 */
export const getPublishedPosts = cache(async (limit?: number) => {
  return prisma.post.findMany({
    where: { published: true },
    orderBy: { createdAt: "desc" },
    include: { author: true },
    ...(limit ? { take: limit } : {}),
  });
});
