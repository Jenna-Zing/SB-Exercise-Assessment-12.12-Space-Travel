import React from "react";
import ReactDOM from "react-dom/client";

import "./index.css";

import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* BrowserRouter must be outside the App because it controls the entire navigation system.
		     This means all components inside <App /> have access to the routing, and all routes and navigate work */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
