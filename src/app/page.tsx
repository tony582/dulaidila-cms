"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Terminal } from "lucide-react";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.homeWrapper}>
      {/* Hero Section */}
      <section className={`${styles.hero} container`}>
        <motion.div 
          className={styles.heroContent}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className={styles.badge}>
             <Terminal size={14} className={styles.badgeIcon} />
             <span>Tony Jin / Independent Studio</span>
          </div>
          
          <h1 className={`${styles.title} font-geek`}>
            Only the <span className="text-gradient">Paranoid</span> Survive.
          </h1>
          
          <p className={styles.description}>
            We build digital experiences that live at the intersection of stunning aesthetics and solid engineering. 
            Exploring low-code, productivity, and the fabric of the Internet.
          </p>
          
          <div className={styles.actionGroup}>
            <Link href="/portfolio" className={styles.primaryButton}>
              View Portfolio
            </Link>
            <Link href="/insights" className={styles.secondaryButton}>
              Read Insights <ArrowRight size={18} />
            </Link>
          </div>
        </motion.div>
        
        {/* Abstract Background Element */}
        <div className={styles.heroVisual}>
          <div className={`${styles.glowOrb} ${styles.orbCyan} animate-pulse-glow`}></div>
          <div className={`${styles.glowOrb} ${styles.orbPurple}`}></div>
          <motion.div 
            className={`${styles.glassPanel} glass`}
            initial={{ opacity: 0, scale: 0.9, rotateX: 20 }}
            animate={{ opacity: 1, scale: 1, rotateX: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <div className={styles.mockCode}>
              <span className={styles.codeLine}>// dulaidila.com</span>
              <span className={styles.codeLine}><span className={styles.keyword}>const</span> <span className={styles.variable}>brand</span> = <span className={styles.string}>"Geek & Vibrant"</span>;</span>
              <span className={styles.codeLine}><span className={styles.keyword}>function</span> <span className={styles.function}>innovate</span>() &#123;</span>
              <span className={styles.codeLine}>  <span className={styles.keyword}>return</span> buildFuture();</span>
              <span className={styles.codeLine}>&#125;</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Latest Insights Section */}
      <section className={`${styles.insightsSection} container`}>
        <div className={styles.sectionHeader}>
          <h2 className="font-geek">Latest Insights</h2>
          <Link href="/insights" className={styles.viewAll}>View All</Link>
        </div>
        
        <div className={styles.grid}>
          {/* Mock Post 1 */}
          <Link href="/insights/low-code-vs-traditional" className="glass-card">
            <div className={styles.cardContent}>
              <div className={styles.cardMeta}>
                <span className={styles.tag}>Tech</span>
                <span className={styles.date}>Mar 30, 2026</span>
              </div>
              <h3>传统编码与低代码平台：平衡效率与定制</h3>
              <p>低代码平台 vs 传统编码：数字化转型的抉择。如何避免在项目选型中常犯的重大错误...</p>
            </div>
          </Link>

          {/* Mock Post 2 */}
          <Link href="/insights/productivity-tools" className="glass-card">
            <div className={styles.cardContent}>
              <div className={styles.cardMeta}>
                <span className={styles.tag}>Productivity</span>
                <span className={styles.date}>Mar 15, 2026</span>
              </div>
              <h3>提升生产力：探索我的实用软硬件工具清单</h3>
              <p>从锤子科技的欠债风波开始，拥抱数字化云端工作。分享我现在正在使用的工作流与设备...</p>
            </div>
          </Link>
          
          {/* Mock Post 3 */}
          <Link href="/insights/internet-violence" className="glass-card">
            <div className={styles.cardContent}>
              <div className={styles.cardMeta}>
                <span className={styles.tag}>Thoughts</span>
                <span className={styles.date}>Feb 20, 2026</span>
              </div>
              <h3>网络暴力泛滥，如何重建宽容的网络文化</h3>
              <p>在这个浮躁的时代，我们似乎逐渐失去了一种珍贵的品质。我们要认识到在现实生活中...</p>
            </div>
          </Link>
        </div>
      </section>
    </div>
  );
}
