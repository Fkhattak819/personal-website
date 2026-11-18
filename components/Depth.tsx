"use client";

import { ReactNode, useRef } from "react";
import { motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTime, useTransform } from "motion/react";
import { ArcGuides, RadialLines, SolidBands } from "@/components/ArcField";

/** Tilts its children in 3D toward the cursor. */
export function Tilt({ children, className, max = 7 }: { children: ReactNode; className?: string; max?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 180, damping: 18 });
  const sry = useSpring(ry, { stiffness: 180, damping: 18 });

  return (
    <div className={className} style={{ perspective: 1100 }}>
      <motion.div
        ref={ref}
        style={{ rotateX: srx, rotateY: sry, transformStyle: "preserve-3d" }}
        onMouseMove={(e) => {
          const rect = ref.current?.getBoundingClientRect();
          if (!rect) return;
          ry.set(((e.clientX - rect.left) / rect.width - 0.5) * max * 2);
          rx.set(((e.clientY - rect.top) / rect.height - 0.5) * max * -2);
        }}
        onMouseLeave={() => {
          rx.set(0);
          ry.set(0);
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}

/** Moves its children slower than the page scrolls, inside a clipped frame. */
export function Parallax({ children, className, amount = 7 }: { children: ReactNode; className?: string; amount?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [`-${amount}%`, `${amount}%`]);

  return (
    <div ref={ref} className={`overflow-hidden ${className ?? ""}`}>
      <motion.div style={{ y, scale: 1 + amount / 40 }} className="h-full w-full">
        {children}
      </motion.div>
    </div>
  );
}

/** The arc motif again, turning slowly behind the contact block as one GPU layer. */
export function ContactArcs({ className }: { className?: string }) {
  const { scrollYProgress } = useScroll();
  const clock = useTime();
  const still = useMotionValue(0);
  const time = useReducedMotion() ? still : clock;
  const rotate = useTransform([scrollYProgress, time], ([p, t]: number[]) => p * 90 + (t / 1000) * 1.6);

  return (
    <motion.div style={{ rotate }} className={`relative aspect-square will-change-transform ${className ?? ""}`}>
      <SolidBands color="rgb(0 0 0 / 0.16)" className="absolute inset-0 h-full w-full" />
      <RadialLines color="rgb(255 255 255 / 0.4)" className="absolute inset-0 h-full w-full" />
      <ArcGuides color="rgb(255 255 255 / 0.4)" labels={false} className="absolute inset-0 h-full w-full" />
    </motion.div>
  );
}
