"use client";

import { RefObject, useEffect, useRef } from "react";
import type { MotionValue } from "motion/react";
import { BANDS, bandRotation } from "@/components/ArcField";

type RGB = [number, number, number];

const BUCKETS = 24;
// Two color ramps, one per band tone, sorted together.
const TOTAL_BUCKETS = BUCKETS * 2;
const LANE_SPACING = 3.4; // in the arc field's own units (its viewBox is 1080 wide)
const VIEWBOX = 1080;
const POINTER_RADIUS = 130;
const DEG = Math.PI / 180;
const INTRO_SECONDS = 1.8;
// The outer bands are mostly cropped by the frame, so they get a smaller share of the dots.
const VISIBLE_SHARE = [1, 1, 1, 1, 0.8, 0.42];

const parseTriple = (value: string, fallback: RGB): RGB => {
  const parts = value.trim().split(/[\s,]+/).map(Number);
  return parts.length >= 3 && parts.every(Number.isFinite) ? [parts[0], parts[1], parts[2]] : fallback;
};

const mix = (a: RGB, b: RGB, t: number): RGB => [
  a[0] + (b[0] - a[0]) * t,
  a[1] + (b[1] - a[1]) * t,
  a[2] + (b[2] - a[2]) * t,
];

interface ArcParticlesProps {
  /** A square element marking where the arc field sits; the canvas follows it. */
  anchorRef: RefObject<HTMLElement>;
  progress: MotionValue<number>;
  pointer: MotionValue<number>;
  time: MotionValue<number>;
  className?: string;
}

/**
 * The arcs, drawn on one canvas: each band as a solid stroke in the blue or
 * the orange, with dots combed into concentric lanes streaming around it.
 * Dots part around the cursor.
 */
