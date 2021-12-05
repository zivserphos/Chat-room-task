import React, { useContext, useState } from "react";

const ThemeContext = React.createContext();
const ThemeUpdateContext = React.createContext();

export function useThemeUpdate() {
  return useContext(ThemeUpdateContext);
}

export function useThemeContext() {
  return useContext(ThemeContext);
}

export function ThemeProvider({ children }) {
  const [darkTheme, setDarkTheme] = useState("dark-mode");

  function toggleTheme() {
    setDarkTheme((prevDarkTheme) =>
      prevDarkTheme === "dark-mode" ? "bright-mode" : "dark-mode"
    );
  }

  return (
    <ThemeContext.Provider value={darkTheme}>
      <ThemeUpdateContext.Provider value={toggleTheme}>
        {children}
      </ThemeUpdateContext.Provider>
    </ThemeContext.Provider>
  );
}
