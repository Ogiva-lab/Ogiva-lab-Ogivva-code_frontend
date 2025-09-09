import { motion } from "framer-motion";
import HeroImg from "../../../assets/heroImg.jpg";

const Hero = () => {
  return (
    <div className="bg-[#E4FFED]">
      <main
        className="py-16 px-4 sm:py-20 sm:px-10 md:px-14"
        id="hero"
      >
        <div className="flex flex-col justify-center items-center text-center">
          {/* Heading */}
          <h1 className="text-3xl sm:text-5xl md:text-[76px] leading-tight md:leading-[90px] text-[#273B2D] font-bold mb-6 max-w-4xl">
            Turn Every Gift Into a Moment That Matters
          </h1>

          {/* Subheading */}
          <p className="text-base sm:text-lg md:text-2xl text-[#101010] font-medium max-w-2xl sm:max-w-3xl mb-10">
            Ogivva lets you send anonymous gifts and financial help directly to
            those who need it — through verified requests, trusted vendors, and
            zero spotlight.
          </p>

          {/* CTA button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-[#31BB5E] text-white px-6 py-3 sm:px-8 sm:py-4 rounded-xl font-semibold text-sm sm:text-base hover:bg-[#101010] transition"
          >
            <a href="/onboarding">Get started</a>
          </motion.button>
        </div>
      </main>

      {/* Hero image */}
      <section className="w-full">
        <img
          src={HeroImg}
          alt="Hero illustration"
          className="w-full object-cover rounded-t-2xl lg:hidden"
        />
      </section>
    </div>
  );
};

export default Hero;
