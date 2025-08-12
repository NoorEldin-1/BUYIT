import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./App.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router";
import { store } from "./store.js";
import { Provider } from "react-redux";

export const backendUrl = "http://localhost:8000/api";
export const fileUrl = "http://localhost:8000";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </StrictMode>
);
