import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { API_URL_RESTAURANT } from "../../../utils/constants";
import noimage from "../../../assets/noImage.png";
import { ShimmerSimpleGallery } from "react-shimmer-effects";
import { addToCart as addToCartAction } from "../../../store/store";
import { useSelector, useDispatch } from "react-redux";

const RestaurantDetails = () => {
  const storeCart = useSelector((state) => state.cart);
  const { name_url } = useParams();
  const [restaurant, setRestaurant] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [sortOption, setSortOption] = useState("low");

  // Get dispatch function from Redux
  const dispatch = useDispatch();

  useEffect(() => {
    setLoading(true);
    fetch(API_URL_RESTAURANT + name_url)
      .then((response) => {
        if (!response) {
          throw new Error("Network error: Unable to reach the server.");
        }
        if (!response.ok) {
          throw new Error(
            "Failed to fetch restaurant details. Status: " + response.status
          );
        }
        return response.json();
      })
      .then((data) => {
        setRestaurant(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, [name_url]);

  const addToCart = (product) => {
    // Dispatch the action to add product to cart
    dispatch(addToCartAction(product));
  };

  const handleSortChange = (event) => {
    setSortOption(event.target.value);
  };

  console.log(storeCart);

  const sortedProducts = restaurant[1]?.map((category) => ({
    ...category,
    products: category.products.slice().sort((a, b) => {
      if (sortOption === "low") {
        return a.price - b.price;
      } else {
        return b.price - a.price;
      }
    }),
  }));

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
    return <div className="text-red-600">{error}</div>;
  }

  return (
    <div className="container mx-auto">
      <div className="flex justify-between items-center py-8">
        <div>
          <h1 className="text-3xl font-bold">
            {restaurant?.[0]?.[0]?.name ?? "Restaurant Name Unavailable"}
          </h1>
          <p className="text-gray-600">
            Delivery Time: {restaurant?.[0]?.[0]?.delivery_time ?? "Unknown"}
          </p>
        </div>
        <img src={noimage} alt="Restaurant" className="rounded-full" />
      </div>

      <div className="flex justify-end w-full">
        <div className="filter-header w-32 p-2 border rounded-md my-4 flex">
          <select value={sortOption} onChange={handleSortChange}>
            <option value="low">Low to High</option>
            <option value="high">High to Low</option>
          </select>
        </div>
      </div>

      {sortedProducts &&
        sortedProducts.map((category) => (
          <div key={category.category_name_url} className="mb-8">
            <h2 className="text-2xl text-red-400 font-bold mb-4">
              {category.category_name}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {category.products.map((product) => (
                <div key={product.id}>
                  <div className="bg-white shadow-lg rounded-lg">
                    <img
                      src={product.image || noimage}
                      alt={product.name}
                      className="w-full h-40 object-cover"
                    />
                    <div className="p-4">
                      <h3 className="text-lg font-semibold mb-2">
                        {product.name}
                      </h3>
                      <p className="text-gray-600 mb-2">
                        Price: cм {""}
                        {product.price}
                      </p>
                      <button
                        onClick={() => addToCart(product)}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
    </div>
  );
};

export default RestaurantDetails;
