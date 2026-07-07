import styles from "@/app/page.module.css";

const CX = 280;
const CY = 280;

// Fixed precision keeps server- and client-rendered coordinates identical
// (raw floats serialize differently and trigger hydration mismatches).
const fix = (n: number) => Number(n.toFixed(2));

function tick(i: number, step: number, r1: number, r2: number) {
  const a = (i * step * Math.PI) / 180;
  return {
    x1: fix(CX + Math.cos(a) * r1),
    y1: fix(CY + Math.sin(a) * r1),
    x2: fix(CX + Math.cos(a) * r2),
    y2: fix(CY + Math.sin(a) * r2),
  };
}

/**
 * FIG.01 — a slowly turning "delivery compass" drawn like a technical plate:
 * hairline rings, tick marks, one bronze arc, and the four glyphs 设/计/交/付.
 */
export default function HeroTableau() {
  return (
    <figure
      className={`anim-rise ${styles.heroVisual}`}
      style={{ animationDelay: "0.2s", animationDuration: "1.1s" }}
    >
      <svg
        viewBox="0 0 560 560"
        className={styles.tableauSvg}
        role="img"
        aria-label="Dulaidila service delivery compass illustration"
      >
        {/* registration marks */}
        <g className={styles.regMarks}>
          <path d="M16 40 V16 H40" />
          <path d="M520 16 H544 V40" />
          <path d="M544 520 V544 H520" />
          <path d="M40 544 H16 V520" />
        </g>

        {/* crosshair */}
        <line x1={CX} y1={30} x2={CX} y2={530} className={styles.hairline} />
        <line x1={30} y1={CY} x2={530} y2={CY} className={styles.hairline} />

        {/* static rings */}
        <circle cx={CX} cy={CY} r={250} className={styles.ring} />
        <circle cx={CX} cy={CY} r={170} className={styles.ring} />
        <circle cx={CX} cy={CY} r={60} className={styles.ringStrong} />

        {/* tick face */}
        <g className={styles.ticks}>
          {Array.from({ length: 72 }, (_, i) => {
            const long = i % 18 === 0;
            const p = tick(i, 5, long ? 156 : 162, 170);
            return <line key={i} {...p} className={long ? styles.tickLong : undefined} />;
          })}
        </g>

        {/* rotating dashed ring */}
        <circle
          cx={CX}
          cy={CY}
          r={212}
          className={`${styles.ringDashed} ${styles.spinSlow}`}
        />

        {/* bronze quarter arc */}
        <circle
          cx={CX}
          cy={CY}
          r={250}
          className={`${styles.arcBronze} ${styles.spinSlower}`}
          pathLength={100}
        />

        {/* sweep hand */}
        <g className={styles.spinSweep}>
          <line x1={CX} y1={CY} x2={CX + 212} y2={CY} className={styles.sweepLine} />
          <circle cx={CX + 212} cy={CY} r={5} className={styles.sweepNode} />
        </g>

        {/* cardinal glyphs — 设计 · 交付 */}
        <g className={styles.glyphs}>
          <text x={CX} y={54} textAnchor="middle">设</text>
          <text x={532} y={CY + 9} textAnchor="middle">计</text>
          <text x={CX} y={548} textAnchor="middle">交</text>
          <text x={28} y={CY + 9} textAnchor="middle">付</text>
        </g>
        <g className={styles.degrees}>
          <text x={CX + 14} y={84}>0°</text>
          <text x={480} y={CY - 12}>90°</text>
          <text x={CX + 14} y={506}>180°</text>
          <text x={64} y={CY - 12}>270°</text>
        </g>

        {/* centre seal */}
        <circle cx={CX} cy={CY} r={3} className={styles.centreDot} />
        <g className={styles.centreText}>
          <text x={CX} y={CY - 76} textAnchor="middle">EST. 2024</text>
          <text x={CX} y={CY + 88} textAnchor="middle">SHANGHAI · 上海</text>
        </g>
      </svg>

      <figcaption className={styles.tableauCaption}>
        FIG. 01 — SERVICE DELIVERY COMPASS · 服务交付罗盘
      </figcaption>
    </figure>
  );
}
