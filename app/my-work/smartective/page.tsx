import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import DetailSection, { NextProject, TagList } from "@/components/DetailSection";
import Reveal from "@/components/Reveal";
import { LogoPanel } from "@/components/ProjectVisual";

export const metadata: Metadata = { title: "Smartective" };

const SITE_URL = "https://www.smartective.com/";
const AWARD_URL =
  "https://www.lsu.edu/business/news/2026/4/2026-j-terrell-brown-venture-challenge-final-results.php";

const HIGHLIGHTS = [
  { value: "1st", label: "Place for Smartective at LSU's 2026 J Terrell Brown Venture Challenge" },
  { value: "$25K", label: "Award the company received for the win" },
  { value: "40m→20s", label: "CI test run after I removed about 1,550 duplicate test files" },
];

export default function SmartectivePage() {
  return (
    <>
      <PageHeader
        eyebrow="Work collection"
        title="Smartective"
        back={{ label: "All work", href: "/my-work" }}
        meta={[
          { label: "Role", value: "Backend Software Engineer" },
          { label: "Company", value: "Smartective, an LSU startup" },
          { label: "Timeline", value: "Aug 2024 – Present" },
          { label: "Focus", value: "Serverless backend, security, CI" },
        ]}
      />

      <div className="container-page mt-16 pb-24 md:mt-24 md:pb-40">
        <Reveal className="aspect-[16/10] overflow-hidden border border-ink md:aspect-[21/9]">
          <LogoPanel src="/projects/smartective/logo.png" alt="Smartective logo" sizes="(max-width: 1440px) 100vw, 1376px" />
        </Reveal>

        <dl className="grid grid-cols-1 border-b border-ink md:grid-cols-3">
          {HIGHLIGHTS.map((item, i) => (
            <Reveal
              key={item.label}
              delay={i * 0.08}
              className={`flex flex-col-reverse gap-2 py-6 md:py-9 ${
                i > 0 ? "border-t border-ink md:border-l md:border-t-0 md:pl-6" : ""
              }`}
            >
              <dt className="label max-w-[30ch]">{item.label}</dt>
              <dd className="text-[3.5rem] font-bold leading-[0.9] tracking-[-0.045em] md:text-[4.75rem]">{item.value}</dd>
            </Reveal>
          ))}
        </dl>

        <div className="mt-16 md:mt-24">
          <DetailSection label="Overview">
            <p>
              Smartective is voice-driven documentation software for field-heavy teams in areas like
              geotechnical and environmental services, safety, insurance and compliance. Teams turn their
              existing PDFs into form templates, fill them in by speaking at a desk or in the field, then
              generate documents, collect signatures and export clean records.
            </p>
            <p>
              <a href={SITE_URL} target="_blank" rel="noopener noreferrer" className="btn btn-accent">
                Visit smartective.com <span aria-hidden>↗</span>
              </a>
            </p>
          </DetailSection>

          <DetailSection label="Recognition">
            <p>
              Smartective won first place and a $25,000 award in the 2026 J Terrell Brown Venture Challenge,
              LSU&rsquo;s system-wide business plan pitch competition.
            </p>
            <p>
              <a href={AWARD_URL} target="_blank" rel="noopener noreferrer" className="btn btn-outline">
                Read the LSU announcement <span aria-hidden>↗</span>
              </a>
            </p>
          </DetailSection>

          <DetailSection label="What I do">
            <p>
              I&rsquo;m a backend engineer on a small team. Most of my work is on the serverless API behind the
              web and mobile apps: making it safer, more reliable and faster to ship.
            </p>
            <ul>
              <li>
                <strong>Multi-tenant data safety:</strong> Hardened document writes in the AWS Lambda and
                DynamoDB API with server-derived ids, conditional writes and idempotent replay, so retries are
                safe and each organization&rsquo;s documents stay its own.
              </li>
              <li>
                <strong>Privacy:</strong> Kept user content out of the logs for the real-time voice-to-form
                pipeline, with regression tests to keep it that way.
              </li>
              <li>
                <strong>LLM reliability:</strong> Added a fallback model for form templates that exceed the
                primary provider&rsquo;s structured-output limits, so live voice extraction keeps working on
                large forms.
              </li>
              <li>
                <strong>CI and builds:</strong> Cut the test run from about 40 minutes to about 20 seconds,
                restored install, Terraform validation and secret scanning in GitHub Actions, and added a
                build-time dependency check that gates every Lambda package.
              </li>
              <li>
                <strong>Web and mobile:</strong> Resolved an autosave race in the Next.js template editor so
                concurrent saves queue instead of overwriting each other, and shipped iOS release builds of the
                React Native app.
              </li>
            </ul>
          </DetailSection>

          <DetailSection label="Technologies used">
            <TagList
              tags={[
                "TypeScript",
                "Node.js",
                "AWS Lambda",
                "API Gateway",
                "WebSocket",
                "DynamoDB",
                "Terraform",
                "Next.js",
                "React Native",
                "GitHub Actions",
                "Vitest",
                "Playwright",
              ]}
            />
          </DetailSection>
        </div>

        <NextProject label="Next project" title="Fortnite Maps" href="/my-work/game-developer" />
      </div>
    </>
  );
}
