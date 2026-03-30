"use client";

import { motion } from "framer-motion";
import { Code, Smartphone, Palette, Zap } from "lucide-react";
import styles from "./services.module.css";

const services = [
  {
    title: "Service Design & Strategy",
    desc: "Mapping end-to-end user journeys, identifying pain points, and architecting seamless service blueprints that drive business value.",
    icon: <Palette size={32} />
  },
  {
    title: "Experience Delivery",
    desc: "Translating strategic design into tangible, high-quality digital products through agile, iterative delivery methodologies.",
    icon: <Zap size={32} />
  },
  {
    title: "UI/UX Architecture",
    desc: "Crafting vibrant, intuitive interfaces that not only look stunning but ensure flawless accessibility and human-centric interaction.",
    icon: <Smartphone size={32} />
  },
  {
    title: "Agile Implementation",
    desc: "Bringing designs to life with solid engineering practices, modern technical stacks, and seamless continuous integration.",
    icon: <Code size={32} />
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
          Dulaidila Design & Delivery Studio provides cutting-edge digital solutions at the intersection of human-centric design and elite implementation.
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
