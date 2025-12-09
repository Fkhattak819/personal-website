import { FiMapPin, FiMail, FiGithub, FiLinkedin } from "react-icons/fi";

const SOCIAL_LINKS = {
  github: "https://github.com/Fkhattak819",
  linkedin: "https://www.linkedin.com/in/fahd-khattak/",
  email: "mailto:Fkhattak819@gmail.com",
  resume: "/resume.pdf"
};

export default function AboutHero() {
  return (
    <section id="detailed-about" className="mb-8">
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6 mb-8">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Hi, I&apos;m Fahd 👋</h1>
          <div className="flex items-center gap-2 text-gray-400">
            <FiMapPin className="w-4 h-4" />
            <span className="text-sm">Lafayette, Louisiana</span>
          </div>
        </div>
        <div className="flex gap-4">
          <a
            href={SOCIAL_LINKS.email}
            className="text-gray-200 hover:text-white transition-colors"
            aria-label="Email"
          >
            <FiMail size={24} />
          </a>
          <a
            href={SOCIAL_LINKS.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-200 hover:text-white transition-colors"
            aria-label="GitHub"
          >
            <FiGithub size={24} />
          </a>
          <a
            href={SOCIAL_LINKS.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-200 hover:text-white transition-colors"
            aria-label="LinkedIn"
          >
            <FiLinkedin size={24} />
          </a>
        </div>
      </div>

      <div className="rounded-xl bg-[#111111]/50 border border-neutral-800 p-6 w-full">
        <p className="text-base text-gray-300 leading-relaxed mb-4">
          I&apos;m a junior Computer Science major at Louisiana State University, driven by a fascination with how code and data combine to solve real-world problems. My coursework and side projects span machine learning, full-stack development, cloud infrastructure, and interactive game design, giving me a 360° view of modern software engineering.
        </p>
        <p className="text-base text-gray-300 leading-relaxed">
          I&apos;m eager to keep expanding my toolkit for internships or collaborative hackathons that push the boundaries of software engineering. If you&apos;re tackling a challenge where intelligent software can make an impact, let&apos;s connect!
        </p>
      </div>
    </section>
  );
}

