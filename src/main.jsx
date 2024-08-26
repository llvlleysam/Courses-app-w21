import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import RTL from "./Components/Dir.RTL/RTL.jsx";
import { CssBaseline, ThemeProvider } from "@mui/material";
import theme from "./lib/Theme.js";
import { RouterProvider } from "react-router-dom";
import router from "./Router/Routes/Routes.jsx";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/QueryClient.js";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
    <ThemeProvider theme={theme}>
      <RTL>
        <CssBaseline />
        <RouterProvider router={router} />
      </RTL>
    </ThemeProvider>
    </QueryClientProvider>
  </StrictMode>
);
