import { Link } from "react-router-dom";
import { FaFacebook, FaLinkedin, FaGithub, FaTwitter, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-300 py-6">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Footer Heading */}
          <div>
            <h2 className="text-lg font-semibold text-gray-800">Voyago</h2>
          </div>

          {/* Navigation Links */}
          <div>
            <h3 className="text-md font-semibold text-gray-700">Company</h3>
            <ul className="mt-2 space-y-1 text-gray-600">
              <li><Link to="/about" className="hover:underline">About</Link></li>
              <li><Link to="/contact" className="hover:underline">Contact</Link></li>
              <li><Link to="/blog" className="hover:underline">Blog</Link></li>
              <li><Link to="/careers" className="hover:underline">Careers</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-md font-semibold text-gray-700">Resources</h3>
            <ul className="mt-2 space-y-1 text-gray-600">
              <li><Link to="/faq" className="hover:underline">FAQ</Link></li>
              <li><Link to="/support" className="hover:underline">Support</Link></li>
              <li><Link to="/guides" className="hover:underline">Guides</Link></li>
              <li><Link to="/terms" className="hover:underline">Terms & Conditions</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-md font-semibold text-gray-700">Explore</h3>
            <ul className="mt-2 space-y-1 text-gray-600">
              <li><Link to="/destinations" className="hover:underline">Destinations</Link></li>
              <li><Link to="/reviews" className="hover:underline">Reviews</Link></li>
              <li><Link to="/travel-tips" className="hover:underline">Travel Tips</Link></li>
              <li><Link to="/privacy" className="hover:underline">Privacy Policy</Link></li>
            </ul>
          </div>
        </div>

        {/* Social Links */}
        <div className="flex justify-start mt-6 space-x-4">
          <a href="https://github.com/shivamyadav79" target="_blank" rel="noopener noreferrer">
            <FaGithub className="text-gray-600 hover:text-black text-xl" />
          </a>
          <a href="https://www.linkedin.com/in/shivam-yadav-601634313" target="_blank" rel="noopener noreferrer">
            <FaLinkedin className="text-gray-600 hover:text-blue-600 text-xl" />
          </a>
          <a href="https://x.com/shivamy63738994?t=oW-srdNnJk2j5VqxZBJmoQ&s=09" target="_blank" rel="noopener noreferrer">
            <FaTwitter className="text-gray-600 hover:text-blue-400 text-xl" />
          </a>
          <a href="https://www.instagram.com/shivamy63738994" target="_blank" rel="noopener noreferrer">
            <FaInstagram className="text-gray-600 hover:text-pink-600 text-xl" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
