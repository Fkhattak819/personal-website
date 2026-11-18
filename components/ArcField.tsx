/*
  Concentric arcs after Müller-Brockmann's Beethoven poster: every band is
  twice the width of the one inside it (1, 2, 4, 8, 16, 32), set against thin
  radial construction lines every 11.25 degrees.

  Everything here is a static SVG. Motion is applied from outside as a single
  CSS transform (or drawn on a canvas, see ArcParticles), so nothing in these
  SVGs has to be repainted while the page animates.

  speed: degrees turned over a full scroll. drift: degrees turned by the cursor.
  auto: degrees per second the ring turns on its own.
  tone: which palette color the band is drawn in on the hero.
*/
export const BANDS = [
  { r: 73, w: 6, start: -90, sweep: 250, speed: 220, drift: 50, auto: 5, label: "1", tone: "block" },
  { r: 92, w: 12, start: -60, sweep: 200, speed: -160, drift: -40, auto: -3.8, label: "2", tone: "accent" },
  { r: 124, w: 24, start: 10, sweep: 230, speed: 120, drift: 30, auto: 2.8, label: "4", tone: "block" },
  { r: 178, w: 48, start: -150, sweep: 170, speed: -90, drift: -22, auto: -2, label: "8", tone: "accent" },
  { r: 272, w: 96, start: -40, sweep: 215, speed: 60, drift: 16, auto: 1.4, label: "16", tone: "block" },
  { r: 442, w: 192, start: 120, sweep: 150, speed: -40, drift: -10, auto: -0.9, label: "32", tone: "block" },
] as const;

export type Band = (typeof BANDS)[number];

/** Where a band's arc starts, in degrees, given scroll progress, pointer and elapsed time. */
export const bandRotation = (band: Band, progress: number, pointer: number, timeMs: number) =>
  band.start + progress * band.speed + pointer * band.drift + (timeMs / 1000) * band.auto;

const VIEW_BOX = "-540 -540 1080 1080";

/** The 32 radial construction lines. */
export function RadialLines({ color = "rgb(var(--line))", className }: { color?: string; className?: string }) {
  return (
    <svg viewBox={VIEW_BOX} className={`overflow-visible ${className ?? ""}`} aria-hidden>
      {Array.from({ length: 32 }).map((_, i) => {
        const angle = (i * 11.25 * Math.PI) / 180;
        return (
          <line
            key={i}
            x1={0}
            y1={0}
            x2={Math.cos(angle) * 620}
            y2={Math.sin(angle) * 620}
            stroke={color}
            strokeWidth={1}
            vectorEffect="non-scaling-stroke"
          />
        );
      })}
    </svg>
  );
}

/** Guide circles, the two axes, the center point and the module scale. */
export function ArcGuides({
  color = "rgb(var(--line))",
  labels = true,
  className,
}: {
  color?: string;
  labels?: boolean;
  className?: string;
}) {
  return (
    <svg viewBox={VIEW_BOX} className={`overflow-visible ${className ?? ""}`} aria-hidden>
      {[60, 214, 334, 538].map((r) => (
        <circle key={r} r={r} fill="none" stroke={color} strokeWidth={1} vectorEffect="non-scaling-stroke" />
      ))}
      <line x1={-700} y1={0} x2={700} y2={0} stroke={color} strokeWidth={1} vectorEffect="non-scaling-stroke" />
      <line x1={0} y1={-700} x2={0} y2={700} stroke={color} strokeWidth={1} vectorEffect="non-scaling-stroke" />
      <circle r={7} fill={color} />
      {labels &&
        BANDS.map((band) => (
          <text
            key={band.label}
            x={band.r}
            y={-8}
            textAnchor="middle"
            fontSize={band.w < 20 ? 9 : 13}
            fontWeight={700}
            fill={color}
          >
            {band.label}
          </text>
        ))}
    </svg>
  );
}

/** The bands as solid strokes, fixed at their starting angles. */
export function SolidBands({ color = "rgb(var(--band))", className }: { color?: string; className?: string }) {
  return (
    <svg viewBox={VIEW_BOX} className={`overflow-visible ${className ?? ""}`} aria-hidden>
      {BANDS.map((band) => {
        const circumference = 2 * Math.PI * band.r;
        const length = (circumference * band.sweep) / 360;
        return (
          <circle
            key={band.r}
            r={band.r}
            fill="none"
            stroke={color}
            strokeWidth={band.w}
            strokeDasharray={`${length} ${circumference - length}`}
            transform={`rotate(${band.start})`}
          />
        );
      })}
    </svg>
  );
}
