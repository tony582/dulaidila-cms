import { PrismaClient } from "@prisma/client";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import styles from "./article.module.css";

const prisma = new PrismaClient();

export default async function ArticlePage({ params }: { params: { slug: string } }) {
  const post = await prisma.post.findUnique({
    where: { slug: params.slug },
    include: { author: true },
  });

  if (!post) {
    notFound();
  }

  return (
    <article className={styles.articleWrapper}>
      <div className={styles.header}>
        <Link href="/insights" className={styles.backBtn}>
          <ArrowLeft size={18} /> Back to Insights
        </Link>
        <h1 className={`${styles.title} font-geek`}>{post.title}</h1>
        <div className={styles.meta}>
          <span className={styles.author}>{post.author?.name || "Independent Geek"}</span>
          <span className={styles.divider}>•</span>
          <time dateTime={post.createdAt.toISOString()}>
            {new Date(post.createdAt).toLocaleDateString()}
          </time>
        </div>
      </div>

      <div 
        className={styles.contentBody} 
        dangerouslySetInnerHTML={{ __html: post.content }} 
      />
      
      <div className={styles.footer}>
        <div className="glass-card" style={{ padding: "30px", textAlign: "center", marginTop: "60px" }}>
          <h3 className="font-geek" style={{ marginBottom: "16px", color: "var(--accent-cyan)" }}>Enjoyed this read?</h3>
          <p style={{ color: "var(--text-secondary)" }}>Join the discussion and share your thoughts. Paranoid but passionate.</p>
          {/* Comments injection section in Phase 5 */}
        </div>
      </div>
    </article>
  );
}
