import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../../components/ui/accordion";
import InfoSection from "./InfoSec";
import AboutImg from "../../../assets/AboutImg.jpg";
import { motion } from "framer-motion";

const About = () => {
  return (
    <div>
      <main className="py-16 px-6 sm:px-10 md:px-14 bg-white" id="about">
        {/* How It Works */}
        <section className="flex flex-col items-center">
          {/* Heading */}
          <h2 className="text-center text-[#101010] text-3xl sm:text-3xl md:text-[40px] font-bold">
            How Ogivva Works
          </h2>

          {/* Content */}
          <div className="mt-10 flex flex-col md:flex-row gap-10 md:gap-16 items-center w-full">
            {/* Left side (image placeholder) */}
            <div className="pt-6 sm:pt-8 pl-6 sm:pl-8 bg-gradient-to-br from-[#2A5137] to-[#31BB5E] rounded-2xl h-[220px] sm:h-[300px] md:h-[450px] w-full md:w-3/5">
              <div className="w-full bg-white h-full rounded-tl-xl shadow-lg"></div>
            </div>

            {/* Right side (accordion) */}
            <Accordion
              type="single"
              collapsible
              className="w-full md:w-2/5"
              defaultValue="item-1"
            >
              <AccordionItem value="item-1">
                <AccordionTrigger className="text-lg font-semibold">
                  Receiver Creates a “Moment”
                </AccordionTrigger>
                <AccordionContent className="flex flex-col gap-4 text-sm sm:text-base leading-relaxed font-medium text-[#818080]">
                  <p>
                    Curates wishlists of the things they truly want, share
                    moment with friends, family, or keep it public for anyone to
                    surprise them.
                  </p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2">
                <AccordionTrigger className="text-lg font-semibold">
                  Gifter Chooses & Sends
                </AccordionTrigger>
                <AccordionContent className="flex flex-col gap-4 text-sm sm:text-base leading-relaxed font-medium text-[#818080]">
                  <p>
                    Gifters can browse verified requests from receivers —
                    ranging from essentials like groceries, medical bills, or
                    tuition fees, to thoughtful items such as vouchers,
                    experiences, or celebration gifts. Each request is vetted to
                    ensure authenticity, so the gifter’s support truly meets a
                    real need.
                  </p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3">
                <AccordionTrigger className="text-lg font-semibold">
                  Vendor Delivers the Experience
                </AccordionTrigger>
                <AccordionContent className="flex flex-col gap-4 text-sm sm:text-base leading-relaxed font-medium text-[#818080]">
                  <p>
                    Vendors ensure that the giving process is seamless by
                    maintaining quality, transparency, and reliability. Their
                    role closes the loop — transforming a gifter’s act of
                    kindness into a meaningful moment that the receiver can
                    immediately benefit from and enjoy.
                  </p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </section>

        {/* Info Sections */}
        <InfoSection
          label="For Receivers"
          heading="Craft Your Perfect Moment"
          description="Gifting should be fun, not complicated. Ogivva lets you browse Moments, select from vendor offerings, and send gifts that light up lives—all in a few clicks."
          buttonLink="/onboarding"
          items={[
            {
              title: "Build Your Wishlist",
              description:
                "Add gifts from our partnered vendors, from spa days to custom jewelry.",
            },
            {
              title: "Share with Ease",
              description:
                "Make your Moment public for anyone to discover, or privately share with family and friends via link.",
            },
            {
              title: "Receive with Surprise",
              description:
                "Gifts arrive from anonymous admirers or known loved ones—unwrap the magic without the guesswork.",
            },
          ]}
        />

        <InfoSection
          label="For Gifters"
          heading="Send Joy, Stay Mysterious"
          description="Gifting should be fun, not complicated. Ogivva lets you browse Moments, select from vendor offerings, and send gifts that light up lives—all in a few clicks."
          buttonLink="/onboarding"
          reverse
          items={[
            {
              title: "Browse and Choose",
              description:
                "Explore public Moments or receive shared links from receivers.",
            },
            {
              title: "Go Anonymous",
              description:
                "Keep your identity hidden for that extra thrill, or reveal yourself for heartfelt connections.",
            },
            {
              title: "Secure and Simple",
              description:
                "Partnered vendors handle fulfillment, ensuring your gift arrives perfectly.",
            },
          ]}
        />
      </main>

      {/* For Vendor */}
      <section className="bg-black">
        <div className="flex flex-col md:flex-row">
          {/* Text */}
          <div className="w-full md:w-1/2 flex flex-col text-white p-8 sm:p-12 md:p-16 justify-center">
            <p className="text-[#F0F0F0] font-semibold mb-3 text-xs">
              For Vendors
            </p>
            <h3 className="font-bold text-2xl sm:text-[30px] md:text-[35px] leading-tight mb-5 text-white">
              More Sales Zero Marketing
            </h3>
            <p className="text-[#F0F0F0] font-medium mb-7 text-sm sm:text-base leading-relaxed w-full md:w-[89%]">
              Turn your services into sought-after gifts. Ogivva empowers
              vendors to reach eager gifters and receivers looking for unique
              offerings.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-fit bg-[#31BB5E] text-white px-6 py-3 sm:px-8 sm:py-4 rounded-xl font-semibold text-sm sm:text-base transition"
            >
              <a href="/onboarding">Get started</a>
            </motion.button>
          </div>

          {/* Image */}
          <img
            src={AboutImg}
            alt="About Image"
            className="w-full md:w-1/2 h-[250px] sm:h-[350px] md:h-auto object-cover"
          />
        </div>
      </section>
    </div>
  );
};

export default About;
