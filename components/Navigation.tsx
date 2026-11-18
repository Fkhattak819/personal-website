"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useTheme } from "@/contexts/ThemeContext";

const EASE = [0.2, 0.8, 0.2, 1] as const;

const LINKS = [
  { label: "Work", href: "/my-work" },
  { label: "Projects", href: "/my-personal-projects" },
  { label: "About", href: "/about" },
];

export default function Navigation() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const { themeMode, toggleTheme } = useTheme();

  // Close the mobile menu on navigation and lock the page behind it while open.
  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);
  const themeLabel = themeMode === "dark" ? "Light" : "Dark";

  return (
    <header className="sticky top-0 z-50 border-b border-ink bg-bg">
      <div className="container-page">
        <nav className="grid-12 h-14 items-center text-sm font-medium" aria-label="Primary">
          <Link href="/" className="col-span-2 flex items-center gap-2.5 font-bold tracking-[-0.01em] md:col-span-4">
            <span aria-hidden className="h-2.5 w-2.5 rounded-full bg-accent" />
            Fahd Khattak
          </Link>

          <ul className="hidden items-center gap-8 md:col-span-5 md:col-start-5 md:flex">
            {LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  aria-current={isActive(link.href) ? "page" : undefined}
                  className="flex items-center gap-2"
                >
                  {isActive(link.href) && <span aria-hidden className="h-2 w-2 bg-accent" />}
                  <span className="link-u">{link.label}</span>
                </Link>
              </li>
            ))}
            <li>
              <a href="/resume.pdf" target="_blank" rel="noopener noreferrer">
                <span className="link-u">Résumé</span> ↗
              </a>
            </li>
          </ul>

          <div className="col-span-2 flex items-center justify-end gap-5 md:col-span-3">
            <button
              type="button"
              onClick={toggleTheme}
              className="hidden items-center gap-2 md:flex"
              aria-label={`Switch to ${themeLabel.toLowerCase()} mode`}
            >
              <span aria-hidden className="h-3 w-3 rounded-full border border-ink bg-[linear-gradient(90deg,rgb(var(--ink))_50%,transparent_50%)]" />
              <span className="link-u">{themeLabel}</span>
            </button>
            <a href="#contact-me" className="btn btn-accent hidden !px-4 !py-2 md:inline-flex">
              Contact
            </a>
            <button
              type="button"
              className="md:hidden"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-menu"
            >
              {open ? "Close" : "Menu"}
            </button>
          </div>
        </nav>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            className="absolute inset-x-0 top-full h-[calc(100dvh-3.5rem)] overflow-y-auto border-t border-ink bg-bg md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <ul className="container-page flex h-full flex-col pb-8 pt-6">
              {[...LINKS, { label: "Résumé ↗", href: "/resume.pdf" }, { label: "Contact", href: "#contact-me" }].map(
                (link, i) => (
                  <li key={link.href} className="overflow-hidden border-b border-ink">
                    <motion.a
                      href={link.href}
                      target={link.href.endsWith(".pdf") ? "_blank" : undefined}
                      rel={link.href.endsWith(".pdf") ? "noopener noreferrer" : undefined}
                      onClick={() => setOpen(false)}
                      className="flex items-baseline gap-4 py-4 text-5xl font-bold tracking-[-0.04em]"
                      initial={{ y: "100%" }}
                      animate={{ y: 0 }}
                      transition={{ duration: 0.6, ease: EASE, delay: 0.05 * i }}
                    >
                      <span className="label w-6 font-normal tabular-nums tracking-normal">0{i + 1}</span>
                      {link.label}
                    </motion.a>
                  </li>
                )
              )}
              <li className="mt-auto pt-8">
                <button type="button" onClick={toggleTheme} className="btn btn-outline">
                  {themeLabel} mode
                </button>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
