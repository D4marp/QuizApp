import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import useLocalStorage from "../hooks/useLocalStorage";
import { useEffect } from "react";
import { verifyPassword } from "../utils/helper";
import { HiOutlineMail, HiOutlineLockClosed } from "react-icons/hi";
import logo from "../assets/Logo.png";

export default function Login() {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();

  // Use localStorage safely with fallback
  const users = JSON.parse(localStorage.getItem("dot_quizz_user")) || [];

  const { data: currentUser, setData: setCurrentUser } = useLocalStorage(
    { username: null, email: null },
    "dot_quizz_current_user"
  );

  useEffect(() => {
    if (currentUser.username && currentUser.email) {
      navigate("/home");
    }
  }, [currentUser, navigate]);

  async function onSubmit(data) {
    try {
      const user = users.find((user) => user.email === data.email);
      if (!user) {
        toast.error("Email is not registered", {
          style: { backgroundColor: "#fa5252", color: "#fff5f5" },
        });
        return;
      }
      const isMatch = await verifyPassword(data.password, user.password);

      if (!isMatch) {
        toast.error("Incorrect password", {
          style: { backgroundColor: "#fa5252", color: "#fff5f5" },
        });
      } else {
        setCurrentUser({ username: user?.username, email: user?.email });
        setTimeout(() => navigate("/home"), 1000);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#192378] via-[#2460f4] to-[#71b7fb] flex items-center justify-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-md bg-white/90 shadow-2xl rounded-2xl p-10 flex flex-col gap-8 backdrop-blur-lg"
        style={{ boxShadow: "0 8px 40px 0 rgba(31, 100, 255, 0.16)" }}
      >
        <div className="flex flex-col items-center gap-2 mb-2">
          {/* Use imported logo asset for consistency */}
          <img
            src={logo}
            alt="Logo"
            className="w-26 h-20 "
          />
          <h2 className="text-3xl font-bold text-[#192378] tracking-tight mb-1">
            Welcome back!
          </h2>
          <p className="text-gray-500 text-sm">Sign in to your account</p>
        </div>
        <div className="flex flex-col gap-4">
          <div className="relative">
            <HiOutlineMail className="absolute left-4 top-1/2 -translate-y-1/2 text-xl text-[#2460f4]" />
            <input
              type="text"
              className="pl-12 pr-4 py-3 w-full border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#2460f4] text-lg text-[#192378] bg-white placeholder:text-gray-400 transition"
              placeholder="Email"
              autoComplete="email"
              {...register("email")}
            />
          </div>
          <div className="relative">
            <HiOutlineLockClosed className="absolute left-4 top-1/2 -translate-y-1/2 text-xl text-[#2460f4]" />
            <input
              type="password"
              className="pl-12 pr-4 py-3 w-full border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#2460f4] text-lg text-[#192378] bg-white placeholder:text-gray-400 transition"
              placeholder="Password"
              autoComplete="current-password"
              {...register("password")}
            />
          </div>
        </div>

        <button
          className="w-full bg-gradient-to-r from-[#2460f4] to-[#192378] text-white text-lg font-semibold py-3 rounded-xl shadow-lg hover:scale-[1.03] hover:shadow-xl transition-all duration-150"
          type="submit"
        >
          Login
        </button>
        <div className="flex justify-center items-center">
          <span className="text-gray-500 text-sm mr-2">
            Don&apos;t have an account?
          </span>
          <Link
            to={"/signup"}
            className="text-[#2460f4] font-semibold hover:underline"
          >
            Register
          </Link>
        </div>
      </form>
    </div>
  );
}