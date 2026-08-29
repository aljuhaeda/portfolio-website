import { readFileSync } from "node:fs";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { person } from "@/lib/content";

// Node runtime (not edge): Edge Functions have a much smaller size ceiling on
// Vercel's Hobby plan and this route tipped over it before. Font is embedded
// properly this time — the previous version left the embed commented out, so
// images silently rendered in Satori's fallback face.
export const runtime = "nodejs";

const instrumentSerif = readFileSync(
  join(process.cwd(), "public", "fonts", "InstrumentSerif.ttf"),
);

export function GET(request: Request) {
  const title = new URL(request.url).searchParams.get("title") || person.name;

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          width: "100%",
          height: "100%",
          padding: "6rem",
          background: "#f4f2ec",
          color: "#1a1813",
          fontFamily: "Instrument Serif",
        }}
      >
        <div style={{ display: "flex", fontSize: "2rem", letterSpacing: "-0.02em" }}>
          · aljuhaeda
        </div>
        <div
          style={{
            display: "flex",
            fontSize: title.length > 28 ? "5.5rem" : "7rem",
            lineHeight: 1,
            letterSpacing: "-0.03em",
          }}
        >
          {title}
        </div>
        <div style={{ display: "flex", fontSize: "1.9rem", color: "#6c6558" }}>
          {person.name} — {person.role}
        </div>
      </div>
    ),
    {
      width: 1280,
      height: 720,
      fonts: [
        {
          name: "Instrument Serif",
          data: instrumentSerif as unknown as ArrayBuffer,
          style: "normal",
          weight: 400,
        },
      ],
    },
  );
}
