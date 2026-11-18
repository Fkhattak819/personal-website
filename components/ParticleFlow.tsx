"use client";

import { useEffect, useRef } from "react";

type RGB = [number, number, number];

interface ParticleFlowProps {
  className?: string;
  /** Particles per CSS pixel of width. */
  density?: number;
  /** Shifts the ribbon's shape so two instances don't look identical. */
  seed?: number;
}

const BUCKETS = 28;
const LANES = 56;
const POINTER_RADIUS = 150;

const parseTriple = (value: string, fallback: RGB): RGB => {
  const parts = value.trim().split(/[\s,]+/).map(Number);
  return parts.length >= 3 && parts.every(Number.isFinite) ? [parts[0], parts[1], parts[2]] : fallback;
};

const mix = (a: RGB, b: RGB, t: number): RGB => [
  a[0] + (b[0] - a[0]) * t,
  a[1] + (b[1] - a[1]) * t,
  a[2] + (b[2] - a[2]) * t,
];

/**
 * A ribbon of fine particles that drifts across its container: thousands of
 * dots combed into lanes along a slow sine wave, tinted from the
 * block color through the ink to the accent. Dots part around the cursor.
 */
export default function ParticleFlow({ className, density = 5, seed = 0 }: ParticleFlowProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const pointer = { x: -9999, y: -9999 };
    const started = performance.now();

    let width = 0;
    let height = 0;
    let dpr = 1;
    let count = 0;
    let visible = true;
    let frame = 0;
    let colors: string[] = [];

    // Per-particle state.
    let along = new Float32Array(0);
    let lane = new Float32Array(0);
    let speed = new Float32Array(0);
    let phase = new Float32Array(0);
    let size = new Float32Array(0);
    // Per-frame scratch, so drawing can batch by color.
    let xs = new Float32Array(0);
    let ys = new Float32Array(0);
    let bucket = new Uint8Array(0);
    let order = new Uint32Array(0);
    const counts = new Uint32Array(BUCKETS + 1);

    const readColors = () => {
      const styles = getComputedStyle(document.documentElement);
      const bg = parseTriple(styles.getPropertyValue("--bg"), [250, 250, 247]);
      const ink = parseTriple(styles.getPropertyValue("--ink"), [12, 12, 14]);
      const accent = parseTriple(styles.getPropertyValue("--accent"), [255, 79, 10]);
      let block = parseTriple(styles.getPropertyValue("--block"), [31, 213, 245]);
      // If the block color would vanish against the page, start from the ink instead.
      const distance = Math.abs(block[0] - bg[0]) + Math.abs(block[1] - bg[1]) + Math.abs(block[2] - bg[2]);
      if (distance < 110) block = ink;

      colors = Array.from({ length: BUCKETS }, (_, i) => {
        const t = i / (BUCKETS - 1);
        // Block color on the left, fading through a quiet ink, to the accent on the right.
        const rgb = t < 0.5 ? mix(block, ink, t * 2) : mix(ink, accent, (t - 0.5) * 2);
        const alpha = 0.3 + 0.42 * Math.abs(t - 0.5) * 2;
        return `rgba(${rgb[0] | 0}, ${rgb[1] | 0}, ${rgb[2] | 0}, ${alpha.toFixed(3)})`;
      });
    };

    const build = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      if (width === 0 || height === 0) return;
      // 1.5x is plenty for 1px dots and keeps the canvas light on Retina screens.
      dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);

      count = Math.round(Math.min(8000, Math.max(2400, width * density)));
      along = new Float32Array(count);
      lane = new Float32Array(count);
      speed = new Float32Array(count);
      phase = new Float32Array(count);
      size = new Float32Array(count);
      xs = new Float32Array(count);
      ys = new Float32Array(count);
      bucket = new Uint8Array(count);
      order = new Uint32Array(count);

      // Seeded generator, so the field doesn't reshuffle on every resize.
      let state = (1234567 + seed * 7919) >>> 0;
      const random = () => {
        state = (state * 1664525 + 1013904223) >>> 0;
        return state / 4294967296;
      };

      for (let i = 0; i < count; i++) {
        along[i] = random();
        // Sum of uniforms: a bell curve, so the ribbon is dense in the middle and soft at the edges.
        const bell = (random() + random() + random() + random()) / 4;
        lane[i] = (Math.round(bell * LANES) / LANES) * 2 - 1 + (random() - 0.5) * 0.01;
        speed[i] = 0.004 + random() * 0.011;
        phase[i] = random() * Math.PI * 2;
        size[i] = 0.7 + random() * 0.9;
      }
    };

    const draw = (now: number) => {
      if (count === 0 || width === 0) return;
      const t = reduceMotion ? 12 : (now - started) / 1000;
      const radiusSq = POINTER_RADIUS * POINTER_RADIUS;

      counts.fill(0);
      for (let i = 0; i < count; i++) {
        const x = (along[i] + speed[i] * t) % 1;
        let px = x * (width + 80) - 40;

        // The ribbon climbs from lower left to upper right, undulating as it goes.
        const center =
          height * (0.82 - 0.6 * x) +
          height * 0.13 * Math.sin(x * 5.2 + t * 0.22 + seed) +
          height * 0.05 * Math.sin(x * 13 - t * 0.31 + seed * 2);
        const thickness = height * (0.16 + 0.08 * Math.sin(x * 7.3 + t * 0.17 + 1.3 + seed));
        let py = center + lane[i] * thickness + Math.sin(t * 0.9 + phase[i]) * 1.6;

        // Particles part around the cursor.
        const dx = px - pointer.x;
        const dy = py - pointer.y;
        const distSq = dx * dx + dy * dy;
        if (distSq < radiusSq) {
          const dist = Math.sqrt(distSq) || 1;
          const force = 1 - dist / POINTER_RADIUS;
          const push = force * force * 42;
          px += (dx / dist) * push;
          py += (dy / dist) * push;
        }

        xs[i] = px;
        ys[i] = py;
        const b = Math.min(BUCKETS - 1, (x * BUCKETS) | 0);
        bucket[i] = b;
        counts[b + 1]++;
      }

      // Counting sort by color bucket: one fillStyle change per bucket instead of per particle.
      for (let b = 0; b < BUCKETS; b++) counts[b + 1] += counts[b];
      for (let i = 0; i < count; i++) order[counts[bucket[i]]++] = i;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, width, height);
      let current = -1;
      for (let n = 0; n < count; n++) {
        const i = order[n];
        if (bucket[i] !== current) {
          current = bucket[i];
          ctx.fillStyle = colors[current];
        }
        ctx.fillRect(xs[i], ys[i], size[i], size[i]);
      }
    };

    const loop = (now: number) => {
      draw(now);
      if (visible && !reduceMotion) frame = requestAnimationFrame(loop);
    };

    const restart = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(loop);
    };

    const onPointerMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer.x = e.clientX - rect.left;
      pointer.y = e.clientY - rect.top;
    };
    const onPointerLeave = () => {
      pointer.x = -9999;
      pointer.y = -9999;
    };

    readColors();
    build();
    restart();

    const resizeObserver = new ResizeObserver(() => {
      build();
      restart();
    });
    resizeObserver.observe(canvas);

    // Only animate while on screen.
    const intersectionObserver = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) restart();
    });
    intersectionObserver.observe(canvas);

    // Re-tint when light/dark mode changes.
    const mutationObserver = new MutationObserver(() => {
      readColors();
      restart();
    });
    mutationObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onPointerLeave);

    return () => {
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      mutationObserver.disconnect();
      window.removeEventListener("pointermove", onPointerMove);
      document.documentElement.removeEventListener("pointerleave", onPointerLeave);
    };
  }, [density, seed]);

  return (
    <div aria-hidden className={`pointer-events-none ${className ?? ""}`}>
      <canvas ref={canvasRef} className="h-full w-full" />
    </div>
  );
}
