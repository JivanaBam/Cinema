import {
  FormControl,
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
        <img
          src="src/assets/A-quiet-place.jpg"
          alt="A-quiet-place"
          width="250px"
          height="250px"
        />
        <img
          src="src/assets/avatar.jpg"
          alt="avatar"
          width="250px"
          height="250px"
        />
        <img
          src="src/assets/interstellar.jpg"
          alt="interstellar"
          width="250px"
          height="250px"
        />
        <img
          src="src/assets/Laapataa_Ladies_poster.jpg"
          alt="Laapataa_Ladies_poster"
          width="250px"
          height="250px"
        />
        <img
          src="src/assets/migration.jpg"
          alt="migration"
          width="250px"
          height="250px"
        />
        <img
          src="src/assets/moana.jpg"
          alt="moana"
          width="250px"
          height="250px"
        />
        <img
          src="src/assets/orphan.jpg"
          alt="orphan"
          width="250px"
          height="250px"
        />
        <img
          src="src/assets/shutter-island.jpg"
          alt="shutter-island"
          width="250px"
          height="250px"
        />
        <img
          src="src/assets/the-endgame.jpg"
          alt="the-endgame"
          width="250px"
          height="250px"
        />
        <img
          src="src/assets/A-quiet-place.jpg"
          alt="A-quiet-place"
          width="250px"
          height="250px"
        />
      </Stack>
    </Stack>
  );
};

export default Home;
