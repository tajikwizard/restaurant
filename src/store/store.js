import { createStore } from "redux";

const initialState = {
  cart: [],
};

export const addToCart = (product) => {
  return {
    type: "ADD_TO_CART",
    payload: product,
  };
};

export const removeFromCart = (product) => {
  return {
    type: "REMOVE_FROM_CART",
    payload: product,
  };
};

const reducerFunction = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_TO_CART": {
      const existingItemIndex = state.cart.findIndex(
        (item) => item.product.id === action.payload.id
      );

      if (existingItemIndex !== -1) {
        // If item already exists in the cart, increase quantity
        const updatedCart = [...state.cart];
        updatedCart[existingItemIndex].quantity++;
        return {
          ...state,
          cart: updatedCart,
        };
      } else {
        // If item does not exist in the cart, add it with quantity 1
        return {
          ...state,
          cart: [...state.cart, { product: action.payload, quantity: 1 }],
        };
      }
    }
    case "REMOVE_FROM_CART": {
      const existingItemIndex = state.cart.findIndex(
        (item) => item.product.id === action.payload.id
      );

      if (existingItemIndex !== -1) {
        // If item exists in the cart, decrease quantity
        const updatedCart = [...state.cart];
        if (updatedCart[existingItemIndex].quantity > 1) {
          updatedCart[existingItemIndex].quantity--;
        } else {
          // If quantity is 1, remove the item from the cart
          updatedCart.splice(existingItemIndex, 1);
        }
        return {
          ...state,
          cart: updatedCart,
        };
      } else {
        return state; // Item not found in cart, return state unchanged
      }
    }
    default:
      return state;
  }
};

export const store = createStore(reducerFunction);
