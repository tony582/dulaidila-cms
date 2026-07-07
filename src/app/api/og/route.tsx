import { ImageResponse } from "next/og";
import { type NextRequest } from "next/server";

export const runtime = "edge";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const PAPER = "#f6f4ee";
const INK = "#1c1b17";
const INK_SOFT = "#55534a";
const INK_FAINT = "#8c897c";
const PINE = "#1f4d3f";
const BRONZE = "#9a7b4f";
const LINE = "rgba(28,27,23,0.18)";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get("title") ?? "dulaidila";
  const author = searchParams.get("author") ?? "Tony Jin";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          background: PAPER,
          position: "relative",
          overflow: "hidden",
          fontFamily: "sans-serif",
        }}
      >
        {/* Hairline frame */}
        <div
          style={{
            position: "absolute",
            inset: 28,
            border: `1px solid ${LINE}`,
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 36,
            border: `1px solid rgba(28,27,23,0.08)`,
          }}
        />

        {/* Content */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "76px 88px",
          }}
        >
          {/* Top: masthead */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div style={{ display: "flex", alignItems: "baseline", gap: 14 }}>
              <span
                style={{
                  color: INK,
                  fontSize: 30,
                  fontWeight: 700,
                  letterSpacing: "-0.01em",
                }}
              >
                Dulaidila
              </span>
              <span
                style={{
                  color: INK_FAINT,
                  fontSize: 15,
                  letterSpacing: "0.35em",
                }}
              >
                都来滴啦
              </span>
            </div>
            <span
              style={{
                color: PINE,
                fontSize: 15,
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: "0.28em",
              }}
            >
              The Journal
            </span>
          </div>

          {/* Middle: title */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 22,
              flex: 1,
              justifyContent: "center",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <div style={{ width: 40, height: 2, background: PINE }} />
              <span
                style={{
                  color: INK_FAINT,
                  fontSize: 16,
                  fontWeight: 600,
                  textTransform: "uppercase",
                  letterSpacing: "0.24em",
                }}
              >
                Insights · 观点与洞察
              </span>
            </div>
            <div
              style={{
                fontSize: title.length > 40 ? 50 : 62,
                fontWeight: 700,
                color: INK,
                lineHeight: 1.2,
                letterSpacing: "-0.01em",
                maxWidth: 940,
              }}
            >
              {title}
            </div>
          </div>

          {/* Bottom: author + motto */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <div
                style={{
                  width: 46,
                  height: 46,
                  borderRadius: "50%",
                  border: `1.5px solid ${PINE}`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 19,
                  fontWeight: 700,
                  color: PINE,
                }}
              >
                {author.charAt(0).toUpperCase()}
              </div>
              <span style={{ color: INK_SOFT, fontSize: 20, fontWeight: 500 }}>
                {author}
              </span>
            </div>

            <span
              style={{
                color: BRONZE,
                fontSize: 17,
                letterSpacing: "0.08em",
                fontStyle: "italic",
              }}
            >
              “Only the Paranoid Survive.”
            </span>
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
