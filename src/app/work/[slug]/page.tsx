import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getDict } from "@/i18n";
import { baseURL } from "@/lib/content";
import { getProject, getProjects } from "@/lib/projects";
import { Mdx } from "@/components/Mdx";
import styles from "./project.module.css";

export function generateStaticParams() {
  return getProjects().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) return {};
  const title = p.title.split("—")[0].trim();
  return {
    title,
    description: p.summary,
    openGraph: {
      title,
      description: p.summary,
      images: [`${baseURL}/og?title=${encodeURIComponent(title)}`],
    },
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const { t } = await getDict();
  const projects = getProjects();
  const i = projects.findIndex((p) => p.slug === slug);
  if (i === -1) notFound();
  const p = projects[i];
  const prev = projects[i - 1];
  const next = projects[i + 1];
  const name = p.title.split("—")[0].trim();
  const metaText =
    p.meta === "merge" ? t.log.metaMerge : p.meta === "ship" ? t.log.metaShip : t.log.metaRework;

  return (
    <main className={styles.page}>
      <Link href="/work" className={styles.back}>
        ← {t.project.back}
      </Link>

      <p className={styles.meta}>{metaText}</p>
      <h1 className={styles.title}>{name}</h1>
      <p className={styles.summary}>{p.summary}</p>

      {p.cover && (
        <Image
          className={styles.cover}
          src={p.cover}
          alt={`${name} — cover`}
          width={1280}
          height={720}
          priority
          sizes="(max-width: 768px) 100vw, 768px"
        />
      )}

      <div className={styles.delta}>
        {p.delta.remove.map((l) => (
          <div key={l} className={styles.rm}>
            − {l}
          </div>
        ))}
        {p.delta.add.map((l) => (
          <div key={l} className={styles.ad}>
            + {l}
          </div>
        ))}
      </div>

      <Mdx source={p.content} />

      <nav className={styles.pager}>
        {prev ? (
          <Link href={`/work/${prev.slug}`}>← {prev.title.split("—")[0].trim()}</Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link href={`/work/${next.slug}`}>{next.title.split("—")[0].trim()} →</Link>
        ) : (
          <span />
        )}
      </nav>
    </main>
  );
}
