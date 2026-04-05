import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import styles from "./article.module.css";
import CommentsSection from "@/components/comments/CommentsSection";
import ShareBar from "@/components/share/ShareBar";
import { getPostBySlug } from "@/lib/data";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return {
      title: "Article Not Found",
      description: "This article does not exist.",
    };
  }

  const excerpt =
    post.excerpt ||
    post.content.replace(/<[^>]+>/g, "").substring(0, 160).trim();

  const ogImage = post.coverImage
    ? post.coverImage.startsWith("http")
      ? post.coverImage
      : `/${post.coverImage}`
    : `/api/og?title=${encodeURIComponent(post.title)}&author=${encodeURIComponent(post.author?.name ?? "dulaidila")}`;

  return {
    title: post.title,
    description: excerpt,
    openGraph: {
      type: "article",
      url: `https://dulaidila.com/insights/${slug}`,
      title: post.title,
      description: excerpt,
      publishedTime: post.createdAt.toISOString(),
      modifiedTime: post.updatedAt.toISOString(),
      authors: [post.author?.name ?? "Tony Jin"],
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: excerpt,
      images: [ogImage],
    },
  };
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

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
        <ShareBar title={post.title} />
        <CommentsSection postId={post.id} />
      </div>
    </article>
  );
}
