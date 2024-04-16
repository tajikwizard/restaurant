import React from "react";
import { useSelector } from "react-redux";
const Cart = () => {
  const storeCart = useSelector((state) => state.cart);

  return (
    <div className="mt-24 flex flex-col justify-center items-center h-screen">
      <h2 className="text-2xl font-bold">Cart</h2>
      <div className="bg-white rounded-lg shadow-lg mt-4 w-80 sm:w-96">
        {storeCart.length === 0 ? (
          <p className="text-gray-600 p-4">Your cart is empty</p>
        ) : (
          <ul className="divide-y divide-gray-200">
            {storeCart.map((item, index) => (
              <li key={index} className="flex p-4">
                <div className="flex-none w-24 h-24 bg-gray-200 rounded-lg mr-4"></div>
                <div className="flex-auto">
                  <h3 className="text-lg font-semibold">{item.name}</h3>
                  <p className="text-gray-600">${item.price}</p>
                </div>
                <div className="btns flex items-center">
                  <button className="p-2 border mx-2 bg-green-500 rounded-lg text-white">
                    Add +1{" "}
                  </button>
                  <button className="p-2 border bg-red-500 rounded-lg text-white">
                    Remove -1
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Cart;
