"use client";

import { usePathname } from "next/navigation";
import Magnetic from "@/components/Magnetic";
import { ContactArcs } from "@/components/Depth";
import Reveal from "@/components/Reveal";
import { SITE, SOCIALS } from "@/lib/site";

function SocialLinks({ className }: { className?: string }) {
  return (
    <ul className={`relative grid grid-cols-2 border-t border-current text-sm font-medium md:grid-cols-4 ${className ?? ""}`}>
      {SOCIALS.map((social) => (
        <li key={social.label} className="border-b border-current md:border-b-0">
          <a
            href={social.href}
            target={social.external ? "_blank" : undefined}
            rel={social.external ? "noopener noreferrer" : undefined}
            className="flex items-center justify-between py-4 pr-4"
          >
            <span className="link-u">{social.label}</span>
            <span aria-hidden>↗</span>
          </a>
        </li>
      ))}
    </ul>
  );
}

/** The full-height contact block, with the arc motif. Home page only. */
function ContactFull() {
  return (
    <section id="contact-me" className="relative overflow-hidden bg-accent text-accent-ink">
      <div className="container-page relative pb-10 pt-6 md:pb-14 md:pt-8">
        <div aria-hidden className="pointer-events-none absolute right-[-95%] top-[58%] w-[190%] -translate-y-1/2 opacity-45 md:right-[-18%] md:top-[50%] md:w-[78%] md:opacity-100">
          <ContactArcs className="w-full" />
        </div>

        <div className="grid-12 label relative">
          <span className="col-span-1 tabular-nums md:col-span-2">04</span>
          <span className="col-span-3">Contact</span>
        </div>

        <Reveal className="relative">
          <h2 className="display mt-14 text-[min(17vw,15rem)] md:mt-20">
            Let&rsquo;s
            <br />
            connect.
          </h2>
        </Reveal>

        <div className="grid-12 relative mt-12 items-end gap-y-10 md:mt-16">
          <p className="col-span-4 max-w-[38ch] text-xl font-medium leading-[1.2] tracking-[-0.015em] md:col-span-5 md:text-2xl">
            If you&rsquo;re tackling a challenge where intelligent software can make an impact, I&rsquo;d like to
            hear about it.
          </p>
          <div className="col-span-4 md:col-span-5 md:col-start-8 md:justify-self-end">
            <Magnetic className="inline-block">
              <a
                href={`mailto:${SITE.email}`}
                className="flex h-40 w-40 flex-col items-center justify-center rounded-full bg-ink text-center text-base font-medium text-bg transition-transform duration-300 ease-swiss hover:scale-105 md:h-52 md:w-52 md:text-lg"
              >
                Email me
                <span aria-hidden className="mt-1 text-2xl leading-none">↗</span>
              </a>
            </Magnetic>
          </div>
        </div>

        <SocialLinks className="mt-14 md:mt-20" />
      </div>
    </section>
  );
}

/** A single compact band for every other page, so the content above it stays the focus. */
function ContactCompact() {
  return (
    <section id="contact-me" className="bg-accent text-accent-ink">
      <div className="container-page pb-2 pt-8 md:pt-10">
        <div className="grid-12 items-end gap-y-6">
          <h2 className="col-span-4 text-5xl font-bold leading-[0.9] tracking-[-0.045em] md:col-span-7 md:text-7xl">
            Let&rsquo;s connect.
          </h2>
          <div className="col-span-4 md:col-span-5 md:justify-self-end">
            <a
              href={`mailto:${SITE.email}`}
              className="btn bg-ink text-bg transition-transform duration-300 ease-swiss hover:-translate-y-0.5"
            >
              Email me <span aria-hidden>↗</span>
            </a>
          </div>
        </div>

        <SocialLinks className="mt-8 md:mt-10" />
      </div>
    </section>
  );
}

export default function Footer() {
  const isHome = usePathname() === "/";

  return (
    <footer>
      {isHome ? <ContactFull /> : <ContactCompact />}

      <div className="container-page">
        <div className="grid-12 label gap-y-2 py-5">
          <p className="col-span-2 md:col-span-4">© 2026 {SITE.name}</p>
          <p className="col-span-2 md:col-span-3 md:col-start-5">{SITE.location}</p>
          <p className="col-span-2 hidden md:col-span-3 md:block">
            Press <kbd className="border border-ink px-1.5 py-0.5 font-sans text-[11px] font-bold">G</kbd> to see the grid
          </p>
          <a href="#top" className="col-span-4 mt-2 justify-self-start font-medium md:col-span-2 md:mt-0 md:justify-self-end">
            <span className="link-u">Back to top</span> ↑
          </a>
        </div>
      </div>
    </footer>
  );
}
