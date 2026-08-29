import type { Dict } from "@/i18n";
import { person } from "@/lib/content";
import styles from "./HireBand.module.css";

export function HireBand({ t }: { t: Dict["hire"] }) {
  return (
    <section id="hire" className={styles.hire}>
      <p className="mono-eyebrow">{t.kicker}</p>
      <p className={styles.line}>{t.line}</p>
      <a className={styles.button} href={`mailto:${person.email}`}>
        {t.button} →
      </a>
    </section>
  );
}
