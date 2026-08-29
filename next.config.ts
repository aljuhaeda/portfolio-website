import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
  },
  // The /og route readFileSync's this TTF at runtime; nft doesn't always trace
  // a process.cwd()-joined path, and public/ isn't bundled into functions by
  // default. Force it in — this route class has shipped broken 3× here before.
  outputFileTracingIncludes: {
    "/og": ["./public/fonts/InstrumentSerif.ttf"],
  },
};

export default nextConfig;
