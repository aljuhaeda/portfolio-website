import type { MetadataRoute } from "next";
import { baseURL, routes } from "@/lib/content";
import { getProjects } from "@/lib/projects";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date().toISOString().split("T")[0];

  const staticRoutes = Object.keys(routes)
    .filter((r) => routes[r])
    .map((r) => ({ url: `${baseURL}${r === "/" ? "" : r}`, lastModified: now }));

  const projectRoutes = getProjects().map((p) => ({
    url: `${baseURL}/work/${p.slug}`,
    lastModified: p.publishedAt || now,
  }));

  return [...staticRoutes, ...projectRoutes];
}
