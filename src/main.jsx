import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import Home from "./App.jsx";

import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import Service from "./components/Service.jsx";

createRoot(document.getElementById("root")).render(
  // <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  // {/* </StrictMode> */}
);
