import React from "react";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";

const Header: React.FC = () => {
  return (
    <AppBar position="static" sx={{ backgroundColor: "#1976d2" }}>
      <Toolbar>
        <Box sx={{ flexGrow: 1 }}>
          <Typography variant="h6" component="div">
            Enviro Integration Strategies
          </Typography>
        </Box>
        <Button
          color="inherit"
          href="https://www.linkedin.com/company/enviro-integration-strategies/"
          target="_blank"
          rel="noopener noreferrer"
        >
          LinkedIn
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
