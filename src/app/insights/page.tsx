import type { Metadata } from "next";
import Link from "next/link";
import styles from "./insights.module.css";
import { getPublishedPosts } from "@/lib/data";

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

function formatDate(d: Date | string) {
  const date = new Date(d);
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${date.getFullYear()}.${pad(date.getMonth() + 1)}.${pad(date.getDate())}`;
}

export default async function InsightsPage() {
  const posts = await getPublishedPosts();

  return (
    <div className={`container ${styles.page}`}>
      {/* Masthead */}
      <header className={styles.head}>
        <p className="eyebrow">The Journal · 观点与洞察</p>
        <h1 className={styles.title}>
          Notes from <em>the desk.</em>
        </h1>
        <p className={styles.intro}>
          Service design, delivery frameworks, and the craft of shipping —
          关于服务设计、交付方法与技术实践的长期思考。
        </p>
      </header>

      {/* Issue list */}
      {posts.length > 0 ? (
        <div className={styles.list}>
          {posts.map((post, i) => (
            <Link
              key={post.id}
              href={`/insights/${post.slug}`}
              className={styles.row}
            >
              <div className={styles.rowMeta}>
                <span className={styles.rowNo}>
                  No. {String(posts.length - i).padStart(2, "0")}
                </span>
                <span className={styles.rowDate}>{formatDate(post.createdAt)}</span>
              </div>

              <div className={styles.rowBody}>
                <h2 className={styles.rowTitle}>{post.title}</h2>
                <p className={styles.rowExcerpt}>
                  {(post.excerpt || post.content.replace(/<[^>]+>/g, ""))
                    .substring(0, 120)
                    .trim()}
                  …
                </p>
                <span className={styles.rowAuthor}>{post.author.name}</span>
              </div>

              <span className={styles.rowArrow} aria-hidden>
                →
              </span>
            </Link>
          ))}
        </div>
      ) : (
        <div className={styles.empty}>
          <p className={styles.emptySerif}>The first issue is at the press.</p>
          <p>暂无已发布的文章，敬请期待。</p>
        </div>
      )}
    </div>
  );
}
