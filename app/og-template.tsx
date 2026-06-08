import { ImageResponse } from "next/og";

// Template compartilhado das imagens de preview (Open Graph) — 1200x630.
// Usado pela home e por cada LP, mudando só o kicker e o título.
export function renderOg({ kicker, title }: { kicker: string; title: string }) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          position: "relative",
          background: "#07070a",
          padding: "80px",
          fontFamily: "sans-serif",
        }}
      >
        {/* glow coral */}
        <div
          style={{
            position: "absolute",
            top: -220,
            right: -140,
            width: 640,
            height: 640,
            borderRadius: 9999,
            display: "flex",
            backgroundImage:
              "radial-gradient(circle at 50% 50%, rgba(255,90,54,0.40), rgba(255,90,54,0) 60%)",
          }}
        />

        {/* marca */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 18,
            marginBottom: 44,
          }}
        >
          <div
            style={{
              width: 46,
              height: 46,
              borderRadius: 12,
              display: "flex",
              background: "#ff5a36",
            }}
          />
          <div style={{ display: "flex", fontSize: 36, fontWeight: 800, color: "white" }}>
            DevDesk<span style={{ color: "#ff8463" }}>Tech</span>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            fontSize: 27,
            fontWeight: 700,
            color: "#ff8463",
            marginBottom: 20,
          }}
        >
          {kicker}
        </div>

        <div
          style={{
            display: "flex",
            fontSize: 70,
            fontWeight: 800,
            color: "white",
            lineHeight: 1.05,
            maxWidth: 940,
          }}
        >
          {title}
        </div>
      </div>
    ),
    { width: 1200, height: 630 },
  );
}
