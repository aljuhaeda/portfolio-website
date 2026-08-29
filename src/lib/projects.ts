import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

export type Bucket = "rework" | "shipped";
export type MetaKind = "rework" | "merge" | "ship";

export type Project = {
  slug: string;
  title: string;
  summary: string;
  publishedAt: string;
  link?: string;
  cover?: string;
  content: string;
  bucket: Bucket;
  meta: MetaKind;
  delta: { remove: string[]; add: string[] };
  order: number;
};

const DIR = path.join(process.cwd(), "src", "app", "work", "projects");

// Hand-maintained rework data. Every line is sourced from that project's own
// repo (PROGRESS.md / README git history), verified 2026-08-30. If a source
// number is later corrected upstream, update it here too.
const EXTRAS: Record<
  string,
  Pick<Project, "bucket" | "meta" | "order" | "delta">
> = {
  "klasifikasisentimentwitter-hate-speech-classifier": {
    bucket: "rework", meta: "rework", order: 1,
    delta: {
      remove: ["README overstated what the deployed model could do", "no recall analysis — accuracy only"],
      add: ["accuracy 84 → 83%, a deliberate trade", "hate-speech recall 0.14 → 0.18"],
    },
  },
  "breastinsight-ultrasound-image-classifier": {
    bucket: "rework", meta: "rework", order: 2,
    delta: {
      remove: ['"87% accuracy" — trained on 798 masks mixed into 780 real images'],
      add: ["69% val accuracy on masks-excluded data", "per-class recall: benign .91 / malignant .47 / normal .14"],
    },
  },
  "bankruptwatch-bankruptcy-risk-prediction": {
    bucket: "rework", meta: "rework", order: 3,
    delta: {
      remove: ['"92% accuracy with SMOTE" — matched nothing in the notebook', "SMOTE computed but never used in training"],
      add: ["Random Forest recall 56.8% vs 0% baseline", "40.3% precision, stated with the trade-off"],
    },
  },
  "laundrygis-laundry-shop-map-dashboard": {
    bucket: "rework", meta: "rework", order: 4,
    delta: {
      remove: ["every page embedded a dead localhost:8080 iframe"],
      add: ["self-contained Leaflet + vanilla JS", "live on laundrygis.aljuhaeda.com"],
    },
  },
  "indonewsclassifier-indonesian-news-text-classification": {
    bucket: "rework", meta: "rework", order: 5,
    delta: {
      remove: ["reported only the flattering accuracy"],
      add: ["accuracy + macro-F1 for both models", "TF-IDF 82.8/.80 · IndoBERT 89.7/.87", "fixed an empty-input crash"],
    },
  },
  "shortestpathapp-pathfinding-desktop-tool": {
    bucket: "rework", meta: "rework", order: 6,
    delta: {
      remove: ["4 crash bugs since coursework submission", "NetBeans run config pointed at a deleted class"],
      add: ["compiles clean on JDK 23", "builds and runs, verified end to end"],
    },
  },
  "muslimall-prayer-companion": {
    bucket: "shipped", meta: "merge", order: 7,
    delta: {
      remove: ["MusliMalang (one city) + salatwebapp (1 of 5 prayers)", "both stalled"],
      add: ["one Flutter app: all cities, all 5 prayers", "themed reflections + 114-surah reader"],
    },
  },
  "alfa-salam-kost-property-management": {
    bucket: "shipped", meta: "ship", order: 8,
    delta: {
      remove: [],
      add: ["live, real tenant & finance data", "Supabase RLS enforced per staff role"],
    },
  },
};

export function getProjects(): Project[] {
  if (!fs.existsSync(DIR)) return [];
  return fs
    .readdirSync(DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map((file) => {
      const slug = path.basename(file, ".mdx");
      const { data, content } = matter(fs.readFileSync(path.join(DIR, file), "utf-8"));
      const extra = EXTRAS[slug];
      if (!extra) throw new Error(`projects.ts: no EXTRAS entry for "${slug}"`);
      return {
        slug,
        title: String(data.title ?? ""),
        summary: String(data.summary ?? ""),
        publishedAt: String(data.publishedAt ?? ""),
        link: data.link ? String(data.link) : undefined,
        cover: Array.isArray(data.images) && data.images[0] ? String(data.images[0]) : undefined,
        content,
        ...extra,
      };
    })
    .sort((a, b) => a.order - b.order);
}

export function getProject(slug: string): Project | undefined {
  return getProjects().find((p) => p.slug === slug);
}
