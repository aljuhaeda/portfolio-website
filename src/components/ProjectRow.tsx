"use client";

import Image from "next/image";
import Link from "next/link";
import { useId, useRef, useState } from "react";
import type { Dict } from "@/i18n";
import type { Project } from "@/lib/projects";
import { useReveal } from "./useReveal";
import styles from "./ProjectRow.module.css";

export type RowLabels = Pick<
  Dict["log"],
  "open" | "close" | "readFull" | "metaRework" | "metaMerge" | "metaShip"
> & { visit: Dict["visit"] };

export function ProjectRow({ p, t }: { p: Project; t: RowLabels }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLElement>(null);
  const bodyId = useId();
  useReveal(ref);

  const metaText =
    p.meta === "merge" ? t.metaMerge : p.meta === "ship" ? t.metaShip : t.metaRework;
  const label = p.link ? t.visit[p.linkKind] : null;

  return (
    <article ref={ref} className={`reveal ${styles.row}`}>
      <button
        type="button"
        className={styles.head}
        aria-expanded={open}
        aria-controls={bodyId}
        onClick={() => setOpen((v) => !v)}
      >
        <span className={styles.meta}>{metaText}</span>
        <h3 className={styles.title}>{p.name}</h3>
        <span className={styles.summary}>{p.summary}</span>
        <span className={styles.more}>{open ? `– ${t.close}` : `+ ${t.open}`}</span>
      </button>

      <div className={styles.body} id={bodyId} hidden={!open}>
        {p.cover && (
          <Image
            className={styles.cover}
            src={p.cover}
            alt={`${p.name} — cover`}
            width={520}
            height={325}
            sizes="(max-width: 560px) 90vw, 520px"
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
        <div className={styles.links}>
          <Link className={styles.visit} href={`/work/${p.slug}`}>
            {t.readFull} →
          </Link>
          {p.link && label && (
            <a className={styles.visit} href={p.link} target="_blank" rel="noopener noreferrer">
              {label} ↗
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
