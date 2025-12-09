import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export default function RailCarSealDetectionPage() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-12">
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">Work Collection</p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-2 text-gray-900 dark:text-white">Rail car Seal Detection</h1>
        </div>

        <div className="space-y-8">
          <section>
            <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Overview</h3>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              AI-powered system for detecting and verifying rail car seals.
            </p>
          </section>
        </div>
      </div>
      <Footer />
    </main>
  );
}

