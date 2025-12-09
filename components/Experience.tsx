"use client";

import { useTheme } from "@/contexts/ThemeContext";
import { SiEpicgames, SiShell } from "react-icons/si";
import { FiBriefcase } from "react-icons/fi";
import Image from "next/image";

interface ExperienceItem {
  company: string;
  role: string;
  period: string;
  description: string;
  logo?: any;
  logoImage?: string;
  website?: string;
}

const experiences: ExperienceItem[] = [
  {
    company: "Northrop Grumman",
    role: "Software Engineer Intern",
    period: "June 2025 - Aug 2025",
    description: "",
    logoImage: "/logo_no_bg.png",
    website: "https://www.northropgrumman.com/",
  },
  {
    company: "Shell",
    role: "Machine Learning Intern",
    period: "Jan 2025 - May 2025",
    description: "",
    logo: SiShell,
    website: "https://www.shell.com/",
  },
  {
    company: "Epic Games",
    role: "Game Developer",
    period: "Jun 2023 - Present",
    description: "",
    logo: SiEpicgames,
    website: "https://www.epicgames.com/",
  },
  {
    company: "Louisiana State University",
    role: "Undergraduate Researcher",
    period: "Sep 2024 - Present",
    description: "",
    logo: FiBriefcase,
    website: "https://www.lsu.edu/",
  },
];

export default function Experience() {
  const { themeColors, themeColor } = useTheme();
  const currentTheme = themeColors[themeColor];

  // Get solid colors and glow colors based on theme
  const getDotColors = () => {
    const colorMap: Record<string, { solid: string; rgb: string }> = {
      purple: { solid: '#a855f7', rgb: '168,85,247' },
      green: { solid: '#22c55e', rgb: '34,197,94' },
      blue: { solid: '#3b82f6', rgb: '59,130,246' },
      red: { solid: '#ef4444', rgb: '239,68,68' },
      yellow: { solid: '#eab308', rgb: '234,179,8' },
    };
    return colorMap[themeColor] || colorMap.purple;
  };

  const colors = getDotColors();
  const glowShadow = `0 0 8px rgba(${colors.rgb},0.8), 0 0 16px rgba(${colors.rgb},0.6), 0 0 24px rgba(${colors.rgb},0.4), 0 0 32px rgba(${colors.rgb},0.3)`;

  return (
    <section id="experience" className="mb-12">
      <h2 className="text-2xl md:text-3xl font-bold mb-8 text-gray-900 dark:text-white">Experience</h2>
      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-300 dark:bg-white/30"></div>
        
        <div className="space-y-4">
          {experiences.map((exp, index) => {
            const LogoIcon = exp.logo;
            return (
              <div key={index} className="relative pl-12">
                {/* Timeline dot */}
                <div 
                  className="absolute left-[11px] top-2 w-3 h-3 rounded-full z-10 border-2 border-gray-900 dark:border-white"
                  style={{ 
                    backgroundColor: colors.solid,
                    boxShadow: glowShadow
                  }}
                ></div>
                
                <div className="flex items-start gap-4">
                  {/* Company Logo */}
                  <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-gray-100 dark:bg-white/5 border border-gray-300 dark:border-neutral-700 flex items-center justify-center overflow-hidden">
                    {exp.logoImage ? (
                      <Image
                        src={exp.logoImage}
                        alt={`${exp.company} logo`}
                        width={40}
                        height={40}
                        className="object-contain grayscale-logo"
                      />
                    ) : LogoIcon ? (
                      <LogoIcon 
                        className="w-6 h-6 text-gray-900 dark:text-white grayscale-logo" 
                      />
                    ) : null}
                  </div>
                  
                  <div className="flex-1">
                    {exp.website ? (
                      <a
                        href={exp.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-lg font-semibold mb-1 block hover:opacity-80 transition-opacity text-gray-900 dark:text-white"
                      >
                        {exp.company}
                      </a>
                    ) : (
                      <h3 className="text-lg font-semibold mb-1 text-gray-900 dark:text-white">{exp.company}</h3>
                    )}
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">{exp.role}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-500">{exp.period}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

