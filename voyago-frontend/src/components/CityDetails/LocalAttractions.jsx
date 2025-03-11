import React from "react";
import CategorySection from "./CategorySection";

const CATEGORIES = [
  "hotel",
  "restaurant",
  "hospital",
  "tourist-attraction",
  "hidden-spot",
];

const LocalAttractions = ({ places, cityId }) => {
  // Group places by category using the provided CATEGORIES
  const placesByCategory = {};
  CATEGORIES.forEach((cat) => {
    placesByCategory[cat] = places.filter(
      (p) => p.category && p.category.toLowerCase().replace(/\s+/g, "-") === cat
    );
  });

  return (
    <section className="max-w-5xl mx-auto p-4 md:p-8">
      <h2 className="text-2xl font-bold mb-4">Local Attractions</h2>
      {CATEGORIES.map((cat) => (
        <CategorySection
          key={cat}
          category={cat}
          places={placesByCategory[cat] || []}
          cityId={cityId}
        />
      ))}
    </section>
  );
};

export default LocalAttractions;
