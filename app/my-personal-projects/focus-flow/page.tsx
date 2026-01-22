import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Image from "next/image";

export default function FocusFlowPage() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-12">
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-2 animate-slide-in-left">Personal Projects</p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-2 text-gray-900 dark:text-white animate-slide-in-right" style={{ animationDelay: '0.05s' }}>Focus Flow</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Personal Project</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">Productivity App</p>
        </div>

        {/* Main Image Section */}
        <div className="relative w-full mb-16 rounded-lg overflow-hidden border border-gray-300 dark:border-gray-800">
          <div className="w-full h-96 bg-[#2a2a2a] dark:bg-[#2a2a2a] flex items-start pt-8 justify-center overflow-hidden relative">
            <Image
              src="/projects/Focus Flow.png"
              alt="Focus Flow application screenshot"
              width={1200}
              height={600}
              className="w-full h-full object-contain"
            />
          </div>
        </div>

        {/* Project Information */}
        <div className="mt-16 space-y-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-8">Focus Flow</h2>

          {/* Overview */}
          <section>
            <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Overview</h3>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              Focus Flow is a productivity application designed to help users manage their focus sessions and workflow efficiently. 
              The app provides tools for tracking work sessions, managing tasks, and maintaining productivity through structured 
              time management techniques.
            </p>
          </section>

          {/* Technologies Used */}
          <section>
            <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Technologies Used</h3>
            <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-400">
              <li>HTML</li>
              <li>CSS</li>
              <li>JavaScript</li>
              <li>Node.js</li>
            </ul>
          </section>

          {/* Learning Outcomes */}
          <section>
            <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Learning Outcomes</h3>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
              Building Focus Flow provided valuable experience in creating user-focused applications that solve real productivity challenges, 
              emphasizing clean design, intuitive user experience, and effective time management principles.
            </p>
            <ul className="space-y-3 text-gray-600 dark:text-gray-400">
              <li>
                <span className="font-semibold text-gray-900 dark:text-white">User-centered design:</span>{" "}
                Developing an application focused on productivity required understanding user workflows and pain points, 
                leading to a deeper appreciation for how thoughtful design can enhance daily work habits and efficiency.
              </li>
              <li>
                <span className="font-semibold text-gray-900 dark:text-white">Full-stack development:</span>{" "}
                Working with HTML, CSS, JavaScript, and Node.js provided hands-on experience in building complete web applications, 
                from frontend interfaces to backend functionality, reinforcing the importance of seamless integration between 
                different layers of an application.
              </li>
              <li>
                <span className="font-semibold text-gray-900 dark:text-white">Time management principles:</span>{" "}
                Implementing focus session tracking and workflow management features required research into productivity methodologies, 
                demonstrating how technical skills can be applied to solve real-world problems and improve user quality of life.
              </li>
            </ul>
          </section>
        </div>
      </div>
      <Footer />
    </main>
  );
}
