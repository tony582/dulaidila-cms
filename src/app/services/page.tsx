"use client";

import { motion } from "framer-motion";
import { Code, Smartphone, Palette, Zap } from "lucide-react";
import styles from "./services.module.css";

const services = [
  {
    title: "Full-Stack Web Engineering",
    desc: "Building high-performance, robust, and scalable web applications using React, Next.js, and modern serverless architectures.",
    icon: <Code size={32} />
  },
  {
    title: "Mobile App Development",
    desc: "Crafting fluid cross-platform mobile experiences that feel native, utilizing React Native and Flutter.",
    icon: <Smartphone size={32} />
  },
  {
    title: "Vibrant UI/UX Design",
    desc: "Designing interfaces that pop—utilizing Glassmorphism, neon accents, and geeky aesthetics to make products stand out.",
    icon: <Palette size={32} />
  },
  {
    title: "Low-Code & Automation Consulting",
    desc: "Helping businesses accelerate delivery by adopting low-code platforms and AI-driven automation workflows.",
    icon: <Zap size={32} />
  }
];

export default function ServicesPage() {
  return (
    <div className="container" style={{ padding: "100px 24px" }}>
      <div className={styles.header}>
        <motion.h1 
          className="font-geek"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          What We <span className="text-gradient">Do</span>
        </motion.h1>
        <motion.p 
          className="text-secondary"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Dulaidila Independent Studio provides cutting-edge digital solutions at the intersection of stunning aesthetics and elite engineering.
        </motion.p>
      </div>

      <div className={styles.grid}>
        {services.map((s, i) => (
          <motion.div 
            key={i}
            className={`${styles.card} glass-card`}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * i, duration: 0.5 }}
          >
            <div className={styles.iconWrapper}>{s.icon}</div>
            <h3 className="font-geek">{s.title}</h3>
            <p>{s.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
