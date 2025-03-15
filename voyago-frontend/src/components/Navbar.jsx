import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Search, LogOut, User } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../Store/Slice/authSlice"; // Import the logout action
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
  const dispatch = useDispatch();

  // Get user authentication status from Redux
  const { user } = useSelector((state) => state.auth);

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

  const handleLogout = () => {
    dispatch(logout()); // Dispatch logout action
  };

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

            {/* Show Login/Register only if user is NOT logged in */}
            {!user ? (
              <>
                <Link to="/login" className="hover:underline">Login</Link>
                <Link to="/register" className="hover:underline">Register</Link>
              </>
            ) : (
              <>
                {/* User Profile Icon */}
                <div className="relative group">
                  <User className="w-6 h-6 cursor-pointer" />
                  <div className="absolute left-0 mt-2 hidden group-hover:block bg-white shadow-md rounded-lg py-2 px-4">
                    <p className="text-sm text-gray-700">{user.username}</p>
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-2 text-red-500 mt-2 text-sm"
                    >
                      <LogOut className="w-4 h-4" /> Logout
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Mobile Menu & Search */}
          <div className={`flex items-center space-x-4 ${navTextColor}`}>
            <Search className="w-6 h-6 cursor-pointer" onClick={() => setSearchOpen(true)} />
            <Menu className="w-6 h-6 cursor-pointer md:hidden" onClick={() => setMenuOpen(true)} />
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
            <X className="w-6 h-6 self-end cursor-pointer" onClick={() => setMenuOpen(false)} />
            <Link to="/" className="mt-6 text-xl" onClick={() => setMenuOpen(false)}>Home</Link>
            <Link to="/cities" className="mt-4 text-xl" onClick={() => setMenuOpen(false)}>Cities</Link>
            <Link to="/places" className="mt-4 text-xl" onClick={() => setMenuOpen(false)}>Places</Link>
            <Link to="/about" className="mt-4 text-xl" onClick={() => setMenuOpen(false)}>About</Link>
            <Link to="/contact" className="mt-4 text-xl" onClick={() => setMenuOpen(false)}>Contact</Link>

            {/* Show Login/Register if NOT logged in */}
            {!user ? (
              <>
                <Link to="/login" className="mt-4 text-xl text-blue-600" onClick={() => setMenuOpen(false)}>Login</Link>
                <Link to="/register" className="mt-4 text-xl bg-blue-500 text-white px-4 py-2 rounded text-center hover:bg-blue-600" onClick={() => setMenuOpen(false)}>Register</Link>
              </>
            ) : (
              <>
                <p className="mt-4 text-xl">{user.username}</p>
                <button
                  onClick={handleLogout}
                  className="mt-4 text-xl text-red-500 flex items-center gap-2"
                >
                  <LogOut className="w-5 h-5" /> Logout
                </button>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
