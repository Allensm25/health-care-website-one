import { ImageResponse } from "next/og"

export const runtime = "edge"
export const alt = "First Choice Care — Atlanta Home Health"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default function Image() {
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
          background: "#F8F3E8",
          fontFamily: "sans-serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Background accent */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "800px",
            height: "800px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(134,176,96,0.12) 0%, transparent 70%)",
          }}
        />

        {/* Top olive bar */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "5px",
            background: "linear-gradient(to right, #4E7A28, #9A7828)",
          }}
        />

        {/* Badge */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            background: "rgba(134,176,96,0.14)",
            border: "1px solid rgba(134,176,96,0.38)",
            borderRadius: "100px",
            padding: "8px 20px",
            marginBottom: "32px",
          }}
        >
          <div
            style={{
              width: "8px",
              height: "8px",
              borderRadius: "50%",
              background: "#4E7A28",
            }}
          />
          <span
            style={{
              fontSize: "14px",
              fontWeight: 600,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "#4E7A28",
            }}
          >
            Atlanta Home Health Care
          </span>
        </div>

        {/* Brand name */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "8px",
            marginBottom: "24px",
          }}
        >
          <div
            style={{
              fontSize: "80px",
              fontWeight: 800,
              color: "#1B2E09",
              lineHeight: 1.05,
              letterSpacing: "-0.03em",
              textAlign: "center",
            }}
          >
            First Choice{" "}
            <span style={{ color: "#4E7A28" }}>Care</span>
          </div>
        </div>

        {/* Tagline */}
        <p
          style={{
            fontSize: "24px",
            color: "rgba(27,46,9,0.60)",
            textAlign: "center",
            maxWidth: "700px",
            lineHeight: 1.5,
            marginBottom: "48px",
          }}
        >
          Compassionate home health services — GAPP pediatric care, skilled nursing, and private pay for Atlanta families.
        </p>

        {/* Stats row */}
        <div
          style={{
            display: "flex",
            gap: "60px",
            alignItems: "center",
          }}
        >
          {[
            { value: "500+", label: "Families Served" },
            { value: "10+", label: "Years in Atlanta" },
            { value: "24/7", label: "Always Available" },
          ].map((stat) => (
            <div key={stat.label} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "4px" }}>
              <span style={{ fontSize: "36px", fontWeight: 800, color: "#4E7A28" }}>{stat.value}</span>
              <span style={{ fontSize: "14px", color: "rgba(27,46,9,0.50)", letterSpacing: "0.05em" }}>{stat.label}</span>
            </div>
          ))}
        </div>

        {/* Bottom accent */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "5px",
            background: "linear-gradient(to right, #4E7A28, #9A7828)",
          }}
        />
      </div>
    ),
    { ...size }
  )
}
