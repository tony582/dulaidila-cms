import Link from "next/link";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      style={{
        borderTop: "1px solid rgba(255,255,255,0.06)",
        background: "rgba(0,0,0,0.2)",
        padding: "32px 24px",
        textAlign: "center",
      }}
    >
      <div
        className="container"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "12px",
        }}
      >
        {/* Links row */}
        <div
          style={{
            display: "flex",
            gap: "24px",
            flexWrap: "wrap",
            justifyContent: "center",
            fontSize: "0.85rem",
          }}
        >
          <Link href="/" style={{ color: "var(--text-muted)", textDecoration: "none" }}>
            首页
          </Link>
          <Link href="/insights" style={{ color: "var(--text-muted)", textDecoration: "none" }}>
            Insights
          </Link>
          <Link href="/portfolio" style={{ color: "var(--text-muted)", textDecoration: "none" }}>
            Portfolio
          </Link>
          <Link href="/about" style={{ color: "var(--text-muted)", textDecoration: "none" }}>
            About
          </Link>
        </div>

        {/* Copyright + ICP */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "16px",
            fontSize: "0.78rem",
            color: "rgba(255,255,255,0.5)",
          }}
        >
          <span>© {year} dulaidila. All rights reserved.</span>
          <span style={{ color: "rgba(255,255,255,0.2)" }}>|</span>
          <a
            href="https://beian.miit.gov.cn/"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: "rgba(255,255,255,0.7)",
              textDecoration: "none",
              fontFamily: "var(--font-jetbrains-mono, monospace)",
              fontSize: "0.75rem",
              borderBottom: "1px solid rgba(255,255,255,0.2)",
              paddingBottom: "1px",
              transition: "color 0.2s",
            }}
            onMouseEnter={e => (e.currentTarget.style.color = "#fff")}
            onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.7)")}
          >
            沪ICP备20003294号-1
          </a>
        </div>
      </div>
    </footer>
  );
}
