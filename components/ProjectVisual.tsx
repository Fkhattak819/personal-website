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

/** Abstract voice-to-form: a waveform on the left becoming a filled-in sheet on the right. */
export function VoiceGraphic() {
  const bars = [60, 130, 210, 150, 260, 180, 110, 200, 90];
  return (
    <svg
      viewBox="0 0 800 500"
      preserveAspectRatio="xMidYMid slice"
      className="h-full w-full"
      role="img"
      aria-label="Abstract illustration of a voice waveform turning into a completed form"
    >
      <rect width="800" height="500" fill="rgb(var(--block))" />
      {bars.map((h, i) => (
        <rect key={i} x={70 + i * 36} y={250 - h / 2} width="20" height={h} fill="rgb(var(--block-ink))" />
      ))}
      <rect x="400" y="246" width="60" height="8" fill="rgb(var(--block-ink))" />
      <rect x="490" y="90" width="240" height="320" fill="rgb(var(--bg))" stroke="rgb(var(--block-ink))" strokeWidth="8" />
      {[150, 210, 270, 330].map((y) => (
        <rect key={y} x="570" y={y} width="130" height="10" fill="rgb(var(--ink))" />
      ))}
      {[150, 210, 270].map((y) => (
        <rect key={y} x="520" y={y - 9} width="28" height="28" fill="rgb(var(--accent))" />
      ))}
      <rect x="520" y="321" width="28" height="28" fill="none" stroke="rgb(var(--ink))" strokeWidth="5" />
    </svg>
  );
}

export default function ProjectVisual({ project, sizes }: { project: Project; sizes: string }) {
  if (project.graphic === "blocks") {
    return <BlocksGraphic />;
  }

  if (project.graphic === "voice") {
    return <VoiceGraphic />;
  }

  if (project.graphic === "rail" || !project.image) {
    return <RailGraphic />;
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
