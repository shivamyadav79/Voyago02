import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Layout = ({ children }) => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        {children}
        <Outlet />
      </main>
      {!isAdminRoute && <Footer />} {/* Hide footer for admin pages */}
    </div>
  );
};

export default Layout;
