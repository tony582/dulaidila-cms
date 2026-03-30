"use client";

import { motion } from "framer-motion";
import { Terminal, Code2, Globe, Mail } from "lucide-react";
import styles from "./about.module.css";

export default function AboutPage() {
  return (
    <div className="container" style={{ padding: "100px 24px" }}>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className={styles.aboutWrapper}
      >
        <div className={styles.header}>
          <div className={styles.avatarGlass}>
            {/* Minimalist text branding for avatar */}
            <span className="font-geek" style={{ fontSize: "2rem", color: "var(--accent-cyan)" }}>TJ</span>
          </div>
          <h1 className="font-geek" style={{ fontSize: "3rem", margin: "20px 0" }}>Dulaidila Studio</h1>
          <p className="text-secondary" style={{ fontSize: "1.2rem", maxWidth: "600px" }}>
            A vibrant studio specializing in Service Design & Delivery. We bridge the gap between human-centric strategies and flawless digital execution.
          </p>
        </div>

        <div className={`${styles.contentCard} glass-card`}>
          <Terminal size={24} color="var(--accent-purple)" style={{ marginBottom: "16px" }} />
          <h2>About Dulaidila</h2>
          <p>
            Dulaidila represents the intersection of empathetic service design and rigorous delivery. We believe that exceptional experiences require both visionary strategy and meticulous implementation. In a world of hyper-fast technological shifts, we bring clarity and vibrant execution to the table.
          </p>
          
          <h3 style={{ marginTop: "40px", marginBottom: "16px", color: "var(--accent-cyan)" }}>Mission</h3>
          <p>
            To deliver end-to-end services that are both intuitive and impactful. We bring vibrant energy and precision to every touchpoint, ensuring that from blueprint to deployment, the human experience remains at the core.
          </p>
        </div>

        <div className={styles.socialRow}>
          <a href="#" className="glass"><Code2 size={20} /></a>
          <a href="#" className="glass"><Globe size={20} /></a>
          <a href="mailto:tony@dulaidila.com" className="glass"><Mail size={20} /></a>
        </div>
      </motion.div>
    </div>
  );
}
