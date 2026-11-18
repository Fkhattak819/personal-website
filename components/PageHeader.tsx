import Link from "next/link";
import { RiseText } from "@/components/Reveal";
import ParticleFlow from "@/components/ParticleFlow";

interface PageHeaderProps {
  eyebrow: string;
  title: string;
  back?: { label: string; href: string };
  meta?: { label: string; value: string }[];
}

export default function PageHeader({ eyebrow, title, back, meta }: PageHeaderProps) {
  return (
    <header className="relative isolate overflow-hidden">
      {/* A slow ribbon of particles drifting behind the title. */}
      <ParticleFlow seed={title.length} className="absolute inset-0 -z-10" />
      <div className="container-page">
      <div className="grid-12 label pt-5 md:pt-6">
        <p className="col-span-2 md:col-span-4">
          {back ? (
            <Link href={back.href} className="font-medium">
              ← <span className="link-u">{back.label}</span>
            </Link>
          ) : (
            "Fahd Khattak"
          )}
        </p>
        <p className="col-span-2 md:col-span-4 md:col-start-5">{eyebrow}</p>
      </div>

      <h1 className="display mt-14 text-[min(14.5vw,13rem)] md:mt-20">
        <RiseText delay={0.05}>{title}</RiseText>
      </h1>

      {meta && (
        <dl className="mt-10 grid grid-cols-2 gap-x-4 gap-y-5 border-t border-ink pt-4 md:mt-14 md:grid-cols-12 md:gap-x-6">
          {meta.map((item) => (
            <div key={item.label} className="md:col-span-3">
              <dt className="label text-ink/70">{item.label}</dt>
              <dd className="mt-1 text-base font-medium">{item.value}</dd>
            </div>
          ))}
        </dl>
      )}
      </div>
    </header>
  );
}
