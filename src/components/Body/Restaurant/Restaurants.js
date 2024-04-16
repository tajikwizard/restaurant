import React, { useState, useEffect } from "react";
import Restaurant from "./Restautant";
import { API_URL } from "../../../utils/constants";
import { ShimmerSimpleGallery } from "react-shimmer-effects";

const Restaurants = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [inputValue, setInputValue] = useState("");

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
  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };
  const filteredRestaurants = restaurants.filter((restaurant) =>
    restaurant.name.toLowerCase().includes(inputValue.toLowerCase())
  );
  return (
    <>
      <div className="flex justify-center p-10 mt-16">
        <form>
          <input
            className="w-96 focus:outline-none focus:shadow-lg border border-gray-300 rounded-md px-3 py-2"
            placeholder="Search for restaurant here..."
            value={inputValue}
            onChange={handleInputChange}
          />
        </form>
      </div>
      <div className="flex flex-wrap gap-5 justify-center items-center h-screen">
        {filteredRestaurants.map((restaurant) => (
          <Restaurant key={restaurant.id} {...restaurant} />
        ))}
      </div>
    </>
  );
};

export default Restaurants;
