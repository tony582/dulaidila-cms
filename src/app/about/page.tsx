"use client";

import { motion } from "framer-motion";
import { Terminal, Github, Twitter, Mail } from "lucide-react";
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
          <h1 className="font-geek" style={{ fontSize: "3rem", margin: "20px 0" }}>Tony Jin / 甜菜TONY糖</h1>
          <p className="text-secondary" style={{ fontSize: "1.2rem", maxWidth: "600px" }}>
            Independent developer, creator, and paranoid geek exploring the edges of the Internet, productivity, and low-code solutions.
          </p>
        </div>

        <div className={`${styles.contentCard} glass-card`}>
          <Terminal size={24} color="var(--accent-purple)" style={{ marginBottom: "16px" }} />
          <h2>About Dulaidila</h2>
          <p>
            Dulaidila is not just a digital garden—it's an intersection of an independent studio and my personal brand. 
            I believe that in a world driven by hyper-fast technological shifts, "Only the Paranoid Survive." Here, I document
            my explorations in web development, productivity tools, and random geeky thoughts that cross my mind.
          </p>
          
          <h3 style={{ marginTop: "40px", marginBottom: "16px", color: "var(--accent-cyan)" }}>Mission</h3>
          <p>
            To build things that are both aesthetically stunning and structurally resilient. Whether it's a CMS, a 
            productivity tool, or just a simple blog, it needs to be <strong>vibrant</strong> and <strong>geeky</strong>.
          </p>
        </div>

        <div className={styles.socialRow}>
          <a href="#" className="glass"><Github size={20} /></a>
          <a href="#" className="glass"><Twitter size={20} /></a>
          <a href="mailto:tony@dulaidila.com" className="glass"><Mail size={20} /></a>
        </div>
      </motion.div>
    </div>
  );
}
