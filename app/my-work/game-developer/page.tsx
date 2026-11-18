import type { Metadata } from "next";
import Image from "next/image";
import PageHeader from "@/components/PageHeader";
import DetailSection, { NextProject, TagList } from "@/components/DetailSection";
import Reveal from "@/components/Reveal";
import { Tilt } from "@/components/Depth";
import { GAME_MAPS, MAP_CONTRIBUTIONS, compact } from "@/lib/site";

export const metadata: Metadata = { title: "Game Developer" };

export default function GameDeveloperPage() {
  const [featured, ...rest] = GAME_MAPS;

  return (
    <>
      <PageHeader
        eyebrow="Work collection"
        title="Game Developer"
        back={{ label: "All work", href: "/my-work" }}
        meta={[
          { label: "Role", value: "Self employed" },
          { label: "Engine", value: "Unreal Engine 5" },
          { label: "Since", value: "June 2023" },
          { label: "Maps shipped", value: String(GAME_MAPS.length) },
        ]}
      />

      <div className="container-page mt-16 md:mt-24 pb-24 md:pb-40">
        {/* My own most played map gets the full width. */}
        <Reveal className="grid-12 items-end gap-y-6 border-t border-ink pt-6">
          <div className="group relative col-span-4 aspect-video overflow-hidden border border-ink md:col-span-8">
            <Image
              src={`/Thumnails/${featured.thumbnail}`}
              alt={`${featured.title} thumbnail`}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 66vw"
              className="object-cover transition-transform duration-700 ease-swiss group-hover:scale-[1.03]"
            />
          </div>
          <div className="col-span-4 md:col-span-4">
            <p className="tag border-accent bg-accent text-accent-ink">My most played</p>
            <h2 className="mt-4 text-4xl font-bold leading-[0.95] tracking-[-0.04em] md:text-5xl">{featured.title}</h2>
            <dl className="mt-6 grid grid-cols-2 gap-x-4 border-t border-ink pt-4">
              <div>
                <dt className="label">Total plays</dt>
                <dd className="text-[4rem] font-bold leading-[0.9] tracking-[-0.045em] tabular-nums md:text-[5.5rem]">
                  {compact(featured.plays)}
                </dd>
              </div>
              <div>
                <dt className="label">Peak players</dt>
                <dd className="text-[4rem] font-bold leading-[0.9] tracking-[-0.045em] tabular-nums md:text-[5.5rem]">
                  {compact(featured.peakPlayers)}
                </dd>
              </div>
            </dl>
            <p className="label mt-4 text-ink/70">Created {featured.created}</p>
          </div>
        </Reveal>

        <ul className="mt-14 grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((map, i) => (
            <Reveal as="li" key={map.title} delay={(i % 3) * 0.08} className="group">
              <Tilt>
                <div className="relative">
                  <div aria-hidden className="absolute inset-0 bg-accent transition-transform duration-500 ease-swiss group-hover:translate-x-2.5 group-hover:translate-y-2.5" />
                  <div className="relative aspect-video overflow-hidden border border-ink">
                    <Image
                      src={`/Thumnails/${map.thumbnail}`}
                      alt={`${map.title} thumbnail`}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-700 ease-swiss group-hover:scale-[1.06]"
                    />
                  </div>
                </div>
              </Tilt>
              <h3 className="mt-4 text-2xl font-bold leading-none tracking-[-0.03em]">{map.title}</h3>
              <dl className="label mt-3 grid grid-cols-3 gap-x-4 border-t border-ink pt-3">
                <div>
                  <dt className="text-ink/70">Plays</dt>
                  <dd className="text-xl font-bold tabular-nums tracking-[-0.02em]">{compact(map.plays)}</dd>
                </div>
                <div>
                  <dt className="text-ink/70">Peak</dt>
                  <dd className="text-xl font-bold tabular-nums tracking-[-0.02em]">{compact(map.peakPlayers)}</dd>
                </div>
                <div>
                  <dt className="text-ink/70">Created</dt>
                  <dd className="text-xl font-bold tracking-[-0.02em]">{map.created}</dd>
                </div>
              </dl>
            </Reveal>
          ))}
        </ul>

        {/* Work on other creators' maps, kept apart from my own and labeled as such. */}
        <section className="mt-16 md:mt-24">
          <div className="grid-12 gap-y-3 border-t border-ink pb-6 pt-4">
            <h2 className="col-span-4 text-base font-bold md:col-span-3">Contributions</h2>
            <p className="col-span-4 max-w-[54ch] text-base leading-[1.45] md:col-span-8 md:col-start-5">
              Maps by other creators that I worked on. I didn&apos;t make these, and the numbers belong to the map,
              not to me alone.
            </p>
          </div>
          <ul>
            {MAP_CONTRIBUTIONS.map((map) => (
              <Reveal as="li" key={map.title} className="grid-12 items-center gap-y-5 border-t border-ink/25 py-6">
                <div className="relative col-span-4 aspect-video overflow-hidden border border-ink md:col-span-3">
                  <Image
                    src={`/Thumnails/${map.thumbnail}`}
                    alt={`${map.title} thumbnail`}
                    fill
                    sizes="(max-width: 768px) 100vw, 25vw"
                    className="object-cover"
                  />
                </div>
                <div className="col-span-4 md:col-span-5 md:col-start-5">
                  <p className="tag">Contributor</p>
                  <h3 className="mt-3 text-3xl font-bold leading-none tracking-[-0.035em]">{map.title}</h3>
                  <p className="mt-3 max-w-[44ch] text-base leading-[1.45]">{map.contribution}</p>
                </div>
                <dl className="label col-span-4 grid grid-cols-3 gap-x-4 border-t border-ink pt-3 md:col-span-3 md:col-start-10">
                  <div>
                    <dt className="text-ink/70">Map plays</dt>
                    <dd className="text-xl font-bold tabular-nums tracking-[-0.02em]">{compact(map.plays)}</dd>
                  </div>
                  <div>
                    <dt className="text-ink/70">Map peak</dt>
                    <dd className="text-xl font-bold tabular-nums tracking-[-0.02em]">{compact(map.peakPlayers)}</dd>
                  </div>
                  <div>
                    <dt className="text-ink/70">Created</dt>
                    <dd className="text-xl font-bold tracking-[-0.02em]">{map.created}</dd>
                  </div>
                </dl>
              </Reveal>
            ))}
          </ul>
        </section>

        <dl className="mt-20 grid grid-cols-2 border-y border-ink md:mt-28 md:grid-cols-4">
          {[
            { value: "5", label: "Person studio building maps together" },
            { value: "2K+", label: "Concurrent players sustained" },
            { value: "30%", label: "Retention lift from rapid iteration" },
            { value: "$100K", label: "Revenue generated" },
          ].map((stat, i) => (
            <Reveal
              key={stat.label}
              delay={i * 0.06}
              className={`flex flex-col-reverse justify-end gap-2 py-6 md:py-9 ${i % 2 === 1 ? "border-l border-ink pl-4 md:pl-6" : ""} ${
                i >= 2 ? "border-t border-ink md:border-t-0" : ""
              } ${i === 2 ? "md:border-l md:pl-6" : ""} pr-4`}
            >
              <dt className="label max-w-[22ch]">{stat.label}</dt>
              <dd className="text-[3rem] font-bold leading-[0.9] tracking-[-0.045em] md:text-[4.5rem]">{stat.value}</dd>
            </Reveal>
          ))}
        </dl>

        <div className="mt-16 md:mt-20">
          <DetailSection label="Overview">
            <p>
              Yes I know half of them are brainrot, but you gotta play the game to win it. I&apos;ve been making
              maps since June 2023 and have enjoyed every step of the way. My proudest achievement was helping
              develop the backend of another creator&apos;s map: Goofy Boxfights which sits at 20+ million plays
              and 60,000 peak players. That map isn&apos;t mine; I contributed to it.
            </p>
          </DetailSection>

          <DetailSection label="Technologies used">
            <TagList tags={["Unreal Engine 5", "Verse/C++", "Blender", "Mixamo Animations"]} />
          </DetailSection>

          <DetailSection label="Learning outcomes">
            <p>
              Working on Fortnite creative projects provided a meaningful exploration of collaborative game
              development, leading to a deeper appreciation for how design, scripting, and content creation
              come together in a live, player-driven environment.
            </p>
            <ul>
              <li>
                <strong>The power of teamwork:</strong> Collaborating with teammates across different skill sets
                (such as level designers, scripters, and content creators) highlighted how clear communication
                and role alignment are essential for delivering polished gameplay experiences.
              </li>
              <li>
                <strong>Balancing creativity with performance:</strong> Designing engaging mechanics and systems
                while maintaining performance, readability, and simplicity required thoughtful iteration to
                avoid overcomplicating gameplay or negatively impacting the player experience.
              </li>
              <li>
                <strong>Adapting in real-world production cycles:</strong> Working in fast-paced, constantly
                evolving environments emphasized the importance of continuous learning, responding to player
                feedback, and updating features to align with community trends and expectations.
              </li>
            </ul>
          </DetailSection>
        </div>

        <NextProject label="Next project" title="Roblox" href="/my-work/roblox" />
      </div>
    </>
  );
}
