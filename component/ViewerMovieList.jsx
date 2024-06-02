import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import $axios from "../axios/axios.instance";
import { Box, CircularProgress, Pagination, Stack } from "@mui/material";
import MovieCard from "./MovieCard";

const ViewerMovieList = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const { isPending, data } = useQuery({
    queryKey: ["get-viewer-movies", currentPage],
    queryFn: async () => {
      return await $axios.post("/movie/list/viewer", {
        page: currentPage,
        limit: 3,
      });
    },
  });

  const movieList = data?.data?.movieLists || [];
  // console.log(movieList);
  const totalPage = data?.data?.totalPages;
  // console.log(data);

  if (isPending) {
    return <CircularProgress />;
  }
  return (
    <>
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
        {movieList.map((item) => {
          return <MovieCard key={item._id} {...item} />;
        })}
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

export default ViewerMovieList;
