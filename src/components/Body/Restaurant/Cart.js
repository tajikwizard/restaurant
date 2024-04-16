import React from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { addToCart, removeFromCart } from "../../../store/store";

const Cart = () => {
  const storeCart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const handleRemove = (product) => {
    dispatch(removeFromCart(product));
  };

  const handleAdd = (product) => {
    dispatch(addToCart(product));
  };

  const getTotal = (cart) => {
    let total = 0;
    cart.forEach((item) => {
      total += item.product.price * item.quantity;
    });
    return total;
  };

  return (
    <div className="mt-24 flex flex-col justify-center items-center h-screen">
      <h2 className="text-2xl font-bold">Shopping Cart 🛒</h2>
      <div className="bg-white rounded-lg shadow-lg mt-4 w-80 sm:w-96">
        {storeCart.length === 0 ? (
          <p className="text-gray-600 p-4">Your cart is empty</p>
        ) : (
          <ul className="divide-y divide-gray-200">
            {storeCart.map((item, index) => (
              <li key={index} className="flex p-4">
                <div className="flex-none w-24 h-24 bg-gray-200 rounded-lg mr-4"></div>
                <div className="flex-auto">
                  <h3 className="text-lg font-semibold">{item.product.name}</h3>
                  <p className="text-gray-600">
                    <span>{`${item.product.price}  x ${item.quantity} = ${
                      item.product.price * item.quantity
                    }`}</span>
                  </p>
                  <p>Quantity: {item.quantity}</p>
                </div>
                <div className="btns flex items-center">
                  <button
                    onClick={() => handleAdd(item.product)}
                    className="p-2 border mx-2 bg-green-500 rounded-lg text-white"
                  >
                    Add +1
                  </button>
                  <button
                    onClick={() => handleRemove(item.product)}
                    className="p-2 border bg-red-500 rounded-lg text-white"
                  >
                    Remove -1
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {storeCart.length > 0 && (
        <div className="mt-4 flex justify-center border p-2 w-56">
          <h2 className="text-lg font-bold">Total: {getTotal(storeCart)} СМ</h2>
        </div>
      )}
    </div>
  );
};

export default Cart;
