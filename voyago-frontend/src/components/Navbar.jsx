import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Search } from "lucide-react";
import axios from "axios";

const Navbar = () => {
  const [scrolling, setScrolling] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [prevScrollY, setPrevScrollY] = useState(0);
  const [navbarVisible, setNavbarVisible] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setNavbarVisible(currentScrollY <= prevScrollY);
      setPrevScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [prevScrollY]);

  useEffect(() => {
    if (query.length > 1) {
      axios
        .get(`http://localhost:5002/api/search?query=${query}`)
        .then((res) => setResults(Array.isArray(res.data) ? res.data : []))
        .catch(() => setResults([]));
    } else {
      setResults([]);
    }
  }, [query]);

  const navBackground = navbarVisible ? "bg-transparent" : "bg-white shadow-md";
  const navTextColor = navbarVisible ? "text-black" : "text-black";

  return (
    <>
      {/* Navbar */}
      <nav
        className={`fixed top-0 w-full z-50 transition-all ${navBackground} ${
          navbarVisible ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center p-4">
          <Link to="/" className={`text-xl font-bold ${navTextColor}`}>
            Voyago
          </Link>

          {/* Desktop Links */}
          <div className={`hidden md:flex space-x-6 ${navTextColor}`}>
            <Link to="/" className={`hover:${navTextColor}`}>Home</Link>
            <Link to="/cities" className={`hover:${navTextColor}`}>Cities</Link>
            <Link to="/places" className={`hover:${navTextColor}`}>Places</Link>
            <Link to="/about" className={`hover:${navTextColor}`}>About</Link>
            <Link to="/contact" className={`hover:${navTextColor}`}>Contact</Link>
            {/* Login and Register Links */}
            <Link to="/login" className="hover:underline">Login</Link>
            <Link to="/register" className="hover:underline">Register</Link>
          </div>

          {/* Mobile Menu & Search */}
          <div className={`flex items-center space-x-4 ${navTextColor}`}>
            <Search
              className="w-6 h-6 cursor-pointer"
              onClick={() => setSearchOpen(true)}
            />
            <Menu
              className="w-6 h-6 cursor-pointer md:hidden"
              onClick={() => setMenuOpen(true)}
            />
          </div>
        </div>
      </nav>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-white text-black p-6 flex flex-col z-50 shadow-lg"
          >
            <X
              className="w-6 h-6 self-end cursor-pointer"
              onClick={() => setMenuOpen(false)}
            />
            <Link to="/" className="mt-6 text-xl" onClick={() => setMenuOpen(false)}>Home</Link>
            <Link to="/cities" className="mt-4 text-xl" onClick={() => setMenuOpen(false)}>Cities</Link>
            <Link to="/places" className="mt-4 text-xl" onClick={() => setMenuOpen(false)}>Places</Link>
            <Link to="/about" className="mt-4 text-xl" onClick={() => setMenuOpen(false)}>About</Link>
            <Link to="/contact" className="mt-4 text-xl" onClick={() => setMenuOpen(false)}>Contact</Link>
            {/* Login and Register for Mobile */}
            <Link to="/login" className="mt-4 text-xl text-blue-600" onClick={() => setMenuOpen(false)}>Login</Link>
            <Link to="/register" className="mt-4 text-xl bg-blue-500 text-white px-4 py-2 rounded text-center hover:bg-blue-600" onClick={() => setMenuOpen(false)}>Register</Link>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Search Modal */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-lg flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className="bg-white p-6 rounded-lg shadow-lg w-96"
            >
              <X
                className="w-6 h-6 cursor-pointer self-end mb-2"
                onClick={() => setSearchOpen(false)}
              />
              <input
                type="text"
                placeholder="Search cities & places..."
                className="w-full p-2 border rounded-md focus:outline-none focus:ring"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              {results.length > 0 && (
                <div className="mt-4">
                  {results.map((item, index) => (
                    <Link
                      key={index}
                      to={item.type === "city" ? `/city/${item.id}` : `/place/${item.id}`}
                      className="block p-2 hover:bg-gray-100 rounded"
                      onClick={() => setSearchOpen(false)}
                    >
                      {item.name} ({item.type})
                    </Link>
                  ))}
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
