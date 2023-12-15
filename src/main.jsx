import React from "react";
// React
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

// GOOGLE ANALYTICS
import ReactGA from "react-ga4";

// React-Router 
import { BrowserRouter } from "react-router-dom";

const TRACKING_ID = import.meta.env.VITE_REACT_GA_ID; // OUR_TRACKING_ID

ReactGA.initialize(TRACKING_ID, { debug: true });

ReactDOM.createRoot(document.getElementById("root")).render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
);
