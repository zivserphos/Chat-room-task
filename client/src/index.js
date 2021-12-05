import React, { Children } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import SignUp from "./pages/signUp.jsx";
import Layout from "./core/context/Layout";
import { ThemeProvider } from "./core/context/ThemeContext";

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider>
      <Layout>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/" element={<HomePage />} />
            <Route path="/signup" element={<SignUp />} />
          </Routes>
        </BrowserRouter>
      </Layout>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
