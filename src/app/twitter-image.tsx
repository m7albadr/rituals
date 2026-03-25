import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Rituals - Luxury Chalets in Kuwait";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#2C2A28",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(135deg, #2C2A28 0%, #1A1816 50%, #2C2A28 100%)",
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 4,
            background: "linear-gradient(90deg, transparent, #C49870, transparent)",
            display: "flex",
          }}
        />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
            zIndex: 1,
          }}
        >
          <div style={{ width: 60, height: 1, backgroundColor: "#C49870", opacity: 0.5, marginBottom: 32, display: "flex" }} />
          <div style={{ fontSize: 80, color: "#F2EBE4", fontFamily: "Georgia, serif", letterSpacing: -1, display: "flex" }}>
            Rituals
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 16, marginTop: 20 }}>
            <div style={{ width: 40, height: 1, backgroundColor: "#C49870", opacity: 0.4, display: "flex" }} />
            <div style={{ fontSize: 14, color: "#C49870", letterSpacing: 4, textTransform: "uppercase", fontWeight: 600, display: "flex" }}>
              LUXURY CHALETS
            </div>
            <div style={{ width: 40, height: 1, backgroundColor: "#C49870", opacity: 0.4, display: "flex" }} />
          </div>
          <div style={{ fontSize: 22, color: "#8A8580", marginTop: 24, display: "flex" }}>
            Premium chalets in Al Khiran, Kuwait
          </div>
          <div
            style={{
              marginTop: 40,
              display: "flex",
              alignItems: "center",
              backgroundColor: "#C49870",
              color: "white",
              fontSize: 16,
              fontWeight: 600,
              paddingLeft: 28,
              paddingRight: 28,
              paddingTop: 14,
              paddingBottom: 14,
              borderRadius: 50,
            }}
          >
            Book Direct - No Middleman
          </div>
        </div>
        <div style={{ position: "absolute", bottom: 32, display: "flex", alignItems: "center", gap: 24, color: "#6B6660", fontSize: 14 }}>
          <span style={{ display: "flex" }}>ritualskw.com</span>
          <span style={{ display: "flex", color: "#C49870" }}>From 150 KWD / night</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
