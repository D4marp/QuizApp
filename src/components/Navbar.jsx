import { NavLink } from "react-router-dom";
import ProfileMenu from "./ProfileMenu";

export default function Navbar() {
  const currentUser = JSON.parse(
    localStorage.getItem("dot_quizz_current_user")
  );

  return (
    <nav className="w-full fixed top-0 left-0 z-30">
      <div className="max-w-6xl mx-auto px-4 sm:px-8">
        <ul className="mt-6 mb-4 py-4 px-6 rounded-full grid grid-cols-3 items-center gap-4 backdrop-blur-md bg-white/20 border-2 border-[#f4f4f4]/40 shadow-lg">
          {/* Brand */}
          <li className="text-3xl md:text-4xl font-extrabold tracking-tight text-left flex items-center gap-2">
            <NavLink
              to="/home"
              className={({ isActive }) =>
                `transition-colors duration-150 ${
                  isActive
                    ? "text-[#2460f4]"
                    : "text-[#192378] hover:text-[#2460f4]/90"
                }`
              }
              style={{ textShadow: "0 2px 8px rgba(25,35,120,0.08)" }}
            >
              DOT <span className="text-[#2460f4]">Quizz</span> App
            </NavLink>
          </li>
          {/* Center link */}
          <li className="text-2xl md:text-3xl text-center font-semibold">
            <NavLink
              to="/leaderboard"
              className={({ isActive }) =>
                `px-5 py-2 rounded-full transition-all duration-150 ${
                  isActive
                    ? "bg-gradient-to-r from-[#2460f4] to-[#192378] text-white shadow font-bold"
                    : "text-[#192378] hover:bg-[#2460f4]/10 hover:text-[#2460f4] font-semibold"
                }`
              }
            >
              Leaderboards
            </NavLink>
          </li>
          {/* User & Profile */}
          <li className="flex justify-end items-center gap-3 text-xl">
            {currentUser?.username && (
              <span className="font-semibold text-[#2460f4] bg-white/70 px-4 py-2 rounded-full shadow-sm mr-2">
                {currentUser.username}
              </span>
            )}
            <ProfileMenu />
          </li>
        </ul>
      </div>
    </nav>
  );
}