import { motion } from "framer-motion";

const WhyChooseOgivva = () => {
  const features = [
    {
      title: "Receiver Creates a “Moment”",
      description:
        "Curates wishlists of the things they truly want, share moment with friends, family, or keep it public for anyone to surprise them.",
      color: "bg-[#226430]",
    },
    {
      title: "Gifter Chooses & Sends",
      description:
        "Discover moments shared publicly or receive them directly from loved ones. Pick gifts from trusted vendors and decide if you want to reveal yourself or stay anonymous.",
      color: "bg-[#7C2426]",
    },
    {
      title: "Vendor Delivers the Experience",
      description:
        "List your products or services on Ogivva. Every gift purchased supports local and small businesses while delivering joy to the receiver.",
      color: "bg-[#3E217C]",
    },
  ];

  return (
    <section className="py-16 px-4 sm:px-8 md:px-14 bg-white text-center">
      {/* Heading */}
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#101010]">
        Why Choose Ogivva?
      </h2>
      <p className="mt-4 text-[#818080] text-sm sm:text-base max-w-2xl mx-auto leading-relaxed font-medium">
        Behind every gift is a story — a shared smile, a moment of connection,
        a memory that lingers. But finding that perfect gift isn’t always easy.
      </p>

      {/* Cards */}
      <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.05 }}
            className="flex flex-col items-start text-start"
          >
            <div
              className={`w-full h-32 sm:h-36 md:h-40 rounded-xl ${feature.color} mb-6`}
            ></div>
            <h3 className="font-semibold text-lg sm:text-xl text-[#101010]">
              {feature.title}
            </h3>
            <p className="text-[#818080] text-sm sm:text-base mt-2 leading-relaxed font-medium">
              {feature.description}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default WhyChooseOgivva;
