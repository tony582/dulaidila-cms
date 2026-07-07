import Link from "next/link";
import styles from "./Footer.module.css";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className={`dark-band ${styles.footer}`}>
      <div className={`container ${styles.inner}`}>
        {/* Brand */}
        <div className={styles.brand}>
          <div className={styles.wordmark}>Dulaidila</div>
          <div className={styles.wordmarkZh}>都来滴啦 · 独立服务设计与交付事务所</div>
          <p className={styles.motto}>
            Design the service. Deliver the promise.
          </p>
        </div>

        {/* Explore */}
        <div className={styles.col}>
          <div className={styles.colTitle}>Explore</div>
          <Link href="/" className={styles.colLink}>
            首页 Home
          </Link>
          <Link href="/services" className={styles.colLink}>
            服务 Services
          </Link>
          <Link href="/portfolio" className={styles.colLink}>
            案例 Casework
          </Link>
          <Link href="/insights" className={styles.colLink}>
            洞察 Journal
          </Link>
          <Link href="/about" className={styles.colLink}>
            关于 About
          </Link>
        </div>

        {/* Contact */}
        <div className={styles.col}>
          <div className={styles.colTitle}>Contact</div>
          <a href="mailto:tony@dulaidila.com" className={styles.colLink}>
            tony@dulaidila.com
          </a>
          <span className={styles.colText}>WeChat — dulaidila</span>
          <span className={styles.colText}>Shanghai, China</span>
          <Link href="/contact" className={styles.colCta}>
            开始对话 <span aria-hidden>→</span>
          </Link>
        </div>
      </div>

      {/* Legal rail */}
      <div className={`container ${styles.legal}`}>
        <span>© {year} dulaidila. All rights reserved.</span>
        <span className={styles.legalMotto}>“Only the Paranoid Survive.”</span>
        <a
          href="https://beian.miit.gov.cn/"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.icp}
        >
          沪ICP备20003294号-1
        </a>
      </div>
    </footer>
  );
}
