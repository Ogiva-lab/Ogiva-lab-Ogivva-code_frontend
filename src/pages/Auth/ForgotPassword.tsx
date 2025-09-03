// src/pages/ForgotPassword.tsx
import GivvaIcon from "../images/GivvaLogo.svg";
import { motion } from "framer-motion";
import { LoaderCircle, Repeat } from "lucide-react";
import { useState } from "react";
import { useAuthStore } from "../../store/authStore";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [linkSent, setLinkSent] = useState(false);

  const { forgotPassword, resendOtp, error, isLoading } = useAuthStore();
  const navigate = useNavigate();

  // Handle first request
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await forgotPassword(email);
      toast.success("Reset code sent. Please check your email.");
      setLinkSent(true);

      // ✅ navigate immediately to verification step
      navigate("/verify-code");
    } catch {
      toast.error("Failed to send reset code.");
      setLinkSent(false);
    }
  };

  // Handle resending reset code
  const handleResend = async () => {
    try {
      await resendOtp("password_reset");
      toast.success("Reset code resent to your email.");
    } catch {
      toast.error("Failed to resend reset code.");
    }
  };

  return (
    <div className="flex flex-col bg-white justify-center">
      <header className="py-4 mt-0 flex justify-center md:justify-start">
        <img src={GivvaIcon} alt="Givva Logo" className="w-27 ml-6" />
      </header>

      <main className="md:w-[45%] md:mt-10 w-[80%] flex flex-col justify-center mx-auto mt-2">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-2xl font-semibold text-[#101010] mb-1">
            Forgot your password?
          </h1>
          <p className="text-[#818080] text-sm mb-5 font-medium">
            Enter your email address and we’ll send you a reset code.
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-2 text-xs flex-grow justify-center px-5 text-[#101010]"
        >
          {/* Email Field */}
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
                placeholder="e.g. example@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-transparent outline-none placeholder:text-[#818080] text-sm font-medium text-[#191D23]"
                required
                disabled={linkSent}
              />
            </div>
          </div>

          {/* Error */}
          {error && (
            <p className="text-red-500 text-xs font-semibold mt-[2px]">
              {error}
            </p>
          )}

          {/* Action buttons */}
          {!linkSent ? (
            <motion.button
              type="submit"
              className="mt-4 bg-[#31BB5E] text-white py-3 rounded-xl font-semibold text-sm transition"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              disabled={isLoading}
            >
              {isLoading ? (
                <LoaderCircle className="animate-spin w-4 h-4 mx-auto" />
              ) : (
                "Send Reset Code"
              )}
            </motion.button>
          ) : (
            <motion.button
              type="button"
              onClick={handleResend}
              className="mt-4 border border-[#19BD42] text-[#19BD42] py-2.5 rounded-xl font-medium text-sm transition flex items-center justify-center gap-1"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              disabled={isLoading}
            >
              {isLoading ? (
                <LoaderCircle className="animate-spin w-4 h-4" />
              ) : (
                <>
                  <Repeat className="w-4 h-4" />
                  Resend Code
                </>
              )}
            </motion.button>
          )}

          {/* Back to Login */}
          <motion.button
            type="button"
            onClick={() => navigate("/signin")}
            className="mt-2 bg-[#F1F1F1] text-[#31BB5E] py-3 rounded-xl font-semibold text-sm transition"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
          >
            Back to Login
          </motion.button>
        </form>
      </main>
    </div>
  );
}
