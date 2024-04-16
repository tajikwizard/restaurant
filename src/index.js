import { createRoot } from "react-dom/client";
import { App } from "./App";
import RestaurantDetails from "./components/Body/Restaurant/RestaurantDetails";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Restaurants from "./components/Body/Restaurant/Restaurants";
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
root.render(<RouterProvider router={router} />);
