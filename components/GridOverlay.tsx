"use client";

import { useEffect, useState } from "react";

/** Press G to reveal the 12-column grid the whole site is set on. */
export default function GridOverlay() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      const target = e.target as HTMLElement | null;
      if (target && /^(INPUT|TEXTAREA|SELECT)$/.test(target.tagName)) return;
      if (e.key.toLowerCase() === "g") setVisible((v) => !v);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  if (!visible) return null;

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[70]">
      <div className="container-page h-full">
        <div className="grid-12 h-full">
          {Array.from({ length: 12 }).map((_, i) => (
            <div
              key={i}
              className={`h-full border-x border-accent/40 bg-accent/10 ${i > 3 ? "hidden md:block" : ""}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
