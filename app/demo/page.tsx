import type { Metadata } from "next";
import Link from "next/link";
import { demos } from "./demos";

export const metadata: Metadata = {
  title: "Prévias DevDesk",
  description: "Prévias de sites criados pela DevDesk para clientes.",
  robots: { index: false, follow: false },
};

export default function DemoIndex() {
  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#0f1115",
        color: "#e8e8ea",
        fontFamily: "system-ui, sans-serif",
        padding: "72px 24px",
      }}
    >
      <div style={{ maxWidth: 960, margin: "0 auto" }}>
        <p
          style={{
            fontSize: 12,
            letterSpacing: ".24em",
            textTransform: "uppercase",
            color: "#8a8a93",
            margin: "0 0 10px",
          }}
        >
          DevDesk · Prévias
        </p>
        <h1
          style={{
            fontSize: 40,
            fontWeight: 700,
            margin: "0 0 8px",
            letterSpacing: "-.02em",
          }}
        >
          Prévias de clientes
        </h1>
        <p style={{ color: "#a0a0a8", margin: "0 0 48px", fontSize: 16 }}>
          {demos.length} {demos.length === 1 ? "prévia" : "prévias"} disponíveis.
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill,minmax(280px,1fr))",
            gap: 20,
          }}
        >
          {demos.map((d) => (
            <Link
              key={d.slug}
              href={`/demo/${d.slug}`}
              style={{
                textDecoration: "none",
                color: "inherit",
                border: "1px solid #23262e",
                borderRadius: 16,
                overflow: "hidden",
                background: "#161922",
                display: "block",
              }}
            >
              <div style={{ height: 150, background: d.cor }} />
              <div style={{ padding: "18px 20px 22px" }}>
                <div style={{ fontSize: 19, fontWeight: 600 }}>{d.cliente}</div>
                <div
                  style={{ fontSize: 13, color: "#9a9aa3", marginTop: 4 }}
                >
                  {d.segmento}
                </div>
                <div
                  style={{
                    fontSize: 12,
                    color: "#6f7baf",
                    marginTop: 14,
                    fontFamily: "monospace",
                  }}
                >
                  /demo/{d.slug} →
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
