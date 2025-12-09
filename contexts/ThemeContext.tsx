"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

type ThemeColor = "purple" | "green" | "blue" | "red" | "yellow";
type ThemeMode = "light" | "dark";

interface ThemeContextType {
  themeColor: ThemeColor;
  setThemeColor: (color: ThemeColor) => void;
  themeMode: ThemeMode;
  setThemeMode: (mode: ThemeMode) => void;
  themeColors: {
    [key in ThemeColor]: {
      bg: string;
      shadow: string;
      shadowGlow: string;
    };
  };
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  // Initialize theme - will be synced from localStorage in useEffect
  const [themeColor, setThemeColorState] = useState<ThemeColor>("purple");
  const [themeMode, setThemeModeState] = useState<ThemeMode>("dark");

  const themeColors = {
    purple: {
      bg: "bg-purple-500",
      shadow: "shadow-purple-500/10",
      shadowGlow: "rgba(168,85,247,1)",
    },
    green: {
      bg: "bg-green-500",
      shadow: "shadow-green-500/10",
      shadowGlow: "rgba(34,197,94,1)",
    },
    blue: {
      bg: "bg-blue-500",
      shadow: "shadow-blue-500/10",
      shadowGlow: "rgba(59,130,246,1)",
    },
    red: {
      bg: "bg-red-500",
      shadow: "shadow-red-500/10",
      shadowGlow: "rgba(239,68,68,1)",
    },
    yellow: {
      bg: "bg-yellow-500",
      shadow: "shadow-yellow-500/10",
      shadowGlow: "rgba(234,179,8,1)",
    },
  };

  const setThemeColor = (color: ThemeColor) => {
    setThemeColorState(color);
    localStorage.setItem("themeColor", color);
    
    // Update CSS variables immediately
    const root = document.documentElement;
    const colorMap = {
      purple: { rgb: "168, 85, 247", shadow: "rgba(168, 85, 247, 0.1)", glow: "rgba(168, 85, 247, 0.8)" },
      green: { rgb: "34, 197, 94", shadow: "rgba(34, 197, 94, 0.1)", glow: "rgba(34, 197, 94, 0.8)" },
      blue: { rgb: "59, 130, 246", shadow: "rgba(59, 130, 246, 0.1)", glow: "rgba(59, 130, 246, 0.8)" },
      red: { rgb: "239, 68, 68", shadow: "rgba(239, 68, 68, 0.1)", glow: "rgba(239, 68, 68, 0.8)" },
      yellow: { rgb: "234, 179, 8", shadow: "rgba(234, 179, 8, 0.1)", glow: "rgba(234, 179, 8, 0.8)" },
    };
    
    const colors = colorMap[color];
    root.style.setProperty("--theme-color", colors.rgb);
    root.style.setProperty("--theme-shadow", colors.shadow);
    root.style.setProperty("--theme-glow", colors.glow);
  };

  const setThemeMode = (mode: ThemeMode) => {
    setThemeModeState(mode);
    localStorage.setItem("themeMode", mode);
    
    // Update HTML class for theme mode
    if (typeof window !== 'undefined') {
      const root = document.documentElement;
      root.classList.remove("light", "dark");
      root.classList.add(mode);
    }
  };

  useEffect(() => {
    // On mount: sync state from localStorage and update CSS variables
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem("themeColor") as ThemeColor;
      const validThemes: ThemeColor[] = ['purple', 'green', 'blue', 'red', 'yellow'];
      const themeToUse = (savedTheme && validThemes.includes(savedTheme)) ? savedTheme : 'purple';
      
      setThemeColorState(themeToUse);
      
      // Update CSS variables
      const root = document.documentElement;
      const colorMap = {
        purple: { rgb: "168, 85, 247", shadow: "rgba(168, 85, 247, 0.1)", glow: "rgba(168, 85, 247, 0.8)" },
        green: { rgb: "34, 197, 94", shadow: "rgba(34, 197, 94, 0.1)", glow: "rgba(34, 197, 94, 0.8)" },
        blue: { rgb: "59, 130, 246", shadow: "rgba(59, 130, 246, 0.1)", glow: "rgba(59, 130, 246, 0.8)" },
        red: { rgb: "239, 68, 68", shadow: "rgba(239, 68, 68, 0.1)", glow: "rgba(239, 68, 68, 0.8)" },
        yellow: { rgb: "234, 179, 8", shadow: "rgba(234, 179, 8, 0.1)", glow: "rgba(234, 179, 8, 0.8)" },
      };
      const colors = colorMap[themeToUse];
      root.style.setProperty("--theme-color", colors.rgb);
      root.style.setProperty("--theme-shadow", colors.shadow);
      root.style.setProperty("--theme-glow", colors.glow);

      // Initialize theme mode
      const savedMode = localStorage.getItem("themeMode") as ThemeMode;
      const modeToUse = (savedMode === 'light' || savedMode === 'dark') ? savedMode : 'dark';
      setThemeModeState(modeToUse);
      root.classList.remove("light", "dark");
      root.classList.add(modeToUse);
    }
  }, []); // Only run on mount

  useEffect(() => {
    // Update CSS variables whenever themeColor changes
    if (typeof window !== 'undefined') {
      const root = document.documentElement;
      const colorMap = {
        purple: { rgb: "168, 85, 247", shadow: "rgba(168, 85, 247, 0.1)", glow: "rgba(168, 85, 247, 0.8)" },
        green: { rgb: "34, 197, 94", shadow: "rgba(34, 197, 94, 0.1)", glow: "rgba(34, 197, 94, 0.8)" },
        blue: { rgb: "59, 130, 246", shadow: "rgba(59, 130, 246, 0.1)", glow: "rgba(59, 130, 246, 0.8)" },
        red: { rgb: "239, 68, 68", shadow: "rgba(239, 68, 68, 0.1)", glow: "rgba(239, 68, 68, 0.8)" },
        yellow: { rgb: "234, 179, 8", shadow: "rgba(234, 179, 8, 0.1)", glow: "rgba(234, 179, 8, 0.8)" },
      };
      
      const colors = colorMap[themeColor];
      root.style.setProperty("--theme-color", colors.rgb);
      root.style.setProperty("--theme-shadow", colors.shadow);
      root.style.setProperty("--theme-glow", colors.glow);
    }
  }, [themeColor]);

  return (
    <ThemeContext.Provider value={{ themeColor, setThemeColor, themeMode, setThemeMode, themeColors }}>
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

