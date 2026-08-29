import type { Metadata } from "next";
import { getDict } from "@/i18n";
import { paper, person, skills, studies } from "@/lib/content";
import styles from "./about.module.css";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "About",
    description: `${person.name}, ${person.role} — ${person.locationLabel}.`,
  };
}

export default async function About() {
  const { t } = await getDict();

  return (
    <main className={styles.page}>
      <p className="mono-eyebrow">{t.about.kicker}</p>
      <h1 className={styles.name}>{person.name}</h1>
      <p className={styles.intro}>{t.about.intro}</p>

      <section className={styles.block}>
        <h2 className={styles.h}>{t.about.published}</h2>
        <p className={styles.cite}>
          {paper.authors} ({paper.year}). <em>{paper.title}.</em> {paper.venue}, {paper.detail}
        </p>
        <a className={styles.link} href={paper.pdf} target="_blank" rel="noopener noreferrer">
          {t.about.paperCta} ↗
        </a>
      </section>

      <section className={styles.block}>
        <h2 className={styles.h}>{t.about.studiesH}</h2>
        {studies.map((s) => (
          <p key={s.name} className={styles.line}>
            <strong>{s.name}</strong> — {s.detail}
          </p>
        ))}
      </section>

      <section className={styles.block}>
        <h2 className={styles.h}>{t.about.skillsH}</h2>
        <dl className={styles.skills}>
          {skills.map((s) => (
            <div key={s.title}>
              <dt>{s.title}</dt>
              <dd>{s.detail}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className={styles.block}>
        <h2 className={styles.h}>{t.about.believe}</h2>
        <p className={styles.thesis}>{t.about.believeText}</p>
      </section>
    </main>
  );
}
