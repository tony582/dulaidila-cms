"use client";

import Link from "next/link";
import styles from "./Navbar.module.css";
import { Terminal, Menu, X } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className={styles.navbar}>
      <div className={`container ${styles.navContainer}`}>
        
        {/* Logo */}
        <Link href="/" className={styles.logo} onClick={() => setIsOpen(false)}>
          <Terminal size={24} className={styles.logoIcon} />
          <span className="font-geek">
            Dulaidila<span className={styles.dot}>.</span>
          </span>
        </Link>
        
        {/* Desktop Links */}
        <div className={styles.navLinks}>
          <Link href="/services" className={styles.navLink}>Services</Link>
          <Link href="/portfolio" className={styles.navLink}>Portfolio</Link>
          <Link href="/insights" className={styles.navLink}>Insights</Link>
          <Link href="/about" className={styles.navLink}>About</Link>
        </div>

        {/* CTA Button */}
        <div className={styles.navActions}>
          <Link href="/contact" className={styles.ctaButton}>
            Say Hello <span className={styles.ctaArrow}>→</span>
          </Link>
          
          {/* Mobile Menu Toggle */}
          <button 
            className={styles.mobileMenuBtn}
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle Menu"
          >
             {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            className={styles.mobileMenu}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className={styles.mobileNavLinks}>
              <Link href="/services" className={styles.mobileNavLink} onClick={() => setIsOpen(false)}>Services</Link>
              <Link href="/portfolio" className={styles.mobileNavLink} onClick={() => setIsOpen(false)}>Portfolio</Link>
              <Link href="/insights" className={styles.mobileNavLink} onClick={() => setIsOpen(false)}>Insights</Link>
              <Link href="/about" className={styles.mobileNavLink} onClick={() => setIsOpen(false)}>About</Link>
              <Link href="/contact" className={styles.mobileCtaButton} onClick={() => setIsOpen(false)}>Say Hello</Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
