import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import PasswordMeter from "../../components/Auth/PasswordStrengthMeter/PasswordMeter.tsx";
import { Eye, EyeOff, LoaderCircle } from "lucide-react";
import GivvaIcon from "../images/GivvaLogo.svg";
import { useAuthStore } from "../../store/authStore.tsx";
import toast from "react-hot-toast";

export default function ResetPassword() {
  const [showPassword, setShowPassword] = useState(false);
  const [showSecondPassword, setShowSecondPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [localError, setLocalError] = useState("");

  const { isLoading, resetPassword, error } = useAuthStore();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError("");

    if (password !== confirmPassword) {
      setLocalError("Passwords do not match.");
      return;
    }

    try {
      const message = await resetPassword(password);
      toast.success(message);
      navigate("/reset-password-successful");
    } catch (err) {
      toast.error((err as Error).message);
    }
  };

  return (
    <div className="flex flex-col bg-white justify-center">
      <header className="py-4 mt-0 flex justify-center md:justify-start">
        <img src={GivvaIcon} alt="Givva Logo" className="w-27 ml-6" />
      </header>

      <main className="md:w-[45%] md:mt-10 w-[80%] flex flex-col justify-center mx-auto mt-2">
        <div className="text-center">
          <h1 className="text-2xl font-semibold text-[#101010] mb-1">
            Create new password
          </h1>
          <p className="text-[#818080] text-sm mb-5 font-medium">
            No worries - it happens to the best of us.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-2 text-xs flex-grow justify-center text-[#101010]"
        >
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
          {localError && (
            <p className="text-red-500 text-xs font-semibold mt-[2px]">
              {localError}
            </p>
          )}
          {password.length > 0 && <PasswordMeter password={password} />}

          {/* Confirm Password */}
          <div className="flex flex-col text-xs mt-3 ">
            <label
              htmlFor="confirmPassword"
              className="mb-1 font-medium text-[#344054]"
            >
              Confirm Password
            </label>
            <div className="flex items-center border border-[#D5D5D5] bg-[#F6F6F6] rounded-md px-3 py-3 focus-within:border-[#31BB5E] focus-within:ring-2 focus-within:ring-[#31BB5E40] focus-within:bg-white transition">
              <input
                type={showSecondPassword ? "text" : "password"}
                id="confirmPassword"
                placeholder="*************"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full bg-transparent outline-none placeholder:text-[#818080] text-sm font-medium text-[#191D23]"
                required
              />
              <button
                type="button"
                onClick={() => setShowSecondPassword(!showSecondPassword)}
                className="text-[#191D23] ml-1"
              >
                {showSecondPassword ? (
                  <Eye className="w-4 h-4" />
                ) : (
                  <EyeOff className="w-4 h-4" />
                )}
              </button>
            </div>
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
              "Reset Password"
            )}
          </motion.button>
        </form>
      </main>
    </div>
  );
}
