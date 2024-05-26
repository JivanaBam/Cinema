import React from "react";
import Login from "../pages/Login";
import Register from "../pages/Register";
import MiniLayout from "../layout/MiniLayout";

const guestRoutes = [
  {
    path: "/",
    element: <MiniLayout />,
    children: [
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
    ],
  },
];

export default guestRoutes;
