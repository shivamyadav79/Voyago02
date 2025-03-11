import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchCity } from "../Store/Slice/citySlice";
import { fetchPlaces } from "../Store/Slice/placeSlice";
import CityHero from "../components/CityDetails/CityHero";
import CityHistory from "../components/CityDetails/CityHistory";
import LocalAttractions from "../components/CityDetails/LocalAttractions";
import ReviewsSection from "../components/CityDetails/ReviewsSection";

const CityDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { city, loading: cityLoading } = useSelector((state) => state.city);
  const { places, loading: placesLoading } = useSelector(
    (state) => state.places
  );

  const loading = cityLoading || placesLoading;

  useEffect(() => {
    dispatch(fetchCity(id));
    dispatch(fetchPlaces(id));
  }, [dispatch, id]);

  return (
    <div className="pt-16">
      <CityHero city={city} loading={loading} />
      <CityHistory city={city} loading={loading} />
      <LocalAttractions places={places} cityId={id} />
      <ReviewsSection reviews={city?.reviews || []} loading={loading} />
    </div>
  );
};

export default CityDetails;
