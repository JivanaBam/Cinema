import React from "react";
import AdminMovieList from "../component/AdminMovieList";
import ViewerMovieList from "../component/ViewerMovieList";

const MovieList = () => {
  const userRole = localStorage.getItem("role");

  return <>{userRole === "admin" ? <AdminMovieList /> : <ViewerMovieList />}</>;
};

export default MovieList;
