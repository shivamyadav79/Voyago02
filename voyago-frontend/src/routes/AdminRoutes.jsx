import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import AdminLayout from "../layout/AdminLayout";


const AdminRoutes = ({ children }) => {
  const user = useSelector((state) => state.auth.user); // Ensure user state is correct
  
    console.log("Admin Route - User State:", user);
  
    if (!user || user.role !== "admin") {  // ✅ Check `role === "admin"`
      return <Navigate to="/login" replace />;
    }
  
    return <AdminLayout>{children}</AdminLayout > || <Navigate to="/admin" />;
  };
export default AdminRoutes;  