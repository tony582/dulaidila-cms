import type { Metadata } from "next";
import Link from "next/link";
import styles from "./page.module.css";
import HeroTableau from "@/components/home/HeroTableau";
import { getPublishedPosts } from "@/lib/data";

export const metadata: Metadata = {
  title: "dulaidila | Only the Paranoid Survive",
  description:
    "Independent Service Design & Delivery Studio. We craft compelling service designs and ensure flawless end-to-end delivery.",
  openGraph: {
    url: "https://dulaidila.com",
  },
};

const TICKER_WORDS = [
  ["Strategy", "战略"],
  ["Service Design", "服务设计"],
  ["Experience", "体验"],
  ["Architecture", "架构"],
  ["Agile Delivery", "敏捷交付"],
  ["Assurance", "质量保障"],
];

const PRACTICE = [
  {
    index: "01",
    zh: "服务设计与策略",
    en: "Service Design & Strategy",
    note: "End-to-end journeys, mapped into blueprints that drive value.",
  },
  {
    index: "02",
    zh: "体验交付",
    en: "Experience Delivery",
    note: "Strategy translated into shipped, high-quality digital product.",
  },
  {
    index: "03",
    zh: "视觉与体验架构",
    en: "UI/UX Architecture",
    note: "Interfaces engineered for clarity, accessibility, and calm.",
  },
  {
    index: "04",
    zh: "敏捷工程实施",
    en: "Agile Implementation",
    note: "Solid engineering, modern stacks, continuous integration.",
  },
];

const METHOD = [
  {
    index: "01",
    en: "Diagnose",
    zh: "洞察诊断",
    text: "Understand the terrain before drawing the map. 先厘清全局，再落笔蓝图。",
  },
  {
    index: "02",
    en: "Design",
    zh: "方案设计",
    text: "Decisions made visible — blueprints, prototypes, roadmaps. 让决策可见：蓝图、原型与路线。",
  },
  {
    index: "03",
    en: "Deliver",
    zh: "落地交付",
    text: "We stay until it ships, and works. 交付不止于上线，更在于可用。",
  },
];

const FALLBACK_POSTS = [
  {
    title: "传统编码与低代码平台：平衡效率与定制",
    excerpt: "低代码平台 vs 传统编码：数字化转型的抉择…",
  },
  {
    title: "提升生产力：探索我的实用软硬件工具清单",
    excerpt: "从锤子科技的欠债风波开始，拥抱数字化云端工作…",
  },
  {
    title: "网络暴力泛滥，如何重建宽容的网络文化",
    excerpt: "在这个浮躁的时代，我们似乎逐渐失去了一种珍贵的品质…",
  },
];

