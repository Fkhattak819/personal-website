import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import ProjectCard from "@/components/ProjectCard";
import Reveal from "@/components/Reveal";
import { WORK } from "@/lib/site";

export const metadata: Metadata = { title: "Work" };

export default function MyWorkPage() {
  return (
    <>
      <PageHeader eyebrow="Work collection" title="My Work" />
      <div className="container-page mt-12 md:mt-20 pb-24 md:pb-40">
        <div className="grid grid-cols-1 gap-x-6 gap-y-14 border-t border-ink pt-8 md:grid-cols-2">
          {WORK.map((project, i) => (
            <Reveal key={project.slug} delay={i * 0.1}>
              <ProjectCard project={project} index={i} />
            </Reveal>
          ))}
        </div>
      </div>
    </>
  );
}
