"use client";

import { useState } from "react";
import Reveal from "@/components/Reveal";

// Public numbers from YouTube, checked November 2026.
const STATS = [
  { value: "73.2K", label: "Subscribers" },
  { value: "10.2M", label: "Views" },
  { value: "1,428", label: "Videos" },
];

// Kept out of the page until someone asks, so it isn't in the rendered HTML.
const CHANNEL = { name: "Fx Predictions", url: "https://www.youtube.com/@FxPredictions" };

/** A low-key note about the YouTube channel. The channel is only named on request. */
export default function SideChannel() {
  const [revealed, setRevealed] = useState(false);

  return (
    <Reveal className="col-span-4 md:col-span-8 md:col-start-5">
      <p className="max-w-[40ch] text-[1.6rem] font-medium leading-[1.12] tracking-[-0.025em] md:text-[2.5rem]">
        I&rsquo;ve also run a Fortnite YouTube channel since 2020.
      </p>

      <dl className="mt-8 grid grid-cols-3 border-y border-ink">
        {STATS.map((stat, i) => (
          <div key={stat.label} className={`flex flex-col-reverse gap-2 py-5 md:py-7 ${i > 0 ? "border-l border-ink pl-4 md:pl-6" : ""}`}>
            <dt className="label">{stat.label}</dt>
            <dd className="text-[2rem] font-bold leading-[0.9] tracking-[-0.045em] tabular-nums md:text-[3.5rem]">{stat.value}</dd>
          </div>
        ))}
      </dl>

      <div className="mt-6 flex min-h-[2.75rem] items-center">
        {revealed ? (
          <a href={CHANNEL.url} target="_blank" rel="noopener noreferrer" className="btn btn-accent">
            {CHANNEL.name} <span aria-hidden>↗</span>
          </a>
        ) : (
          <button type="button" onClick={() => setRevealed(true)} className="btn btn-outline">
            Which channel?
          </button>
        )}
      </div>
    </Reveal>
  );
}
