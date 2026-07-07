"use client";

import { motion, useMotionTemplate, useMotionValue } from "motion/react";
import { Code, Smartphone, Palette, Zap } from "lucide-react";
import styles from "./services.module.css";
import { MouseEvent } from "react";

const services = [
  {
    titleEn: "Service Design & Strategy",
    titleZh: "服务设计与策略",
    descEn: "Mapping end-to-end user journeys, identifying pain points, and architecting seamless blueprints that drive value.",
    descZh: "规划端到端的用户旅程，识别痛点，构建驱动商业价值的无缝服务蓝图。",
    icon: <Palette size={28} />
  },
  {
    titleEn: "Experience Delivery",
    titleZh: "体验交付",
    descEn: "Translating strategic design into tangible, high-quality digital products through agile, iterative methodologies.",
    descZh: "通过敏捷、迭代的交付方法，将战略设计转化为切实的、高质量的数字产品。",
    icon: <Zap size={28} />
  },
  {
    titleEn: "UI/UX Architecture",
    titleZh: "视觉与体验架构",
    descEn: "Crafting vibrant interfaces that not only look stunning but ensure flawless accessibility and interaction.",
    descZh: "打造充满活力且直观的界面，不仅外观惊艳，更能确保无懈可击的交互体验。",
    icon: <Smartphone size={28} />
  },
  {
    titleEn: "Agile Implementation",
    titleZh: "敏捷工程实施",
    descEn: "Bringing designs to life with solid engineering practices, modern stacks, and continuous integration.",
    descZh: "借助扎实的工程实践、现代技术栈和无缝的持续集成，让设计变为现实。",
    icon: <Code size={28} />
  }
];

function ServiceCard({ s, i }: { s: any; i: number }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <motion.div 
      className={`${styles.card} glass-card`}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 * i, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      onMouseMove={handleMouseMove}
      whileHover="hover"
    >
      <motion.div
        className={styles.spotlight}
        style={{
          background: useMotionTemplate`
            radial-gradient(
              400px circle at ${mouseX}px ${mouseY}px,
              rgba(0, 243, 255, 0.15),
              transparent 80%
            )
          `,
        }}
      />
      
      <div className={styles.cardContent}>
        <motion.div 
          className={styles.iconWrapper}
          variants={{
            hover: { scale: 1.1, rotate: 5, backgroundColor: "rgba(0, 243, 255, 0.15)" }
          }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          {s.icon}
        </motion.div>
        
        <div className={styles.titles}>
          <h4 className={styles.zhTitle}>{s.titleZh}</h4>
          <h3 className="font-geek">{s.titleEn}</h3>
        </div>

        <div className={styles.descContainer}>
          <p className={styles.enDesc}>{s.descEn}</p>
          <p className={styles.zhDesc}>{s.descZh}</p>
        </div>
      </div>
      
      <motion.div 
        className={styles.bottomHighlight}
        variants={{
          hover: { opacity: 1, width: "100%" }
        }}
        initial={{ opacity: 0, width: "0%" }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      />
    </motion.div>
  );
}

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
        <motion.h2
          style={{ fontSize: '1.5rem', color: 'var(--text-secondary)', marginBottom: '16px' }}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          我们的核心服务
        </motion.h2>
        <motion.p 
          className="text-secondary"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Dulaidila Design & Delivery Studio provides cutting-edge digital solutions at the intersection of human-centric design and elite implementation.
          <br />
          <span style={{ fontSize: '0.95em', marginTop: '8px', display: 'inline-block' }}>
            都来滴啦工作室致力于在以人为本的设计与精英级执行力的交界处，提供前沿的数字化解决方案。
          </span>
        </motion.p>
      </div>

      <div className={styles.grid}>
        {services.map((s, i) => (
          <ServiceCard key={i} s={s} i={i} />
        ))}
      </div>
    </div>
  );
}
