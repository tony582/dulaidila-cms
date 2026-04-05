"use client";

import { motion } from "framer-motion";
import styles from "@/app/page.module.css";

export default function HeroAnimation() {
  return (
    <div className={styles.heroVisual}>
      <div className={`${styles.glowOrb} ${styles.orbCyan} animate-pulse-glow`} />
      <div className={`${styles.glowOrb} ${styles.orbPurple}`} />
      <motion.div
        className={`${styles.glassPanel} glass`}
        initial={{ opacity: 0, scale: 0.9, rotateX: 20 }}
        animate={{ opacity: 1, scale: 1, rotateX: 0 }}
        transition={{ duration: 1, delay: 0.2 }}
      >
        <div className={styles.serviceMap}>
          <motion.div
            className={`${styles.serviceNode} ${styles.nodeActive}`}
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <div className={styles.nodeHeader}>
              <span className={styles.nodeStatus}>●</span>
              <span>Phase 1: Design Strategy</span>
            </div>
            <div className={styles.nodeBar} />
            <div
              className={`${styles.nodeBar} ${styles.nodeBarActive}`}
              style={{ width: "60%" }}
            />
          </motion.div>

          <motion.div
            className={styles.serviceNode}
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <div className={styles.nodeHeader}>
              <span
                className={styles.nodeStatus}
                style={{ color: "var(--accent-purple)" }}
              >
                ●
              </span>
              <span>Phase 2: Architecture &amp; UX</span>
            </div>
            <div className={styles.nodeBar} style={{ width: "80%" }} />
          </motion.div>

          <motion.div
            className={styles.serviceNode}
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <div className={styles.nodeHeader}>
              <span
                className={styles.nodeStatus}
                style={{ color: "var(--text-muted)" }}
              >
                ○
              </span>
              <span>Phase 3: Delivery</span>
            </div>
            <div className={styles.nodeBar} style={{ width: "30%" }} />
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
