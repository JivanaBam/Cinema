import React from "react";
import Home from "../pages/Home";
import MovieList from "../pages/MovieList";
import About from "../pages/About";
import MainLayouts from "../layout/MainLayouts";
import AddMovie from "../pages/AddMovie";
import MovieDetails from "../pages/MovieDetails";
import EditMovie from "../pages/EditMovie";

const mainRoutes = [
  {
    path: "/",
    element: <MainLayouts />,
    children: [
      {
        path: "home",
        element: <Home />,
      },
      {
        path: "movie",
        element: <MovieList />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "add-movie",
        element: <AddMovie />,
      },
      {
        path: "movie-details/:id",
        element: <MovieDetails />,
      },
      {
        path: "movie-edit/:id",
        element: <EditMovie />,
      },
    ],
  },
];

export default mainRoutes;
