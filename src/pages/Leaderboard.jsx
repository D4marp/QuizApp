import { FaTrophy } from "react-icons/fa";

const TROPHY_COLORS = [
  "text-yellow-400 drop-shadow-[0_2px_6px_rgba(234,179,8,0.3)]", // Gold
  "text-gray-400 drop-shadow-[0_2px_6px_rgba(156,163,175,0.3)]", // Silver
  "text-[#9c5c41] drop-shadow-[0_2px_6px_rgba(156,92,65,0.25)]", // Bronze
];

export default function Leaderboard() {
  const highscore = JSON.parse(
    localStorage.getItem("dot_quizz_user_highscore")
  ) || [];

  return (
    <div className="min-h-screen  flex-col items-center py-12">
      <h2 className="text-4xl md:text-5xl font-bold text-white tracking-wide mb-8 drop-shadow-lg flex items-center gap-2">
        <FaTrophy className="text-yellow-400" /> Leaderboard
      </h2>
      <ul className="w-full max-w-3xl space-y-5">
        {highscore.length === 0 && (
          <li className="bg-white/80 rounded-2xl text-center text-xl p-8 text-[#1c2470] shadow-md">
            No high scores yet. Be the first!
          </li>
        )}
        {highscore
          .sort((a, b) => b.highscore - a.highscore)
          .map((user, i) => (
            <li
              key={i}
              className={`flex items-center justify-between px-8 py-6 transition-all duration-150 rounded-2xl shadow-lg bg-white/90
                ${i === 0 ? "scale-[1.03] ring-2 ring-yellow-300/30" : ""}
                ${i < 3 && user.highscore !== 0 ? "border-l-8 border-[#2460f4]/80" : "border-l-4 border-gray-200"}
              `}
            >
              <span className="w-16 flex justify-center items-center">
                {i < 3 && user.highscore !== 0 ? (
                  <FaTrophy
                    className={`text-3xl ${TROPHY_COLORS[i]} animate-bounce`}
                  />
                ) : (
                  <span className="text-2xl font-bold text-gray-400">{`#${i + 1}`}</span>
                )}
              </span>
              <span className="flex-1 pl-4 font-semibold text-2xl md:text-3xl text-[#192378] truncate">
                {user.username}
              </span>
              <span className={`font-mono text-2xl md:text-3xl ${i < 3 ? "text-[#2460f4]" : "text-[#1c2470]"}`}>
                {user.highscore}
              </span>
            </li>
          ))}
      </ul>
    </div>
  );
}