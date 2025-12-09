import {
  SiAmazonwebservices,
  SiKubernetes,
  SiNodedotjs,
  SiReact,
  SiPostgresql,
  SiNumpy,
  SiTensorflow,
  SiPandas,
  SiQt,
  SiGit,
  SiJest,
  SiPytest,
  SiJira,
  SiLinux,
  SiUnrealengine,
  SiPython,
  SiGnubash,
  SiMysql,
  SiC,
  SiCplusplus,
  SiOracle,
  SiHtml5,
  SiCss3,
  SiJavascript,
  SiTypescript,
  SiYaml,
} from "react-icons/si";
import { FiDatabase, FiUsers, FiCode } from "react-icons/fi";

const programmingLanguages = [
  { name: "Python", icon: SiPython },
  { name: "Verse", icon: FiCode }, // Using FiCode as generic placeholder for Verse as specific icon might not be available
  { name: "Bash", icon: SiGnubash },
  { name: "SQL", icon: SiMysql }, // Using MySQL icon for generic SQL
  { name: "C", icon: SiC },
  { name: "C++", icon: SiCplusplus },
  { name: "Java", icon: SiOracle },
  { name: "HTML", icon: SiHtml5 },
  { name: "CSS", icon: SiCss3 },
  { name: "JavaScript", icon: SiJavascript },
  { name: "TypeScript", icon: SiTypescript },
  { name: "YAML", icon: SiYaml },
];

const technologies = [
  { name: "AWS", icon: SiAmazonwebservices },
  { name: "Kubernetes", icon: SiKubernetes },
  { name: "Node.js", icon: SiNodedotjs },
  { name: "React", icon: SiReact },
  { name: "ChromaDB", icon: FiDatabase },
  { name: "PostgreSQL", icon: SiPostgresql },
  { name: "NumPy", icon: SiNumpy },
  { name: "TensorFlow", icon: SiTensorflow },
  { name: "Unsloth", icon: SiPython },
  { name: "Pandas", icon: SiPandas },
  { name: "QT", icon: SiQt },
  { name: "Git", icon: SiGit },
  { name: "Jest", icon: SiJest },
  { name: "Pytest", icon: SiPytest },
  { name: "Jira", icon: SiJira },
  { name: "Agile", icon: FiUsers },
  { name: "Linux", icon: SiLinux },
  { name: "Unreal Engine 5", icon: SiUnrealengine },
];

export default function TechStack() {
  return (
    <section id="languages-and-technologies" className="mb-12 overflow-hidden">
      <h2 className="text-2xl md:text-3xl font-bold mb-8">Languages and Technologies</h2>
      
      <div className="relative w-full">
        {/* Gradient masks for smooth fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-background to-transparent z-10"></div>
        <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-background to-transparent z-10"></div>

        <div className="flex w-max animate-scroll hover:[animation-play-state:paused] mb-6" style={{ willChange: 'transform' }}>
          {/* First copy of the list */}
          <div className="flex gap-6 mx-4">
            {programmingLanguages.map((tech) => {
              const Icon = tech.icon;
              return (
                <div key={tech.name} className="flex items-center gap-2 text-gray-200 hover:text-white transition-colors">
                  <Icon className="w-6 h-6" />
                  <span className="text-lg font-medium">{tech.name}</span>
                </div>
              );
            })}
          </div>

          {/* Second copy for seamless looping */}
          <div className="flex gap-6 mx-4">
            {programmingLanguages.map((tech) => {
              const Icon = tech.icon;
              return (
                <div key={`${tech.name}-duplicate`} className="flex items-center gap-2 text-gray-200 hover:text-white transition-colors">
                  <Icon className="w-6 h-6" />
                  <span className="text-lg font-medium">{tech.name}</span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="flex w-max animate-scroll hover:[animation-play-state:paused]" style={{ animationDirection: 'reverse', willChange: 'transform' }}>
          {/* First copy of the list */}
          <div className="flex gap-6 mx-4">
            {technologies.map((tech) => {
              const Icon = tech.icon;
              return (
                <div key={tech.name} className="flex items-center gap-2 text-gray-200 hover:text-white transition-colors">
                  <Icon className="w-6 h-6" />
                  <span className="text-lg font-medium">{tech.name}</span>
                </div>
              );
            })}
          </div>

          {/* Second copy for seamless looping */}
          <div className="flex gap-6 mx-4">
            {technologies.map((tech) => {
              const Icon = tech.icon;
              return (
                <div key={`${tech.name}-duplicate`} className="flex items-center gap-2 text-gray-200 hover:text-white transition-colors">
                  <Icon className="w-6 h-6" />
                  <span className="text-lg font-medium">{tech.name}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
