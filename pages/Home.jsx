import {
  FormControl,
  Grid,
  InputAdornment,
  OutlinedInput,
  Stack,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import MovieFilterDialog from "../component/MovieFilterDialog";

const Home = () => {
  const [searchText, setSearchText] = useState(" ");

  const images = [
    { src: "src/assets/A-quiet-place.jpg", alt: "A-quiet-place" },
    { src: "src/assets/avatar.jpg", alt: "avatar" },
    { src: "src/assets/interstellar.jpg", alt: "interstellar" },
    {
      src: "src/assets/Laapataa_Ladies_poster.jpg",
      alt: "Laapataa_Ladies_poster",
    },
    { src: "src/assets/migration.jpg", alt: "migration" },
    { src: "src/assets/moana.jpg", alt: "moana" },
    { src: "src/assets/orphan.jpg", alt: "orphan" },
    { src: "src/assets/shutter-island.jpg", alt: "shutter-island" },
    { src: "src/assets/the-endgame.jpg", alt: "the-endgame" },
  ];

  //Import Grid: Added the import statement for Grid from @mui/material.
  //Images Array: Created an array of image objects for easier mapping.
  //Grid Container: Wrapped the images inside a Grid container with a spacing of 2
  //for gaps between the items.
  //Grid Items: Each image is placed inside a Grid item that takes up 4 out of 12 columns
  //(1/3 of the width), ensuring a 3x3 layout.

  return (
    <Stack
      sx={{
        width: "1300px",
        height: "550px",
        backgroundSize: "cover",
        backgroundImage: `url("src/assets/Movie-background.jpg")`,
      }}
    >
      <MovieFilterDialog />
      <Stack
        direction="row"
        spacing="1rem"
        sx={{ margin: "0.5rem 0rem 1rem 64rem" }}
      >
        <MovieFilterDialog />
        <FormControl variant="standard">
          <OutlinedInput
            // value={searchText}
            onChange={(event) => {
              setSearchText(event?.target?.value);
              // setCurrentPage(1);
            }}
            placeholder="Search movies here..."
            startAdornment={
              <InputAdornment position="end" sx={{ color: "purple" }}>
                <SearchIcon sx={{ fontSize: "2rem" }} />
              </InputAdornment>
            }
          />
        </FormControl>
      </Stack>

      <Typography variant="h3">Your streaming guide for movies</Typography>
      <Typography variant="h5">
        Find where to stream new, popular & upcoming entertainment with
        Digital-Cinema.
      </Typography>

      <Stack
        sx={{
          width: "30px",
          display: "flex",
          flexDirection: "row",
          gap: "0.5rem",
          margin: "5px",
          // flexWrap: "wrap",
        }}
      >
        <Grid container spacing={2} sx={{ marginTop: "1rem" }}>
          {images.map((image, index) => (
            <Grid item xs={4} key={index}>
              <img
                src={image.src}
                alt={image.alt}
                style={{ width: "100%", height: "auto" }}
              />
            </Grid>
          ))}
        </Grid>
      </Stack>
    </Stack>
  );
};

export default Home;
