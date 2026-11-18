"use client";

import { createContext, useCallback, useContext, useEffect, useState, ReactNode } from "react";

type ThemeMode = "light" | "dark";

interface ThemeContextType {
  themeMode: ThemeMode;
  setThemeMode: (mode: ThemeMode) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [themeMode, setThemeModeState] = useState<ThemeMode>("light");

  // The inline script in layout.tsx has already set the class before paint;
  // mirror it into React state once mounted.
  useEffect(() => {
    setThemeModeState(document.documentElement.classList.contains("dark") ? "dark" : "light");
  }, []);

  const setThemeMode = useCallback((mode: ThemeMode) => {
    setThemeModeState(mode);
    try {
      localStorage.setItem("themeMode", mode);
    } catch {}
    const root = document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(mode);
  }, []);

  const toggleTheme = useCallback(() => {
    setThemeMode(document.documentElement.classList.contains("dark") ? "light" : "dark");
  }, [setThemeMode]);

  return (
    <ThemeContext.Provider value={{ themeMode, setThemeMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
