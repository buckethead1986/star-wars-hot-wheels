import React from "react";
import { fade, makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { starWarsShips } from "./StarWarsShips2.js";

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
}));

//tests search input against regex for common mispellings of X-Wing, Y-Wing, AT-AT, etc.
const searchbarRegex = string => {
  let lowerCaseString =
    string !== null || undefined ? string.toLowerCase() : "";
  let variable = lowerCaseString.substring(0, 1);
  let regexChecker = dynamicRegexCreator(lowerCaseString, variable);
  //matches misspellings of AT-AT. Capital or lowercase 'AT's, with any character or no character in between
  const atst = /^at.?st/;
  const atat = /^at.?at/;
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

  return (
    <Autocomplete
      id="star-wars-searchbar"
      freeSolo
      onChange={(event, value) => {
        props.handleSearchbarData(searchbarRegex(value));
      }}
      options={starWarsShips.map(ship => ship.name)}
      renderInput={params => (
        <div>
          <TextField
            classes={{ root: classes.root }}
            style={{
              //remove width parameter for searchbar inside drawer
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
