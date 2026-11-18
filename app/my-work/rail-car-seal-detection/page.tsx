import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import DetailSection, { NextProject, TagList } from "@/components/DetailSection";
import Reveal from "@/components/Reveal";
import { RailGraphic } from "@/components/ProjectVisual";
import { Parallax } from "@/components/Depth";

export const metadata: Metadata = { title: "Rail Car Seal Detection" };

const RESULTS = [
  { value: "85%", label: "Classification accuracy on defective railcar locks" },
  { value: "<10s", label: "Inference time per inspection" },
  { value: "4-bit", label: "Quantized vision model, served from Docker" },
];

export default function RailCarSealDetectionPage() {
  return (
    <>
      <PageHeader
        eyebrow="Work collection"
        title="Rail Car Seal Detection"
        back={{ label: "All work", href: "/my-work" }}
        meta={[
          { label: "Role", value: "Machine Learning Intern" },
          { label: "Company", value: "Shell" },
          { label: "Timeline", value: "Jan 2025 – May 2025" },
          { label: "Focus", value: "Computer vision" },
        ]}
      />

      <div className="container-page mt-16 md:mt-24 pb-24 md:pb-40">
        <Reveal>
          <Parallax className="relative aspect-[16/10] border border-ink md:aspect-[21/9]" amount={5}>
            <RailGraphic />
          </Parallax>
        </Reveal>

        <dl className="grid grid-cols-1 border-b border-ink md:grid-cols-3">
          {RESULTS.map((result, i) => (
            <Reveal
              key={result.label}
              delay={i * 0.08}
              className={`flex flex-col-reverse gap-2 py-6 md:py-9 ${
                i > 0 ? "border-t border-ink md:border-l md:border-t-0 md:pl-6" : ""
              }`}
            >
              <dt className="label max-w-[26ch]">{result.label}</dt>
              <dd className="text-[4rem] font-bold leading-[0.9] tracking-[-0.045em] md:text-[5.5rem]">{result.value}</dd>
            </Reveal>
          ))}
        </dl>

        <div className="mt-16 md:mt-24">
          <DetailSection label="Overview">
            <p>
              AI-powered system for detecting and verifying rail car seals. A fine-tuned vision model
              classifies each railcar lock, flags the defective ones, and reports their condition in real
              time, cutting down on manual inspections.
            </p>
          </DetailSection>

          <DetailSection label="What I built">
            <ul>
              <li>
                <strong>Fine-tuned vision model:</strong> Fine-tuned Llama-3.1-Vision-Instruct with Python,
                QLoRA, Unsloth, and Hugging Face to classify defective railcar locks at 85% accuracy.
              </li>
              <li>
                <strong>Fast, deployable inference:</strong> Dockerized a 4-bit quantized version of the model,
                exposed it through a REST API, and integrated RAG-based retrieval from Azure Blob Storage to
                reach sub-10 second inference and reduce manual inspections.
              </li>
              <li>
                <strong>Live reporting:</strong> Fed model outputs through an end-to-end pipeline into a
                centralized Power BI dashboard for real-time analytics of railcar lock conditions.
              </li>
            </ul>
          </DetailSection>

          <DetailSection label="Technologies used">
            <TagList
              tags={[
                "Python",
                "Llama-3.1-Vision-Instruct",
                "QLoRA",
                "Unsloth",
                "Hugging Face",
                "Docker",
                "REST API",
                "Azure Blob Storage",
                "Power BI",
              ]}
            />
          </DetailSection>
        </div>

        <NextProject label="Next project" title="Fortnite Maps" href="/my-work/game-developer" />
      </div>
    </>
  );
}
