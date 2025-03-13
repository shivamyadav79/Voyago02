//local Attractions page


import React, { useEffect, useState } from "react";
import CategorySection from "./CategorySection";

const CATEGORIES = [
  { key: "food-place", label: "Food Places" },
  { key: "hidden-spot", label: "Hidden Spots" },
  { key: "hospital", label: "Hospitals" },
  { key: "hotel", label: "Hotels" },
  { key: "restaurant", label: "Restaurants" },
  { key: "shopping", label: "Shopping" },
  { key: "tourist-attraction", label: "Tourist Attractions" },
];

const LocalAttractions = ({ cityId }) => {
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const response = await fetch(`/api/places?cityId=${cityId}`);
        const data = await response.json();
        setPlaces(data);
      } catch (error) {
        console.error("Error fetching places:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPlaces();
  }, [cityId]);

  // Group places by category
  const placesByCategory = CATEGORIES.reduce((acc, { key }) => {
    acc[key] = places.filter((p) => {
      const categoryKey = p.type ? p.type.toLowerCase().replace(/\s+/g, "-") : "";
      return categoryKey === key;
    });
    return acc;
  }, {});

  if (loading) {
    return <p className="text-center">Loading...</p>;
  }

  return (
    <section className="max-w-5xl mx-auto p-4 md:p-8">
      <h2 className="text-2xl font-bold mb-6 text-center">Local Attractions</h2>
      {CATEGORIES.map(({ key, label }) =>
        placesByCategory[key]?.length > 0 ? (
          <CategorySection
            key={key}
            category={label}
            places={placesByCategory[key]}
            cityId={cityId}
          />
        ) : (
          <p key={key} className="text-center text-gray-500">
            No {label.toLowerCase()} available.
          </p>
        )
      )}
    </section>
  );
};

export default LocalAttractions;
