import { ImageResponse } from "next/og";

// Browser-tab icon for Ahmad Paint House — the "APH" monogram on the
// logo's metallic-blue gradient. Generated at build time, crisp at any size.
export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background:
            "linear-gradient(135deg, #1e3a8a 0%, #0e7490 55%, #22d3ee 100%)",
          color: "#ffffff",
          fontSize: 27,
          fontWeight: 800,
          letterSpacing: -1,
          borderRadius: 14,
        }}
      >
        APH
      </div>
    ),
    { ...size },
  );
}