export default function ArcParticles({ anchorRef, progress, pointer, time, className }: ArcParticlesProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const cursor = { x: -9999, y: -9999 };
    const mounted = performance.now();

    let width = 0;
    let height = 0;
    let dpr = 1;
    let count = 0;
    let visible = true;
    let frame = 0;
    let colors: string[] = [];
    let toneColors = { block: "rgb(31, 213, 245)", accent: "rgb(255, 79, 10)" };

    let bandOf = new Uint8Array(0);
    let along = new Float32Array(0);
    let radius = new Float32Array(0); // in arc-field units
    let dot = new Float32Array(0);
    let xs = new Float32Array(0);
    let ys = new Float32Array(0);
    let bucket = new Uint8Array(0);
    let order = new Uint32Array(0);
    const counts = new Uint32Array(TOTAL_BUCKETS + 1);
    const rotations = new Float32Array(BANDS.length);

    const readColors = () => {
      const styles = getComputedStyle(document.documentElement);
      const bg = parseTriple(styles.getPropertyValue("--bg"), [250, 250, 247]);
      const ink = parseTriple(styles.getPropertyValue("--ink"), [12, 12, 14]);
      const accent = parseTriple(styles.getPropertyValue("--accent"), [255, 79, 10]);
      const block = parseTriple(styles.getPropertyValue("--block"), [31, 213, 245]);
      const css = (c: RGB) => `rgb(${c[0] | 0}, ${c[1] | 0}, ${c[2] | 0})`;

      // The bands themselves: solid blue or solid orange.
      toneColors = { block: css(block), accent: css(accent) };

      // Dots riding on a band: paper at the tail, ink through the body, and the
      // other band color at the head, so each ring carries a little of both.
      const ramp = (head: RGB) =>
        Array.from({ length: BUCKETS }, (_, i) => {
          const t = (i + 0.5) / BUCKETS;
          const body = mix(bg, ink, 0.6);
          const rgb = t < 0.5 ? mix(bg, body, t / 0.5) : mix(body, head, (t - 0.5) / 0.5);
          // Fade in at the tail and out at the head, so dots don't pop as they wrap around.
          const alpha = 0.95 * Math.min(1, t / 0.08) * Math.min(1, (1 - t) / 0.08);
          return `rgba(${rgb[0] | 0}, ${rgb[1] | 0}, ${rgb[2] | 0}, ${alpha.toFixed(3)})`;
        });
      colors = [...ramp(accent), ...ramp(block)];
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

      const budget = width > 900 ? 19000 : width > 600 ? 13000 : 8500;
      const weights = BANDS.map((b, k) => b.r * b.w * b.sweep * VISIBLE_SHARE[k]);
      const total = weights.reduce((sum, w) => sum + w, 0);
      const perBand = weights.map((w) => Math.max(140, Math.round((w / total) * budget)));
      count = perBand.reduce((sum, n) => sum + n, 0);

      bandOf = new Uint8Array(count);
      along = new Float32Array(count);
      radius = new Float32Array(count);
      dot = new Float32Array(count);
      xs = new Float32Array(count);
      ys = new Float32Array(count);
      bucket = new Uint8Array(count);
      order = new Uint32Array(count);

      let state = 987654321;
      const random = () => {
        state = (state * 1664525 + 1013904223) >>> 0;
        return state / 4294967296;
      };

      let i = 0;
      BANDS.forEach((band, k) => {
        const lanes = Math.max(2, Math.round(band.w / LANE_SPACING));
        for (let n = 0; n < perBand[k]; n++, i++) {
          const lane = Math.floor(random() * lanes);
          bandOf[i] = k;
          along[i] = random();
          radius[i] = band.r - band.w / 2 + ((lane + 0.5) / lanes) * band.w + (random() - 0.5) * 0.7;
          dot[i] = 1.1 + random() * 1.1;
        }
      });
    };

    const draw = () => {
      const anchor = anchorRef.current;
      if (!anchor || count === 0 || width === 0) return;

      // Follow the anchor, which carries the parallax offset.
      const canvasRect = canvas.getBoundingClientRect();
      const anchorRect = anchor.getBoundingClientRect();
      const scale = anchorRect.width / VIEWBOX;
      const cx = anchorRect.left - canvasRect.left + anchorRect.width / 2;
      const cy = anchorRect.top - canvasRect.top + anchorRect.height / 2;

      const now = time.get();
      const seconds = now / 1000;
      const p = progress.get();
      const m = pointer.get();
      // The arcs sweep open when the page loads.
      const introT = reduceMotion ? 1 : Math.min(1, (performance.now() - mounted) / 1000 / INTRO_SECONDS);
      const intro = 1 - Math.pow(1 - introT, 3);
      const radiusSq = POINTER_RADIUS * POINTER_RADIUS;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, width, height);

      // Solid bands underneath: the blue on most rings, the orange on a couple.
      for (let k = 0; k < BANDS.length; k++) {
        const band = BANDS[k];
        rotations[k] = bandRotation(band, p, m, now);
        ctx.strokeStyle = toneColors[band.tone];
        ctx.lineWidth = band.w * scale;
        ctx.beginPath();
        ctx.arc(cx, cy, band.r * scale, rotations[k] * DEG, (rotations[k] + band.sweep * intro) * DEG);
        ctx.stroke();
      }

      counts.fill(0);
      for (let i = 0; i < count; i++) {
        const k = bandOf[i];
        const band = BANDS[k];
        // Dots stream along the band in the direction it turns.
        const flow = (band.auto > 0 ? 1 : -1) * (0.012 + 0.5 / band.r);
        let a = (along[i] + flow * seconds) % 1;
        if (a < 0) a += 1;

        const theta = (rotations[k] + a * band.sweep * intro) * DEG;
        const r = radius[i] * scale;
        let px = cx + r * Math.cos(theta);
        let py = cy + r * Math.sin(theta);

        // Skip anything outside the canvas before doing more work on it.
        if (px < -4 || px > width + 4 || py < -4 || py > height + 4) {
          bucket[i] = 255;
          continue;
        }

        const dx = px - cursor.x;
        const dy = py - cursor.y;
        const distSq = dx * dx + dy * dy;
        if (distSq < radiusSq) {
          const dist = Math.sqrt(distSq) || 1;
          const force = 1 - dist / POINTER_RADIUS;
          const push = force * force * 34;
          px += (dx / dist) * push;
          py += (dy / dist) * push;
        }

        xs[i] = px;
        ys[i] = py;
        // Head and tail swap for bands that turn the other way, so the accent always leads.
        const t = band.auto > 0 ? a : 1 - a;
        // Blue bands use the first ramp (orange head), orange bands the second (blue head).
        const b = (band.tone === "block" ? 0 : BUCKETS) + Math.min(BUCKETS - 1, (t * BUCKETS) | 0);
        bucket[i] = b;
        counts[b + 1]++;
      }

      // Counting sort by color bucket: one fillStyle change per bucket instead of per dot.
      for (let b = 0; b < TOTAL_BUCKETS; b++) counts[b + 1] += counts[b];
      const drawn = counts[TOTAL_BUCKETS];
      for (let i = 0; i < count; i++) {
        if (bucket[i] !== 255) order[counts[bucket[i]]++] = i;
      }

      let current = -1;
      for (let n = 0; n < drawn; n++) {
        const i = order[n];
        if (bucket[i] !== current) {
          current = bucket[i];
          ctx.fillStyle = colors[current];
        }
        ctx.fillRect(xs[i], ys[i], dot[i], dot[i]);
      }
    };

    const loop = () => {
      draw();
      if (visible && !reduceMotion) frame = requestAnimationFrame(loop);
    };

    const restart = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(loop);
    };

    const onPointerMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      cursor.x = e.clientX - rect.left;
      cursor.y = e.clientY - rect.top;
    };
    const onPointerLeave = () => {
      cursor.x = -9999;
      cursor.y = -9999;
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
  }, [anchorRef, progress, pointer, time]);

  return <canvas ref={canvasRef} aria-hidden className={`pointer-events-none ${className ?? ""}`} />;
}
