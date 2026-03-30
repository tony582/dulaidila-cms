import { PrismaClient } from "@prisma/client";
import { Terminal } from "lucide-react";

// For static generation or server components, we can query direct
const prisma = new PrismaClient();

export default async function PortfolioPage() {
  const portfolios = await prisma.portfolio.findMany({
    orderBy: { createdAt: "desc" }
  });

  return (
    <div className="container" style={{ padding: "100px 24px" }}>
      <div style={{ textAlign: "center", marginBottom: "60px" }}>
        <h1 className="font-geek" style={{ fontSize: "3rem", marginBottom: "16px" }}>Our <span className="text-gradient">Work</span></h1>
        <p className="text-secondary">Explore independent projects, robust CMS builds, and modern applications.</p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "32px" }}>
        {portfolios.length > 0 ? (
          portfolios.map((p) => (
            <div key={p.id} className="glass-card" style={{ padding: "24px", display: "flex", flexDirection: "column" }}>
              {p.imageUrl && (
                <div style={{ width: "100%", height: "200px", borderRadius: "12px", overflow: "hidden", marginBottom: "20px" }}>
                  <img src={p.imageUrl} alt={p.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                </div>
              )}
              <h3 className="font-geek" style={{ fontSize: "1.4rem", marginBottom: "12px", color: "var(--text-primary)" }}>{p.title}</h3>
              <p style={{ color: "var(--text-secondary)", lineHeight: 1.6, flexGrow: 1 }}>{p.description}</p>
              {p.link && (
                <a href={p.link} target="_blank" rel="noreferrer" style={{ marginTop: "20px", display: "inline-block", color: "var(--accent-cyan)", fontWeight: 500 }}>
                  Live Demo →
                </a>
              )}
            </div>
          ))
        ) : (
          <div className="glass-card" style={{ padding: "40px", gridColumn: "1 / -1", textAlign: "center", color: "var(--text-muted)" }}>
            <Terminal size={48} style={{ margin: "0 auto 20px", opacity: 0.5 }} />
            <p>Portfolio items will be fetched from the database and displayed here.</p>
          </div>
        )}
      </div>
    </div>
  );
}
