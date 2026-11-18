// Single source of truth for the content shown across the site.

export const SITE = {
  name: "Fahd Khattak",
  role: "Software engineer & game developer",
  location: "Lafayette, Louisiana",
  email: "fkhattak819@gmail.com",
};

// UPDATE THESE LINKS
export const SOCIALS = [
  { label: "Email", href: `mailto:${SITE.email}`, external: false },
  { label: "GitHub", href: "https://github.com/Fkhattak819", external: true },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/fahd-khattak/", external: true },
  { label: "Résumé", href: "/resume.pdf", external: true },
];

export const STATS = [
  { value: 10, prefix: "", suffix: "M+", label: "Plays across Fortnite maps I've built or contributed to" },
  { value: 100, prefix: "$", suffix: "K", label: "Revenue generated as a Fortnite creator" },
  { value: 430, prefix: "", suffix: "%", label: "Longer max simulation runtime at Northrop Grumman" },
  { value: 85, prefix: "", suffix: "%", label: "Classification accuracy on a vision model at Shell" },
];

export const LANGUAGES = [
  "Python", "Verse", "Luau", "Bash", "SQL", "C", "C++", "Java", "HTML", "CSS", "JavaScript", "TypeScript", "YAML",
];

export const TECHNOLOGIES = [
  "AWS", "Kubernetes", "Node.js", "React", "ChromaDB", "PostgreSQL", "NumPy", "TensorFlow", "Unsloth",
  "Pandas", "QT", "Git", "Jest", "Pytest", "Jira", "Agile", "Linux", "Unreal Engine 5", "Roblox Studio",
];

export interface ExperienceItem {
  company: string;
  role: string;
  period: string;
  location: string;
  website: string;
  points: string[];
}

export const EXPERIENCE: ExperienceItem[] = [
  {
    company: "JPMorgan Chase",
    role: "Software Engineer Intern",
    period: "Jun 2026 – Aug 2026",
    location: "Houston, Texas",
    website: "https://www.jpmorganchase.com/",
    points: [],
  },
  {
    company: "Northrop Grumman",
    role: "Software Engineer Intern",
    period: "Jun 2025 – Aug 2025",
    location: "Dulles, Virginia",
    website: "https://www.northropgrumman.com/",
    points: [
      "Drove a 430% increase in max simulation runtime, supporting 14+ concurrent headless scenarios with multi-instructor access, by replacing legacy Windows VMs with a PostgreSQL-powered client-server architecture on a Kubernetes cluster.",
      "Streamlined deployments and cut integration errors for 6 downstream teams working with a multi-terabyte database by introducing a Python-driven Alembic schema versioning system.",
      "Worked in a fast-paced Agile team, taking part in sprint planning and code reviews while shipping improvements to simulation runtime, database reliability, and GUI tools.",
    ],
  },
  {
    company: "Shell",
    role: "Machine Learning Intern",
    period: "Jan 2025 – May 2025",
    location: "Baton Rouge, Louisiana",
    website: "https://www.shell.com/",
    points: [
      "Delivered 85% classification accuracy on defective railcar locks by fine-tuning Llama-3.1-Vision-Instruct with Python, QLoRA, Unsloth, and Hugging Face.",
      "Achieved sub-10s inference and reduced manual inspections by dockerizing a 4-bit quantized vision model, exposing it via a REST API, and integrating RAG-based retrieval from Azure Blob Storage.",
      "Launched real-time analytics of railcar lock conditions through a Power BI dashboard fed by an end-to-end pipeline.",
    ],
  },
  {
    company: "Epic Games",
    role: "Game Developer",
    period: "Jun 2023 – Present",
    location: "Remote",
    website: "https://www.epicgames.com/",
    points: [
      "Build Fortnite maps in Unreal Engine 5 with Verse and C++ as part of a 5-person studio.",
      "Reached 10M+ total plays, 10K peak concurrent players, and $100K in revenue.",
      "Sustained 2,000+ concurrent users and lifted retention by 30% through rapid iteration on UI/UX, gameplay systems, and animations.",
    ],
  },
  {
    company: "Louisiana State University",
    role: "Undergraduate Researcher",
    period: "Sep 2024 – Present",
    location: "Baton Rouge, Louisiana",
    website: "https://www.lsu.edu/",
    points: [
      "Backend engineer on SmartSense, a real-time safety platform from the LSU Biomechanics Lab, built with React and Node.js for OSHA-compliant reporting.",
      "Built AWS Lambda functions integrating DynamoDB and the Stripe API for real-time data logging and multi-region payment processing.",
      "Wrote Jest unit tests to 100% branch coverage across the JavaScript codebase.",
    ],
  },
];

