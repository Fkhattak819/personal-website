"use client";

import { ReactNode } from "react";
import { MotionConfig } from "motion/react";
import { ThemeProvider } from "@/contexts/ThemeContext";

export default function Providers({ children }: { children: ReactNode }) {
  return (
    // reducedMotion="user" drops transform animations for visitors who ask for less motion.
    <MotionConfig reducedMotion="user">
      <ThemeProvider>{children}</ThemeProvider>
    </MotionConfig>
  );
}
