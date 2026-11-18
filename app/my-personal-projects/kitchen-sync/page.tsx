import type { Metadata } from "next";
import Image from "next/image";
import PageHeader from "@/components/PageHeader";
import DetailSection, { NextProject, TagList } from "@/components/DetailSection";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = { title: "Kitchen Sync" };

export default function KitchenSyncPage() {
  return (
    <>
      <PageHeader
        eyebrow="Personal projects"
        title="Kitchen Sync"
        back={{ label: "All projects", href: "/my-personal-projects" }}
        meta={[
          { label: "Type", value: "Personal project" },
          { label: "Category", value: "Digital food pantry app" },
          { label: "Stack", value: "React, Python, MySQL" },
        ]}
      />

      <div className="container-page mt-16 md:mt-24 pb-24 md:pb-40">
        <Reveal className="overflow-hidden border border-ink">
          <Image
            src="/projects/Kitchen Sync.png"
            alt="Kitchen Sync application screenshot"
            width={3392}
            height={1782}
            priority
            sizes="(max-width: 1440px) 100vw, 1376px"
            className="h-auto w-full"
          />
        </Reveal>

        <div className="mt-16 md:mt-24">
          <DetailSection label="Overview">
            <p>
              Kitchen Sync is a digital food pantry application designed to solve common meal planning and food
              waste challenges. The app helps users manage their pantry inventory, discover recipes based on
              available ingredients, and streamline their grocery shopping experience.
            </p>
            <h3>Why we made this app</h3>
            <ul>
              <li>People struggle with meal planning and food waste</li>
              <li>Hard to remember what&apos;s in their pantry</li>
              <li>Difficult to know what to make with what you have</li>
              <li>Often buy groceries they already have or miss key ingredients</li>
            </ul>
            <h3>What our app solves</h3>
            <ul>
              <li>Login for personalization</li>
              <li>Allows users to create a digital pantry</li>
              <li>Suggests recipes you can cook right now</li>
              <li>Shows missing ingredients</li>
              <li>Lets users add items to shopping cart</li>
              <li>Allows filtering based on preferences</li>
            </ul>
          </DetailSection>

          <DetailSection label="Technologies used">
            <TagList tags={["React JS", "JSX", "Vite", "Python", "APIFlask", "MySQL", "Node.js"]} />
          </DetailSection>

          <DetailSection label="Challenges & solutions">
            <p>
              Building Kitchen Sync presented several technical challenges that required creative
              problem-solving and architectural decisions. Here are the key challenges we overcame:
            </p>
            <ul>
              <li>
                <strong>Remote Connectivity:</strong> We solved the issue of the local SQL Server being
                inaccessible to remote teammates by implementing an ngrok tunnel to securely expose the Flask
                API, enabling seamless collaboration across distributed team members.
              </li>
              <li>
                <strong>Rate Limiting:</strong> We bypassed ngrok&apos;s connection limits by re-architecting the
                backend to pre-load full recipe details in a single batch request, eliminating dozens of
                redundant calls and significantly improving performance and reliability.
              </li>
              <li>
                <strong>Data Quality:</strong> We overcame inconsistent API data by building a custom Python ETL
                (Extract, Transform, Load) script that uses regex to normalize units and extract preparation
                steps into a clean database schema, ensuring data consistency and usability.
              </li>
              <li>
                <strong>Frontend Design:</strong> It was challenging to create a creative dashboard design while
                functionally connecting all the elements of the backend. This required careful planning of
                component architecture and state management to ensure a seamless user experience.
              </li>
            </ul>
          </DetailSection>
        </div>

        <NextProject label="Next project" title="Roblox Analytics Studio" href="/my-personal-projects/roblox-analytics-studio" />
      </div>
    </>
  );
}
