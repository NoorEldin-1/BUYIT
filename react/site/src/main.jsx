import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./App.css";
import App from "./App.jsx";
import { createTheme, ThemeProvider } from "@mui/material";
import { BrowserRouter } from "react-router";
import { store } from "./store/store.js";
import { Provider } from "react-redux";

export const backendUrl = "http://localhost:8000/api/";
export const fileUrl = "http://localhost:8000";

const theme = createTheme({
  typography: {
    fontFamily: "Rubik",
  },
  palette: {
    primary: {
      main: "#ad1457",
    },
  },
});

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <App />
        </Provider>
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>
);
