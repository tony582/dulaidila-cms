import { PrismaClient } from "@prisma/client";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import styles from "./article.module.css";
import CommentsSection from "@/components/comments/CommentsSection";

const prisma = new PrismaClient();

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  
  const post = await prisma.post.findUnique({
    where: { slug },
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
        <CommentsSection postId={post.id} />
      </div>
    </article>
  );
}
