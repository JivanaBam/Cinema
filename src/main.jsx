import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import guestRoutes from "../routes/guestRoutes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import mainRoutes from "../routes/mainRoutes";
// import mainRoutes from "../routes/mainRoutes";

// Create a client
const queryClient = new QueryClient();

// create a router
const router = createBrowserRouter([...guestRoutes, ...mainRoutes]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>
);
