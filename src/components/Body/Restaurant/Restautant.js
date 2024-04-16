import React, { useState } from "react";
import { Link } from "react-router-dom";
import { API_URL_RESTAURANT } from "../../../utils/constants";
import noimage from "../../../assets/noImage.png";
import RestaurantDetails from "./RestaurantDetails";

const Restaurant = ({ id, name, delivery_time, name_url }) => {
  const [resDetails, setResDetails] = useState([]);
  const handleClick = () => {
    fetch(API_URL_RESTAURANT + name_url)
      .then((response) => response.json())
      .then((data) => {
        setResDetails(data);
        console.log(data);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  };
  return (
    <Link to={`/restaurants/${name_url}`} className="restaurant__link">
      <div
        onClick={handleClick}
        className=" hover:shadow-md restaurant__container w-64 border rounded-lg transition-transform ease-in-out duration-300 transform hover:-translate-y-2 hover:cursor-pointer"
      >
        <div className="img__container">
          <img
            className="h-48 w-64 rounded-lg object-cover"
            src={noimage}
            alt="Restaurant Image"
          />
        </div>
        <div className="restaurant__body flex flex-col justify-center items-start p-3">
          <h2 className="font-bold">{name}</h2>
          <h2 className="font-bold">⭐ 4.7 / {delivery_time}mins</h2>
          <p>Desserts, Snacks, Bakery Ice Cream Loudon Street</p>
        </div>
      </div>
    </Link>
  );
};

export default Restaurant;
