import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaCity, FaUsers, FaChartBar, FaSun, FaMoon } from "react-icons/fa";

const Sidebar = ({ toggleTheme, isDarkMode }) => {
  const [active, setActive] = useState("dashboard");

  return (
    <div className={`h-screen w-64 p-5 ${isDarkMode ? "bg-gray-900" : "bg-white"} shadow-lg fixed left-0`}>
      <h1 className="text-xl font-bold text-center mb-6">Admin Dashboard</h1>
      <ul className="space-y-4">
        <li>
          <Link
            to="/admin"
            className={`flex items-center p-2 rounded ${active === "dashboard" ? "bg-blue-500 text-white" : "text-gray-700"}`}
            onClick={() => setActive("dashboard")}
          >
            <FaChartBar className="mr-2" /> Dashboard
          </Link>
        </li>
        <li>
          <Link
            to="/admin/cities"
            className={`flex items-center p-2 rounded ${active === "cities" ? "bg-blue-500 text-white" : "text-gray-700"}`}
            onClick={() => setActive("cities")}
          >
            <FaCity className="mr-2" /> Manage Cities
          </Link>
        </li>
        <li>
          <Link
            to="/admin/users"
            className={`flex items-center p-2 rounded ${active === "users" ? "bg-blue-500 text-white" : "text-gray-700"}`}
            onClick={() => setActive("users")}
          >
            <FaUsers className="mr-2" /> Manage Users
          </Link>
        </li>
      </ul>
      <div className="absolute bottom-5 left-5 cursor-pointer" onClick={toggleTheme}>
        {isDarkMode ? <FaSun className="text-yellow-500" /> : <FaMoon className="text-gray-700" />}
      </div>
    </div>
  );
};

export default Sidebar;
