import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchCity } from "../Store/Slice/citySlice";
import { fetchPlaces } from "../Store/Slice/placeSlice";
import CityHero from "../components/CityDetails/CityHero";
import CityHistory from "../components/CityDetails/CityHistory";
import LocalAttractions from "../components/CityDetails/LocalAttractions";
import ReviewsSection from "../components/CityDetails/ReviewsSection";
import CityChat from "../components/CityDetails/CityChat.jsx";
import LoadingSpinner from "../components/LoadingSpinner.jsx";

const CityDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { city, loading: cityLoading, error: cityError } = useSelector((state) => state.city);
  const { places, loading: placesLoading, error: placesError } = useSelector((state) => state.places);
  const user = useSelector((state) => state.user);

  const loading = cityLoading || placesLoading;
  const error = cityError || placesError;

  useEffect(() => {
    dispatch(fetchCity(id));
    dispatch(fetchPlaces(id));
  }, [dispatch, id]);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <div>Error loading city details. Please try again later.</div>;
  }

  return (
    <div className="pt-16">
      <CityHero city={city} loading={loading} />
      <CityHistory city={city} loading={loading} />
      <LocalAttractions places={places} cityId={id} />
      <ReviewsSection reviews={city?.reviews || []} loading={loading} />
      {user && city && <CityChat cityId={city._id} user={user} />}
    </div>
  );
};

export default CityDetails;
