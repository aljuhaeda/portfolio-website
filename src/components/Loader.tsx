"use client";

import { useEffect, useRef } from "react";
import styles from "./Loader.module.css";

/** First-visit-only "recompiling" sweep. The overlay ships in the initial HTML;
 *  layout's inline script hides it instantly on repeat views. This component
 *  only fades it out after the sweep on a first visit. */
export function Loader({ label }: { label: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let seen = false;
    try {
      seen = !!sessionStorage.getItem("rc-loader");
      sessionStorage.setItem("rc-loader", "1");
    } catch {}
    if (seen || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.classList.add(styles.done);
      return;
    }
    const timer = window.setTimeout(() => el.classList.add(styles.done), 1500);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <div ref={ref} id="rc-loader" className={styles.loader} aria-hidden="true">
      <div className={styles.inner}>
        <span className={styles.label}>{label}</span>
        <span className={styles.track}>
          <span className={styles.bar} />
        </span>
      </div>
    </div>
  );
}
