import type { Metadata } from "next";
import Image from "next/image";
import PageHeader from "@/components/PageHeader";
import DetailSection, { NextProject, TagList } from "@/components/DetailSection";
import Reveal from "@/components/Reveal";
import { Tilt } from "@/components/Depth";

export const metadata: Metadata = { title: "Roblox Analytics Studio" };

const SCREENS = [
  { src: "/projects/analytics/home.png", label: "Home", note: "Engagement at a glance for the selected experience." },
  { src: "/projects/analytics/experiences.png", label: "Experiences", note: "Every connected game and group, with live health." },
  { src: "/projects/analytics/analytics.png", label: "Analytics", note: "Period comparisons across retention and acquisition." },
  { src: "/projects/analytics/sales.png", label: "Sales", note: "Revenue, paying users, and where Robux came from." },
];

export default function RobloxAnalyticsStudioPage() {
  return (
    <>
      <PageHeader
        eyebrow="Personal projects"
        title="Roblox Analytics Studio"
        back={{ label: "All projects", href: "/my-personal-projects" }}
        meta={[
          { label: "Type", value: "Personal project" },
          { label: "Platform", value: "iOS, React Native" },
          { label: "Backend", value: "AWS, serverless" },
          { label: "Status", value: "Pre-release" },
        ]}
      />

      {/* App screens */}
      <section className="inverse mt-16 py-12 md:mt-24 md:py-20">
        <div className="container-page">
          <ul className="grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-4 md:gap-x-6">
            {SCREENS.map((screen, i) => (
              <Reveal as="li" key={screen.label} delay={i * 0.08}>
                <Tilt max={5}>
                  <div className="overflow-hidden rounded-[1.6rem] border border-ink bg-white md:rounded-[2.2rem]">
                    <Image
                      src={screen.src}
                      alt={`Roblox Analytics Studio ${screen.label} screen`}
                      width={1206}
                      height={2622}
                      sizes="(max-width: 768px) 50vw, 25vw"
                      className="h-auto w-full"
                    />
                  </div>
                </Tilt>
                <p className="mt-4 text-base font-bold">
                  <span className="label mr-2 font-normal tabular-nums">0{i + 1}</span>
                  {screen.label}
                </p>
                <p className="label mt-1 max-w-[28ch]">{screen.note}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <div className="container-page mt-16 pb-24 md:mt-24 md:pb-40">
        <DetailSection label="Overview">
          <p>
            Roblox Analytics Studio is an iOS app for Roblox creators. Creator Hub analytics live on desktop; this
            puts an experience&rsquo;s engagement, retention, and revenue in your pocket, with a portfolio view,
            fast switching between experiences, and deeper reports one tap away.
          </p>
          <p>
            It&rsquo;s a working pre-release project with a real backend, Roblox sign-in, and an offline sample
            mode so anyone can explore it without connecting an account.
          </p>
        </DetailSection>

        <DetailSection label="Architecture">
          <ul>
            <li>
              <strong>Client:</strong> Expo React Native in TypeScript, with a typed API layer and a deterministic
              sample mode for demos and tests.
            </li>
            <li>
              <strong>API:</strong> API Gateway and Lambda authenticate every request and check that the caller
              can access the experience they asked for.
            </li>
            <li>
              <strong>Data:</strong> Dashboards read cached snapshots from DynamoDB. Refreshes go through SQS to a
              worker that queries Roblox, which keeps slow upstream analytics off the interactive path.
            </li>
            <li>
              <strong>Security:</strong> Roblox OAuth, with delegated tokens encrypted on the backend using KMS.
              The phone only stores the app&rsquo;s own session.
            </li>
          </ul>
        </DetailSection>

        <DetailSection label="Hard problems">
          <ul>
            <li>
              <strong>Reports failing with 503s:</strong> During live testing the app could sign in but reports
              failed. Tracing past the UI showed DynamoDB read throttling: the development table had a single
              provisioned read unit, and CloudWatch recorded 171 throttled reads. Moving the table to on-demand
              capacity with explicit caps restored the Home and Sales views.
            </li>
            <li>
              <strong>A double sign-in race:</strong> Starting sign-in remounted the screens and cleared the
              button&rsquo;s loading state while the auth browser was still open, so a second tap could launch
              another one. The fix moved ownership of the in-flight sign-in into the session controller, so
              concurrent calls share one promise and the button stays disabled until it settles.
            </li>
            <li>
              <strong>Honest stale data:</strong> When fresh data isn&rsquo;t available the app shows the last
              saved report and says so, instead of quietly falling back to sample numbers.
            </li>
          </ul>
        </DetailSection>

        <DetailSection label="Designed in Figma">
          <p>
            Every screen was designed in Figma first, on iPhone 16 frames, in dark and light modes: Home,
            Experiences, Analytics, Sales, and More, plus onboarding.
          </p>
          <div className="!max-w-none overflow-hidden border border-ink">
            <Image
              src="/projects/analytics/figma-board.jpg"
              alt="Figma board showing the app's dark-mode screens side by side"
              width={3000}
              height={590}
              sizes="(max-width: 1440px) 100vw, 900px"
              className="h-auto w-full"
            />
          </div>
        </DetailSection>

        <DetailSection label="Technologies used">
          <TagList
            tags={[
              "React Native",
              "Expo",
              "TypeScript",
              "AWS Lambda",
              "API Gateway",
              "DynamoDB",
              "SQS",
              "KMS",
              "AWS CDK",
              "Roblox Open Cloud",
              "Figma",
            ]}
          />
        </DetailSection>

        <NextProject label="Next project" title="Focus Flow" href="/my-personal-projects/focus-flow" />
      </div>
    </>
  );
}
