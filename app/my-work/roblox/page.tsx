import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import DetailSection, { NextProject, TagList } from "@/components/DetailSection";
import Reveal from "@/components/Reveal";
import { Tilt } from "@/components/Depth";
import { PETS_VS_ANOMALY, ROBLOX_GAMES, compact } from "@/lib/site";

export const metadata: Metadata = { title: "Roblox" };

export default function RobloxPage() {
  return (
    <>
      <PageHeader
        eyebrow="Work collection"
        title="Roblox"
        back={{ label: "All work", href: "/my-work" }}
        meta={[
          { label: "Role", value: "Developer" },
          { label: "Engine", value: "Roblox Studio" },
          { label: "Language", value: "Luau" },
          { label: "Focus", value: "Games & creator tools" },
        ]}
      />

      <div className="container-page mt-16 pb-24 md:mt-24 md:pb-40">
        {/* Live game */}
        <Reveal className="grid-12 items-end gap-y-6 border-t border-ink pt-6">
          <div className="relative col-span-4 aspect-video overflow-hidden border border-ink md:col-span-8">
            <Image
              src={PETS_VS_ANOMALY.thumbnails[1]}
              alt="Pets VS Anomaly thumbnail"
              fill
              priority
              sizes="(max-width: 768px) 100vw, 66vw"
              className="object-cover"
            />
          </div>
          <div className="col-span-4 md:col-span-4">
            <p className="tag border-accent bg-accent text-accent-ink">Live on Roblox</p>
            <h2 className="mt-4 text-4xl font-bold leading-[0.95] tracking-[-0.04em] md:text-5xl">
              {PETS_VS_ANOMALY.title}
            </h2>
            <dl className="mt-6 grid grid-cols-2 gap-x-4 border-t border-ink pt-4">
              <div>
                <dt className="label">Visits</dt>
                <dd className="text-[3.5rem] font-bold leading-[0.9] tracking-[-0.045em] tabular-nums md:text-[4.75rem]">
                  {compact(PETS_VS_ANOMALY.visits)}
                </dd>
              </div>
              <div>
                <dt className="label">Favorites</dt>
                <dd className="text-[3.5rem] font-bold leading-[0.9] tracking-[-0.045em] tabular-nums md:text-[4.75rem]">
                  {compact(PETS_VS_ANOMALY.favorites)}
                </dd>
              </div>
            </dl>
            <p className="label mt-4 text-ink/70">Released {PETS_VS_ANOMALY.released}</p>
            <a href={PETS_VS_ANOMALY.url} target="_blank" rel="noopener noreferrer" className="btn btn-accent mt-5">
              Play on Roblox <span aria-hidden>↗</span>
            </a>
          </div>
        </Reveal>

        <ul className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-3">
          {[0, 2, 3].map((n, i) => (
            <Reveal as="li" key={n} delay={i * 0.08} className="group">
              <Tilt>
                <div className="relative">
                  <div aria-hidden className="absolute inset-0 bg-accent transition-transform duration-500 ease-swiss group-hover:translate-x-2.5 group-hover:translate-y-2.5" />
                  <div className="relative aspect-video overflow-hidden border border-ink">
                    <Image
                      src={PETS_VS_ANOMALY.thumbnails[n]}
                      alt="Pets VS Anomaly thumbnail"
                      fill
                      sizes="(max-width: 640px) 100vw, 33vw"
                      className="object-cover transition-transform duration-700 ease-swiss group-hover:scale-[1.06]"
                    />
                  </div>
                </div>
              </Tilt>
            </Reveal>
          ))}
        </ul>

        {/* Games */}
        <section className="mt-16 md:mt-24">
          <div className="grid-12 items-baseline border-t border-ink pb-8 pt-4 md:pb-12">
            <h2 className="col-span-4 text-4xl font-bold leading-[0.95] tracking-[-0.035em] md:col-span-8 md:text-6xl">
              Games
            </h2>
            <p className="label col-span-4 mt-2 md:col-span-4 md:mt-0 md:justify-self-end">
1 live, {ROBLOX_GAMES.length - 1} in the works
            </p>
          </div>
          <ul className="border-t border-ink">
            {ROBLOX_GAMES.map((game, i) => (
              <Reveal
                as="li"
                key={game.title}
                delay={i * 0.05}
                className="group grid-12 items-baseline gap-y-2 border-b border-ink py-6 transition-colors duration-300 hover:bg-ink hover:text-bg md:px-4 md:py-8"
              >
                <span className="label col-span-1 tabular-nums">0{i + 1}</span>
                <h3 className="col-span-3 text-[1.9rem] font-bold leading-[0.95] tracking-[-0.04em] transition-transform duration-500 ease-swiss group-hover:translate-x-3 md:col-span-5 md:text-[3.25rem]">
                  {game.title}
                </h3>
                <p className="label col-span-4 font-medium md:col-span-2">{game.genre}</p>
                <p className="col-span-4 text-base leading-snug md:col-span-3">{game.description}</p>
                <p className="col-span-4 md:col-span-1 md:justify-self-end">
                  <span className={`tag whitespace-nowrap ${game.status === "Live" ? "border-accent bg-accent text-accent-ink" : ""}`}>
                    {game.status}
                  </span>
                </p>
              </Reveal>
            ))}
          </ul>
        </section>

        <div className="mt-20 md:mt-28">
          <DetailSection label="Roblox Analytics Studio">
            <p>
              An iOS analytics app for Roblox creators. It makes it easy to check an experience&rsquo;s
              engagement, retention, and revenue from a phone, with a portfolio overview, experience switching,
              and deeper reports. It&rsquo;s a working pre-release project.
            </p>
            <ul>
              <li>
                <strong>Mobile client:</strong> Expo React Native with TypeScript, including an offline sample
                mode so anyone can explore the app without connecting an account.
              </li>
              <li>
                <strong>Serverless backend:</strong> API Gateway and Lambda authenticate each request and check
                access to the requested experience. Dashboards read cached snapshots from DynamoDB while refresh
                work runs through SQS to a worker that queries Roblox.
              </li>
              <li>
                <strong>Security:</strong> Roblox OAuth with delegated tokens kept encrypted on the backend with
                KMS; the phone only ever stores the app&rsquo;s own session.
              </li>
            </ul>
            <TagList tags={["React Native", "Expo", "TypeScript", "AWS Lambda", "DynamoDB", "SQS", "Roblox Open Cloud"]} />
            <p>
              <Link href="/my-personal-projects/roblox-analytics-studio" className="btn btn-outline">
                Read the case study <span aria-hidden>→</span>
              </Link>
            </p>
          </DetailSection>

          <DetailSection label="How I build">
            <p>
              Most of my Roblox work is systems: server and client architecture, persistent player data, shared
              remotes, UI, leaderboards, and the cleanup and reliability guardrails that keep a live game stable
              across long sessions.
            </p>
            <TagList tags={["Luau", "Roblox Studio", "Rojo", "Figma"]} />
          </DetailSection>
        </div>

        <NextProject label="Next project" title="Rail Car Seal Detection" href="/my-work/rail-car-seal-detection" />
      </div>
    </>
  );
}
