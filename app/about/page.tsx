import Navigation from "@/components/Navigation";
import AboutHero from "@/components/AboutHero";
import Education from "@/components/Education";
import Footer from "@/components/Footer";

export default function AboutPage() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <AboutHero />
        <Education />
      </div>
      <Footer />
    </main>
  );
}
