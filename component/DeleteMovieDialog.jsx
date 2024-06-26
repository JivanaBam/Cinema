import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import $axios from "../axios/axios.instance";
import { CircularProgress } from "@mui/material";
import { useDispatch } from "react-redux";
import { openSuccessSnackbar } from "../src/store/slices/snackbarSlice";

const DeleteMovieDialog = () => {
  const dispatch = useDispatch();
  const params = useParams();
  // console.log(params);
  const movieId = params?.id;
  // console.log(movieId);

  const navigate = useNavigate();

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // delete api hit
  const { isPending, mutate } = useMutation({
    mutationKey: ["delte-movie"],
    mutationFn: async () => {
      return await $axios.delete(`/delete/movie/${movieId}`);
    },

    onSuccess: (res) => {
      navigate("/movie");
      dispatch(openSuccessSnackbar(res?.data?.message));
    },
    onError: (error) => {
      dispatch(openErrorSnackbar(error?.response?.data?.message));
    },
  });

  if (isPending) {
    return <CircularProgress />;
  }

  return (
    <React.Fragment>
      <Button
        variant="outlined"
        color="error"
        startIcon={<DeleteIcon />}
        fullWidth
        onClick={handleClickOpen}
      >
        Delete
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {`Are you sure you want to delete this product?`}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            This process is irreversible. Product is permanently deleted after
            this action.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={handleClose} color="success">
            No
          </Button>
          <Button
            variant="contained"
            onClick={() => {
              mutate();
              handleClose();
            }}
            autoFocus
            color="error"
          >
            Yes
          </Button>
        </DialogActions>
      </Dialog>{" "}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {`Are you sure you want to delete this product?`}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            This process is irreversible. Product is permanently deleted after
            this action.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={handleClose} color="success">
            No
          </Button>
          <Button
            variant="contained"
            onClick={() => {
              mutate();
              handleClose();
            }}
            autoFocus
            color="error"
          >
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

export default DeleteMovieDialog;
