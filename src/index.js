import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import CryptoProvider from "./Context/CryptoProvider";
import "react-alice-carousel/lib/alice-carousel.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <CryptoProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </CryptoProvider>
);
