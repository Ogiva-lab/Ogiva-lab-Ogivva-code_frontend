import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Confetti from "react-confetti";
import GivvaIcon from "../images/GivvaLogo.svg";
import confettiIcon from "../images/confetti 1.svg";
import { useWindowSize } from "@react-hook/window-size";

export default function PasswordResetSuccess() {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(15);

  // Use window size for confetti
  const [width, height] = useWindowSize();

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          navigate("/signin");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [navigate]);

  return (
    <div className="flex flex-col bg-white min-h-screen justify-start">
      {/* Confetti */}
      <Confetti
        width={width}
        height={height}
        numberOfPieces={400}
        recycle={countdown > 0}
      />

      {/* Header Logo */}
      <header className="py-4 mt-0 flex justify-center md:justify-start">
        <img src={GivvaIcon} alt="Givva Logo" className="w-28 ml-6" />
      </header>

      <main className="md:w-[30%] w-[70%] mx-auto mt-8 flex flex-col items-center">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="flex flex-col justify-center items-center my-auto"
        >
          <img src={confettiIcon} alt="confetti image" />
          <h1 className="text-2xl font-semibold text-[#191D23] mb-4 text-center leading-[38px] mt-6">
            Password Changed
          </h1>
          <p className="text-[#818080] text-sm w-82 text-center mb-10 font-semibold">
            Your password has been changed successfully, you will be redirected
            to the sign in page in {" "}
            <span>{`00:${countdown.toString().padStart(2, "0")}`}</span>
          </p>

          <button
            type="button"
            onClick={() => navigate("/signin")}
            className="w-full mt-2 bg-[#31BB5E] hover:bg-[#169838] text-white py-3 px-4 rounded-md font-semibold text-sm transition"
          >
            Back to login
          </button>
        </motion.div>
      </main>
    </div>
  );
}