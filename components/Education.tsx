import { FiEdit2 } from "react-icons/fi";

interface EducationItem {
  degree: string;
  period: string;
  institution: string;
  description: string;
}

const education: EducationItem[] = [
  {
    degree: "Bachelor Degree",
    period: "August 2023 - May 2027",
    institution: "Louisiana State University",
    description: "Majoring in Computer Science. Coursework includes Data Structures, Algorithms, Operating Systems, and Software Engineering.",
  },
  {
    degree: "High School Degree",
    period: "August 2019 - May 2023",
    institution: "Lafayette High School",
    description: "Graduated with High School Diploma. 33 ACT, 4.0 GPA",
  },
];

export default function Education() {
  return (
    <section id="education" className="mb-12">
      <h2 className="text-2xl md:text-3xl font-bold mb-8 text-gray-900 dark:text-white text-left">Background Education</h2>
      <div className="relative mt-12">
        {/* Timeline line */}
        <div className="absolute left-1/2 -top-10 -bottom-10 w-0.5 bg-black/60 dark:bg-white/60 -translate-x-1/2 hidden md:block"></div>
        
        <div className="space-y-16">
          {education.map((item, index) => (
            <div key={index} className="flex flex-col md:flex-row items-center justify-between gap-8 relative">
              {/* Left Side (Degree & Date) */}
              <div className="flex-1 text-center md:text-right order-2 md:order-1 w-full md:w-auto">
                <h3 className="text-xl font-bold mb-1 text-gray-900 dark:text-white">{item.degree}</h3>
                <p className="text-gray-600 dark:text-gray-400">{item.period}</p>
              </div>

              {/* Center Icon */}
              <div className="relative z-10 order-1 md:order-2">
                <div className="w-12 h-12 rounded-full bg-white dark:bg-[#1C1C1C] border-2 border-black dark:border-gray-700 flex items-center justify-center">
                  <FiEdit2 className="w-5 h-5 text-black dark:text-white" />
                </div>
              </div>

              {/* Right Side (Institution & Desc) */}
              <div className="flex-1 text-center md:text-left order-3 w-full md:w-auto">
                <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">{item.institution}</h3>
                <div className="w-12 h-0.5 bg-gray-400 dark:bg-gray-300 mb-4 mx-auto md:mx-0"></div>
                <p className="text-gray-700 dark:text-gray-400 leading-relaxed text-sm">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

