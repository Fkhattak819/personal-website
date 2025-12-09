import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/contexts/ThemeContext";

export const metadata: Metadata = {
  title: "Personal Website",
  description: "Full-Stack Web Developer Portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="bg-background">
      <body className="antialiased bg-background text-white relative">
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  const theme = localStorage.getItem('themeColor') || 'purple';
                  const colorMap = {
                    purple: { rgb: "168, 85, 247", shadow: "rgba(168, 85, 247, 0.1)", glow: "rgba(168, 85, 247, 0.8)" },
                    green: { rgb: "34, 197, 94", shadow: "rgba(34, 197, 94, 0.1)", glow: "rgba(34, 197, 94, 0.8)" },
                    blue: { rgb: "59, 130, 246", shadow: "rgba(59, 130, 246, 0.1)", glow: "rgba(59, 130, 246, 0.8)" },
                    red: { rgb: "239, 68, 68", shadow: "rgba(239, 68, 68, 0.1)", glow: "rgba(239, 68, 68, 0.8)" },
                    yellow: { rgb: "234, 179, 8", shadow: "rgba(234, 179, 8, 0.1)", glow: "rgba(234, 179, 8, 0.8)" }
                  };
                  const colors = colorMap[theme] || colorMap.purple;
                  const root = document.documentElement;
                  root.style.setProperty('--theme-color', colors.rgb);
                  root.style.setProperty('--theme-shadow', colors.shadow);
                  root.style.setProperty('--theme-glow', colors.glow);
                } catch (e) {}
              })();
            `,
          }}
        />
        <ThemeProvider>
          <div className="relative z-10">{children}</div>
        </ThemeProvider>
      </body>
    </html>
  );
}

