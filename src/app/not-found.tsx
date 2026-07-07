import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "404 — Page Not Found | dulaidila",
  description: "The page you are looking for does not exist.",
};

export default function NotFound() {
  return (
    <div
      style={{
        minHeight: "calc(100vh - var(--nav-h))",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "48px 24px",
        textAlign: "center",
      }}
    >
      <p className="eyebrow" style={{ marginBottom: "28px" }}>
        Error · 页面不存在
      </p>

      <div
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "clamp(6rem, 18vw, 11rem)",
          fontWeight: 300,
          lineHeight: 1,
          letterSpacing: "-0.03em",
          color: "var(--ink)",
          userSelect: "none",
        }}
      >
        4<span style={{ color: "var(--pine)", fontStyle: "italic" }}>0</span>4
      </div>

      <h1
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "1.5rem",
          fontWeight: 550,
          margin: "28px 0 10px",
        }}
      >
        This page is not in the archive.
      </h1>
      <p
        style={{
          color: "var(--ink-soft)",
          lineHeight: 1.7,
          maxWidth: "44ch",
          marginBottom: "40px",
          fontSize: "0.95rem",
        }}
      >
        您访问的页面不存在，或已被移动。Let&apos;s get you back on the record.
      </p>

      <div
        style={{
          display: "flex",
          gap: "14px",
          justifyContent: "center",
          flexWrap: "wrap",
        }}
      >
        <Link href="/" className="btn btn-ink">
          Back Home <span className="btn-arrow">→</span>
        </Link>
        <Link href="/insights" className="btn btn-line">
          The Journal
        </Link>
      </div>

      <p
        style={{
          marginTop: "48px",
          fontSize: "0.7rem",
          letterSpacing: "0.2em",
          color: "var(--ink-faint)",
          fontFamily: "var(--font-mono)",
        }}
      >
        DULAIDILA.COM — 404
      </p>
    </div>
  );
}