function formatDate(d: Date | string) {
  const date = new Date(d);
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${date.getFullYear()}.${pad(date.getMonth() + 1)}.${pad(date.getDate())}`;
}

export default async function Home() {
  const posts = await getPublishedPosts(3);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": "https://dulaidila.com/#website",
        url: "https://dulaidila.com",
        name: "dulaidila",
        description: "Independent Service Design & Delivery Studio",
        inLanguage: ["zh-CN", "en"],
        potentialAction: {
          "@type": "SearchAction",
          target: {
            "@type": "EntryPoint",
            urlTemplate: "https://dulaidila.com/insights?q={search_term_string}",
          },
          "query-input": "required name=search_term_string",
        },
      },
      {
        "@type": "Organization",
        "@id": "https://dulaidila.com/#organization",
        name: "dulaidila",
        url: "https://dulaidila.com",
        logo: {
          "@type": "ImageObject",
          url: "https://dulaidila.com/og-default.png",
          width: 1200,
          height: 630,
        },
        foundingDate: "2024",
        description:
          "Independent Service Design & Delivery Studio founded by Tony Jin.",
        contactPoint: {
          "@type": "ContactPoint",
          email: "tony@dulaidila.com",
          contactType: "customer support",
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ============ Hero ============ */}
      <section className={`container ${styles.hero}`}>
        <div className={styles.heroContent}>
          <p className={`eyebrow anim-rise ${styles.heroEyebrow}`}>
            独立服务设计与交付事务所 · EST. 2024
          </p>

          <h1 className={`anim-rise ${styles.title}`} style={{ animationDelay: "0.08s" }}>
            Design the service.
            <br />
            <em>Deliver the promise.</em>
          </h1>

          <p className={`anim-rise ${styles.leadZh}`} style={{ animationDelay: "0.16s" }}>
            以设计厘清复杂，以交付兑现承诺。
          </p>

          <p className={`anim-rise ${styles.leadEn}`} style={{ animationDelay: "0.24s" }}>
            Dulaidila（都来滴啦）is an independent service design &amp; delivery
            studio. We help teams turn ambiguous problems into precise
            blueprints — and blueprints into shipped, working services.
          </p>

          <div className={`anim-rise ${styles.actionGroup}`} style={{ animationDelay: "0.32s" }}>
            <Link href="/portfolio" className="btn btn-ink">
              Selected Work <span className="btn-arrow">→</span>
            </Link>
            <Link href="/insights" className="btn btn-line">
              The Journal
            </Link>
          </div>
        </div>

        <HeroTableau />
      </section>

      {/* ============ Ticker ============ */}
      <div className={styles.ticker} aria-hidden="true">
        <div className={styles.tickerTrack}>
          {[0, 1].map((dup) => (
            <div className={styles.tickerGroup} key={dup}>
              {TICKER_WORDS.map(([en, zh]) => (
                <span className={styles.tickerItem} key={en}>
                  {en}
                  <span className={styles.tickerZh}>{zh}</span>
                  <span className={styles.tickerDot}>·</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* ============ The Practice ============ */}
      <section className={`container ${styles.practice}`}>
        <div className={styles.sectionHead}>
          <p className="eyebrow">The Practice · 业务范畴</p>
          <Link href="/services" className={styles.sectionLink}>
            All services <span aria-hidden>→</span>
          </Link>
        </div>

        <div>
          {PRACTICE.map((p) => (
            <Link href="/services" key={p.index} className={styles.practiceRow}>
              <span className={styles.practiceIndex}>{p.index}</span>
              <span className={styles.practiceTitles}>
                <span className={styles.practiceZh}>{p.zh}</span>
                <span className={styles.practiceEn}>{p.en}</span>
              </span>
              <span className={styles.practiceNote}>{p.note}</span>
              <span className={styles.practiceArrow} aria-hidden>
                →
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* ============ The Method ============ */}
      <section className={styles.methodBand}>
        <div className="container">
          <div className={styles.sectionHead}>
            <p className="eyebrow">The Method · 工作方法</p>
          </div>
          <h2 className={styles.methodTitle}>
            Three moves. <em>One promise.</em>
          </h2>

          <div className={styles.methodGrid}>
            {METHOD.map((m) => (
              <div key={m.index} className={styles.methodCol}>
                <div className={styles.methodIndex}>{m.index}</div>
                <h3 className={styles.methodName}>
                  {m.en} <span>{m.zh}</span>
                </h3>
                <p className={styles.methodText}>{m.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ The Journal ============ */}
      <section className={`container ${styles.journal}`}>
        <div className={styles.sectionHead}>
          <p className="eyebrow">The Journal · 观点与洞察</p>
          <Link href="/insights" className={styles.sectionLink}>
            Browse all <span aria-hidden>→</span>
          </Link>
        </div>

        <div>
          {posts.length > 0
            ? posts.map((post) => (
                <Link
                  key={post.id}
                  href={`/insights/${post.slug}`}
                  className={styles.journalRow}
                >
                  <span className={styles.journalDate}>
                    {formatDate(post.createdAt)}
                  </span>
                  <span className={styles.journalBody}>
                    <span className={styles.journalTitle}>{post.title}</span>
                    <span className={styles.journalExcerpt}>
                      {(post.excerpt || post.content.replace(/<[^>]+>/g, ""))
                        .substring(0, 90)
                        .trim()}
                      …
                    </span>
                  </span>
                  <span className={styles.practiceArrow} aria-hidden>
                    →
                  </span>
                </Link>
              ))
            : FALLBACK_POSTS.map((post) => (
                <Link
                  key={post.title}
                  href="/insights"
                  className={styles.journalRow}
                  style={{ opacity: 0.65 }}
                >
                  <span className={styles.journalDate}>COMING SOON</span>
                  <span className={styles.journalBody}>
                    <span className={styles.journalTitle}>{post.title}</span>
                    <span className={styles.journalExcerpt}>{post.excerpt}</span>
                  </span>
                  <span className={styles.practiceArrow} aria-hidden>
                    →
                  </span>
                </Link>
              ))}
        </div>
      </section>

      {/* ============ CTA ============ */}
      <section className={`dark-band ${styles.ctaBand}`}>
        <div className={`container ${styles.ctaInner}`}>
          <p className={`eyebrow ${styles.ctaEyebrow}`}>Start · 合作起点</p>
          <h2 className={styles.ctaTitle}>
            Every engagement begins
            <br />
            with a <em>conversation.</em>
          </h2>
          <p className={styles.ctaZh}>每一次合作，都始于一场对话。</p>
          <div className={styles.ctaActions}>
            <Link href="/contact" className="btn btn-paper">
              Get in Touch — 开始对话 <span className="btn-arrow">→</span>
            </Link>
            <a href="mailto:tony@dulaidila.com" className={styles.ctaMail}>
              tony@dulaidila.com
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
