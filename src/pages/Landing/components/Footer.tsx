import Logo from "../../../assets/GivvaLogo.svg"; // adjust path

const Footer = () => {
  return (
    <footer className="bg-black text-gray-300 pt-16 pb-12 px-6 sm:px-10 md:px-16">
      <div className="max-w-6xl mx-auto flex flex-col items-center justify-center sm:flex-row sm:items-start sm:justify-between gap-10 text-center sm:text-left">
        {/* Logo + short text */}
        <div className="flex flex-col items-center sm:items-start max-w-xs">
          <img src={Logo} alt="Ogivva Logo" className="h-8 mb-4" />
          <p className="text-sm leading-relaxed text-center sm:text-start">
            Sign up now to get early access when Ogivva launches in your city.
          </p>
        </div>

        {/* Products */}
        <div>
          <h4 className="text-white font-semibold mb-3 text-center sm:text-start">
            Products
          </h4>
          <ul className="space-y-2 text-sm text-center sm:text-start">
            <li>
              <a href="#how" className="hover:text-white">
                How it works
              </a>
            </li>
            <li>
              <a href="#features" className="hover:text-white">
                Features
              </a>
            </li>
          </ul>
        </div>

        {/* Supports */}
        <div>
          <h4 className="text-white font-semibold mb-3 text-center sm:text-start">
            Supports
          </h4>
          <ul className="space-y-2 text-sm text-center sm:text-start">
            <li>
              <a href="https://blog.ogivva.com" className="hover:text-white">
                Blogs
              </a>
            </li>
            <li>
              <a href="https://linkedin.com" className="hover:text-white">
                LinkedIn
              </a>
            </li>
            <li>
              <a href="https://instagram.com" className="hover:text-white">
                Instagram
              </a>
            </li>
            <li>
              <a href="https://youtube.com" className="hover:text-white">
                YouTube
              </a>
            </li>
          </ul>
        </div>

        {/* Legal */}
        <div>
          <h4 className="text-white font-semibold mb-3 text-center sm:text-start">
            Legal
          </h4>
          <ul className="space-y-2 text-sm text-center sm:text-start">
            <li>
              <a href="/terms" className="hover:text-white">
                Terms of service
              </a>
            </li>
            <li>
              <a href="/privacy" className="hover:text-white">
                Privacy policy
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom small text */}
      <div className="mt-10 text-center text-xs text-gray-500">
        © {new Date().getFullYear()} Ogivva. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
