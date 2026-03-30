import Link from "next/link";
import styles from "./Navbar.module.css";
import { Terminal, Menu, X } from "lucide-react";

export default function Navbar() {
  return (
    <nav className={styles.navbar}>
      <div className={`container ${styles.navContainer}`}>
        
        {/* Logo */}
        <Link href="/" className={styles.logo}>
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
          
          {/* Mobile Menu Toggle placeholder */}
          <button className={styles.mobileMenuBtn}>
             <Menu size={24} />
          </button>
        </div>
      </div>
    </nav>
  );
}
