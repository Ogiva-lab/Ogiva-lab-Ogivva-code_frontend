import { motion } from "framer-motion";
import { Edit05 } from "@untitledui/icons";
import AboutImg from "../../../assets/AboutImg.jpg";

interface InfoItem {
  title: string;
  description: string;
}

interface InfoSectionProps {
  label: string;
  heading: string;
  description: string;
  items: InfoItem[];
  buttonLink: string;
  reverse?: boolean;
}

const InfoSection: React.FC<InfoSectionProps> = ({
  label,
  heading,
  description,
  items,
  buttonLink,
  reverse = false,
}) => {
  return (
    <section
      id="use-cases"
      className={`flex flex-col md:flex-row gap-12 mt-20 items-center ${
        reverse ? "md:flex-row-reverse" : ""
      }`}
    >
      {/* Text Side */}
      <div className="w-full md:w-1/2 flex flex-col text-[#101010]">
        <p className="text-[#818080] font-semibold mb-3 text-xs">{label}</p>
        <h3 className="font-bold text-2xl sm:text-3xl md:text-[35px] leading-snug md:leading-[50px] mb-5">
          {heading}
        </h3>
        <p className="text-[#818080] font-medium mb-7 text-sm sm:text-base leading-relaxed md:w-[89%]">
          {description}
        </p>

        {/* CTA button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-[#31BB5E] text-white px-6 py-3 sm:px-8 sm:py-4 rounded-xl font-semibold text-sm sm:text-base hover:bg-[#101010] transition w-fit"
        >
          <a href={buttonLink}>Get started</a>
        </motion.button>

        {/* Items */}
        <div className="flex flex-col mt-5">
          {items.map((item, index) => (
            <div
              key={index}
              className={`flex gap-5 ${
                index !== items.length - 1 ? "border-b" : ""
              } py-7`}
            >
              <Edit05 className="h-6 w-6 text-[#101010]" />
              <div className="flex flex-col">
                <h4 className="font-semibold text-base sm:text-lg">
                  {item.title}
                </h4>
                <p className="text-[#818080] font-medium sm:w-[80%] text-sm mt-2">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Image Side */}
      <div className="w-full md:w-1/2">
        <img
          src={AboutImg}
          alt="About Section Image"
          className="w-full h-auto md:h-[700px] object-cover rounded-3xl"
        />
      </div>
    </section>
  );
};

export default InfoSection;
