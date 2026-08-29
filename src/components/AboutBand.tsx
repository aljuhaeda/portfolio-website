import type { Dict } from "@/i18n";
import { paper, studies } from "@/lib/content";
import { Reveal } from "./Reveal";
import styles from "./AboutBand.module.css";

export function AboutBand({ t }: { t: Dict["about"] }) {
  const rows = [
    { k: t.published, v: `${paper.title}. ${paper.venue}, ${paper.detail}` },
    { k: t.studied, v: `${studies[0].detail}, ${studies[0].name}` },
    { k: t.believe, v: t.believeText },
  ];

  return (
    <section id="about" className={styles.band}>
      <p className="mono-eyebrow">{t.kicker}</p>
      <Reveal>
        <ul className={styles.list}>
          {rows.map((r) => (
            <li key={r.k} className={styles.row}>
              <span className={styles.k}>{r.k}</span>
              <span className={styles.v}>{r.v}</span>
            </li>
          ))}
        </ul>
      </Reveal>
    </section>
  );
}
