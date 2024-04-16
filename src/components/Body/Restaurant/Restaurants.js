import React, { useState, useEffect } from "react";
import Restaurant from "./Restautant";
import { API_URL } from "../../../utils/constants";
import { ShimmerSimpleGallery } from "react-shimmer-effects";

const Restaurants = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchRestaurants = async () => {
    try {
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      setRestaurants(data.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching restaurants:", error);
      setError(error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRestaurants();
  }, []);

  if (loading) {
    return (
      <ShimmerSimpleGallery
        card
        row={2}
        col={4}
        imageHeight={400}
        caption
        gap={20}
      />
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-2xl">Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="flex flex-wrap gap-5 justify-center items-center h-screen">
      {restaurants.map((restaurant) => (
        <Restaurant key={restaurant.id} {...restaurant} />
      ))}
    </div>
  );
};

export default Restaurants;
