import React from "react";
import { useThemeUpdate, useThemeContext } from "./ThemeContext";

export default function changeMode() {
  const darkTheme = useThemeContext;
  const toggleTheme = useThemeUpdate;
}
