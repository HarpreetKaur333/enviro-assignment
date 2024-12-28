import React from "react";
import { Box, Typography } from "@mui/material";

const Footer: React.FC = () => {
  return (
    <Box
      style={{
        backgroundColor: "#f5f5f5",
        padding: "10px",
        marginTop: "20px",
        textAlign: "center",
      }}
    >
      <Typography variant="body2">
        &copy; {new Date().getFullYear()} Developed by Harpreet Kaur
      </Typography>
    </Box>
  );
};

export default Footer;
