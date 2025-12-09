"use client";

import Image from "next/image";
import { SiNextdotjs, SiReact, SiTypescript, SiMinio, SiOracle, SiSpringboot } from "react-icons/si";
import { FiArrowRight } from "react-icons/fi";
import { useTheme } from "@/contexts/ThemeContext";

interface Project {
  title: string;
  description: string;
  technologies: { name: string; icon: any }[];
  imageUrl?: string;
}

const projects: Project[] = [
  {
    title: "Game development",
    description: "Creating interactive games and game engines.",
    technologies: [
      { name: "Next.js", icon: SiNextdotjs },
      { name: "React", icon: SiReact },
      { name: "TypeScript", icon: SiTypescript },
      { name: "Minio", icon: SiMinio },
    ],
  },
  {
    title: "Rail car Seal Detection",
    description: "AI-powered system for detecting and verifying rail car seals.",
    technologies: [
      { name: "Next.js", icon: SiNextdotjs },
      { name: "React", icon: SiReact },
      { name: "TypeScript", icon: SiTypescript },
      { name: "Java", icon: SiOracle },
      { name: "Spring Boot", icon: SiSpringboot },
    ],
  },
];

export default function Work() {
  const { themeColors, themeColor } = useTheme();
  const currentTheme = themeColors[themeColor];

  return (
    <section id="my-work" className="mb-12">
      <h2 className="text-2xl md:text-3xl font-bold mb-8">My Work</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {projects.map((project, index) => (
          <div
            key={index}
            className="group relative flex flex-col overflow-hidden rounded-xl bg-[#111111] border border-neutral-600 hover:border-neutral-500 transition-all duration-300 hover:-translate-y-2 project-card"
          >
            {/* Image Area - taking up top portion */}
            <div className="aspect-video w-full bg-neutral-800 relative overflow-hidden">
              {project.imageUrl ? (
                <>
                  <Image
                    src={project.imageUrl}
                    alt={`${project.title} screenshot`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-transparent to-transparent opacity-90"></div>
                </>
              ) : (
                <div className="absolute inset-0 flex items-center justify-center text-gray-600 text-sm">
                  Project Screenshot
                </div>
              )}
            </div>
            
            <div className="p-6 pt-0 flex flex-col flex-1">
              <h3 className="text-xl font-bold mb-4 text-white">{project.title}</h3>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {project.technologies.map((tech, techIndex) => {
                  const Icon = tech.icon;
                  return (
                    <div
                      key={techIndex}
                      className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white dark:bg-[#1C1C1C] border border-gray-300 dark:border-neutral-800 text-gray-900 dark:text-white"
                    >
                      <Icon className="w-5 h-5" />
                      <span className="text-sm font-medium">{tech.name}</span>
                    </div>
                  );
                })}
              </div>
              
              <p className="text-gray-400 mb-8 flex-1">{project.description}</p>
              
              <button className="flex items-center gap-2 px-4 py-2 bg-white text-black border-2 border-black rounded-full w-fit hover:bg-gray-100 transition-all duration-300 font-medium text-sm group-hover:scale-105">
                Learn more
                <FiArrowRight />
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

