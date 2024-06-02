import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import { Box, Chip, Stack } from "@mui/material";
import { fallbackImage } from "../constants/general.constants";
import MovieDetails from "../pages/MovieDetails";

const MovieCard = (props) => {
  // console.log(props);
  const navigate = useNavigate();

  return (
    <Card
      sx={{ width: "350px", boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px" }}
    >
      <CardMedia
        component="img"
        sx={{
          height: 300,
          width: "100%",
          cursor: "pointer",
          objectFit: "cover",
        }}
        image={props?.image || fallbackImage}
        title={`${props?.name}- ${props.country}`}
        onClick={() => {
          navigate(`/movie-details/${props._id}`);
        }}
      />

      <CardContent>
        <Stack justifyContent="space-between">
          <Typography
            gutterBottom
            variant="h6"
            component="div"
            fontWeight="bold"
          >
            {props.name}
          </Typography>

          <Stack sx={{ display: "flex", flexDirection: "row" }}>
            <Typography>Genre: </Typography>

            <Box sx={{ display: "flex", flexWrap: "wrap" }}>
              {props.genre &&
                Array.isArray(props.genre) &&
                props.genre.map((genre, index) => (
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
        </Stack>

        <Typography variant="body2" color="text.primary">
          {props.description}...
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={() => {
            navigate(`/movie-details/${props._id}`);
          }}
        >
          Explore
        </Button>
      </CardActions>
    </Card>
  );
};

export default MovieCard;
