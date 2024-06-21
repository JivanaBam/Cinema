import {
  FormControl,
  Grid,
  InputAdornment,
  MenuItem,
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
    { src: "/assets/A-quiet-place.jpg", alt: "A-quiet-place" },
    { src: "/assets/avatar.jpg", alt: "avatar" },
    { src: "/assets/interstellar.jpg", alt: "interstellar" },
    {
      src: "/assets/Laapataa_Ladies_poster.jpg",
      alt: "Laapataa_Ladies_poster",
    },
    { src: "/assets/migration.jpg", alt: "migration" },
    { src: "/assets/moana.jpg", alt: "moana" },
    { src: "/assets/orphan.jpg", alt: "orphan" },
    { src: "/assets/shutter-island.jpg", alt: "shutter-island" },
    { src: "/assets/the-endgame.jpg", alt: "the-endgame" },
    { src: "/assets/Boksiko_ghar.jpg", alt: "Boksiko_ghar" },
    { src: "/assets/the lion king.jpg", alt: "the lion king" },
    { src: "/assets/five feet apart.jpg", alt: "five feet apart" },
  ];
  // console.log(images);

  return (
    <Stack
      sx={{
        width: "1330px",
        height: "100%",
        backgroundSize: "cover",
        backgroundImage: `url("/assets/Movie-background.jpg")`,
      }}
    >
      <Typography variant="h3">Your streaming guide for movies.</Typography>
      <Typography variant="h5" color="#ffff">
        Find where to stream new, popular & upcoming entertainment with
        Digital-Cinema.
      </Typography>

      <Stack display="flex" flexDirection="row" flexWrap="wrap">
        {images.map((item, index) => {
          return (
            <MenuItem key={index} value={item}>
              <img
                src={item.src}
                alt={item.alt}
                style={{ width: "295px", height: "330px" }}
              />
            </MenuItem>
          );
        })}
      </Stack>

      <Typography variant="h6" color="#ffff">
        Enjoy your movie time with Digital-Cinema...
      </Typography>
      <Typography variant="h6" color="#ffff">
        Keep visiting this page...
      </Typography>
    </Stack>
  );
};

export default Home;
