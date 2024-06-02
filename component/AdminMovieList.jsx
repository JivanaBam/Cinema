import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import $axios from "../axios/axios.instance";
import {
  Box,
  Button,
  CircularProgress,
  Pagination,
  Stack,
} from "@mui/material";
import MovieCard from "./MovieCard";

const AdminMovieList = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const navigate = useNavigate();

  const { iSPending, data } = useQuery({
    queryKey: ["get-admin-movies", currentPage],
    queryFn: async () => {
      return await $axios.post("/movie/list/admin", {
        page: currentPage,
        limit: 3,
      });
    },
  });

  if (iSPending) {
    return <CircularProgress />;
  }
  // console.log(data);
  const movieList = data?.data?.movieLists || [];
  // console.log(movieList);
  const totalPage = data?.data?.totalPages;

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
      <Stack justifyContent="center" alignItems="center">
        <Pagination
          page={currentPage}
          count={totalPage}
          color="primary"
          onChange={(_, value) => {
            setCurrentPage(value);
          }}
        />
      </Stack>
    </>
  );
};

export default AdminMovieList;
