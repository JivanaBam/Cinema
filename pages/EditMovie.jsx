import {
  Box,
  Button,
  Checkbox,
  CircularProgress,
  FormControl,
  FormHelperText,
  InputLabel,
  LinearProgress,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Formik } from "formik";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import addMovieValidationSchema from "../validationSchema/add.movie.validation.schema";
import {
  fallbackImage,
  movieCountryList,
  movieGenreList,
} from "../constants/general.constants";
import { useMutation, useQuery } from "@tanstack/react-query";
import $axios from "../axios/axios.instance";
import { useDispatch } from "react-redux";
import {
  openErrorSnackbar,
  openSuccessSnackbar,
} from "../src/store/slices/snackbarSlice";
import axios from "axios";

const EditMovie = () => {
  const [productImage, setProductImage] = useState(null);
  const [localUrl, setLocalUrl] = useState("");
  // console.log(localUrl);
  const [imageUploadLoading, setImageUploadLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  // console.log(params);
  const movieId = params?.id;

  // fetch movie details
  const { isPending, data } = useQuery({
    queryKey: ["get-movie-details"],
    queryFn: async () => {
      return await $axios.post(`/movie/details/${movieId}`);
    },
  });

  // console.log(data);
  const movieDetail = data?.data?.movieDetails;
  // console.log(movieDetail);

  // edit movie api hit
  const { isPending: editMoviePending, mutate } = useMutation({
    mutationKey: ["edit-movie"],
    mutationFn: async (values) => {
      return await $axios.put(`/edit/movie/${movieId}`, values);
    },
    onSuccess: (res) => {
      navigate(`/movie-details/${movieId}`);
      dispatch(openSuccessSnackbar(res?.data?.message));
    },
    onError: (error) => {
      dispatch(openErrorSnackbar(error?.response?.data?.message));
    },
  });

  if (isPending || imageUploadLoading) {
    return <CircularProgress />;
  }

  return (
    <Box>
      {editMoviePending && <LinearProgress color="primary" />}
      <Formik
        enableReinitialize
        initialValues={{
          name: movieDetail?.name || "",
          leadActor: movieDetail?.leadActor || "",
          supportingActor: movieDetail?.supportingActor || "",
          director: movieDetail?.director || "",
          country: movieDetail?.country || "",
          genre: movieDetail?.genre || [],
          description: movieDetail?.description || "",
          releasedYear: movieDetail?.releasedYear || 1,
          duration: movieDetail?.duration || 1,
          image: movieDetail?.image || null,
        }}
        validationSchema={addMovieValidationSchema}
        onSubmit={async (values) => {
          let imageUrl = null;
          if (productImage) {
            // cloudinary keys
            const cloudName = "dkm9ich8t";
            const uploadPreset = "digital-cinema";

            const data = new FormData();

            data.append("file", productImage);
            data.append("upload_preset", uploadPreset);
            data.append("cloud_name", cloudName);

            try {
              setImageUploadLoading(true);
              const response = await axios.post(
                `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
                data
              );
              imageUrl = response?.data?.secure_url;
              setImageUploadLoading(false);
              values.image = imageUrl;
            } catch (error) {
              setImageUploadLoading(false);
              console.log(error.message);
            }
          }
          mutate(values);
        }}
      >
        {(formik) => (
          <form
            onSubmit={formik.handleSubmit}
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-around",
              alignItems: "center",
              padding: "1rem",
              gap: "1rem",
              width: "400px",
              boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
            }}
          >
            <Typography variant="h5">Edit Movie</Typography>

            <Stack sx={{ height: "200px" }}>
              <img
                src={localUrl || movieDetail?.image || fallbackImage}
                alt="image"
                height="100%"
              />
            </Stack>

            <FormControl>
              <input
                type="file"
                onChange={(event) => {
                  // console.log(event.target.files);
                  const file = event.target.files[0];
                  setProductImage(file);
                  setLocalUrl(URL.createObjectURL(file));
                }}
              />
            </FormControl>

            <FormControl fullWidth>
              <TextField
                required
                label="Movie name"
                {...formik.getFieldProps("name")}
              />

              {formik.touched.name && formik.errors.name ? (
                <FormHelperText error>{formik.errors.name}</FormHelperText>
              ) : null}
            </FormControl>

            <FormControl fullWidth>
              <TextField
                required
                label="Lead Actor"
                {...formik.getFieldProps("leadActor")}
              />

              {formik.touched.leadActor && formik.errors.leadActor ? (
                <FormHelperText error>{formik.errors.leadActor}</FormHelperText>
              ) : null}
            </FormControl>

            <FormControl fullWidth>
              <TextField
                required
                label="Supporting Actor"
                {...formik.getFieldProps("supportingActor")}
              />
              {formik.touched.supportingActor &&
              formik.errors.supportingActor ? (
                <FormHelperText error>
                  {formik.errors.supportingActor}
                </FormHelperText>
              ) : null}
            </FormControl>

            <FormControl fullWidth>
              <TextField
                label="Director"
                {...formik.getFieldProps("director")}
              />
              {formik.touched.director && formik.errors.director ? (
                <FormHelperText error>{formik.errors.director}</FormHelperText>
              ) : null}
            </FormControl>

            <FormControl fullWidth required>
              <InputLabel>Country</InputLabel>
              <Select label="Country" {...formik.getFieldProps("country")}>
                {movieCountryList.map((item, index) => {
                  return (
                    <MenuItem key={index} value={item}>
                      {item}
                    </MenuItem>
                  );
                })}
              </Select>
              {formik.touched.country && formik.errors.country ? (
                <FormHelperText error>{formik.errors.country}</FormHelperText>
              ) : null}
            </FormControl>

            <FormControl fullWidth required>
              <InputLabel>Genre</InputLabel>
              <Select
                multiple
                value={formik.values.genre}
                onChange={(event) => {
                  const { value } = event.target;
                  formik.setFieldValue("genre", value);
                }}
                renderValue={(selected) => selected.join(", ")}
                onBlur={formik.handleBlur("genre")}
                input={<OutlinedInput label="Genre" />}
              >
                {movieGenreList.map((item, index) => (
                  <MenuItem key={index} value={item}>
                    <Checkbox
                      checked={formik.values.genre.indexOf(item) > -1}
                    />
                    <ListItemText primary={item} />
                  </MenuItem>
                ))}
              </Select>
              {formik.touched.genre && formik.errors.genre ? (
                <FormHelperText error>{formik.errors.genre}</FormHelperText>
              ) : null}
            </FormControl>

            <FormControl fullWidth>
              <TextField
                required
                label="Released year"
                {...formik.getFieldProps("releasedYear")}
              />
              {formik.touched.releasedYear && formik.errors.releasedYear ? (
                <FormHelperText error>
                  {formik.errors.supportingActor}
                </FormHelperText>
              ) : null}
              {/* {console.log(formik.values)} */}
            </FormControl>

            <FormControl fullWidth>
              <TextField
                required
                label="Duration(sec)"
                {...formik.getFieldProps("duration")}
              />
              {formik.touched.duration && formik.errors.duration ? (
                <FormHelperText error>{formik.errors.duration}</FormHelperText>
              ) : null}
            </FormControl>

            <FormControl fullWidth>
              <TextField
                required
                multiline
                rows={8}
                label="Description"
                {...formik.getFieldProps("description")}
              />
              {formik.touched.description && formik.errors.description ? (
                <FormHelperText error>
                  {formik.errors.description}
                </FormHelperText>
              ) : null}
            </FormControl>

            <Button fullWidth type="submit" variant="contained" color="primary">
              Submit
            </Button>
          </form>
        )}
      </Formik>
    </Box>
  );
};

export default EditMovie;
