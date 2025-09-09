import { motion } from "framer-motion";
import { useState } from "react";

const Waitlist = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Waitlist email submitted:", email);
    setEmail("");
  };

  return (
    <section className="bg-black text-center py-16 px-4 sm:px-6 md:px-10" id="waitlist">
      <h2 className="text-white text-2xl sm:text-3xl md:text-4xl font-bold mb-4 max-w-2xl mx-auto leading-snug">
        Join the Waitlist — Be the First to Spread Kindness
      </h2>
      <p className="text-gray-300 text-sm sm:text-base mb-8 max-w-xl mx-auto">
        Sign up now to get early access when Ogivva launches in your city.
      </p>

      {/* Email Form */}
      <form
        onSubmit={handleSubmit}
        className="relative w-full max-w-md mx-auto"
      >
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full px-4 pr-32 py-3 rounded-lg text-white bg-transparent border border-gray-500 placeholder-gray-400 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-[#31BB5E]"
        />

        {/* Motion button inside input */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="submit"
          className="absolute right-1 top-1 bottom-1 px-4 sm:px-6 rounded-lg bg-white text-black font-semibold text-sm sm:text-base transition mr-0.5"
        >
          Join the waitlist
        </motion.button>
      </form>
    </section>
  );
};

export default Waitlist;
