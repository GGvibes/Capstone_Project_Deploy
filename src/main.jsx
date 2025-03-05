import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import MainPage from "./components/MainPage.jsx";
import App from "./App.jsx"
import LoginSignup from "./components/LoginSignup.jsx";
import AboutPage from "./components/AboutPage.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <React.StrictMode>
      <Routes>
        <Route path="*" element={<App />} />
        <Route path="/login" element={<LoginSignup />} />
        <Route path="/about" element={<AboutPage />} />
      </Routes>
    </React.StrictMode>
  </BrowserRouter>
);
