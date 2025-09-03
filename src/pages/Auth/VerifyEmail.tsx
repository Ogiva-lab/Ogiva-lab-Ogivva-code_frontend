import { useRef, useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { LoaderCircle } from "lucide-react";
import toast from "react-hot-toast";
import { useAuthStore } from "../../store/authStore.tsx";
import GivvaIcon from "../images/GivvaLogo.svg";

export default function VerifyEmail() {
  const [code, setCode] = useState<string[]>(Array(6).fill(""));
  const [resendCooldown, setResendCooldown] = useState<number>(60);
  const [isCooldownActive, setIsCooldownActive] = useState<boolean>(true);

  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);
  const navigate = useNavigate();

  const { pendingEmail, error, isLoading, verifyEmail, resendOtp } =
    useAuthStore();

  useEffect(() => {
    if (!pendingEmail) navigate("/signup");
  }, [pendingEmail, navigate]);

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    if (isCooldownActive && resendCooldown > 0) {
      timer = setTimeout(() => setResendCooldown((prev) => prev - 1), 1000);
    } else if (resendCooldown <= 0) {
      setIsCooldownActive(false);
    }
    return () => clearTimeout(timer);
  }, [resendCooldown, isCooldownActive]);

  const handleChange = (index: number, value: string) => {
    if (!/^\d?$/.test(value)) return;
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);
    if (value && index < 5) inputRefs.current[index + 1]?.focus();
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Backspace" && !code[index] && index > 0)
      inputRefs.current[index - 1]?.focus();
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").trim().slice(0, 6);
    if (!/^\d+$/.test(pasted)) return;
    const newCode = Array(6)
      .fill("")
      .map((_, i) => pasted[i] || "");
    setCode(newCode);
    inputRefs.current[Math.min(pasted.length, 5)]?.focus();
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const verificationCode = code.join("");
    try {
      await verifyEmail(verificationCode);
      toast.success("Email verified!");
      navigate("/email-verified");
    } catch {
      toast.error("Verification failed. Try again.");
    }
  };

  const handleResend = async () => {
    try {
      await resendOtp("email_verification");
      toast.success("Verification code resent!");
      setResendCooldown(60);
      setIsCooldownActive(true);
    } catch {
      toast.error("Failed to resend code");
    }
  };

  return (
    <div className="flex flex-col bg-white min-h-screen justify-start">
      {/* Header Logo */}
      <header className="py-4 mt-0 flex justify-center md:justify-start">
        <img src={GivvaIcon} alt="Givva Logo" className="w-28 ml-6" />
      </header>

      {/* Main Content */}
      <main className="md:w-[45%] w-[80%] mx-auto mt-8 flex flex-col items-center">
        {/* Heading */}
        <div className="text-center">
          <h1 className="text-2xl font-semibold text-[#101010] mb-2">
            Verify email address
          </h1>
          <p className="text-[#818080] text-sm mb-2 font-medium">
            We’ve sent a 6-digit verification code to{" "}
            <strong className="text-[#101010]">
              {pendingEmail}
            </strong>
          </p>
          <p className="text-[#818080] text-sm font-medium">
            Not your email?{" "}
            <Link
              to="/signup"
              className="text-[#31BB5E] hover:underline font-medium"
            >
              Change email address
            </Link>
          </p>
        </div>

        {/* Code Input Form */}
        <form
          onSubmit={handleSubmit}
          className="w-[76%] mt-8 flex flex-col items-center gap-6"
        >
          <div className="flex justify-center gap-4 w-full">
            {code.map((digit, index) => (
              <input
                key={index}
                ref={(el) => {
                  inputRefs.current[index] = el;
                }}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                onPaste={handlePaste}
                className="min-w-12 aspect-square text-2xl text-center border border-[#D5D5D5] text-[#818080] rounded-[5px] focus:outline-none focus:ring-2 focus:ring-[#31BB5E] font-semibold"
              />
            ))}
          </div>

          {/* Error message */}
          {error && <p className="text-red-500 text-sm">{error}</p>}

          {/* Submit Button */}
          <motion.button
            type="submit"
            className={`w-full py-3 rounded-xl text-sm transition disabled:opacity-70 mt-2 text-[#818080] font-semibold ${
              code.every((digit) => digit !== "")
                ? "bg-[#31BB5E] text-white"
                : "bg-[#F2F2F2] text-[#101010]"
            }
            `}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            disabled={isLoading || !code.every((digit) => digit !== "")}
          >
            {isLoading ? (
              <LoaderCircle className="animate-spin w-5 h-5 mx-auto" />
            ) : (
              "Verify Code"
            )}
          </motion.button>
        </form>

        {/* Resend + Cooldown */}
        <div className="text-center mt-6">
          <p className="text-xs text-[#ACACAC] font-medium">
            You can resend a new code in{" "}
            <span className="font-semibold">
              {resendCooldown > 0
                ? `00:${resendCooldown.toString().padStart(2, "0")}`
                : "00:00"}
            </span>
          </p>

          <p className="text-sm font-medium text-[#101010] mt-2">
            Didn’t get a code?{" "}
            <button
              type="button"
              className={`font-semibold ${
                isCooldownActive
                  ? "text-gray-400 cursor-not-allowed"
                  : "text-[#31BB5E]"
              }`}
              onClick={handleResend}
              disabled={isCooldownActive}
            >
              Resend Code
            </button>
          </p>
        </div>
      </main>
    </div>
  );
}
