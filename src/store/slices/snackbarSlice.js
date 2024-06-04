import { createSlice } from "@reduxjs/toolkit";

export const sncakbarSlice = createSlice({
  name: "snackbar",
  initialState: {
    open: false,
    severity: "",
    message: "",
  },
  reducers: {
    openSuccessSnackbar: (state, action) => {
      state.open = true;
      state.severity = "success";
      state.message = action.payload;
    },
    openErrorSnackbar: (state, action) => {
      state.open = true;
      state.severity = "error";
      state.message = action.payload || "something went wrong!";
    },
    closeSncakbar: (state) => {
      state.open = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const { openSuccessSnackbar, openErrorSnackbar, closeSncakbar } =
  sncakbarSlice.actions;

export default sncakbarSlice.reducer;
