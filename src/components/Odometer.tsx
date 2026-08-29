"use client";

import { useEffect, useRef } from "react";
import styles from "./Odometer.module.css";

/** Rolls a two-digit number from `from` to `to`. Plays once when it settles,
 *  replays on hover/focus. Reduced motion → static `to`. */
export function Odometer({
  from,
  to,
  unit = "%",
}: {
  from: number;
  to: number;
  unit?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const fromDigits = String(from).padStart(2, "0").split("").map(Number);
  const toDigits = String(to).padStart(2, "0").split("").map(Number);

  useEffect(() => {
    const root = ref.current!;
    const strips = Array.from(root.querySelectorAll<HTMLElement>("[data-strip]"));
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const set = (digits: number[], animate: boolean) => {
      strips.forEach((s, i) => {
        s.style.transition = animate ? "" : "none";
        s.style.transform = `translateY(-${digits[i]}em)`;
      });
    };
    const play = () => {
      set(fromDigits, false);
      void root.offsetWidth;
      set(toDigits, true);
    };

    if (reduce) {
      set(toDigits, false);
      return;
    }
    const seen = (() => {
      try {
        return !!sessionStorage.getItem("rc-seen-odo");
      } catch {
        return false;
      }
    })();
    set(fromDigits, false);
    const timer = window.setTimeout(play, seen ? 300 : 2600);
    try {
      sessionStorage.setItem("rc-seen-odo", "1");
    } catch {}

    root.addEventListener("mouseenter", play);
    root.addEventListener("focus", play);
    return () => {
      window.clearTimeout(timer);
      root.removeEventListener("mouseenter", play);
      root.removeEventListener("focus", play);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <span
      ref={ref}
      className={styles.odo}
      tabIndex={0}
      aria-label={`${to}${unit}`}
      role="img"
    >
      {toDigits.map((_, i) => (
        <span key={i} className={styles.digit} aria-hidden="true">
          <span className={styles.strip} data-strip>
            {Array.from({ length: 10 }, (_, n) => (
              <span key={n}>{n}</span>
            ))}
          </span>
        </span>
      ))}
      <span className={styles.unit} aria-hidden="true">
        {unit}
      </span>
    </span>
  );
}
