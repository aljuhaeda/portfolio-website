import type { MetadataRoute } from "next";
import { baseURL } from "@/lib/content";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: `${baseURL}/sitemap.xml`,
  };
}
