import { person, social } from "@/lib/content";
import styles from "./Footer.module.css";

export function Footer() {
  return (
    <footer className={styles.footer}>
      <span>
        {person.locationLabel} · <a href={`mailto:${person.email}`}>{person.email}</a>
      </span>
      <span className={styles.links}>
        {social
          .filter((s) => s.name !== "Email")
          .map((s) => (
            <a key={s.name} href={s.href} target="_blank" rel="noopener noreferrer">
              {s.name}
            </a>
          ))}
      </span>
    </footer>
  );
}
