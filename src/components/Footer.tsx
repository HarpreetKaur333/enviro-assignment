import React from "react";
import { Box, Typography } from "@mui/material";

const Footer: React.FC = () => {
  return (
    <Box
      sx={{
        backgroundColor: "#f5f5f5",
        padding: "10px",
        marginTop: "20px",
        textAlign: "center",
      }}
    >
      <Typography variant="body2" color="textSecondary">
        &copy; {new Date().getFullYear()} Enviro Integration Strategies. All rights reserved.
      </Typography>
    </Box>
  );
};

export default Footer;
