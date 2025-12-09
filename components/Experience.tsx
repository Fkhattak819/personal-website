"use client";

import { useTheme } from "@/contexts/ThemeContext";

interface ExperienceItem {
  company: string;
  role: string;
  period: string;
  description: string;
}

const experiences: ExperienceItem[] = [
  {
    company: "Northrop Grumman",
    role: "Software Engineer Intern",
    period: "June 2025 - Aug 2025",
    description: "",
  },
  {
    company: "Shell",
    role: "Machine Learning Intern",
    period: "Jan 2025 - May 2025",
    description: "",
  },
  {
    company: "Epic Games",
    role: "Game Developer",
    period: "Jun 2023 - Present",
    description: "",
  },
  {
    company: "Louisiana State University",
    role: "Undergraduate Researcher",
    period: "Sep 2024 - Present",
    description: "",
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
      <h2 className="text-2xl md:text-3xl font-bold mb-8">Experience</h2>
      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-800"></div>
        
        <div className="space-y-4">
          {experiences.map((exp, index) => (
            <div key={index} className="relative pl-12">
              {/* Timeline dot */}
              <div 
                className="absolute left-[11px] top-2 w-3 h-3 rounded-full z-10 border-2 border-white"
                style={{ 
                  backgroundColor: colors.solid,
                  boxShadow: glowShadow
                }}
              ></div>
              
              <div>
                <h3 className="text-lg font-semibold mb-1">{exp.company}</h3>
                <p className="text-sm text-gray-400 mb-1">{exp.role}</p>
                <p className="text-xs text-gray-500">{exp.period}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

