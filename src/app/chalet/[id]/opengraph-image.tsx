import { ImageResponse } from "next/og";
import { chalets } from "@/lib/data";

export const runtime = "edge";
export const alt = "Rituals Chalet";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const chalet = chalets.find((c) => c.id === id);
  const name = chalet?.name ?? "Rituals";
  const price = chalet?.basePrice ?? 150;
  const rooms = chalet?.rooms ?? 0;
  const guests = chalet?.maxGuests ?? 0;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#2C2A28",
          position: "relative",
        }}
      >
        {/* Gold accent line top */}
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

        {/* Main content area */}
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            paddingLeft: 80,
            paddingRight: 80,
            position: "relative",
            zIndex: 1,
          }}
        >
          {/* Brand */}
          <div
            style={{
              fontSize: 18,
              color: "#C49870",
              letterSpacing: 4,
              textTransform: "uppercase",
              fontWeight: 600,
              marginBottom: 16,
              display: "flex",
            }}
          >
            RITUALS
          </div>

          {/* Chalet name */}
          <div
            style={{
              fontSize: 64,
              color: "#F2EBE4",
              fontFamily: "Georgia, serif",
              lineHeight: 1.1,
              display: "flex",
            }}
          >
            {name}
          </div>

          {/* Location */}
          <div
            style={{
              fontSize: 20,
              color: "#8A8580",
              marginTop: 12,
              display: "flex",
            }}
          >
            Al Khiran, Kuwait
          </div>

          {/* Stats row */}
          <div
            style={{
              display: "flex",
              gap: 32,
              marginTop: 36,
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                backgroundColor: "#3A3836",
                paddingLeft: 20,
                paddingRight: 20,
                paddingTop: 12,
                paddingBottom: 12,
                borderRadius: 12,
              }}
            >
              <span style={{ fontSize: 16, color: "#C49870", display: "flex" }}>{rooms} Rooms</span>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                backgroundColor: "#3A3836",
                paddingLeft: 20,
                paddingRight: 20,
                paddingTop: 12,
                paddingBottom: 12,
                borderRadius: 12,
              }}
            >
              <span style={{ fontSize: 16, color: "#C49870", display: "flex" }}>{guests} Guests</span>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                backgroundColor: "#3A3836",
                paddingLeft: 20,
                paddingRight: 20,
                paddingTop: 12,
                paddingBottom: 12,
                borderRadius: 12,
              }}
            >
              <span style={{ fontSize: 16, color: "#C49870", display: "flex" }}>Pool & Beach</span>
            </div>
          </div>
        </div>

        {/* Price badge - bottom right */}
        <div
          style={{
            position: "absolute",
            bottom: 40,
            right: 80,
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              gap: 6,
            }}
          >
            <span style={{ fontSize: 48, color: "#F2EBE4", fontFamily: "Georgia, serif", display: "flex" }}>
              {price}
            </span>
            <span style={{ fontSize: 18, color: "#8A8580", display: "flex" }}>KWD / night</span>
          </div>
          <div
            style={{
              fontSize: 13,
              color: "#6B6660",
              marginTop: 4,
              display: "flex",
            }}
          >
            Book direct at ritualskw.com
          </div>
        </div>

        {/* Decorative corner element */}
        <div
          style={{
            position: "absolute",
            top: 40,
            right: 80,
            width: 60,
            height: 60,
            borderTop: "2px solid #C49870",
            borderRight: "2px solid #C49870",
            opacity: 0.3,
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: 140,
            left: 80,
            width: 60,
            height: 60,
            borderBottom: "2px solid #C49870",
            borderLeft: "2px solid #C49870",
            opacity: 0.3,
            display: "flex",
          }}
        />
      </div>
    ),
    { ...size }
  );
}
