"use client";

import { useState } from "react";
import { FiMenu, FiX, FiSun, FiMoon } from "react-icons/fi";
import { useTheme } from "@/contexts/ThemeContext";

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const { themeMode, setThemeMode } = useTheme();

  const navItems = [
    "About",
    "My Work",
    "Projects",
    "Resume",
    "Contact Me",
  ];

  return (
    <nav className="bg-background/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 border-b border-gray-600">
          {/* Logo/Name */}
          <div className="flex-shrink-0 flex items-center gap-3">
            <a href="/" className="text-lg font-semibold hover:text-gray-300 transition-colors">
              Home
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <div key={item} className="flex items-center gap-2">
                <a
                  href={
                    item === "Resume"
                      ? "/resume.pdf"
                      : item === "About"
                      ? "/about"
                      : item === "My Work"
                      ? "/my-work"
                      : item === "Projects"
                      ? "/my-personal-projects"
                      : item === "Contact Me"
                      ? `/#${item.toLowerCase().replace(" ", "-")}`
                      : `#${item.toLowerCase().replace(" ", "-")}`
                  }
                  target={item === "Resume" ? "_blank" : undefined}
                  rel={item === "Resume" ? "noopener noreferrer" : undefined}
                  className="text-gray-300 hover:text-white transition-colors text-xs"
                >
                  {item}
                </a>
                {item === "Contact Me" && (
                  <button
                    onClick={() => setThemeMode(themeMode === "dark" ? "light" : "dark")}
                    className="text-gray-300 hover:text-white transition-colors p-1"
                    aria-label="Toggle theme"
                  >
                    {themeMode === "dark" ? <FiSun size={16} /> : <FiMoon size={16} />}
                  </button>
                )}
              </div>
            ))}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-300 hover:text-white"
            >
              {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden pb-4">
            <div className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <div key={item} className="flex items-center justify-between">
                  <a
                    href={
                      item === "Resume"
                        ? "/resume.pdf"
                        : item === "About"
                        ? "/about"
                        : item === "My Work"
                        ? "/my-work"
                        : item === "Projects"
                        ? "/my-personal-projects"
                        : item === "Contact Me"
                        ? `/#${item.toLowerCase().replace(" ", "-")}`
                        : `#${item.toLowerCase().replace(" ", "-")}`
                    }
                    target={item === "Resume" ? "_blank" : undefined}
                    rel={item === "Resume" ? "noopener noreferrer" : undefined}
                    className="text-gray-300 hover:text-white transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    {item}
                  </a>
                  {item === "Contact Me" && (
                    <button
                      onClick={() => {
                        setThemeMode(themeMode === "dark" ? "light" : "dark");
                        setIsOpen(false);
                      }}
                      className="text-gray-300 hover:text-white transition-colors p-1"
                      aria-label="Toggle theme"
                    >
                      {themeMode === "dark" ? <FiSun size={18} /> : <FiMoon size={18} />}
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

