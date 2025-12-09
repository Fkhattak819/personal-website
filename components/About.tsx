import { FiMapPin, FiMail, FiGithub, FiLinkedin } from "react-icons/fi";

// UPDATE THESE LINKS
const SOCIAL_LINKS = {
  github: "https://github.com/Fkhattak819",
  linkedin: "https://www.linkedin.com/in/fahd-khattak/",
  email: "fkhattak819@gmail.com",
  resume: "/resume.pdf"
};

export default function About() {
  return (
    <section id="about" className="mb-12">
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
        <div className="flex-1">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Fahd Khattak</h1>
          <div className="flex items-center gap-2 text-gray-400 mb-6">
            <FiMapPin className="w-4 h-4" />
            <span className="text-sm">Lafayette, Louisiana</span>
          </div>
          <p className="text-base text-gray-300 leading-relaxed max-w-2xl">
            Aspiring software engineer passionate about building innovative solutions and creating engaging game experiences.
          </p>
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
    </section>
  );
}

