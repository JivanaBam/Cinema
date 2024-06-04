import { Box, Typography } from "@mui/material";
import React from "react";

const Footer = () => {
  return (
    <Box
      sx={{
        background: "#074173",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "50px",
      }}
    >
      <Typography variant="h6" sx={{ color: "#fff" }}>
        Copyright © 2024: Digital cinema
      </Typography>
    </Box>
  );
};

export default Footer;
