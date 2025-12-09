"use client";

import { useState } from "react";
import { FiMenu, FiX, FiChevronDown } from "react-icons/fi";
import { useTheme } from "@/contexts/ThemeContext";

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [isColorMenuOpen, setIsColorMenuOpen] = useState(false);
  const { themeColor, setThemeColor, themeColors } = useTheme();

  const navItems = [
    "About",
    "My Work",
    "Projects",
    "Resume",
    "Contact Me",
  ];

  const colorOptions: { value: "purple" | "green" | "blue" | "red" | "yellow"; label: string }[] = [
    { value: "purple", label: "Purple" },
    { value: "green", label: "Green" },
    { value: "blue", label: "Blue" },
    { value: "red", label: "Red" },
    { value: "yellow", label: "Yellow" },
  ];

  return (
    <nav className="bg-background/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-gray-600">
        <div className="flex items-center justify-between h-16">
          {/* Logo/Name and Color Picker */}
          <div className="flex-shrink-0 flex items-center gap-3">
            <a href="/" className="text-lg font-semibold hover:text-gray-300 transition-colors">
              Fahd Khattak
            </a>
            {/* Color Theme Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsColorMenuOpen(!isColorMenuOpen)}
                className="flex items-center gap-1.5 px-2 py-1 rounded-md transition-colors"
                aria-label="Change theme color"
              >
                <div 
                  className="w-3 h-3 rounded-full border border-gray-500"
                  style={{
                    backgroundColor: themeColor === 'purple' ? '#a855f7' :
                                    themeColor === 'green' ? '#22c55e' :
                                    themeColor === 'blue' ? '#3b82f6' :
                                    themeColor === 'red' ? '#ef4444' :
                                    '#eab308'
                  }}
                ></div>
                <FiChevronDown className={`w-3 h-3 transition-transform text-gray-400 ${isColorMenuOpen ? 'rotate-180' : ''}`} />
              </button>
              {isColorMenuOpen && (
                <>
                  <div 
                    className="fixed inset-0 z-40" 
                    onClick={() => setIsColorMenuOpen(false)}
                  ></div>
                  <div className="absolute top-full left-0 mt-2 bg-[#111111] border border-gray-600 rounded-lg shadow-lg z-50 min-w-[120px]">
                    {colorOptions.map((color) => (
                      <button
                        key={color.value}
                        onClick={() => {
                          setThemeColor(color.value);
                          setIsColorMenuOpen(false);
                        }}
                        className={`w-full text-left px-3 py-2 hover:bg-gray-800 transition-colors flex items-center gap-2 ${
                          themeColor === color.value ? 'bg-gray-800' : ''
                        }`}
                      >
                        <div 
                          className="w-3 h-3 rounded-full border border-gray-500"
                          style={{
                            backgroundColor: color.value === 'purple' ? '#a855f7' :
                                            color.value === 'green' ? '#22c55e' :
                                            color.value === 'blue' ? '#3b82f6' :
                                            color.value === 'red' ? '#ef4444' :
                                            '#eab308'
                          }}
                        ></div>
                        <span className="text-sm text-gray-300">{color.label}</span>
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <a
                key={item}
                href={
                  item === "Resume"
                    ? "/resume.pdf"
                    : item === "About"
                    ? "/about"
                    : item === "My Work" || item === "Projects" || item === "Contact Me"
                    ? `/#${item.toLowerCase().replace(" ", "-")}`
                    : `#${item.toLowerCase().replace(" ", "-")}`
                }
                target={item === "Resume" ? "_blank" : undefined}
                rel={item === "Resume" ? "noopener noreferrer" : undefined}
                className="text-gray-300 hover:text-white transition-colors text-xs"
              >
                {item}
              </a>
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
                <a
                  key={item}
                  href={
                    item === "Resume"
                      ? "/resume.pdf"
                      : item === "About"
                      ? "/about"
                      : item === "My Work" || item === "Projects" || item === "Contact Me"
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
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

