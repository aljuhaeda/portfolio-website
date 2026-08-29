"use client";

import { useEffect, useRef } from "react";
import styles from "./Odometer.module.css";

/** Decorative: rolls a two-digit number `from → to`, once when it settles,
 *  again on hover. Reduced motion → static `to`. The value is stated in the
 *  hero caption too, so this is aria-hidden. */
export function Odometer({ from, to, unit = "%" }: { from: number; to: number; unit?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const digits = String(to).padStart(2, "0").split("").map(Number);

  useEffect(() => {
    const root = ref.current!;
    const strips = Array.from(root.querySelectorAll<HTMLElement>("[data-strip]"));
    const fromD = String(from).padStart(2, "0").split("").map(Number);
    const toD = String(to).padStart(2, "0").split("").map(Number);

    const set = (d: number[], animate: boolean) =>
      strips.forEach((s, i) => {
        s.style.transition = animate ? "" : "none";
        s.style.transform = `translateY(-${d[i]}em)`;
      });
    const play = () => {
      set(fromD, false);
      void root.offsetWidth;
      set(toD, true);
    };

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      set(toD, false);
      return;
    }

    let seen = false;
    try {
      seen = !!sessionStorage.getItem("rc-seen-odo");
      sessionStorage.setItem("rc-seen-odo", "1");
    } catch {}

    set(fromD, false);
    const timer = window.setTimeout(play, seen ? 300 : 2600);
    root.addEventListener("mouseenter", play);
    return () => {
      window.clearTimeout(timer);
      root.removeEventListener("mouseenter", play);
    };
  }, [from, to]);

  return (
    <span ref={ref} className={styles.odo} aria-hidden="true">
      {digits.map((_, i) => (
        <span key={i} className={styles.digit}>
          <span className={styles.strip} data-strip>
            {Array.from({ length: 10 }, (_, n) => (
              <span key={n}>{n}</span>
            ))}
          </span>
        </span>
      ))}
      <span className={styles.unit}>{unit}</span>
    </span>
  );
}
