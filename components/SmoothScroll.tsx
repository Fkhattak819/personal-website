"use client";

import { useEffect } from "react";
import Lenis from "lenis";

/** Lenis smooth scrolling, skipped for visitors who prefer reduced motion. */
export default function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const lenis = new Lenis({ lerp: 0.12, anchors: true, autoRaf: true });
    return () => lenis.destroy();
  }, []);

  return null;
}
