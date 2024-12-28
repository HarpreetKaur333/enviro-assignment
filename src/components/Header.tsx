import React from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";

const Header: React.FC = () => {
  return (
    <AppBar position="static" sx={{ backgroundColor: "#1976d2" }}>
    <Toolbar>
      <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
        Enviro Integration Strategies
      </Typography>
      <Button
        color="inherit"
        href="https://www.linkedin.com/company/enviro-integration-strategies/"
        target="_blank"
      >
        LinkedIn
      </Button>
    </Toolbar>
    </AppBar>
  );
};

export default Header;
