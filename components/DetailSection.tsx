import { ReactNode } from "react";
import Link from "next/link";
import Reveal from "@/components/Reveal";

/** Label on the left, content on the right: the standard detail-page row. */
export default function DetailSection({ label, children }: { label: string; children: ReactNode }) {
  return (
    <Reveal as="section" className="grid-12 gap-y-4 border-t border-ink py-8 md:py-12">
      <h2 className="col-span-4 text-base font-bold md:col-span-3">{label}</h2>
      <div className="prose-swiss col-span-4 md:col-span-8 md:col-start-5">{children}</div>
    </Reveal>
  );
}

export function TagList({ tags }: { tags: string[] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((tag) => (
        <span key={tag} className="tag !text-sm">
          {tag}
        </span>
      ))}
    </div>
  );
}

export function NextProject({ label, title, href }: { label: string; title: string; href: string }) {
  return (
    <Link
      href={href}
      className="group grid-12 items-baseline gap-y-2 border-y border-ink py-8 transition-colors duration-300 hover:bg-ink hover:text-bg md:px-4 md:py-12"
    >
      <span className="label col-span-4 md:col-span-3">{label}</span>
      <span className="col-span-3 text-4xl font-bold leading-[0.95] tracking-[-0.04em] transition-transform duration-500 ease-swiss group-hover:translate-x-3 md:col-span-8 md:text-7xl">
        {title}
      </span>
      <span aria-hidden className="col-span-1 justify-self-end text-4xl leading-none group-hover:text-accent md:text-6xl">
        →
      </span>
    </Link>
  );
}
