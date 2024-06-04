import { Stack } from "@mui/material";
import React from "react";
import { Outlet } from "react-router-dom";
import CustomSnackbar from "../component/CustomSnackbar";

const MiniLayout = () => {
  return (
    <>
      <CustomSnackbar />
      <Stack
        sx={{
          height: "100vh",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Outlet />
      </Stack>
    </>
  );
};

export default MiniLayout;
