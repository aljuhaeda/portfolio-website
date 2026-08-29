"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import "lenis/dist/lenis.css";

/** Inertial smooth scrolling. Lenis no-ops under prefers-reduced-motion by
 *  default (respectReducedMotion), so nothing to guard here. `anchors` lets
 *  it ease in-page #hash links too. */
export function SmoothScroll() {
  useEffect(() => {
    const lenis = new Lenis({ anchors: true, lerp: 0.12 });
    let raf = 0;
    const loop = (time: number) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
    };
  }, []);

  return null;
}
