import { Box, Stack } from "@mui/material";
import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../component/Header";
import Footer from "../component/Footer";
import CustomSnackbar from "../component/CustomSnackbar";

const MainLayouts = () => {
  return (
    <>
      <Box sx={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
        <Header />
        <Stack
          sx={{
            minHeight: "75vh",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Outlet />
        </Stack>
        <Stack sx={{ width: "1275px" }}>
          <CustomSnackbar />
          <Footer />
        </Stack>
      </Box>
    </>
  );
};

export default MainLayouts;
