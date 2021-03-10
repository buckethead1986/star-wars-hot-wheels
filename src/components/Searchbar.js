import React from "react";
// import { fade, makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from "@material-ui/icons/Search";
// import ClearIcon from "@material-ui/icons/Clear";
// import Autocomplete from "@material-ui/lab/Autocomplete";
// import { starWarsShips } from "./StarWarsShips.js";

// const useStyles = makeStyles(theme => ({
//   root: {
//     border: "1px solid #e2e2e1",
//     overflow: "hidden",
//     borderRadius: 4,
//     backgroundColor: "#fcfcfb",
//     transition: theme.transitions.create(["border-color", "box-shadow"]),
//     "&:hover": {
//       backgroundColor: "#fff"
//     },
//     "&$focused": {
//       backgroundColor: "#fff",
//       boxShadow: `${fade(theme.palette.primary.main, 0.25)} 0 0 0 2px`,
//       borderColor: theme.palette.primary.main
//     }
//   },
//   focused: {}
// }));

export default function SearchBox(props) {
  // const classes = useStyles();

  return (
    <TextField
      style={{ marginTop: "2%" }}
      margin="dense"
      id="outlined-search"
      placeholder="Search"
      type="search"
      variant="outlined"
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        )
      }}
      onChange={event => {
        props.handleSearchbarData(
          event.target.value !== null || undefined
            ? event.target.value.trim()
            : ""
        );
      }}
    />
  );
}
