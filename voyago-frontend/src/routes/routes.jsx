import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Cities from "../pages/Cities";
import About from "../pages/About";
import Contact from "../pages/Contact";
import Layout from "../layout/Layout";
import CityDetails from "../pages/CityDetails"; // <-- import your CityDetails page

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/*" element={<Layout />}>
          {/* Index route for home */}
          <Route index element={<Home />} />

          {/* Cities listing page */}
          <Route path="cities" element={<Cities />} />

          {/* CityDetails page for a specific city by ID */}
          <Route path="cities/:id" element={<CityDetails />} />

          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default AppRoutes;
