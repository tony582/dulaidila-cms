"use client";

import Link from "next/link";
import styles from "./Navbar.module.css";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

const NAV_LINKS = [
  { href: "/services", index: "01", label: "Services", zh: "服务" },
  { href: "/portfolio", index: "02", label: "Casework", zh: "案例" },
  { href: "/insights", index: "03", label: "Journal", zh: "洞察" },
  { href: "/about", index: "04", label: "About", zh: "关于" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className={styles.navbar}>
      <div className={`container ${styles.navContainer}`}>
        {/* Wordmark */}
        <Link href="/" className={styles.logo} onClick={() => setIsOpen(false)}>
          <span className={styles.wordmark}>Dulaidila</span>
          <span className={styles.wordmarkZh}>都来滴啦</span>
        </Link>

        {/* Desktop Links */}
        <div className={styles.navLinks}>
          {NAV_LINKS.map((link) => (
            <Link key={link.href} href={link.href} className={styles.navLink}>
              <sup className={styles.navIndex}>{link.index}</sup>
              {link.label}
            </Link>
          ))}
        </div>

        {/* CTA Button */}
        <div className={styles.navActions}>
          <Link href="/contact" className={styles.ctaButton}>
            Get in Touch
            <span className={styles.ctaArrow}>→</span>
          </Link>

          {/* Mobile Menu Toggle */}
          <button
            className={styles.mobileMenuBtn}
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle Menu"
          >
            {isOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className={styles.mobileMenu}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className={styles.mobileNavLinks}>
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={styles.mobileNavLink}
                  onClick={() => setIsOpen(false)}
                >
                  <span className={styles.mobileNavIndex}>{link.index}</span>
                  <span className={styles.mobileNavLabel}>{link.label}</span>
                  <span className={styles.mobileNavZh}>{link.zh}</span>
                </Link>
              ))}
              <Link
                href="/contact"
                className={styles.mobileCtaButton}
                onClick={() => setIsOpen(false)}
              >
                Get in Touch — 开始对话
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
