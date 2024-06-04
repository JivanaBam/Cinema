import {
  Box,
  Button,
  Chip,
  CircularProgress,
  Stack,
  Typography,
} from "@mui/material";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import $axios from "../axios/axios.instance";
import EditIcon from "@mui/icons-material/Edit";
import { fallbackImage } from "../constants/general.constants";
import DeleteMovieDialog from "../component/DeleteMovieDialog";

const MovieDetails = () => {
  const navigate = useNavigate();
  const params = useParams();
  const movieId = params?.id;

  const queryClient = useQueryClient();

  // get user role
  const userRole = localStorage.getItem("role");

  // fetch movie details
  const { isPending, data } = useQuery({
    queryKey: ["get-moviet-details"],
    queryFn: async () => {
      return await $axios.post(`/movie/details/${movieId}`);
    },
  });

  // console.log(data);
  const movieDetail = data?.data?.movieDetails;
  // console.log(movieDetail);

  if (isPending) {
    return <CircularProgress />;
  }

  return (
    <Box
      sx={{
        display: "flex",
        // gap: "1rem",
        boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
        // padding: "1rem",
        minHeight: "500px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minWidth: "50%",
        }}
      >
        <img
          src={movieDetail?.image || fallbackImage}
          alt=""
          style={{ width: "90%" }}
        />
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-around",
          alignItems: "flex-start",
          width: "500px",
          // padding: "1rem",
        }}
      >
        <Typography variant="h5" fontWeight="bold">
          {movieDetail.name}
        </Typography>
        <Typography sx={{ fontSize: "18px", color: "purple" }}>
          Duration: {movieDetail.duration}
        </Typography>
        <Typography sx={{ fontSize: "18px", color: "purple" }}>
          Released Year: {movieDetail.releasedYear}
        </Typography>

        <Stack sx={{ display: "flex", flexDirection: "row", gap: "1rem" }}>
          <Typography>Actors:</Typography>
          <Chip
            variant="outlined"
            color="primary"
            label={movieDetail.leadActor}
          />
          <Chip
            variant="outlined"
            color="primary"
            label={movieDetail.supportingActor}
          />
        </Stack>

        <Stack direction="row">
          <Typography>Country: </Typography>
          <Chip
            variant="outlined"
            color="primary"
            label={movieDetail.country}
          />
        </Stack>
        <Stack sx={{ display: "flex", flexDirection: "row" }}>
          <Typography>Genre: </Typography>

          <Box sx={{ display: "flex", flexWrap: "wrap" }}>
            {movieDetail.genre.map((genre, index) => (
              <Chip
                key={index}
                variant="outlined"
                color="primary"
                label={genre}
                style={{ marginRight: "5px", marginBottom: "5px" }}
              />
            ))}
          </Box>
        </Stack>

        <Stack sx={{ textAlign: "justify", marginRight: "1rem" }}>
          <Typography>More about movie:</Typography>
          {movieDetail.description}
        </Stack>

        {userRole === "admin" && (
          <Stack direction="row" spacing={2} sx={{ width: "100%" }}>
            <Button
              variant="contained"
              color="primary"
              startIcon={<EditIcon />}
              fullWidth
              onClick={() => {
                navigate(`/movie-edit/${movieDetail._id}`);
              }}
            >
              Edit
            </Button>
            <DeleteMovieDialog />
          </Stack>
        )}
      </Box>
    </Box>
  );
};

export default MovieDetails;
