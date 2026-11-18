import Link from "next/link";
import Reveal, { Rule } from "@/components/Reveal";

interface SectionHeadingProps {
  index: string;
  title: string;
  link?: { label: string; href: string };
}

export default function SectionHeading({ index, title, link }: SectionHeadingProps) {
  return (
    <div className="container-page">
      <Rule />
      <Reveal className="grid-12 items-baseline pb-8 pt-4 md:pb-14">
        <span className="label col-span-1 tabular-nums md:col-span-2">{index}</span>
        <h2 className="col-span-3 text-4xl font-bold leading-[0.95] tracking-[-0.035em] md:col-span-7 md:text-6xl">
          {title}
        </h2>
        {link && (
          <Link
            href={link.href}
            className="label col-span-4 mt-3 justify-self-start font-medium md:col-span-3 md:mt-0 md:justify-self-end"
          >
            <span className="link-u">{link.label}</span> →
          </Link>
        )}
      </Reveal>
    </div>
  );
}
