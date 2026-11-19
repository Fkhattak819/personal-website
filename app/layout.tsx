import type { Metadata } from "next";
import { Inter_Tight } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";
import Providers from "@/components/Providers";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SmoothScroll from "@/components/SmoothScroll";
import ScrollProgress from "@/components/ScrollProgress";
import GridOverlay from "@/components/GridOverlay";

// Web fallback for visitors without Helvetica Neue installed.
const sans = Inter_Tight({ subsets: ["latin"], variable: "--font-sans", display: "swap" });

export const metadata: Metadata = {
  title: {
    default: "Fahd Khattak — Software Engineer & Game Developer",
    template: "%s — Fahd Khattak",
  },
  description:
    "Portfolio of Fahd Khattak, a software engineer and game developer studying Computer Science at LSU. Internships at JPMorgan Chase, Northrop Grumman, and Shell; Fortnite and Roblox games.",
};

// Runs before paint so the saved theme never flashes.
const themeScript = `(function(){try{var m=localStorage.getItem('themeMode');if(m!=='dark'&&m!=='light'){m='light';}var r=document.documentElement;r.classList.remove('light','dark');r.classList.add(m);}catch(e){}})();`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${sans.variable} light`} suppressHydrationWarning>
      <body id="top">
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        {/* Without JavaScript, show everything that would otherwise animate in. */}
        <noscript>
          <style>{`[data-reveal]{opacity:1!important;transform:none!important}`}</style>
        </noscript>
        <Providers>
          <SmoothScroll />
          <ScrollProgress />
          <GridOverlay />
          <Navigation />
          {children}
          <Footer />
        </Providers>
        {/* Vercel Web Analytics: page views and visitors, no cookies. */}
        <Analytics />
        {/* Vercel Speed Insights: real-visitor performance metrics. */}
        <SpeedInsights />
      </body>
    </html>
  );
}
