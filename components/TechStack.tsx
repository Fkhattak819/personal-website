"use client";

import { useRef } from "react";
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "motion/react";
import SectionHeading from "@/components/SectionHeading";
import { LANGUAGES, TECHNOLOGIES } from "@/lib/site";

const wrap = (min: number, max: number, v: number) => {
  const range = max - min;
  return ((((v - min) % range) + range) % range) + min;
};

/** A marquee that drifts on its own and speeds up / reverses with the scroll. */
function MarqueeRow({ items, baseVelocity, outline }: { items: string[]; baseVelocity: number; outline?: boolean }) {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, { damping: 50, stiffness: 400 });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 4], { clamp: false });
  const reduceMotion = useReducedMotion();
  const direction = useRef(1);

  // Two copies sit side by side, so wrapping between -50% and 0% loops seamlessly.
  const x = useTransform(baseX, (v) => `${wrap(-50, 0, v)}%`);

  useAnimationFrame((_, delta) => {
    if (reduceMotion) return;
    const factor = velocityFactor.get();
    if (factor < 0) direction.current = -1;
    else if (factor > 0) direction.current = 1;
    let moveBy = direction.current * baseVelocity * (Math.min(delta, 64) / 1000);
    moveBy += direction.current * moveBy * factor;
    baseX.set(baseX.get() + moveBy);
  });

  return (
    <div className="overflow-hidden">
      <motion.div style={{ x }} className="flex w-max whitespace-nowrap will-change-transform">
        {[0, 1].map((copy) => (
          <ul key={copy} aria-hidden={copy === 1} className="flex shrink-0 items-center">
            {items.map((item) => (
              <li
                key={item}
                className={`flex items-center text-[3.25rem] font-bold leading-[1.1] tracking-[-0.04em] md:text-[6.5rem] ${
                  outline ? "outline-text" : ""
                }`}
              >
                {item}
                <span aria-hidden className="mx-5 inline-block h-3 w-3 bg-ink [-webkit-text-stroke:0] md:mx-8 md:h-5 md:w-5" />
              </li>
            ))}
          </ul>
        ))}
      </motion.div>
    </div>
  );
}

export default function TechStack() {
  return (
    <section id="languages-and-technologies" className="pt-20 md:pt-32">
      <SectionHeading index="01" title="Languages & technologies" />
      <div className="space-y-1 md:space-y-2">
        <MarqueeRow items={LANGUAGES} baseVelocity={-1.6} />
        <MarqueeRow items={TECHNOLOGIES} baseVelocity={1.2} outline />
      </div>
    </section>
  );
}
