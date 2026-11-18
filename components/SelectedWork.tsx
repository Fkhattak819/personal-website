"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { motion, useMotionValue, useSpring } from "motion/react";
import SectionHeading from "@/components/SectionHeading";
import ProjectVisual from "@/components/ProjectVisual";
import Reveal from "@/components/Reveal";
import { PROJECTS, WORK } from "@/lib/site";

const ITEMS = [...WORK, ...PROJECTS];
const PREVIEW = { width: 400, height: 270 };

export default function SelectedWork() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<number | null>(null);

  // The preview trails the cursor on a spring.
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 260, damping: 28, mass: 0.5 });
  const sy = useSpring(y, { stiffness: 260, damping: 28, mass: 0.5 });

  return (
    <section id="my-work" className="inverse mt-20 py-20 md:mt-32 md:py-32">
      <SectionHeading index="03" title="Selected work" link={{ label: "All work", href: "/my-work" }} />
      <div
        ref={wrapRef}
        className="container-page relative"
        onMouseMove={(e) => {
          const rect = wrapRef.current?.getBoundingClientRect();
          if (!rect) return;
          // Keep the preview inside the list, to the right of the cursor.
          const nextX = Math.min(e.clientX - rect.left + 28, rect.width - PREVIEW.width - 8);
          x.set(nextX);
          y.set(e.clientY - rect.top - PREVIEW.height / 2);
        }}
        onMouseLeave={() => setActive(null)}
      >
        <ul className="border-t border-ink">
          {ITEMS.map((project, i) => (
            <Reveal as="li" key={project.href} delay={i * 0.05} className="border-b border-ink">
              <Link
                href={project.href}
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                onBlur={() => setActive(null)}
                className="group grid-12 items-baseline gap-y-3 py-6 transition-colors duration-300 hover:bg-ink hover:text-bg md:px-4 md:py-9"
              >
                <div className="touch-only relative col-span-4 aspect-[16/10] overflow-hidden border border-ink">
                  <ProjectVisual project={project} sizes="100vw" />
                </div>
                <span className="label col-span-1 tabular-nums">0{i + 1}</span>
                <h3 className="col-span-4 text-[2.1rem] font-bold leading-[0.95] tracking-[-0.04em] transition-transform duration-500 ease-swiss group-hover:translate-x-3 md:col-span-6 md:text-[4.25rem]">
                  {project.title}
                </h3>
                <div className="col-span-4 md:col-span-4">
                  <p className="label font-medium">{project.kicker}</p>
                  <p className="label mt-1 opacity-70">{project.tags.join(" · ")}</p>
                </div>
                <span
                  aria-hidden
                  className="col-start-4 row-start-2 justify-self-end text-3xl leading-none transition-transform duration-500 ease-swiss group-hover:translate-x-1 group-hover:text-accent md:col-span-1 md:col-start-12 md:row-start-auto md:text-5xl"
                >
                  →
                </span>
              </Link>
            </Reveal>
          ))}
        </ul>

        <motion.div
          aria-hidden
          className="hover-only pointer-events-none absolute left-0 top-0 z-20 overflow-hidden border border-ink bg-surface"
          style={{ x: sx, y: sy, width: PREVIEW.width, height: PREVIEW.height }}
          initial={false}
          animate={{ opacity: active === null ? 0 : 1, scale: active === null ? 0.8 : 1 }}
          transition={{ duration: 0.3, ease: [0.2, 0.8, 0.2, 1] }}
        >
          {ITEMS.map((project, i) => (
            <motion.div
              key={project.href}
              className="absolute inset-0"
              initial={false}
              animate={{ opacity: active === i ? 1 : 0, scale: active === i ? 1 : 1.12 }}
              transition={{ duration: 0.45, ease: [0.2, 0.8, 0.2, 1] }}
            >
              <ProjectVisual project={project} sizes="400px" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
