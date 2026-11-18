import type { Metadata } from "next";
import Image from "next/image";
import PageHeader from "@/components/PageHeader";
import DetailSection, { NextProject, TagList } from "@/components/DetailSection";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = { title: "Focus Flow" };

export default function FocusFlowPage() {
  return (
    <>
      <PageHeader
        eyebrow="Personal projects"
        title="Focus Flow"
        back={{ label: "All projects", href: "/my-personal-projects" }}
        meta={[
          { label: "Type", value: "Personal project" },
          { label: "Category", value: "Productivity app" },
          { label: "Stack", value: "JavaScript, Node.js" },
        ]}
      />

      <div className="container-page mt-16 md:mt-24 pb-24 md:pb-40">
        <Reveal className="flex justify-center overflow-hidden border border-ink bg-ink px-6 pt-10 md:pt-16">
          <Image
            src="/projects/Focus Flow.png"
            alt="Focus Flow application screenshot"
            width={802}
            height={1116}
            priority
            sizes="(max-width: 768px) 80vw, 460px"
            className="h-auto w-full max-w-[460px]"
          />
        </Reveal>

        <div className="mt-16 md:mt-24">
          <DetailSection label="Overview">
            <p>
              Focus Flow is a productivity application designed to help users manage their focus sessions and
              workflow efficiently. The app provides tools for tracking work sessions, managing tasks, and
              maintaining productivity through structured time management techniques.
            </p>
          </DetailSection>

          <DetailSection label="Technologies used">
            <TagList tags={["HTML", "CSS", "JavaScript", "Node.js"]} />
          </DetailSection>

          <DetailSection label="Learning outcomes">
            <p>
              Building Focus Flow provided valuable experience in creating user-focused applications that solve
              real productivity challenges, emphasizing clean design, intuitive user experience, and effective
              time management principles.
            </p>
            <ul>
              <li>
                <strong>User-centered design:</strong> Developing an application focused on productivity
                required understanding user workflows and pain points, leading to a deeper appreciation for how
                thoughtful design can enhance daily work habits and efficiency.
              </li>
              <li>
                <strong>Full-stack development:</strong> Working with HTML, CSS, JavaScript, and Node.js
                provided hands-on experience in building complete web applications, from frontend interfaces to
                backend functionality, reinforcing the importance of seamless integration between different
                layers of an application.
              </li>
              <li>
                <strong>Time management principles:</strong> Implementing focus session tracking and workflow
                management features required research into productivity methodologies, demonstrating how
                technical skills can be applied to solve real-world problems and improve user quality of life.
              </li>
            </ul>
          </DetailSection>
        </div>

        <NextProject label="Next project" title="Kitchen Sync" href="/my-personal-projects/kitchen-sync" />
      </div>
    </>
  );
}
