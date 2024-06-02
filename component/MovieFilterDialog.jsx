import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
} from "@mui/material";
import { Formik } from "formik";
import React from "react";
import { movieFilterValidationSchema } from "../validationSchema/movieFilterValidationSchema";
import {
  movieCountryList,
  movieGenreList,
} from "../constants/general.constants";

const MovieFilterDialog = () => {
  const [open, setOpen] = React.useState(false);

  // const handleClickOpen = () => {
  //   setOpen(true);
  // };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      {/* <Button variant="contained" onClick={handleClickOpen}>
        Filter movie
      </Button> */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Filter</DialogTitle>
        <DialogContent>
          <Formik
            initialValues={{ country: "", genre: [] }}
            validationSchema={movieFilterValidationSchema}
            onSubmit={(values) => {
              console.log(values);
            }}
          >
            {(formik) => {
              <form
                onSubmit={formik.handleSubmit}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-around",
                  padding: "1rem",
                  gap: "1rem",
                  width: "400px",
                }}
              >
                <FormControl fullWidth>
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
                </FormControl>

                <FormControl fullWidth>
                  <InputLabel>Genre</InputLabel>
                  <Select label="Genre" {...formik.getFieldProps("genre")}>
                    {movieGenreList.map((item, index) => {
                      return (
                        <MenuItem key={index} value={item}>
                          {item}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>

                <Stack direction="row" justifyContent="flex-end" spacing={2}>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={handleClose}
                  >
                    Cancel
                  </Button>
                  <Button variant="contained" type="submit">
                    Submit
                  </Button>
                </Stack>
              </form>;
            }}
          </Formik>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default MovieFilterDialog;
