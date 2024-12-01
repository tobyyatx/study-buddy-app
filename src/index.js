// src/index.js

import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";

// Custom theme (Material UI)
const theme = createTheme({
  palette: {
    primary: {
      main: "#7f1717",
    },
    secondary: {
      main: "#ece6f0",
    },
  },
});

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <App />
  </ThemeProvider>,
  document.getElementById("root")
);