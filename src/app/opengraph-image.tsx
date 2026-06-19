import { ImageResponse } from "next/og";

export const alt = "ZEDAS Project — Mapping the Future of Water-Based Production";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Brand-consistent social card: deep-water gradient, teal accent, Geist-like
// system sans, the through-line as the close.
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "80px",
          background:
            "radial-gradient(120% 120% at 15% 10%, #0f766e 0%, #0b1117 60%)",
          color: "#e7edf2",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", fontSize: 30, letterSpacing: -0.5, color: "#93a2af" }}>
          ZEDAS Project · Cámara Argentina del Agua
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 24,
          }}
        >
          <div style={{ display: "flex", fontSize: 76, fontWeight: 700, lineHeight: 1.05, letterSpacing: -2, maxWidth: 940 }}>
            Mapping the Future of Water-Based Production
          </div>
          <div style={{ display: "flex", fontSize: 40, fontWeight: 600, color: "#2dd4bf" }}>
            Production follows water.
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
