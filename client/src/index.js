import React, { Children } from "react";
import ReactDOM from "react-dom";
import "./styles/common.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import Layout from "./core/context/Layout";

ReactDOM.render(
  <React.StrictMode>
    {/* <Layout> */}
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<HomePage />} />
      </Routes>
    </BrowserRouter>
    {/* </Layout> */}
  </React.StrictMode>,
  document.getElementById("root")
);
