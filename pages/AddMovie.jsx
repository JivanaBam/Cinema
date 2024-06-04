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
import addMovieValidationSchema from "../validationSchema/add.movie.validation.schema";
import {
  movieCountryList,
  movieGenreList,
} from "../constants/general.constants";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import $axios from "../axios/axios.instance";
import { CheckBox } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import {
  openErrorSnackbar,
  openSuccessSnackbar,
} from "../src/store/slices/snackbarSlice";
import axios from "axios";

const AddMovie = () => {
  const [productImage, setProductImage] = useState(null);
  const [localUrl, setLocalUrl] = useState("");
  // console.log(localUrl);
  const [imageUploadLoading, setImageUploadLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isPending, mutate } = useMutation({
    mutationKey: ["add-movie"],
    mutationFn: async (values) => {
      return await $axios.post("/add/movie", values);
    },
    onSuccess: (res) => {
      navigate("/movie");
      // console.log(res);
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
    <>
      <Box>
        <Formik
          initialValues={{
            name: "",
            leadActor: "",
            supportingActor: "",
            country: "",
            genre: [],
            description: "",
            releasedYear: 0,
            duration: 1,
            image: null,
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
              } catch (error) {
                setImageUploadLoading(false);
                console.log(error.message);
              }
            }

            values.image = imageUrl;
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
              <Typography variant="h5">Add Movie</Typography>

              {localUrl && (
                <Stack sx={{ height: "200px" }}>
                  <img src={localUrl} alt="image" height="100%" />
                </Stack>
              )}

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
                  <FormHelperText error>
                    {formik.errors.leadActor}
                  </FormHelperText>
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
              </FormControl>

              <FormControl fullWidth>
                <TextField
                  required
                  label="Duration"
                  {...formik.getFieldProps("duration")}
                />
                {formik.touched.duration && formik.errors.duration ? (
                  <FormHelperText error>
                    {formik.errors.duration}
                  </FormHelperText>
                ) : null}
              </FormControl>

              <FormControl fullWidth>
                <TextField
                  required
                  multiline
                  rows={4}
                  label="Description"
                  {...formik.getFieldProps("description")}
                />
                {formik.touched.description && formik.errors.description ? (
                  <FormHelperText error>
                    {formik.errors.description}
                  </FormHelperText>
                ) : null}
              </FormControl>
              <Button
                fullWidth
                type="submit"
                variant="contained"
                color="primary"
              >
                Submit
              </Button>
            </form>
          )}
        </Formik>
      </Box>
    </>
  );
};

export default AddMovie;
