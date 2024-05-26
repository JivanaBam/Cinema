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
        }}
      >
        <Typography variant="h5">{movieDetail.name}</Typography>
        <Typography variant="h5">{movieDetail.duration}</Typography>
        <Typography variant="h5">{movieDetail.releasedYear}</Typography>

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

        <Typography sx={{ textAlign: "justify" }}>
          {movieDetail.description}
        </Typography>
        <Chip variant="outlined" color="primary" label={movieDetail.country} />
        <Chip variant="outlined" color="primary" label={movieDetail.genre} />

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
