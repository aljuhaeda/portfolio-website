"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import type { Dict } from "@/i18n";
import type { Project } from "@/lib/projects";
import styles from "./ProjectRow.module.css";

function visitLabel(p: Project, t: Dict["visit"]) {
  if (!p.link) return null;
  if (p.link.includes("github.com")) return t.src;
  if (p.link.includes("streamlit.app")) return t.demo;
  if (p.slug.startsWith("muslimall")) return t.app;
  return t.site;
}

export function ProjectRow({ p, t }: { p: Project; t: Dict }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLElement>(null);
  const bodyId = useId();

  useEffect(() => {
    const el = ref.current!;
    if (
      typeof IntersectionObserver === "undefined" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      el.classList.add("in");
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries)
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
      },
      { threshold: 0.18 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const metaText =
    p.meta === "merge" ? t.log.metaMerge : p.meta === "ship" ? t.log.metaShip : t.log.metaRework;
  const label = visitLabel(p, t.visit);
  const name = p.title.split("—")[0].trim();

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
        <h3 className={styles.title}>{name}</h3>
        <span className={styles.summary}>{p.summary}</span>
        <span className={styles.more}>{open ? `– ${t.log.close}` : `+ ${t.log.open}`}</span>
      </button>

      <div className={styles.body} id={bodyId} hidden={!open}>
        {p.cover && (
          <Image
            className={styles.cover}
            src={p.cover}
            alt={`${name} — cover`}
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
            {t.log.readFull} →
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
