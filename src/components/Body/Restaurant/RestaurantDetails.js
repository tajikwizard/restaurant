import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { API_URL_RESTAURANT } from "../../../utils/constants";
import noimage from "../../../assets/noImage.png";

const RestaurantDetails = () => {
  const { name_url } = useParams();
  const [restaurant, setRestaurant] = useState([]);
  const [error, setError] = useState("");
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);

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
    setCart([...cart, product]);
  };

  if (loading) {
    return <div>Loading...</div>;
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

      {restaurant[1] &&
        restaurant[1].map((category) => (
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
                        Price: ${product.price}
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

      <div className="mt-8">
        <h2 className="text-2xl font-bold">Cart</h2>
        {cart.length === 0 ? (
          <p>Your cart is empty</p>
        ) : (
          <ul>
            {cart.map((item, index) => (
              <li key={index} className="mb-2">
                {item.name} - ${item.price}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default RestaurantDetails;
