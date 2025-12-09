"use client";

import Image from "next/image";
import Link from "next/link";
import { SiHtml5, SiCss3, SiJavascript, SiNodedotjs, SiOracle } from "react-icons/si";
import { FiArrowRight } from "react-icons/fi";
import { useTheme } from "@/contexts/ThemeContext";

interface PersonalProject {
  title: string;
  description: string;
  technologies: { name: string; icon: any }[];
  imageUrl?: string;
}

const personalProjects: PersonalProject[] = [
  {
    title: "Focus Flow",
    description: "Productivity app for managing focus sessions and workflow.",
    technologies: [
      { name: "HTML", icon: SiHtml5 },
      { name: "CSS", icon: SiCss3 },
      { name: "JavaScript", icon: SiJavascript },
      { name: "Node.js", icon: SiNodedotjs },
    ],
  },
  {
    title: "Kitchen Sync",
    description: "Digital food pantry with auto recipe generator",
    technologies: [{ name: "Java", icon: SiOracle }],
    },
];

export default function Projects() {
  const { themeColors, themeColor } = useTheme();
  const currentTheme = themeColors[themeColor];

  return (
    <section id="projects" className="mb-12">
      <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gray-900 dark:text-white">My personal projects</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {personalProjects.map((project, index) => (
          <div
            key={index}
            className="group relative flex flex-col overflow-hidden rounded-xl bg-gray-50 dark:bg-[#111111] border border-gray-300 dark:border-neutral-600 hover:border-gray-400 dark:hover:border-neutral-500 transition-all duration-300 hover:-translate-y-2 project-card"
          >
            {/* Image Area - taking up top portion */}
            <div className="aspect-[4/3] w-full bg-gray-200 dark:bg-gray-700 relative overflow-hidden">
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
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-50 dark:from-[#111111] via-transparent to-transparent opacity-90"></div>
                </>
              ) : (
                <div className="absolute inset-0 flex items-center justify-center text-gray-500 dark:text-gray-400 text-sm">
                  Project Screenshot
                </div>
              )}
            </div>
            
            <div className="p-5 pt-0 flex flex-col flex-1">
              <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">{project.title}</h3>
              
              <div className="flex flex-wrap gap-2 mb-3">
                {project.technologies.map((tech, techIndex) => {
                  const Icon = tech.icon;
                  return (
                    <div
                      key={techIndex}
                      className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white dark:bg-black border border-gray-300 dark:border-gray-800 text-gray-900 dark:text-white"
                    >
                      <Icon className="w-5 h-5 text-gray-900 dark:text-white" />
                      <span className="text-sm font-medium text-gray-900 dark:text-white">{tech.name}</span>
                    </div>
                  );
                })}
              </div>
              
              <p className="text-gray-600 dark:text-gray-400 mb-6 flex-1">{project.description}</p>
              
              <Link href="/my-personal-projects" className="flex items-center gap-2 px-4 py-2 bg-white text-black border-2 border-black rounded-full w-fit hover:bg-gray-100 dark:bg-black dark:text-white dark:border-gray-700 dark:hover:bg-gray-900 transition-all duration-300 font-medium text-sm group-hover:scale-105">
                Learn more
                <FiArrowRight />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

