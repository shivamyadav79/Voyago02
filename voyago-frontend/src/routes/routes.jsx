import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { lazy, Suspense } from "react";
import { useSelector } from "react-redux";
import Layout from "../layout/Layout";
import LoadingSpinner from "../components/LoadingSpinner";
import AdminRoute from "./AdminRoutes.jsx"; // ✅ Use correct AdminRoute

// ✅ Lazy-loaded Pages
const Home = lazy(() => import("../pages/Home"));
const Cities = lazy(() => import("../pages/Cities"));
const About = lazy(() => import("../pages/About"));
const Contact = lazy(() => import("../pages/Contact"));
const CityDetails = lazy(() => import("../pages/CityDetails"));
const PlaceDetails = lazy(() => import("../pages/PlacesDetails"));
const Places = lazy(() => import("../pages/Places"));
const Login = lazy(() => import("../pages/Login"));
const Register = lazy(() => import("../pages/Registration"));
const VerifyEmail = lazy(() => import("../pages/VerifyEmail"));

// ✅ Admin Pages
const AdminDashboard = lazy(() => import("../pages/admin/Dashboard"));
const AdminUsers = lazy(() => import("../pages/admin/Users"));
const AdminCities = lazy(() => import("../pages/admin/Cities"));
const AdminPlaces = lazy(() => import("../pages/admin/Places"));
const AdminAnalytics = lazy(() => import("../pages/admin/Analytics"));
const AdminAuditLogs = lazy(() => import("../pages/admin/AuditLogs"));

const AppRoutes = () => {
  return (
    <Router>
      <Suspense fallback={<LoadingSpinner />}>
        <Layout>
          <Routes>
            <Route index element={<Home />} />
            <Route path="cities" element={<Cities />} />
            <Route path="cities/:id" element={<CityDetails />} />
            <Route path="places" element={<Places />} />
            <Route path="places/:id" element={<PlaceDetails />} />
            <Route path="about" element={<About />} />
            <Route path="contact" element={<Contact />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="/verify-email" element={<VerifyEmail />} />

            {/* ✅ Protected Admin Routes */}
            <Route path="admin" element={<AdminRoute />}>
              <Route index element={<AdminDashboard />} />
              <Route path="users" element={<AdminUsers />} />
              <Route path="cities" element={<AdminCities />} />
              <Route path="places" element={<AdminPlaces />} />
              <Route path="analytics" element={<AdminAnalytics />} />
              <Route path="audit-logs" element={<AdminAuditLogs />} />
            </Route>
          </Routes>
        </Layout>
      </Suspense>
    </Router>
  );
};

export default AppRoutes;
