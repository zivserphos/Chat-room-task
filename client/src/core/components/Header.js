import React from "react";
import {
  AppBar,
  Toolbar,
  Avatar,
  Typography,
  InputBase,
  styled,
  alpha,
} from "@mui/material";

import "../../styles/footer.scss";
import SearchIcon from "@material-ui/icons/Search";
import { format } from "date-fns";

import { useThemeUpdate } from "../context/ThemeContext";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

const StyledAvatar = styled(Avatar)(({ theme }) => ({
  marginLeft: "50%",
}));

export default function Header(props) {
  const toggleTheme = useThemeUpdate();
  return (
    <AppBar style={{ backgroundColor: "rgb(41, 38, 38)" }} position="sticky">
      <Toolbar>
        <Typography>Today is the {format(new Date(), "do MMMM Y")}</Typography>
        <Search>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            onInput={(e) => {
              props.FilterTickets(e.target.value);
            }}
            placeholder="Search…"
            inputProps={{ "aria-label": "search" }}
            id="searchInput"
            autoComplete="off"
          />
        </Search>
        <button className="theme toggle" onClick={toggleTheme}>
          D L
        </button>
        <StyledAvatar id="styled-avatar" />
      </Toolbar>
    </AppBar>
  );
}