export interface Project {
  slug: string;
  href: string;
  title: string;
  kicker: string;
  description: string;
  tags: string[];
  image?: string;
  /** "portrait" screenshots are shown framed rather than cropped. */
  fit?: "cover" | "portrait";
  /** Rendered instead of an image when there is no screenshot yet. */
  graphic?: "rail" | "blocks";
}

export const WORK: Project[] = [
  {
    slug: "game-developer",
    href: "/my-work/game-developer",
    title: "Fortnite Maps",
    kicker: "Game development",
    description: "Creating interactive Fortnite maps and game experiences.",
    tags: ["Unreal Engine 5", "Verse", "Blender"],
    image: "/Thumnails/fortnite-main.jpg",
  },
  {
    slug: "roblox",
    href: "/my-work/roblox",
    title: "Roblox",
    kicker: "Games & creator tools",
    description: "A live Roblox game with 26K+ visits, more in development, and a mobile analytics app for creators.",
    tags: ["Luau", "Roblox Studio", "React Native", "AWS"],
    image: "/Roblox/pets-vs-anomaly-2.png",
  },
  {
    slug: "rail-car-seal-detection",
    href: "/my-work/rail-car-seal-detection",
    title: "Rail Car Seal Detection",
    kicker: "Machine learning",
    description: "AI-powered system for detecting and verifying rail car seals.",
    tags: ["Python", "Llama Vision", "QLoRA", "Docker", "Azure"],
    graphic: "rail",
  },
];

export const PROJECTS: Project[] = [
  {
    slug: "roblox-analytics-studio",
    href: "/my-personal-projects/roblox-analytics-studio",
    title: "Roblox Analytics Studio",
    kicker: "Mobile app · AWS",
    description: "An iOS analytics app that lets Roblox creators check engagement, retention, and revenue from a phone.",
    tags: ["React Native", "Expo", "TypeScript", "AWS Lambda", "DynamoDB"],
    image: "/projects/analytics/sales.png",
    fit: "portrait",
  },
  {
    slug: "focus-flow",
    href: "/my-personal-projects/focus-flow",
    title: "Focus Flow",
    kicker: "Productivity app",
    description: "Productivity app for managing focus sessions and workflow.",
    tags: ["HTML", "CSS", "JavaScript", "Node.js"],
    image: "/projects/Focus Flow.png",
    fit: "portrait",
  },
  {
    slug: "kitchen-sync",
    href: "/my-personal-projects/kitchen-sync",
    title: "Kitchen Sync",
    kicker: "Full-stack app",
    description: "Digital food pantry with an auto recipe generator.",
    tags: ["React", "Vite", "Python", "APIFlask", "MySQL"],
    image: "/projects/Kitchen Sync.png",
  },
];

export interface GameMap {
  title: string;
  thumbnail: string;
  created: string;
  plays: number;
  peakPlayers: number;
}

// Maps I made, most played first.
export const GAME_MAPS: GameMap[] = [
  { title: "Choose Your Hero Box PVP", thumbnail: "Choose Your Hero Box PVP.png", created: "Mar 2024", plays: 1_100_000, peakPlayers: 1_200 },
  { title: "Ultimate Goofy BoxFights", thumbnail: "Ultimate Goofy BoxFights.png", created: "Dec 2024", plays: 800_000, peakPlayers: 2_700 },
  { title: "Heroes Tilted", thumbnail: "HeroesTilted.png", created: "May 2024", plays: 359_000, peakPlayers: 400 },
  { title: "Medallion Free For All", thumbnail: "Medallion Free For All.png", created: "Apr 2024", plays: 300_000, peakPlayers: 9_800 },
  { title: "Brainrot 1v1v1 Reload", thumbnail: "Brainrot 1v1v1 Reload.png", created: "Oct 2025", plays: 10_000, peakPlayers: 500 },
  { title: "Greasy One Shot", thumbnail: "Greasy One Shot.png", created: "Jun 2023", plays: 2_400, peakPlayers: 220 },
];

