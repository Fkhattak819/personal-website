"use client";

import { useEffect, useRef, useState } from "react";
import { animate, useInView, useReducedMotion } from "motion/react";
import { STATS } from "@/lib/site";

function Counter({ to, prefix, suffix }: { to: number; prefix: string; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  const reduceMotion = useReducedMotion();
  const [value, setValue] = useState(to);

  useEffect(() => {
    if (!inView || reduceMotion) return;
    const controls = animate(0, to, {
      duration: 1.6,
      ease: [0.2, 0.8, 0.2, 1],
      onUpdate: (v) => setValue(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, reduceMotion, to]);

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}
      {value}
      {suffix}
    </span>
  );
}

export default function Stats() {
  return (
    <section aria-label="Highlights" className="inverse">
      <div className="container-page">
        <dl className="grid grid-cols-2 md:grid-cols-4">
          {STATS.map((stat, i) => (
            <div
              key={stat.label}
              className={`flex flex-col-reverse justify-end gap-3 py-8 md:py-12 ${
                i % 2 === 1 ? "border-l border-ink/40 pl-4 md:pl-6" : ""
              } ${i >= 2 ? "border-t border-ink/40 md:border-t-0" : ""} ${
                i === 2 ? "md:border-l md:pl-6" : ""
              } ${i < 3 ? "pr-4 md:pr-6" : ""}`}
            >
              <dt className="label max-w-[24ch]">{stat.label}</dt>
              <dd className="text-[3.25rem] font-bold leading-[0.9] tracking-[-0.045em] md:text-[5.5rem]">
                <Counter to={stat.value} prefix={stat.prefix} suffix={stat.suffix} />
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
