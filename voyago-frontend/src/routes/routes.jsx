import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import Layout from "../layout/Layout";
import LoadingSpinner from "../components/LoadingSpinner";

const Home = lazy(() => import("../pages/Home"));
const Cities = lazy(() => import("../pages/Cities"));
const About = lazy(() => import("../pages/About"));
const Contact = lazy(() => import("../pages/Contact"));
const CityDetails = lazy(() => import("../pages/CityDetails"));
const PlaceDetails = lazy(() => import("../pages/PlacesDetails"));
const Places = lazy(() => import("../pages/Places"));
const Login = lazy(() => import("../pages/Login"));
const Register = lazy(() => import("../pages/Registration"));


const AppRoutes = () => {
  return (
    <Router>
      <Suspense fallback={<div>
        <LoadingSpinner />
      </div>}>
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
          </Routes>
        </Layout>
      </Suspense>
    </Router>
  );
};

export default AppRoutes;
