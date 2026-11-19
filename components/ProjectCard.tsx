"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useMotionValue, useSpring } from "motion/react";
import ProjectVisual from "@/components/ProjectVisual";
import { Tilt } from "@/components/Depth";
import type { Project } from "@/lib/site";

/**
 * Image card that tilts toward the cursor and lifts off a red slab on hover,
 * with a "View" badge that follows the pointer.
 */
export default function ProjectCard({ project, index }: { project: Project; index: number }) {
  const frameRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 300, damping: 28, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 300, damping: 28, mass: 0.4 });

  return (
    <Link href={project.href} className="group block">
      <Tilt>
        <div className="relative">
          <div aria-hidden className="absolute inset-0 bg-accent transition-transform duration-500 ease-swiss group-hover:translate-x-3 group-hover:translate-y-3" />
          <div
            ref={frameRef}
            className="relative aspect-[4/3] overflow-hidden border border-ink bg-surface transition-transform duration-500 ease-swiss group-hover:-translate-x-1 group-hover:-translate-y-1"
            onMouseMove={(e) => {
              const rect = frameRef.current?.getBoundingClientRect();
              if (!rect) return;
              x.set(e.clientX - rect.left);
              y.set(e.clientY - rect.top);
            }}
          >
            {/* Screenshots sit in grayscale until hovered; a logo keeps its own colors. */}
            <div
              className={`absolute inset-0 transition-[transform,filter] duration-700 ease-swiss group-hover:scale-[1.05] ${
                project.fit === "logo" ? "" : "grayscale group-hover:grayscale-0"
              }`}
            >
              <ProjectVisual project={project} sizes="(max-width: 768px) 100vw, 50vw" />
            </div>
            <motion.div aria-hidden className="hover-only pointer-events-none absolute left-0 top-0 z-10" style={{ x: sx, y: sy }}>
              <span className="flex h-24 w-24 -translate-x-1/2 -translate-y-1/2 scale-0 items-center justify-center rounded-full bg-accent text-sm font-medium text-accent-ink transition-transform duration-300 ease-swiss group-hover:scale-100">
                View ↗
              </span>
            </motion.div>
          </div>
        </div>
      </Tilt>

      <div className="mt-5 flex items-baseline gap-4 border-b border-ink pb-4">
        <span className="label tabular-nums">0{index + 1}</span>
        <h2 className="flex-1 text-3xl font-bold leading-none tracking-[-0.035em] md:text-[2.75rem]">{project.title}</h2>
        <span aria-hidden className="text-2xl transition-transform duration-300 ease-swiss group-hover:translate-x-1 group-hover:text-accent">
          →
        </span>
      </div>
      <p className="label mt-3 font-medium">{project.kicker}</p>
      <p className="mt-1 max-w-[44ch] text-base leading-snug">{project.description}</p>
      <ul className="mt-4 flex flex-wrap gap-2">
        {project.tags.map((tag) => (
          <li key={tag} className="tag">
            {tag}
          </li>
        ))}
      </ul>
    </Link>
  );
}
