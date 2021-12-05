import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../../styles/theme.scss";
import { useThemeContext } from "./ThemeContext";
import { ThemeProvider } from "./ThemeContext";

export default function Layout({ children }) {
  const darkTheme = useThemeContext();

  return (
    <div className={`layout ${darkTheme}`}>
      <Header />
      {children}
      {/* <Footer /> */}
    </div>
  );
}
