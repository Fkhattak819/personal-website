import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import DetailSection from "@/components/DetailSection";
import Reveal from "@/components/Reveal";
import { EDUCATION, LEADERSHIP, SITE, SKILLS, SOCIALS } from "@/lib/site";

export const metadata: Metadata = { title: "About" };

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About"
        title="About"
        meta={[
          { label: "Based in", value: SITE.location },
          { label: "Studying", value: "Computer Science, LSU" },
          { label: "Graduating", value: "May 2027" },
          { label: "Focus", value: "Software & game development" },
        ]}
      />

      <div className="container-page mt-16 md:mt-24 pb-24 md:pb-40">
        <section id="detailed-about" className="grid-12 gap-y-6 border-t border-ink py-8 md:py-12">
          <h2 className="col-span-4 text-base font-bold md:col-span-3">Hi, I&rsquo;m Fahd</h2>
          <Reveal className="col-span-4 md:col-span-8 md:col-start-5">
            <p className="text-[1.6rem] font-medium leading-[1.12] tracking-[-0.025em] md:text-[2.5rem]">
              I&rsquo;m a senior Computer Science major at Louisiana State University, driven by a fascination
              with how code and data combine to solve real-world problems.
            </p>
            <div className="prose-swiss mt-8">
              <p>
                My coursework and side projects span machine learning, full-stack development, cloud
                infrastructure, and interactive game design, giving me a 360° view of modern software
                engineering.
              </p>
              <p>
                I&rsquo;m eager to keep expanding my toolkit for internships or collaborative hackathons that
                push the boundaries of software engineering. If you&rsquo;re tackling a challenge where
                intelligent software can make an impact, let&rsquo;s connect!
              </p>
            </div>
            <ul className="mt-8 flex flex-wrap gap-3">
              {SOCIALS.map((social, i) => (
                <li key={social.label}>
                  <a
                    href={social.href}
                    target={social.external ? "_blank" : undefined}
                    rel={social.external ? "noopener noreferrer" : undefined}
                    className={`btn ${i === 0 ? "btn-accent" : "btn-outline"}`}
                  >
                    {social.label} <span aria-hidden>↗</span>
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>
        </section>

        <section id="education" className="grid-12 gap-y-6 border-t border-ink py-8 md:py-12">
          <h2 className="col-span-4 text-base font-bold md:col-span-3">Education</h2>
          <ul className="col-span-4 md:col-span-8 md:col-start-5">
            {EDUCATION.map((item, i) => (
              <Reveal
                as="li"
                key={item.institution}
                delay={i * 0.08}
                className={`grid grid-cols-4 gap-x-4 gap-y-2 md:grid-cols-8 md:gap-x-6 ${
                  i > 0 ? "mt-8 border-t border-ink/25 pt-8" : ""
                }`}
              >
                <p className="label col-span-4 tabular-nums text-ink/70 md:col-span-2">{item.period}</p>
                <div className="col-span-4 md:col-span-6">
                  <h3 className="text-3xl font-bold leading-none tracking-[-0.035em] md:text-[2.75rem]">
                    {item.institution}
                  </h3>
                  <p className="label mt-2 text-ink/70">{item.detail}</p>
                  <p className="mt-4 text-base font-medium">{item.degree}</p>
                  <p className="mt-2 max-w-[58ch] text-base leading-[1.45]">{item.description}</p>
                </div>
              </Reveal>
            ))}
          </ul>
        </section>

        <section id="skills" className="grid-12 gap-y-6 border-t border-ink py-8 md:py-12">
          <h2 className="col-span-4 text-base font-bold md:col-span-3">Skills</h2>
          <div className="col-span-4 space-y-8 md:col-span-8 md:col-start-5">
            {SKILLS.map((skill, i) => (
              <Reveal key={skill.group} delay={i * 0.06} className="grid grid-cols-4 gap-x-4 gap-y-3 md:grid-cols-8 md:gap-x-6">
                <p className="label col-span-4 text-ink/70 md:col-span-2">{skill.group}</p>
                <ul className="col-span-4 flex flex-wrap gap-2 md:col-span-6">
                  {skill.items.map((item) => (
                    <li key={item} className="tag !text-sm">
                      {item}
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>
        </section>

        <section id="leadership" className="grid-12 gap-y-6 border-t border-ink py-8 md:py-12">
          <h2 className="col-span-4 text-base font-bold md:col-span-3">Leadership</h2>
          <Reveal className="col-span-4 grid grid-cols-4 gap-x-4 gap-y-2 md:col-span-8 md:col-start-5 md:grid-cols-8 md:gap-x-6">
            <p className="label col-span-4 tabular-nums text-ink/70 md:col-span-2">{LEADERSHIP.period}</p>
            <div className="col-span-4 md:col-span-6">
              <h3 className="text-3xl font-bold leading-none tracking-[-0.035em] md:text-[2.75rem]">
                {LEADERSHIP.organization}
              </h3>
              <p className="mt-4 text-base font-medium">{LEADERSHIP.role}</p>
              <ul className="mt-3 max-w-[58ch] space-y-2 text-base leading-[1.45]">
                {LEADERSHIP.points.map((point) => (
                  <li key={point} className="flex gap-3">
                    <span aria-hidden className="mt-[0.55em] h-1.5 w-1.5 shrink-0 bg-ink" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </section>
      </div>
    </>
  );
}
