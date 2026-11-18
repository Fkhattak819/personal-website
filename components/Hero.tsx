"use client";

import { useRef } from "react";
import { motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTime, useTransform } from "motion/react";
import { ArcGuides, RadialLines } from "@/components/ArcField";
import ArcParticles from "@/components/ArcParticles";
import { RiseText } from "@/components/Reveal";
import { SITE, SOCIALS } from "@/lib/site";

const EASE = [0.2, 0.8, 0.2, 1] as const;

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const fieldRef = useRef<HTMLDivElement>(null);

  // Pointer position, normalised to -0.5..0.5. The arcs and the name drift in
  // opposite directions, which is what gives the poster its depth.
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 50, damping: 16 });
  const sy = useSpring(my, { stiffness: 50, damping: 16 });

  const fieldX = useTransform(sx, (v) => v * -44);
  const fieldY = useTransform(sy, (v) => v * -44);
  const nameX = useTransform(sx, (v) => v * 20);
  const nameY = useTransform(sy, (v) => v * 14);

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });

  // A clock for the slow constant turn; held at zero for visitors who prefer less motion.
  const clock = useTime();
  const still = useMotionValue(0);
  const time = useReducedMotion() ? still : clock;
  // The radial lines turn as one GPU layer rather than being redrawn.
  const linesRotate = useTransform([scrollYProgress, time], ([p, t]: number[]) => p * -45 - (t / 1000) * 0.9);

  return (
    <section
      ref={ref}
      onMouseMove={(e) => {
        const rect = ref.current?.getBoundingClientRect();
        if (!rect) return;
        mx.set((e.clientX - rect.left) / rect.width - 0.5);
        my.set((e.clientY - rect.top) / rect.height - 0.5);
      }}
    >
      <div className="container-page">
        <div className="grid-12 label pt-5 md:pt-6">
          <p className="col-span-2 md:col-span-4">
            Software engineer
            <br />
            Game developer
          </p>
          <p className="col-span-2 md:col-span-4 md:col-start-5">
            {SITE.location}
            <br />
            Computer Science, LSU &rsquo;27
          </p>
          <p className="col-span-3 hidden text-right md:col-start-10 md:block">
            Portfolio
            <br />
            2026
          </p>
        </div>

        {/* The poster: arcs and construction lines cropped by the frame, the name set on top. */}
        <div data-poster className="relative mt-5 h-[86vw] overflow-hidden border-y border-ink bg-surface md:mt-6 md:h-[min(40vw,36rem)]">
          {/* One canvas draws the arcs as streaming particles; it follows the anchor below. */}
          <ArcParticles
            anchorRef={fieldRef}
            progress={scrollYProgress}
            pointer={sx}
            time={time}
            className="absolute inset-0 h-full w-full"
          />

          <div className="absolute left-[66%] top-[38%] w-[165%] -translate-x-1/2 -translate-y-1/2 md:left-[70%] md:top-[47%] md:w-[82%]">
            <motion.div ref={fieldRef} style={{ x: fieldX, y: fieldY }} className="relative aspect-square">
              <motion.div style={{ rotate: linesRotate }} className="absolute inset-0 will-change-transform">
                <RadialLines className="h-full w-full" />
              </motion.div>
              <ArcGuides className="absolute inset-0 h-full w-full" />
            </motion.div>
          </div>

          <p className="label absolute left-3 top-3 max-w-[20ch] md:left-5 md:top-4">
            Fig. 1 &mdash; Each arc is twice the width of the last.
          </p>

          <motion.h1
            style={{ x: nameX, y: nameY }}
            className="display absolute bottom-[4%] left-3 z-10 text-[24vw] md:left-5 md:text-[min(18vw,16.5rem)]"
          >
            <RiseText delay={0.25}>Fahd</RiseText>
            <RiseText delay={0.37}>Khattak</RiseText>
          </motion.h1>
        </div>

        <motion.div
          data-reveal
          className="grid-12 gap-y-8 pb-12 pt-5 md:pb-20"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: EASE, delay: 0.6 }}
        >
          <p className="col-span-4 text-[1.7rem] font-medium leading-[1.06] tracking-[-0.025em] md:col-span-5 md:text-[2.25rem]">
            Hi, I&rsquo;m Fahd. I build production software and games people actually play.
          </p>

          <div className="col-span-4 md:col-span-4 md:col-start-7">
            <p className="max-w-[46ch] text-base leading-[1.45]">
              I&rsquo;m a senior studying Computer Science at LSU. I&rsquo;ve interned at JPMorgan Chase,
              Northrop Grumman, and Shell, and I build Fortnite maps and Roblox games on the side.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href="#my-work" className="btn btn-accent">
                View work <span aria-hidden>↓</span>
              </a>
              <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="btn btn-outline">
                Résumé <span aria-hidden>↗</span>
              </a>
            </div>
          </div>

          <ul className="label col-span-4 flex flex-wrap gap-x-6 gap-y-1 font-medium md:col-span-2 md:col-start-11 md:block md:space-y-1">
            {SOCIALS.filter((s) => s.label !== "Résumé").map((social) => (
              <li key={social.label}>
                <a
                  href={social.href}
                  target={social.external ? "_blank" : undefined}
                  rel={social.external ? "noopener noreferrer" : undefined}
                >
                  <span className="link-u">{social.label}</span> ↗
                </a>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
}
