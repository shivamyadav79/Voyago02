import { Outlet, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const AdminLayout = () => {
  const user = useSelector((state) => state.auth.user);

  if (!user || user.role !== "admin") {
    return <Navigate to="/login" />;
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-72 bg-gray-900 text-white p-6 flex flex-col min-h-screen shadow-lg">
        <h2 className=" mt-20 text-2xl font-bold mb-6 text-center">Admin Panel</h2>
        <nav className="space-y-3 flex-1">
          <NavItem to="/admin" label="Dashboard" />
          {/* <NavItem to="/admin/users" label="Users" /> */}
          <NavItem to="/admin/cities" label="Cities" />
          <NavItem to="/admin/places" label="Places" />
          {/* <NavItem to="/admin/analytics" label="Analytics" /> */}
          <NavItem to="/admin/audit-logs" label="Audit Logs" />
        </nav>
      </aside>

      {/* Content Area */}
      <main className="flex-1 p-8 bg-white shadow-inner min-h-screen">
        <Outlet /> {/* Renders the current admin page */}
      </main>
    </div>
  );
};

const NavItem = ({ to, label }) => (
  <Link
    to={to}
    className="block px-4 py-3 rounded-lg transition-all duration-300 hover:bg-gray-800 hover:text-gray-200 text-lg"
  >
    {label}
  </Link>
);

export default AdminLayout;
