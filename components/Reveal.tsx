"use client";

import { ReactNode } from "react";
import { motion } from "motion/react";

const EASE = [0.2, 0.8, 0.2, 1] as const;

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: "div" | "section" | "li" | "article";
}

/** Fades and lifts its children into place the first time they scroll into view. */
export default function Reveal({ children, className, delay = 0, as = "div" }: RevealProps) {
  const Tag = motion[as];
  return (
    <Tag
      data-reveal
      className={className}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -8% 0px" }}
      transition={{ duration: 0.8, ease: EASE, delay }}
    >
      {children}
    </Tag>
  );
}

/** A line of text that rises out from behind a mask. */
export function RiseText({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <span className={`-my-[0.1em] block overflow-hidden py-[0.1em] ${className ?? ""}`}>
      <motion.span
        data-reveal
        className="block"
        initial={{ y: "115%" }}
        animate={{ y: 0 }}
        transition={{ duration: 1, ease: EASE, delay }}
      >
        {children}
      </motion.span>
    </span>
  );
}

/** A hairline rule that draws itself from left to right. */
export function Rule({ className }: { className?: string }) {
  return (
    <motion.div
      aria-hidden
      data-reveal
      className={`h-px origin-left bg-ink ${className ?? ""}`}
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1.1, ease: EASE }}
    />
  );
}
