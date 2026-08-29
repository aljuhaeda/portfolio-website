import type { Metadata } from "next";
import Link from "next/link";
import { getDict } from "@/i18n";
import { getProjects, type Project } from "@/lib/projects";
import styles from "./work.module.css";

export async function generateMetadata(): Promise<Metadata> {
  return { title: "Work", description: "Machine-learning and software projects, and what changed in each." };
}

function List({ items }: { items: Project[] }) {
  return (
    <ul className={styles.list}>
      {items.map((p) => (
        <li key={p.slug}>
          <Link href={`/work/${p.slug}`} className={styles.row}>
            <span className={styles.name}>{p.name}</span>
            <span className={styles.summary}>{p.summary}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default async function Work() {
  const { t } = await getDict();
  const projects = getProjects();

  return (
    <main className={styles.page}>
      <p className="mono-eyebrow">{t.work.title}</p>
      <h1 className={styles.h1}>{t.work.intro}</h1>

      <h2 className={styles.groupH}>{t.log.reworksH}</h2>
      <List items={projects.filter((p) => p.bucket === "rework")} />
      <h2 className={`${styles.groupH} ${styles.second}`}>{t.log.shippedH}</h2>
      <List items={projects.filter((p) => p.bucket === "shipped")} />
    </main>
  );
}
