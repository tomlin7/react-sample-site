import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";

import ErrorPage from "./routes/404";
import Categories from "./routes/categories";
import DashboardPage from "./routes/dashboard";
import EntertainmentPage from "./routes/entertainment";
import Home from "./routes/home";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/categories",
    element: <Categories />,
  },
  {
    path: "/dashboard",
    element: <DashboardPage />,
  },
  {
    path: "/entertainment",
    element: <EntertainmentPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
