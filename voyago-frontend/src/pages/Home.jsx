import HeroSection from "../components/HeroSection";
import PlacesCarousel from "../components/infiniteScroll/PlacesCarousel";
import CitySection from "../components/city/CitySection";
import CityDetails from "./CityDetails";
import { Routes, Route } from 'react-router-dom';

const Home = () => {
  return (
    <>
      <HeroSection />
      <PlacesCarousel />
      <CitySection />
      {/* Wrap the Route inside Routes */}
      <Routes>
        <Route path="/cities/:id" element={<CityDetails />} />
      </Routes>
    </>
  );
};

export default Home;
