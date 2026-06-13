import { ImageResponse } from "next/og";
import { getFonts } from "@/lib/og";

export const runtime = "edge";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const title = (searchParams.get("title") ?? "").slice(0, 60);
  const description = (searchParams.get("description") ?? "").slice(0, 160);
  const type = searchParams.get("type") ?? "";
  const cta = searchParams.get("cta") ?? "";

  const { fontRegular, fontSemiBold } = await getFonts();

  return new ImageResponse(
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: "100%",
        backgroundColor: "#1C1C1E",
        padding: "64px 80px",
        justifyContent: "space-between",
        fontFamily: '"JetBrains Mono"',
      }}
    >
      {/* Name + Title */}
      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        <span style={{ color: "#fdfdfd", fontSize: 18, fontWeight: 600 }}>
          Kenneth Loto
        </span>
        {type !== "Home" && (
          <span style={{ color: "#a1a1aa", fontSize: 16, fontWeight: 400 }}>
            Full Stack Developer
          </span>
        )}
      </div>

      {/* Middle */}
      <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
        <span
          style={{
            color: "#a1a1aa",
            fontSize: 14,
            fontWeight: 400,
            textTransform: "uppercase",
          }}
        >
          {type}
        </span>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <div
            style={{
              color: "#fdfdfd",
              fontSize: 48,
              fontWeight: 600,
              lineHeight: 1.25,
              maxWidth: 768,
            }}
          >
            {title}
          </div>
          {description && (
            <div
              style={{
                color: "#a1a1aa",
                fontSize: 18,
                fontWeight: 400,
                lineHeight: 1.5,
                maxWidth: 768,
              }}
            >
              {description}
            </div>
          )}
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
          maxWidth: 768, // aligned to content above
        }}
      >
        <span style={{ color: "#a1a1aa", fontSize: 16, fontWeight: 400 }}>
          kennethloto.dev
        </span>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: 6,
          }}
        >
          {/* Only the text is underlined, not the arrow */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
            }}
          >
            <span style={{ color: "#fdfdfd", fontSize: 16, fontWeight: 400 }}>
              {cta.replace("⟶", "").trim()}
            </span>
            <div
              style={{
                height: "1px",
                width: "100%",
                backgroundColor: "#fdfdfd",
              }}
            />
          </div>
          <span
            style={{
              color: "#fdfdfd",
              fontSize: 16,
              fontWeight: 400,
              marginLeft: 2,
            }}
          >
            ⟶
          </span>
        </div>
      </div>
    </div>,
    {
      width: 1200,
      height: 630,
      headers: {
        "Cache-Control":
          "public, max-age=31536000, s-maxage=31536000, immutable",
      },
      fonts: [
        {
          name: "JetBrains Mono",
          data: fontRegular,
          style: "normal",
          weight: 400,
        },
        {
          name: "JetBrains Mono",
          data: fontSemiBold,
          style: "normal",
          weight: 600,
        },
      ],
    },
  );
}
