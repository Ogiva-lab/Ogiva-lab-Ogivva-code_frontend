import { useState } from "react";
import { motion } from "framer-motion";
import FacebookIcon from "./images/Facebook.svg";
import GoogleIcon from "./images/Google.svg";
import PhotoSlider from "../../components/Auth/PhotoSliderComp/PhotoSlider.tsx";
import GivvaIcon from "../images/GivvaLogo.svg";
import { useAuthStore } from "../../store/authStore.tsx";
import toast from "react-hot-toast";
import { useNavigate, Link } from "react-router-dom";
import { Eye, EyeOff, LoaderCircle } from "lucide-react";

const SignIn = () => {
  const navigate = useNavigate();
  const { login, isLoading, error } = useAuthStore();

  // Local state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  
  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await login(email, password);
      toast.success("Logged in successfully!");
      navigate("/dashboard");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      toast.error(err.message || "Login failed");
      console.error("Login error:", err);
    }
  };

  return (
    <main className="grid grid-cols-1 lg:grid lg:grid-cols-[40%_60%]">
      <div className="px-8 md:px-25 py-5 flex flex-col lg:px-4">
        <img
          src={GivvaIcon}
          alt="Givva Logo"
          className="mt-8 mb-5 w-27 mx-auto"
        />
        <h1 className="text-[22px] text-center font-semibold text-[#101010] mb-2 tracking-tight">
          Welcome back
        </h1>
        <p className="text-[#818080] text-sm mb-3 text-center font-medium">
          New to Ogivva?{" "}
          <Link
            to="/onboarding"
            className="text-[#31BB5E] hover:underline text-center font-semibold "
          >
            Create an account
          </Link>
        </p>

        {/* Form */}
        <form
          onSubmit={handleSignIn}
          className="flex flex-col gap-2 text-xs flex-grow justify-center px-5 text-[#101010]"
        >
          {/* Email */}
          <div className="flex flex-col text-xs">
            <label
              htmlFor="email"
              className="mb-1 text-sm font-medium text-[#344054]"
            >
              Email
            </label>
            <div className="flex items-center border border-[#D5D5D5] bg-[#F6F6F6] rounded-md px-3 py-3 focus-within:border-[#31BB5E] focus-within:ring-2 focus-within:ring-[#31BB5E40] focus-within:bg-white transition">
              <input
                type="email"
                id="email"
                placeholder="e.g example@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-transparent outline-none placeholder:text-[#818080] text-sm font-medium text-[#191D23]"
                required
              />
            </div>
          </div>

          {/* Password */}
          <div className="flex flex-col text-xs">
            <label
              htmlFor="password"
              className="mb-1 font-medium text-sm text-[#344054]"
            >
              Password
            </label>
            <div className="flex items-center border border-[#D5D5D5] bg-[#F6F6F6] rounded-md px-3 py-3 focus-within:border-[#31BB5E] focus-within:ring-2 focus-within:ring-[#31BB5E40] focus-within:bg-white transition">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                placeholder="*************"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-transparent outline-none placeholder:text-[#818080] text-sm font-medium text-[#191D23]"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-[#191D23] ml-1"
              >
                {showPassword ? (
                  <Eye className="w-4 h-4" />
                ) : (
                  <EyeOff className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>

          {/* Remember Me */}
          <div className="flex items-center justify-between mt-2 text-[#818080]">
            <label className="flex items-center gap-2 font-medium">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="accent-[#31BB5E]"
              />
              Remember Me
            </label>
            <Link
              to="/forgot-password"
              className="text-xs text-[#31BB5E] font-semibold"
            >
              Forgot your password?
            </Link>
          </div>

          {/* Submit */}
          <motion.button
            type="submit"
            className="mt-2 bg-[#31BB5E] text-white py-3 rounded-[12px] font-medium text-sm transition"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            disabled={isLoading}
          >
            {isLoading ? (
              <LoaderCircle className="animate-spin mx-auto" size={24} />
            ) : (
              "Sign In"
            )}
          </motion.button>

          {error && (
            <p className="text-red-500 text-xs font-semibold mt-[2px]">
              {error}
            </p>
          )}

          <div className="flex items-center gap-2 my-3">
            <hr className="flex-grow border-t border-gray-200" />
            <span className="text-xs text-gray-400">or</span>
            <hr className="flex-grow border-t border-gray-200" />
          </div>

          <a
            href="https://ogivva-codebackend-production.up.railway.app/v1/auth/google"
            className="w-full border border-[#F1F1F1] flex items-center justify-center gap-2 py-2 rounded-xl font-semibold text-sm hover:bg-gray-50"
          >
            <img src={GoogleIcon} alt="Google icon" className="w-4 h-4" />
            Continue with Google
          </a>

          <a
            href="https://ogivva-codebackend-production.up.railway.app/v1/auth/facebook"
            className="w-full border border-[#F1F1F1] flex items-center justify-center gap-2 py-2 rounded-xl font-semibold text-sm hover:bg-gray-50"
          >
            <img src={FacebookIcon} alt="Facebook icon" className="w-4 h-4" />
            Continue with Facebook
          </a>
        </form>
      </div>

      <div className="">
        <PhotoSlider />
      </div>
    </main>
  );
};

export default SignIn;
