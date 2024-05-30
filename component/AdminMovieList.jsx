import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useNavigate } from "react-router-dom";
import $axios from "../axios/axios.instance";
import { Box, Button, CircularProgress } from "@mui/material";
import MovieCard from "./MovieCard";

const AdminMovieList = () => {
  const navigate = useNavigate();

  const { iSPending, data } = useQuery({
    queryKey: ["get-admin-movies"],
    queryFn: async () => {
      return await $axios.post("/movie/list/admin", {
        page: 1,
        limit: 9,
      });
    },
  });

  if (iSPending) {
    return <CircularProgress />;
  }
  // console.log(data);
  const movieList = data?.data?.movieLists || [];
  // console.log(movieList);

  return (
    <>
      <Button
        variant="contained"
        color="primary"
        onClick={() => {
          navigate("/add-movie");
        }}
        sx={{ marginBottom: "2rem" }}
      >
        Add movie
      </Button>

      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          alignItems: "center",
          gap: "3rem",
          marginBottom: "2rem",
          marginLeft: "4rem",
        }}
      >
        {movieList.map((item) => (
          <MovieCard key={item._id} {...item} />
        ))}
      </Box>
    </>
  );
};

export default AdminMovieList;
