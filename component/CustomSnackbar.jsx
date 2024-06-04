import * as React from "react";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { useDispatch, useSelector } from "react-redux";
import { closeSncakbar } from "../src/store/slices/snackbarSlice";

const CustomSnackbar = () => {
  const values = useSelector((state) => state.snackbar);
  //   console.log(values);

  const dispatch = useDispatch();
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    dispatch(closeSncakbar());
  };

  return (
    <div>
      <Snackbar
        open={values.open}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert
          onClose={handleClose}
          severity={values.severity}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {values.message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default CustomSnackbar;
