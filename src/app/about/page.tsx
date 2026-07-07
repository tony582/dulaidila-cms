import styles from "./about.module.css";

const FACTS: { label: string; value: string; href?: string }[] = [
  { label: "Founder", value: "Tony Jin" },
  { label: "Founded", value: "2024" },
  { label: "Base", value: "Shanghai · 上海" },
  { label: "Email", value: "tony@dulaidila.com", href: "mailto:tony@dulaidila.com" },
  { label: "WeChat", value: "dulaidila" },
  { label: "Motto", value: "Only the Paranoid Survive" },
];

export default function AboutPage() {
  return (
    <div className={`container ${styles.page}`}>
      {/* Masthead */}
      <header className={styles.head}>
        <p className="eyebrow anim-rise">About · 关于事务所</p>
        <h1 className={`anim-rise ${styles.title}`} style={{ animationDelay: "0.08s" }}>
          A small studio,
          <br />
          <em>held to a tall standard.</em>
        </h1>
        <p className={`anim-rise ${styles.titleZh}`} style={{ animationDelay: "0.16s" }}>
          一间小而认真的工作室。
        </p>
      </header>

      <div className={styles.body}>
        {/* The letter */}
        <section
          className={`anim-rise ${styles.letter}`}
          style={{ animationDelay: "0.24s" }}
        >
          <p className={styles.letterOpen}>
            Dulaidila sits at the intersection of empathetic service design and
            rigorous delivery.
          </p>
          <p>
            We believe exceptional experiences require both visionary strategy
            and meticulous implementation. In a world of hyper-fast
            technological shifts, our job is to bring clarity to the former and
            certainty to the latter — 在飞速变化的技术浪潮中，我们负责把愿景
            梳理成蓝图，再把蓝图兑现为可用的服务。
          </p>
          <p>
            The mission is simple to say and hard to do: deliver end-to-end
            services that are both intuitive and impactful, so that from
            blueprint to deployment, the human experience stays at the core.
            使命说来简单，做到很难：让"以人为本"贯穿从蓝图到上线的每一个环节。
          </p>

          <div className={styles.signature}>
            <span className={styles.signName}>Tony Jin</span>
            <span className={styles.signRole}>Founder · Dulaidila 都来滴啦</span>
          </div>
        </section>

        {/* Fact rail */}
        <aside
          className={`anim-rise ${styles.rail}`}
          style={{ animationDelay: "0.36s" }}
        >
          <div className={styles.seal}>
            <svg viewBox="0 0 120 120" aria-hidden>
              <circle cx="60" cy="60" r="58" fill="none" stroke="currentColor" strokeWidth="1" />
              <circle cx="60" cy="60" r="46" fill="none" stroke="currentColor" strokeWidth="0.6" strokeDasharray="2 5" />
            </svg>
            <span className={styles.sealText}>TJ</span>
          </div>

          <dl className={styles.facts}>
            {FACTS.map((f) => (
              <div key={f.label} className={styles.factRow}>
                <dt>{f.label}</dt>
                <dd>{f.href ? <a href={f.href}>{f.value}</a> : f.value}</dd>
              </div>
            ))}
          </dl>
        </aside>
      </div>
    </div>
  );
}
