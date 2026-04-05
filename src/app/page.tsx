import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import styles from "./page.module.css";
import HeroAnimation from "@/components/home/HeroAnimation";
import { getPublishedPosts } from "@/lib/data";

export const metadata: Metadata = {
  title: "dulaidila | Only the Paranoid Survive",
  description:
    "Independent Service Design & Delivery Studio. We craft compelling service designs and ensure flawless end-to-end delivery.",
  openGraph: {
    url: "https://dulaidila.com",
  },
};

export default async function Home() {
  const posts = await getPublishedPosts(3);

  return (
    <div className={styles.homeWrapper}>
      {/* Hero Section */}
      <section className={`${styles.hero} container`}>
        <div className={styles.heroContent}>
          <div className={styles.badge}>
            <span style={{ fontSize: "0.75rem" }}>⬡</span>
            <span>Dulaidila / Design &amp; Delivery Studio</span>
          </div>

          <h1 className={`${styles.title} font-geek`}>
            Service <span className="text-gradient">Design</span> &amp; Delivery.
          </h1>

          <p className={styles.description}>
            We craft compelling service designs and ensure flawless end-to-end
            delivery. Transforming complex business challenges into vibrant,
            human-centric experiences.
          </p>

          <div className={styles.actionGroup}>
            <Link href="/portfolio" className={styles.primaryButton}>
              View Portfolio
            </Link>
            <Link href="/insights" className={styles.secondaryButton}>
              Read Insights <ArrowRight size={18} />
            </Link>
          </div>
        </div>

        <HeroAnimation />
      </section>

      {/* Latest Insights Section */}
      <section className={`${styles.insightsSection} container`}>
        <div className={styles.sectionHeader}>
          <h2 className="font-geek">Latest Insights</h2>
          <Link href="/insights" className={styles.viewAll}>
            View All
          </Link>
        </div>

        <div className={styles.grid}>
          {posts.length > 0 ? (
            posts.map((post) => (
              <Link
                key={post.id}
                href={`/insights/${post.slug}`}
                className="glass-card"
              >
                <div className={styles.cardContent}>
                  <div className={styles.cardMeta}>
                    <span className={styles.tag}>Tech &amp; Thoughts</span>
                    <span className={styles.date}>
                      {new Date(post.createdAt).toLocaleDateString("zh-CN", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </span>
                  </div>
                  <h3>{post.title}</h3>
                  <p>
                    {(post.excerpt || post.content.replace(/<[^>]+>/g, ""))
                      .substring(0, 80)
                      .trim()}
                    …
                  </p>
                </div>
              </Link>
            ))
          ) : (
            /* Fallback static cards when DB is empty */
            <>
              <Link
                href="/insights"
                className="glass-card"
                style={{ opacity: 0.6 }}
              >
                <div className={styles.cardContent}>
                  <div className={styles.cardMeta}>
                    <span className={styles.tag}>Tech</span>
                    <span className={styles.date}>Coming soon</span>
                  </div>
                  <h3>传统编码与低代码平台：平衡效率与定制</h3>
                  <p>低代码平台 vs 传统编码：数字化转型的抉择…</p>
                </div>
              </Link>
              <Link
                href="/insights"
                className="glass-card"
                style={{ opacity: 0.6 }}
              >
                <div className={styles.cardContent}>
                  <div className={styles.cardMeta}>
                    <span className={styles.tag}>Productivity</span>
                    <span className={styles.date}>Coming soon</span>
                  </div>
                  <h3>提升生产力：探索我的实用软硬件工具清单</h3>
                  <p>从锤子科技的欠债风波开始，拥抱数字化云端工作…</p>
                </div>
              </Link>
              <Link
                href="/insights"
                className="glass-card"
                style={{ opacity: 0.6 }}
              >
                <div className={styles.cardContent}>
                  <div className={styles.cardMeta}>
                    <span className={styles.tag}>Thoughts</span>
                    <span className={styles.date}>Coming soon</span>
                  </div>
                  <h3>网络暴力泛滥，如何重建宽容的网络文化</h3>
                  <p>在这个浮躁的时代，我们似乎逐渐失去了一种珍贵的品质…</p>
                </div>
              </Link>
            </>
          )}
        </div>
      </section>
    </div>
  );
}
