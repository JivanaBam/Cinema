import { Box, Typography } from "@mui/material";
import React from "react";

const Footer = () => {
  return (
    <Box
      sx={{
        background: "#074173",
        height: "40px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "95vw",
        marginTop: "2rem",
      }}
    >
      <Typography variant="h6" sx={{ color: "#fff" }}>
        Copyright © 2024: Digital cinema
      </Typography>
    </Box>
  );
};

export default Footer;