// Other creators' maps I worked on. These are not mine; the numbers are the map's.
export const MAP_CONTRIBUTIONS: (GameMap & { contribution: string })[] = [
  {
    title: "Goofy Boxfights",
    thumbnail: "Goofy Boxfight.jpeg",
    created: "Aug 2024",
    plays: 20_000_000,
    peakPlayers: 60_000,
    contribution: "Another creator's map. I helped develop its backend; I didn't build the map itself.",
  },
];

/** 20000000 -> "20M", 359000 -> "359K", 2400 -> "2.4K", 500 -> "500" */
export function compact(n: number): string {
  const trim = (v: number) => v.toFixed(1).replace(/\.0$/, "");
  if (n >= 1_000_000) return `${trim(n / 1_000_000)}M`;
  if (n >= 1_000) return `${trim(n / 1_000)}K`;
  return String(n);
}

export interface RobloxGame {
  title: string;
  genre: string;
  description: string;
  status: string;
  url?: string;
}

// Public numbers from roblox.com, checked November 2026.
export const PETS_VS_ANOMALY = {
  title: "Pets VS Anomaly",
  url: "https://www.roblox.com/games/87196808791031",
  visits: 26_900,
  favorites: 1_265,
  released: "Oct 2026",
  thumbnails: [1, 2, 3, 4].map((n) => `/Roblox/pets-vs-anomaly-${n}.png`),
};

// UPDATE statuses and add links/thumbnails as these ship.
export const ROBLOX_GAMES: RobloxGame[] = [
  {
    title: "Pets VS Anomaly",
    genre: "Simulation",
    description: "Collect and fuse pets, take on Nightmares, and earn boss shards to craft rare pets.",
    status: "Live",
    url: "https://www.roblox.com/games/87196808791031",
  },
  {
    title: "Hammer Tycoon",
    genre: "Tycoon",
    description: "Train strength, throw your hammer further, earn money, buy multipliers, and rebirth.",
    status: "In development",
  },
  {
    title: "Revolver Showdown",
    genre: "Arena shooter",
    description: "Revolver duels across voted arenas, with bots built to move and aim like real players.",
    status: "In development",
  },
  {
    title: "Anagram",
    genre: "Word game",
    description: "Unscramble words against the clock for wins and coins, with streak leaderboards.",
    status: "In development",
  },
];

export const SKILLS = [
  {
    group: "Languages",
    items: ["Python", "TypeScript", "JavaScript", "Java", "C", "C++", "SQL", "Luau", "Verse", "Bash", "HTML", "CSS", "YAML"],
  },
  {
    group: "Frameworks & cloud",
    items: ["React", "React Native", "Node.js", "AWS", "Azure", "Kubernetes", "PostgreSQL", "DynamoDB", "TensorFlow", "NumPy", "Pandas", "ChromaDB", "Unsloth", "QT"],
  },
  {
    group: "Tools & engines",
    items: ["Git", "Docker", "Jest", "Pytest", "Jira", "Linux", "Figma", "Unreal Engine 5", "Roblox Studio", "Unity"],
  },
];

export const LEADERSHIP = {
  organization: "Engineering Development Ambassadors (EDA)",
  role: "Outreach Chair, Treasurer",
  period: "May 2023 – Present",
  points: [
    "Mentored 200+ club members by leading engineering demos, activities, and discipline talks at K–12 schools.",
    "Managed a $30K/year budget, keeping financial operations smooth and compliant.",
  ],
};

export const EDUCATION = [
  {
    institution: "Louisiana State University",
    detail: "Roger Hadfield Ogden Honors College",
    degree: "B.S. Computer Science, Business Administration minor",
    period: "Aug 2023 – May 2027",
    description:
      "Coursework includes Data Structures, Algorithms, Operating Systems, Object Oriented Design, AI & LLMs, and Software Engineering. LSU President's Alumni Scholar, President's List, and President's Future Leaders in Research.",
  },
  {
    institution: "Lafayette High School",
    detail: "Lafayette, Louisiana",
    degree: "High School Diploma",
    period: "Aug 2019 – May 2023",
    description: "Graduated with a 4.0 GPA and a 33 ACT.",
  },
];
