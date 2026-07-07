import Link from "next/link";
import styles from "./services.module.css";

const services = [
  {
    index: "01",
    titleEn: "Service Design & Strategy",
    titleZh: "服务设计与策略",
    descEn:
      "Mapping end-to-end user journeys, identifying pain points, and architecting seamless blueprints that drive value.",
    descZh:
      "规划端到端的用户旅程，识别痛点，构建驱动商业价值的无缝服务蓝图。",
    scope: ["Journey Mapping 旅程地图", "Service Blueprints 服务蓝图", "Value Propositions 价值主张"],
  },
  {
    index: "02",
    titleEn: "Experience Delivery",
    titleZh: "体验交付",
    descEn:
      "Translating strategic design into tangible, high-quality digital products through agile, iterative methodologies.",
    descZh:
      "通过敏捷、迭代的交付方法，将战略设计转化为切实的、高质量的数字产品。",
    scope: ["Agile Delivery 敏捷交付", "Iteration Loops 迭代闭环", "Quality Gates 质量门禁"],
  },
  {
    index: "03",
    titleEn: "UI/UX Architecture",
    titleZh: "视觉与体验架构",
    descEn:
      "Crafting vibrant interfaces that not only look stunning but ensure flawless accessibility and interaction.",
    descZh:
      "打造充满活力且直观的界面，不仅外观惊艳，更能确保无懈可击的交互体验。",
    scope: ["Design Systems 设计系统", "Interaction Design 交互设计", "Accessibility 无障碍"],
  },
  {
    index: "04",
    titleEn: "Agile Implementation",
    titleZh: "敏捷工程实施",
    descEn:
      "Bringing designs to life with solid engineering practices, modern stacks, and continuous integration.",
    descZh:
      "借助扎实的工程实践、现代技术栈和无缝的持续集成，让设计变为现实。",
    scope: ["Modern Stacks 现代技术栈", "CI/CD 持续集成", "Cloud Native 云原生"],
  },
];

export default function ServicesPage() {
  return (
    <div className={`container ${styles.page}`}>
      {/* Masthead */}
      <header className={styles.head}>
        <p className="eyebrow anim-rise">Services · 服务范畴</p>

        <h1 className={`anim-rise ${styles.title}`} style={{ animationDelay: "0.08s" }}>
          Four disciplines.
          <br />
          <em>One standard.</em>
        </h1>

        <div className={`anim-rise ${styles.intro}`} style={{ animationDelay: "0.16s" }}>
          <p className={styles.introZh}>四项核心服务，同一个交付标准。</p>
          <p className={styles.introEn}>
            Dulaidila works at the intersection of human-centric design and
            disciplined implementation — 都来滴啦工作室致力于在以人为本的设计
            与精英级执行力的交界处，提供可信赖的数字化解决方案。
          </p>
        </div>
      </header>

      {/* Ledger */}
      <div className={styles.ledger}>
        {services.map((s, i) => (
          <article
            key={s.index}
            className={`anim-rise ${styles.entry}`}
            style={{ animationDelay: `${0.22 + i * 0.09}s` }}
          >
            <div className={styles.entryIndex}>{s.index}</div>

            <div className={styles.entryTitles}>
              <h2 className={styles.entryZh}>{s.titleZh}</h2>
              <div className={styles.entryEn}>{s.titleEn}</div>
            </div>

            <div className={styles.entryBody}>
              <p className={styles.entryDescEn}>{s.descEn}</p>
              <p className={styles.entryDescZh}>{s.descZh}</p>
              <ul className={styles.scope}>
                {s.scope.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </div>

      {/* Closing CTA */}
      <aside className={`anim-rise ${styles.closing}`} style={{ animationDelay: "0.6s" }}>
        <p className={styles.closingText}>
          Not sure where to begin? <span>不知从何谈起？先聊聊看。</span>
        </p>
        <Link href="/contact" className="btn btn-line">
          Get in Touch <span className="btn-arrow">→</span>
        </Link>
      </aside>
    </div>
  );
}
