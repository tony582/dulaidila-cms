"use client";

import { useEffect, useState } from "react";
import styles from "./portfolio.module.css";

interface PortfolioItem {
  id: string;
  title: string;
  description: string;
  coverImage?: string | null;
  link?: string | null;
  clientName?: string | null;
  role?: string | null;
}

export default function PortfolioPage() {
  const [portfolios, setPortfolios] = useState<PortfolioItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/portfolio")
      .then((res) => res.json())
      .then((data) => setPortfolios(data))
      .catch((e) => console.error(e))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className={`container ${styles.page}`}>
      {/* Masthead */}
      <header className={styles.head}>
        <p className="eyebrow anim-rise">Selected Work · 精选案例</p>

        <h1 className={`anim-rise ${styles.title}`} style={{ animationDelay: "0.08s" }}>
          Casework, <em>on the record.</em>
        </h1>

        <p className={`anim-rise ${styles.intro}`} style={{ animationDelay: "0.16s" }}>
          A curated index of shipped platforms, products, and experiences —
          每一个条目，都是一次被兑现的承诺。
        </p>
      </header>

      {/* Case index */}
      {loading ? (
        <div className={styles.stateBox}>
          <span className={styles.stateSpinner} aria-hidden />
          <p>Retrieving the archive… 档案调取中</p>
        </div>
      ) : portfolios.length > 0 ? (
        <div className={styles.caseGrid}>
          {portfolios.map((p, i) => {
            const CardInner = (
              <>
                <div className={styles.caseMedia}>
                  {p.coverImage ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={p.coverImage}
                      alt={p.title}
                      className={styles.caseImage}
                      loading="lazy"
                    />
                  ) : (
                    <div className={styles.casePlaceholder}>
                      {String(i + 1).padStart(2, "0")}
                    </div>
                  )}
                </div>

                <div className={styles.caseMeta}>
                  <span className={styles.caseIndex}>
                    CASE {String(i + 1).padStart(2, "0")}
                  </span>
                  {p.clientName && (
                    <span className={styles.caseClient}>{p.clientName}</span>
                  )}
                  {p.role && <span className={styles.caseRole}>{p.role}</span>}
                </div>

                <h2 className={styles.caseTitle}>{p.title}</h2>
                <p className={styles.caseDesc}>{p.description}</p>

                {p.link && (
                  <span className={styles.caseAction}>
                    View the work <span aria-hidden>→</span>
                  </span>
                )}
              </>
            );

            return (
              <div
                key={p.id}
                className="anim-rise"
                style={{ animationDelay: `${0.05 + i * 0.08}s` }}
              >
                {p.link ? (
                  <a
                    href={p.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.caseCard}
                  >
                    {CardInner}
                  </a>
                ) : (
                  <div className={styles.caseCard}>{CardInner}</div>
                )}
              </div>
            );
          })}
        </div>
      ) : (
        <div className={`anim-rise ${styles.stateBox}`}>
          <p className={styles.stateSerif}>The archive awaits its first entry.</p>
          <p>案例库已就绪，静候第一份档案入册。</p>
        </div>
      )}
    </div>
  );
}
