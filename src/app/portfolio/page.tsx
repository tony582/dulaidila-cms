"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { ArrowRight, Terminal } from "lucide-react";
import styles from "./portfolio.module.css";

export default function PortfolioPage() {
  const [portfolios, setPortfolios] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Note: we fetch client side so the page can animate nicely in,
  // or we could use server components but 'use client' is needed for framer-motion.
  useEffect(() => {
    // We create a quick API fetch for portfolio
    fetch("/api/portfolio")
      .then(res => res.json())
      .then(data => setPortfolios(data))
      .catch(e => console.error(e))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className={styles.portfolioContainer}>
      <div className={styles.header}>
        <motion.h1 
          className="font-geek"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Our <span className="text-gradient">Work</span>
        </motion.h1>
        <motion.p 
          className="text-secondary"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          A curated gallery of robust CMS builds, modern digital applications, and immersive experiences.
        </motion.p>
      </div>

      <div className={styles.bentoGrid}>
        {loading ? (
          <div style={{ gridColumn: "1 / -1", textAlign: "center", padding: "100px", color: "var(--text-muted)" }}>
            <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }} style={{ display: "inline-block" }}>
              <Terminal size={32} />
            </motion.div>
            <p style={{ marginTop: "16px" }}>Loading digital archives...</p>
          </div>
        ) : portfolios.length > 0 ? (
          portfolios.map((p, i) => (
            <motion.div 
              key={p.id} 
              className={styles.bentoCard}
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: 0.1 * i, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              onClick={() => p.link ? window.open(p.link, '_blank') : null}
            >
              {p.coverImage && (
                <div className={styles.bentoImageContainer}>
                  <img src={p.coverImage} alt={p.title} className={styles.bentoImage} />
                </div>
              )}
              <div className={styles.bentoOverlay} />
              
              <div className={styles.bentoContent}>
                <div className={styles.metaInfo}>
                  {p.clientName && <span className={styles.clientBadge}>{p.clientName}</span>}
                  {p.role && <span className={styles.roleText}>{p.role}</span>}
                </div>
                
                <h3 className={`${styles.title} font-geek`}>{p.title}</h3>
                <p className={styles.description}>{p.description}</p>
                
                {p.link && (
                  <div className={styles.actionRow}>
                    <span>View Live Details</span>
                    <ArrowRight size={18} className={styles.arrowIcon} />
                  </div>
                )}
              </div>
            </motion.div>
          ))
        ) : (
          <div className="glass-card" style={{ padding: "80px 40px", gridColumn: "1 / -1", textAlign: "center", color: "var(--text-muted)" }}>
            <Terminal size={48} style={{ margin: "0 auto 24px", opacity: 0.3 }} />
            <p>Portfolio architecture is established, awaiting data sync.</p>
          </div>
        )}
      </div>
    </div>
  );
}
