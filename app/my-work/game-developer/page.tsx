import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Image from "next/image";

interface GameInfo {
  thumbnail: string;
  dateCreated: string;
  plays: string;
  peakPlayers: string;
}

const games: GameInfo[] = [
  {
    thumbnail: "Brainrot 1v1v1 Reload.png",
    dateCreated: "October 2025",
    plays: "10K",
    peakPlayers: "500",
  },
  {
    thumbnail: "Choose Your Hero Box PVP.png",
    dateCreated: "Mar 2024",
    plays: "1.8M",
    peakPlayers: "8.9K",
  },
  {
    thumbnail: "Goofy Boxfight.jpeg",
    dateCreated: "Feb 2024",
    plays: "3.2M",
    peakPlayers: "15.1K",
  },
  {
    thumbnail: "Greasy One Shot.png",
    dateCreated: "Dec 2023",
    plays: "1.2M",
    peakPlayers: "6.5K",
  },
  {
    thumbnail: "HeroesTilted.png",
    dateCreated: "Apr 2024",
    plays: "950K",
    peakPlayers: "5.2K",
  },
  {
    thumbnail: "Medallion Free For All.png",
    dateCreated: "May 2024",
    plays: "1.5M",
    peakPlayers: "9.8K",
  },
  {
    thumbnail: "Ultimate Goofy BoxFights.png",
    dateCreated: "Jun 2024",
    plays: "4.1M",
    peakPlayers: "18.7K",
  },
];

export default function GameDeveloperPage() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-12">
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-2 animate-slide-in-left">Work Collection</p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-2 text-gray-900 dark:text-white animate-slide-in-right" style={{ animationDelay: '0.05s' }}>Game Developer</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Self Employed</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">Unreal engine 5</p>
        </div>

        {/* Thumbnails Panning Section */}
        <div className="relative w-full overflow-x-hidden overflow-y-visible pan-container py-8 px-4">
          <div className="flex w-max animate-pan gap-4">
            {/* First set of thumbnails */}
            {games.map((game, index) => (
              <div
                key={`first-${index}`}
                className="thumbnail-item flex-shrink-0 w-64 h-40 relative rounded-lg overflow-hidden border border-gray-300 dark:border-gray-800 group"
              >
                <Image
                  src={`/Thumnails/${game.thumbnail}`}
                  alt={game.thumbnail.replace(/\.(png|jpeg)$/i, "")}
                  fill
                  className="object-cover"
                  sizes="256px"
                />
                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-center items-center p-4">
                  <div className="text-white text-center space-y-2">
                    <div>
                      <p className="text-xs text-gray-400">Date Created</p>
                      <p className="text-sm font-semibold">{game.dateCreated}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400">Total Plays</p>
                      <p className="text-sm font-semibold">{game.plays}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400">Peak Players</p>
                      <p className="text-sm font-semibold">{game.peakPlayers}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            {/* Duplicate set for seamless looping */}
            {games.map((game, index) => (
              <div
                key={`second-${index}`}
                className="thumbnail-item flex-shrink-0 w-64 h-40 relative rounded-lg overflow-hidden border border-gray-300 dark:border-gray-800 group"
              >
                <Image
                  src={`/Thumnails/${game.thumbnail}`}
                  alt={game.thumbnail.replace(/\.(png|jpeg)$/i, "")}
                  fill
                  className="object-cover"
                  sizes="256px"
                />
                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-center items-center p-4">
                  <div className="text-white text-center space-y-2">
                    <div>
                      <p className="text-xs text-gray-400">Date Created</p>
                      <p className="text-sm font-semibold">{game.dateCreated}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400">Total Plays</p>
                      <p className="text-sm font-semibold">{game.plays}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400">Peak Players</p>
                      <p className="text-sm font-semibold">{game.peakPlayers}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Fortnite Maps Information */}
        <div className="mt-16 space-y-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-8">Fortnite Maps</h2>

          {/* Overview */}
          <section>
            <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Overview</h3>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              Yes I know half of them are brainrot, but you gotta play the game to win it. I've been making maps since June 2023 
              and have enjoyed every step of the way. My proudest achievement was helping develop the backend of another creator's 
              map: Goofy Boxfights which sits at 50+ million plays and 60,000 peak players.
            </p>
          </section>

          {/* Technologies Used */}
          <section>
            <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Technologies Used</h3>
            <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-400">
              <li>Unreal Engine 5</li>
              <li>Verse/C++</li>
              <li>Blender</li>
              <li>Mixamo Animations</li>
            </ul>
          </section>

          {/* Learning Outcomes */}
          <section>
            <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Learning Outcomes</h3>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
              Building CleverCards provided a meaningful exploration of native Android development, leading to a deeper 
              appreciation for native frameworks like Jetpack Compose compared to cross-platform solutions like Flutter.
            </p>
            <ul className="space-y-3 text-gray-600 dark:text-gray-400">
              <li>
                <span className="font-semibold text-gray-900 dark:text-white">The power of native development:</span>{" "}
                Greater control over UI elements and tighter integration with Android's ecosystem for a smoother user experience.
              </li>
              <li>
                <span className="font-semibold text-gray-900 dark:text-white">Balancing functionality with simplicity:</span>{" "}
                The challenge of developing an app with features like image generation (via DALL-E 3) while maintaining a clean, 
                intuitive UI without overcomplicating the design.
              </li>
              <li>
                <span className="font-semibold text-gray-900 dark:text-white">Problem-solving in real-world scenarios:</span>{" "}
                Integrating Firebase for authentication and database management prompted deeper thought about data consistency, 
                security, and user privacy.
              </li>
            </ul>
          </section>
        </div>
      </div>
      <Footer />
    </main>
  );
}

