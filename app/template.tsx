"use client";

import { motion } from "motion/react";

// Re-mounts on every navigation, so each page fades in.
export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <motion.main
      data-reveal
      className="min-h-[70vh]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
    >
      {children}
    </motion.main>
  );
}
