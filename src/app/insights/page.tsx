import type { Metadata } from "next";
import Link from "next/link";
import { PrismaClient } from "@prisma/client";

export const metadata: Metadata = {
  title: "Insights",
  description:
    "Explore Tony Jin's thoughts on Service Design, delivery frameworks, tech, and digital innovation.",
  openGraph: {
    url: "https://dulaidila.com/insights",
    title: "Insights | dulaidila",
    description:
      "Explore thoughts on Service Design, delivery frameworks, and digital innovation.",
  },
};

const prisma = new PrismaClient();

export default async function InsightsPage() {
  const posts = await prisma.post.findMany({
    where: { published: true },
    orderBy: { createdAt: "desc" },
    include: { author: true },
  });

  return (
    <div className="container" style={{ padding: "100px 24px" }}>
      <div style={{ textAlign: "center", marginBottom: "60px" }}>
        <h1 className="font-geek" style={{ fontSize: "3rem", marginBottom: "16px" }}>Latest <span className="text-gradient">Insights</span></h1>
        <p className="text-secondary">Explore thoughts on Service Design, Delivery frameworks, and digital innovation.</p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "32px", maxWidth: "1000px", margin: "0 auto" }}>
        {posts.length > 0 ? (
          posts.map((post) => (
            <Link key={post.id} href={`/insights/${post.slug}`} className="glass-card" style={{ display: "block", padding: "24px", color: "inherit", textDecoration: "none" }}>
              <div style={{ marginBottom: "12px", fontSize: "0.85rem", color: "var(--accent-purple)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "1px" }}>
                Tech & Thoughts
              </div>
              <h3 className="font-geek" style={{ fontSize: "1.4rem", marginBottom: "12px", color: "var(--text-primary)", lineHeight: 1.4 }}>{post.title}</h3>
              <p style={{ color: "var(--text-secondary)", lineHeight: 1.6, marginBottom: "20px" }}>
                {/* Extract simple excerpt from HTML content or use first few chars */}
                {post.content.replace(/<[^>]+>/g, '').substring(0, 100)}...
              </p>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.8rem", color: "var(--text-muted)", borderTop: "1px solid var(--border-subtle)", paddingTop: "12px" }}>
                <span>{post.author.name}</span>
                <span>{new Date(post.createdAt).toLocaleDateString()}</span>
              </div>
            </Link>
          ))
        ) : (
          <div className="glass" style={{ gridColumn: "1 / -1", padding: "40px", textAlign: "center", borderRadius: "var(--radius-md)", color: "var(--text-muted)" }}>
            <p>No insights published yet. Check back soon for new content!</p>
          </div>
        )}
      </div>
    </div>
  );
}
