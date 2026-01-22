import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Image from "next/image";

export default function KitchenSyncPage() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-12">
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-2 animate-slide-in-left">Personal Projects</p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-2 text-gray-900 dark:text-white animate-slide-in-right" style={{ animationDelay: '0.05s' }}>Kitchen Sync</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Personal Project</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">Digital Food Pantry App</p>
        </div>

        {/* Main Image Section */}
        <div className="relative w-full mb-16 rounded-lg overflow-hidden border border-gray-300 dark:border-gray-800">
          <div className="w-full h-96 bg-gray-200 dark:bg-gray-800 flex items-center justify-center overflow-hidden relative">
            <Image
              src="/projects/Kitchen Sync.png"
              alt="Kitchen Sync application screenshot"
              width={1200}
              height={600}
              className="w-full h-full object-contain"
            />
          </div>
        </div>

        {/* Project Information */}
        <div className="mt-16 space-y-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-8">Kitchen Sync</h2>

          {/* Overview */}
          <section>
            <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Overview</h3>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
              Kitchen Sync is a digital food pantry application designed to solve common meal planning and food waste challenges. 
              The app helps users manage their pantry inventory, discover recipes based on available ingredients, and streamline 
              their grocery shopping experience.
            </p>
            <div className="mt-4">
              <h4 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">Why we made this app:</h4>
              <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-400">
                <li>People struggle with meal planning and food waste</li>
                <li>Hard to remember what&apos;s in their pantry</li>
                <li>Difficult to know what to make with what you have</li>
                <li>Often buy groceries they already have or miss key ingredients</li>
              </ul>
            </div>
            <div className="mt-6">
              <h4 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">What our app solves:</h4>
              <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-400">
                <li>Login for personalization</li>
                <li>Allows users to create a digital pantry</li>
                <li>Suggests recipes you can cook right now</li>
                <li>Shows missing ingredients</li>
                <li>Lets users add items to shopping cart</li>
                <li>Allows filtering based on preferences</li>
              </ul>
            </div>
          </section>

          {/* Technologies Used */}
          <section>
            <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Technologies Used</h3>
            <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-400">
              <li>React JS</li>
              <li>JSX</li>
              <li>Vite</li>
              <li>Python</li>
              <li>APIFlask</li>
              <li>MySQL</li>
              <li>Node.js</li>
            </ul>
          </section>

          {/* Learning Outcomes */}
          <section>
            <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Challenges & Solutions</h3>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
              Building Kitchen Sync presented several technical challenges that required creative problem-solving and architectural 
              decisions. Here are the key challenges we overcame:
            </p>
            <ul className="space-y-4 text-gray-600 dark:text-gray-400">
              <li>
                <span className="font-semibold text-gray-900 dark:text-white">Remote Connectivity:</span>{" "}
                We solved the issue of the local SQL Server being inaccessible to remote teammates by implementing an ngrok tunnel 
                to securely expose the Flask API, enabling seamless collaboration across distributed team members.
              </li>
              <li>
                <span className="font-semibold text-gray-900 dark:text-white">Rate Limiting:</span>{" "}
                We bypassed ngrok&apos;s connection limits by re-architecting the backend to pre-load full recipe details in a single 
                batch request, eliminating dozens of redundant calls and significantly improving performance and reliability.
              </li>
              <li>
                <span className="font-semibold text-gray-900 dark:text-white">Data Quality:</span>{" "}
                We overcame inconsistent API data by building a custom Python ETL (Extract, Transform, Load) script that uses regex 
                to normalize units and extract preparation steps into a clean database schema, ensuring data consistency and usability.
              </li>
              <li>
                <span className="font-semibold text-gray-900 dark:text-white">Frontend Design:</span>{" "}
                It was challenging to create a creative dashboard design while functionally connecting all the elements of the backend. 
                This required careful planning of component architecture and state management to ensure a seamless user experience.
              </li>
            </ul>
          </section>
        </div>
      </div>
      <Footer />
    </main>
  );
}
