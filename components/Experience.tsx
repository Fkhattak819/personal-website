"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import { EXPERIENCE } from "@/lib/site";

const EASE = [0.2, 0.8, 0.2, 1] as const;

export default function Experience() {
  // Start with the first role that has details open, so it's clear rows expand.
  const [open, setOpen] = useState<number | null>(EXPERIENCE.findIndex((e) => e.points.length > 0));

  return (
    <section id="experience" className="pt-20 md:pt-32">
      <SectionHeading index="02" title="Experience" />
      <div className="container-page">
        <ul className="border-t border-ink">
          {EXPERIENCE.map((exp, i) => {
            const isOpen = open === i;
            return (
              <Reveal as="li" key={exp.company} delay={i * 0.05} className="border-b border-ink">
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  aria-controls={`experience-${i}`}
                  className="group grid-12 w-full items-baseline gap-y-1 py-5 text-left md:py-6"
                >
                  <span className="label col-span-1 tabular-nums md:col-span-2">0{i + 1}</span>
                  <span className="col-span-4 text-[1.7rem] font-bold leading-none tracking-[-0.035em] transition-transform duration-300 ease-swiss group-hover:translate-x-2 md:col-span-5 md:text-[2.75rem]">
                    {exp.company}
                  </span>
                  <span className="label col-span-4 md:col-span-2">{exp.role}</span>
                  <span className="label col-span-4 tabular-nums text-ink/70 md:col-span-2">
                    {exp.period}
                  </span>
                  <span
                    aria-hidden
                    className={`relative col-start-4 row-start-1 h-4 w-4 justify-self-end self-center transition-transform duration-300 ease-swiss md:col-span-1 md:col-start-12 ${
                      isOpen ? "rotate-45 text-accent" : ""
                    }`}
                  >
                    <span className="absolute left-0 top-1/2 h-0.5 w-full -translate-y-1/2 bg-current" />
                    <span className="absolute left-1/2 top-0 h-full w-0.5 -translate-x-1/2 bg-current" />
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`experience-${i}`}
                      className="overflow-hidden"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.5, ease: EASE }}
                    >
                      <div className="grid-12 gap-y-4 pb-8 pt-1">
                        <div className="label col-span-4 md:col-span-3 md:col-start-3">
                          <p>{exp.location}</p>
                          <a href={exp.website} target="_blank" rel="noopener noreferrer" className="mt-1 inline-block font-medium">
                            <span className="link-u">Company site</span> ↗
                          </a>
                        </div>
                        {exp.points.length > 0 && (
                          <ul className="col-span-4 space-y-3 text-base leading-[1.45] md:col-span-5 md:col-start-8">
                            {exp.points.map((point) => (
                              <li key={point} className="flex gap-3">
                                <span aria-hidden className="mt-[0.55em] h-1.5 w-1.5 shrink-0 bg-ink" />
                                <span>{point}</span>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
