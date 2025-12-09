import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Link from "next/link";
import Image from "next/image";
import { SiHtml5, SiCss3, SiJavascript, SiNodedotjs, SiOracle } from "react-icons/si";
import { FiArrowRight } from "react-icons/fi";

interface PersonalProject {
  id: string;
  title: string;
  description: string;
  technologies: { name: string; icon: any }[];
  imageUrl?: string;
}

const personalProjects: PersonalProject[] = [
  {
    id: "focus-flow",
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
    id: "kitchen-sync",
    title: "Kitchen Sync",
    description: "Digital food pantry with auto recipe generator",
    technologies: [{ name: "Java", icon: SiOracle }],
  },
];

export default function MyPersonalProjectsPage() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-12">
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-2 animate-slide-in-left">Personal Projects</p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-2 text-gray-900 dark:text-white animate-slide-in-right" style={{ animationDelay: '0.05s' }}>My Projects</h1>
        </div>

        <div className="space-y-8">
          {personalProjects.map((project) => {
            return (
              <Link
                key={project.id}
                href={`/my-personal-projects/${project.id}`}
                className="group block"
              >
                <div className="flex flex-col rounded-lg bg-gray-50 dark:bg-[#1a1a1a] border border-gray-300 dark:border-gray-800 hover:border-gray-400 dark:hover:border-gray-700 transition-all duration-300 overflow-hidden">
                  <div className="w-full h-80 bg-gray-200 dark:bg-gray-800 flex items-center justify-center overflow-hidden relative">
                    {project.imageUrl ? (
                      <>
                        <Image
                          src={project.imageUrl}
                          alt={project.title}
                          width={800}
                          height={320}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" style={{ background: 'radial-gradient(circle at center, transparent 0%, transparent 50%, rgba(0, 0, 0, 0.3) 100%)' }}></div>
                      </>
                    ) : (
                      <div className="text-gray-400 dark:text-gray-500 text-sm">Image Placeholder</div>
                    )}
                  </div>
                  <div className="p-4 flex flex-col">
                    <h2 className="text-xl font-bold mb-1 text-gray-900 dark:text-white">
                      {project.title}
                    </h2>
                    <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors">
                      Learn more
                      <FiArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
      <Footer />
    </main>
  );
}

