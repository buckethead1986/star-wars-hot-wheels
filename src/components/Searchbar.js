/* eslint-disable no-use-before-define */
import React from "react";
import { fade, makeStyles, useTheme } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import SearchIcon from "@material-ui/icons/Search";
import InputBase from "@material-ui/core/InputBase";

import starWarsShips from "./StarWarsShips.js";

const useStyles = makeStyles(theme => ({
  root: {
    border: "1px solid #e2e2e1",
    overflow: "hidden",
    borderRadius: 4,
    backgroundColor: "#fcfcfb",
    transition: theme.transitions.create(["border-color", "box-shadow"]),
    "&:hover": {
      backgroundColor: "#fff"
    },
    "&$focused": {
      backgroundColor: "#fff",
      boxShadow: `${fade(theme.palette.primary.main, 0.25)} 0 0 0 2px`,
      borderColor: theme.palette.primary.main
    }
  },
  focused: {}
  // searchIcon: {
  //   padding: theme.spacing(0, 2),
  //   height: "100%",
  //   position: "absolute",
  //   pointerEvents: "none",
  //   display: "flex",
  //   alignItems: "center",
  //   justifyContent: "center"
  // },
  // inputRoot: {
  //   color: "inherit"
  // },
  // inputInput: {
  //   padding: theme.spacing(1, 1, 1, 1),
  //   // vertical padding + font size from searchIcon
  //   paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
  //   transition: theme.transitions.create("width"),
  //   width: "100%",
  //   [theme.breakpoints.up("sm")]: {
  //     width: "12ch",
  //     "&:focus": {
  //       width: "20ch"
  //     }
  // }
  // }
}));

const searchbarRegex = string => {
  //tests search input against regex for common mispellings of X-Wing, Y-Wing, AT-AT, etc.
  let lowerCaseString = string != undefined ? string.toLowerCase() : "";
  let variable = lowerCaseString.substring(0, 1);
  let regexChecker = dynamicRegexCreator(lowerCaseString, variable);
  const atst = /^at.?st/;
  const atat = /^at.?at/; //simplified version of below with string set to lowercase
  // const atat = /^[Aa][Tt].?[Aa][Tt]/ //matches misspellings of AT-AT. Capital or lowercase 'AT's, with any character or no character in between
  if (regexChecker.test(lowerCaseString)) {
    let substring = variable + "-wing";
    return substring;
  } else if (atst.test(lowerCaseString)) {
    return "at-st";
  } else if (atat.test(lowerCaseString)) {
    return "at-at";
  } else {
    return lowerCaseString;
  }
};

//makes regex for x, y, b, u, a-wing misspellings: xwing, x=wing, x wing, etc.
const dynamicRegexCreator = (lowerCaseString, variable) => {
  const regex = new RegExp("^" + variable + ".?w");
  return regex;
};

export default function SearchBox(props) {
  const classes = useStyles();
  const theme = useTheme();

  return (
    <Autocomplete
      id="free-solo-demo"
      freeSolo
      onChange={(event, value) => {
        props.handleSearchbarData(searchbarRegex(value));
      }}
      options={starWarsShips.starWarsShips2.map(ship => ship.name)}
      renderInput={params => (
        <div>
          <TextField
            classes={{ root: classes.root }}
            style={{
              position: "relative"
            }}
            {...params}
            placeholder="Search"
            margin="dense"
            variant="outlined"
          />
        </div>
      )}
    />
  );
}
