import { useState } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App";
import RestaurantDetails from "./components/Body/Restaurant/RestaurantDetails";
import { Provider } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Restaurants from "./components/Body/Restaurant/Restaurants";
import { store } from "./store/store";
import Cart from "./components/Body/Restaurant/Cart";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Restaurants />,
      },
      {
        path: "/restaurants/:name_url",
        element: <RestaurantDetails />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
    ],
  },
  {
    path: "/restaurants",
    element: <Restaurants />,
  },
  {
    path: "/restaurants/:id",
    element: <RestaurantDetails />,
  },
]);
const container = document.getElementById("root");
const root = createRoot(container);
root.render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
