import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate, useLocation, Link } from "react-router-dom";
import PasswordMeter from "../../components/Auth/PasswordStrengthMeter/PasswordMeter";
import { Eye, EyeOff, LoaderCircle } from "lucide-react";
import GivvaIcon from "../images/GivvaLogo.svg";
import FacebookIcon from "./images/Facebook.svg";
import GoogleIcon from "./images/Google.svg";
import { useAuthStore } from "../../store/authStore";

export default function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const { signup, error, isLoading, selectedRole, setRole } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();

  // Set role from previous step (onboarding)
  useEffect(() => {
    const stateRole = (location.state as { role?: string })?.role as
      | "gifter"
      | "receiver"
      | "vendor"
      | undefined;

    if (stateRole) {
      setRole(stateRole);
    }
  }, [location.state, setRole]);

  // Redirect if no role is selected
  useEffect(() => {
    if (!selectedRole) {
      navigate("/onboarding", { replace: true });
    }
  }, [selectedRole, navigate]);

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedRole) return;

    try {
      await signup(name, email, password, selectedRole);
      if (!useAuthStore.getState().error) {
        navigate("/verify-email");
      }
    } catch (err) {
      // Error already handled in store
      console.error(err);
    }
  };

  if (!selectedRole) {
    return null; // Don't render form until role is set
  }

  return (
    <div className="flex flex-col bg-white justify-center">
      <header className="py-4 mt-0 flex justify-center md:justify-start">
        <img src={GivvaIcon} alt="Givva Logo" className="w-27 ml-6" />
      </header>

      <main className="md:w-[45%] md:mt-10 w-[80%] flex flex-col justify-center mx-auto mt-2">
        <div className="text-center">
          <h1 className="text-2xl font-semibold text-[#101010] mb-1">
            Create an account with Ogivva
          </h1>
          <p className="text-[#818080] text-sm mb-5 font-medium">
            Already have an account?{" "}
            <Link
              to="/signin"
              className="text-[#31BB5E] hover:underline font-semibold"
            >
              Sign in
            </Link>
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSignUp}
          className="flex flex-col gap-2 text-xs flex-grow justify-center text-[#101010]"
        >
          {/* Name */}
          <div className="flex flex-col text-xs">
            <label htmlFor="name" className="mb-1 font-medium text-[#344054]">
              Name
            </label>
            <div className="flex items-center border border-[#D5D5D5] bg-[#F6F6F6] rounded-md px-3 py-3 focus-within:border-[#31BB5E] focus-within:ring-2 focus-within:ring-[#31BB5E40] focus-within:bg-white transition">
              <input
                type="text"
                id="name"
                placeholder="e.g Bon Jovi"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-transparent outline-none placeholder:text-[#818080] text-sm font-medium text-[#191D23]"
                required
              />
            </div>
          </div>

          {/* Email */}
          <div className="flex flex-col text-xs">
            <label htmlFor="email" className="mb-1 font-medium text-[#344054]">
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
              className="mb-1 font-medium text-[#344054]"
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
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <Eye className="w-4 h-4" />
                ) : (
                  <EyeOff className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>

          {/* Error / Password strength */}
          {error && (
            <p className="text-red-500 text-xs font-semibold mt-[2px]">
              {error}
            </p>
          )}
          {password.length > 0 && <PasswordMeter password={password} />}

          {/* Terms */}
          <div className="flex items-start gap-2 text-xs mt-1.5">
            <input
              type="checkbox"
              id="terms"
              className="mt-0.5 accent-green-500 rounded-sm"
              required
            />
            <label
              htmlFor="terms"
              className="text-[#818080] leading-snug font-medium"
            >
              I agree to the{" "}
              <Link to="/terms" className="text-[#31BB5E] hover:underline">
                Terms & Conditions
              </Link>{" "}
              and{" "}
              <Link to="/privacy" className="text-[#31BB5E] hover:underline">
                Privacy Policy
              </Link>
              .
            </label>
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
              "Create an Account"
            )}
          </motion.button>
        </form>

        {/* Social buttons */}
        <AnimatePresence>
          <motion.div
            key="social-buttons"
            className="flex flex-col gap-2 mt-2 mb-7 text-[#101010] font-semibold"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-center gap-2 my-3">
              <hr className="flex-grow border-t border-gray-200" />
              <span className="text-xs text-gray-400">or</span>
              <hr className="flex-grow border-t border-gray-200" />
            </div>
            <a
              href={`https://ogivva-codebackend-production.up.railway.app/v1/auth/google?role=${selectedRole}`}
              className={`w-full border border-[#F1F1F1] flex items-center justify-center gap-2 py-2 rounded-[12px] text-sm hover:bg-gray-50 ${
                !selectedRole ? "pointer-events-none opacity-50" : ""
              }`}
            >
              <img src={GoogleIcon} alt="Google icon" className="w-5 h-5" />
              Sign up with Google
            </a>
            <a
              href={`https://ogivva-codebackend-production.up.railway.app/v1/auth/facebook?role=${selectedRole}`}
              className={`w-full border border-[#F1F1F1] flex items-center justify-center gap-2 py-2 rounded-[12px] text-sm hover:bg-gray-50 ${
                !selectedRole ? "pointer-events-none opacity-50" : ""
              }`}
            >
              <img src={FacebookIcon} alt="Facebook icon" className="w-5 h-5" />
              Sign up with Facebook
            </a>
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}
