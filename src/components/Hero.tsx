import Link from "next/link";
import type { Dict } from "@/i18n";
import { Odometer } from "./Odometer";
import styles from "./Hero.module.css";

export function Hero({ t }: { t: Dict["hero"] }) {
  return (
    <section className={styles.hero}>
      <p className={`mono-eyebrow ${styles.eyebrow}`}>{t.eyebrow}</p>

      <h1 className={styles.headline}>
        <span className={styles.line}>
          <span>{t.line1}</span>
        </span>
        <span className={styles.line}>
          <span>{t.line2}</span>
        </span>
        <span className={styles.line}>
          <span>
            <em>{t.line3}</em>
          </span>
        </span>
      </h1>

      <div className={styles.meter}>
        <Odometer from={0} to={57} unit="%" />
        <p className={styles.caption}>{t.caption}</p>
      </div>

      <Link href="#reworks" className={styles.cta}>
        {t.cta}
      </Link>
    </section>
  );
}
