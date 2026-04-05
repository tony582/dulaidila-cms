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
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px",
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background orbs */}
      <div
        style={{
          position: "absolute",
          top: "20%",
          left: "20%",
          width: "400px",
          height: "400px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(0,212,255,0.08) 0%, transparent 70%)",
          filter: "blur(60px)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "20%",
          right: "20%",
          width: "350px",
          height: "350px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(139,92,246,0.08) 0%, transparent 70%)",
          filter: "blur(60px)",
          pointerEvents: "none",
        }}
      />

      {/* Glitch 404 */}
      <div
        style={{
          fontSize: "clamp(6rem, 20vw, 12rem)",
          fontWeight: 900,
          lineHeight: 1,
          fontFamily: "var(--font-space-grotesk), sans-serif",
          background:
            "linear-gradient(135deg, var(--accent-cyan, #00d4ff), var(--accent-purple, #8b5cf6))",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
          letterSpacing: "-0.04em",
          marginBottom: "0.5rem",
          userSelect: "none",
        }}
      >
        404
      </div>

      <div
        className="glass-card"
        style={{
          maxWidth: "480px",
          width: "100%",
          padding: "40px 32px",
          borderRadius: "20px",
          marginTop: "8px",
        }}
      >
        <h1
          className="font-geek"
          style={{
            fontSize: "1.6rem",
            marginBottom: "12px",
            color: "var(--text-primary)",
          }}
        >
          Page Not Found
        </h1>
        <p
          style={{
            color: "var(--text-secondary)",
            lineHeight: 1.7,
            marginBottom: "32px",
            fontSize: "0.95rem",
          }}
        >
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
          Let&apos;s get you back on track.
        </p>

        <div
          style={{
            display: "flex",
            gap: "12px",
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          <Link
            href="/"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "12px 24px",
              background:
                "linear-gradient(135deg, var(--accent-cyan, #00d4ff), var(--accent-purple, #8b5cf6))",
              color: "#fff",
              borderRadius: "12px",
              fontWeight: 600,
              textDecoration: "none",
              fontSize: "0.9rem",
              transition: "opacity 0.2s",
            }}
          >
            ← Back Home
          </Link>
          <Link
            href="/insights"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "12px 24px",
              border: "1px solid rgba(255,255,255,0.12)",
              color: "var(--text-primary)",
              borderRadius: "12px",
              fontWeight: 500,
              textDecoration: "none",
              fontSize: "0.9rem",
              background: "rgba(255,255,255,0.04)",
              transition: "border-color 0.2s",
            }}
          >
            Browse Insights
          </Link>
        </div>
      </div>

      {/* URL hint */}
      <p
        style={{
          marginTop: "32px",
          fontSize: "0.78rem",
          color: "var(--text-muted)",
          fontFamily: "var(--font-jetbrains-mono), monospace",
          opacity: 0.6,
        }}
      >
        dulaidila.com → 404
      </p>
    </div>
  );
}
