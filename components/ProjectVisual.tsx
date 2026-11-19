import Image from "next/image";
import type { Project } from "@/lib/site";

/** Abstract Bauhaus rail cars, used until there is a real screenshot. */
export function RailGraphic() {
  return (
    <svg
      viewBox="0 0 800 500"
      preserveAspectRatio="xMidYMid slice"
      className="h-full w-full"
      role="img"
      aria-label="Abstract illustration of rail cars with one seal highlighted"
    >
      <rect width="800" height="500" fill="rgb(var(--accent))" />
      <rect x="-40" y="170" width="240" height="160" fill="rgb(var(--ink))" />
      <rect x="230" y="170" width="340" height="160" fill="rgb(var(--bg))" />
      <rect x="600" y="170" width="240" height="160" fill="rgb(var(--ink))" />
      <rect x="200" y="300" width="30" height="10" fill="rgb(var(--ink))" />
      <rect x="570" y="300" width="30" height="10" fill="rgb(var(--ink))" />
      {[40, 150, 290, 510, 650, 760].map((cx) => (
        <circle key={cx} cx={cx} cy="352" r="26" fill="rgb(var(--ink))" />
      ))}
      <rect x="0" y="378" width="800" height="8" fill="rgb(var(--ink))" />
      <circle cx="400" cy="250" r="48" fill="none" stroke="rgb(var(--ink))" strokeWidth="12" />
      <circle cx="400" cy="250" r="14" fill="rgb(var(--accent))" />
    </svg>
  );
}

/** Abstract stacked blocks, used for Roblox until there are thumbnails. */
export function BlocksGraphic() {
  const blocks = [
    { x: 80, y: 300, s: 120, fill: "rgb(var(--bg))" },
    { x: 200, y: 300, s: 120, fill: "rgb(var(--accent))" },
    { x: 320, y: 300, s: 120, fill: "rgb(var(--bg))" },
    { x: 440, y: 300, s: 120, fill: "rgb(var(--bg))" },
    { x: 560, y: 300, s: 120, fill: "rgb(var(--accent))" },
    { x: 200, y: 180, s: 120, fill: "rgb(var(--bg))" },
    { x: 320, y: 180, s: 120, fill: "rgb(var(--bg))" },
    { x: 440, y: 180, s: 120, fill: "rgb(var(--accent))" },
    { x: 320, y: 60, s: 120, fill: "rgb(var(--bg))" },
  ];
  return (
    <svg
      viewBox="0 0 800 500"
      preserveAspectRatio="xMidYMid slice"
      className="h-full w-full"
      role="img"
      aria-label="Abstract illustration of stacked building blocks"
    >
      <rect width="800" height="500" fill="rgb(var(--ink))" />
      {blocks.map((b) => (
        <g key={`${b.x}-${b.y}`}>
          <rect x={b.x} y={b.y} width={b.s} height={b.s} fill={b.fill} stroke="rgb(var(--ink))" strokeWidth="6" />
          <circle cx={b.x + b.s / 2} cy={b.y + b.s / 2} r="22" fill="none" stroke="rgb(var(--ink))" strokeWidth="6" />
        </g>
      ))}
      <rect x="0" y="420" width="800" height="6" fill="rgb(var(--bg))" />
    </svg>
  );
}

/** A company logo, shown in its own colors on a white field. */
export function LogoPanel({ src, alt, sizes }: { src: string; alt: string; sizes: string }) {
  return (
    <div className="flex h-full w-full items-center justify-center bg-white p-[12%]">
      <div className="relative h-full w-full">
        <Image src={src} alt={alt} fill sizes={sizes} className="object-contain" />
      </div>
    </div>
  );
}

export default function ProjectVisual({ project, sizes }: { project: Project; sizes: string }) {
  if (project.graphic === "blocks") {
    return <BlocksGraphic />;
  }

  if (project.graphic === "rail" || !project.image) {
    return <RailGraphic />;
  }

  if (project.fit === "logo") {
    return <LogoPanel src={project.image} alt={`${project.title} logo`} sizes={sizes} />;
  }

  if (project.fit === "portrait") {
    return (
      <div className="flex h-full w-full items-start justify-center bg-ink pt-[7%]">
        <div className="relative h-full w-[46%] overflow-hidden">
          <Image
            src={project.image}
            alt={`${project.title} screenshot`}
            fill
            sizes={sizes}
            className="object-cover object-top"
          />
        </div>
      </div>
    );
  }

  return (
    <Image
      src={project.image}
      alt={`${project.title} screenshot`}
      fill
      sizes={sizes}
      className="object-cover"
    />
  );
}
