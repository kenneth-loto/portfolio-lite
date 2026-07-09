import { ImageResponse } from "next/og";
import { getFonts } from "@/lib/og";

export const runtime = "edge";

const colors = {
  identity: "#34c759",
  env: "#b95cf0",
  path: "#ff9500",
  git: "#5ac8fa",
  background: "#1c1c1e",
  foreground: "#fdfdfd",
  muted: "#27272a",
  mutedForeground: "#a1a1aa",
};

const CACHE_HEADERS = {
  "Cache-Control": "public, max-age=31536000, s-maxage=31536000, immutable",
};

export async function GET() {
  try {
    const { fontRegular, fontMedium } = await getFonts();

    return new ImageResponse(
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          height: "100%",
          backgroundColor: colors.background,
          padding: "64px 80px",
          justifyContent: "space-between",
          fontFamily: '"Geist Mono"',
        }}
      >
        {/* Prompt line */}
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <div style={{ display: "flex", fontSize: 18 }}>
            <span style={{ color: colors.identity }}>
              Kenneth@LAPTOP-F4NAR8GJ
            </span>
            <span style={{ color: colors.mutedForeground }}>&nbsp;</span>
            <span style={{ color: colors.env }}>MINGW64</span>
            <span style={{ color: colors.mutedForeground }}>&nbsp;</span>
            <span style={{ color: colors.path }}>
              /c/Next.js/portfolio-lite
            </span>
            <span style={{ color: colors.mutedForeground }}>&nbsp;</span>
            <span style={{ color: colors.git }}>(main)</span>
          </div>

          <div
            style={{ display: "flex", fontSize: 18, color: colors.foreground }}
          >
            <span style={{ color: colors.mutedForeground, marginRight: 12 }}>
              $
            </span>
            <span>cat about-me.txt</span>
          </div>
        </div>

        {/* Output block */}
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <div
              style={{
                color: colors.foreground,
                fontSize: 48,
                fontWeight: 500,
                lineHeight: 1.25,
                maxWidth: 900,
              }}
            >
              Full-Stack Developer
            </div>
            <div
              style={{
                color: colors.mutedForeground,
                fontSize: 18,
                fontWeight: 400,
                lineHeight: 1.5,
                maxWidth: 900,
              }}
            >
              Building web apps and backend APIs with Next.js, NestJS, and
              TypeScript. Open to remote junior and entry-level roles worldwide.
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
            borderTop: `1px solid ${colors.muted}`,
            paddingTop: 24,
          }}
        >
          <span
            style={{ color: colors.foreground, fontSize: 16, fontWeight: 500 }}
          >
            Kenneth Loto
          </span>
          <span
            style={{
              color: colors.mutedForeground,
              fontSize: 16,
              fontWeight: 400,
            }}
          >
            kennethloto.dev
          </span>
        </div>
      </div>,
      {
        width: 1200,
        height: 630,
        headers: CACHE_HEADERS,
        fonts: [
          {
            name: "Geist Mono",
            data: fontRegular,
            style: "normal",
            weight: 400,
          },
          {
            name: "Geist Mono",
            data: fontMedium,
            style: "normal",
            weight: 500,
          },
        ],
      },
    );
  } catch (error) {
    console.error("Failed to generate OG image:", error);

    return new ImageResponse(
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          height: "100%",
          alignItems: "center",
          justifyContent: "center",
          gap: 12,
          backgroundColor: colors.background,
        }}
      >
        <div
          style={{
            display: "flex",
            color: colors.foreground,
            fontSize: 24,
            fontWeight: 500,
          }}
        >
          Kenneth Loto
        </div>
        <div
          style={{
            display: "flex",
            color: colors.mutedForeground,
            fontSize: 48,
          }}
        >
          Full-Stack Developer
        </div>
      </div>,
      {
        width: 1200,
        height: 630,
      },
    );
  }
}
