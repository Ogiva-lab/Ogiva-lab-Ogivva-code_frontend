import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import Logo from "../../../assets/GivvaLogo.svg";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  // Handle scroll direction
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 80) {
        // scrolling down → hide
        setHidden(true);
      } else {
        // scrolling up → show
        setHidden(false);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <header
      className={`sticky top-0 z-50 transition-transform duration-300 ${
        hidden ? "-translate-y-full" : "translate-y-0"
      }`}
    >
      <div className="py-3 px-14 bg-[#E4FFED] relative">
        <nav className="py-4 flex items-center justify-between">
          {/* Logo */}
          <a href="#home" className="flex items-center">
            <img src={Logo} alt="Givva Logo" className="w-27" />
          </a>

          {/* Desktop nav */}
          <ul className="hidden md:flex gap-8 font-medium text-base text-[#101010] flex-1 justify-center">
            <li>
              <a href="#about" className="hover:underline">
                About Ogivva
              </a>
            </li>
            <li>
              <a href="#use-cases" className="hover:underline">
                Use Cases
              </a>
            </li>
            <li>
              <a href="#pricing" className="hover:underline">
                Pricing
              </a>
            </li>
          </ul>

          {/* Desktop button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="hidden md:block bg-[#101010] text-white px-4 py-3 rounded-xl font-semibold text-base transition"
          >
            <a href="#waitlist">Join the waitlist</a>
          </motion.button>

          {/* Mobile menu button */}
          <button
            className="md:hidden text-[#101010]"
            onClick={() => setMenuOpen((prev) => !prev)}
          >
            {menuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </nav>

        {/* Mobile dropdown menu */}
        {menuOpen && (
          <div className="absolute top-full left-0 w-full bg-[#E4FFED] shadow-md md:hidden">
            <ul className="flex flex-col items-center gap-4 py-4 font-medium text-base text-[#101010]">
              <li>
                <a
                  href="#about"
                  className="hover:underline"
                  onClick={() => setMenuOpen(false)}
                >
                  About Ogivva
                </a>
              </li>
              <li>
                <a
                  href="#use-cases"
                  className="hover:underline"
                  onClick={() => setMenuOpen(false)}
                >
                  Use Cases
                </a>
              </li>
              <li>
                <a
                  href="#pricing"
                  className="hover:underline"
                  onClick={() => setMenuOpen(false)}
                >
                  Pricing
                </a>
              </li>
              <li>
                <a
                  href="#wishlist"
                  className="bg-[#101010] text-white px-4 py-2 rounded-xl font-semibold hover:bg-[#28a745] transition"
                  onClick={() => setMenuOpen(false)}
                >
                  Join the waitlist
                </a>
              </li>
            </ul>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
