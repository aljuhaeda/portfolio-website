"use client";

import { useEffect, useRef } from "react";
import styles from "./Cursor.module.css";

export function Cursor() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduce) return;

    const el = ref.current!;
    el.style.display = "block";
    document.body.classList.add(styles.hideNative);

    let x = innerWidth / 2,
      y = innerHeight / 2,
      tx = x,
      ty = y,
      raf = 0;

    const move = (e: MouseEvent) => {
      tx = e.clientX;
      ty = e.clientY;
    };
    const tick = () => {
      x += (tx - x) * 0.2;
      y += (ty - y) * 0.2;
      el.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`;
      raf = requestAnimationFrame(tick);
    };
    const over = (e: Event) => {
      if ((e.target as Element).closest("a, button, [role='button']")) el.classList.add(styles.big);
      else el.classList.remove(styles.big);
    };

    addEventListener("mousemove", move);
    addEventListener("mouseover", over);
    tick();
    return () => {
      removeEventListener("mousemove", move);
      removeEventListener("mouseover", over);
      cancelAnimationFrame(raf);
      document.body.classList.remove(styles.hideNative);
    };
  }, []);

  return <div ref={ref} className={styles.cur} aria-hidden="true" />;
}
