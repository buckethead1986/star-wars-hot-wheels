import React from "react";
import { fade, makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { starWarsShips } from "./StarWarsShips.js";

const useStyles = makeStyles(theme => ({
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
}));

export default function SearchBox(props) {
  // const classes = useStyles();

  return (
    <Autocomplete
      id="star-wars-searchbar"
      freeSolo
      onChange={(event, value) => {
        props.handleSearchbarData(
          value !== null || undefined ? value.trim() : ""
        );
      }}
      options={[...new Set(starWarsShips.map(ship => ship.name))].sort()} //Removes duplicate names, and sorts options alphabetically
      renderInput={params => (
        <TextField
          // classes={{ root: classes.root }}
          style={{
            position: "relative"
          }}
          {...params}
          placeholder="Search"
          margin="dense"
          variant="outlined"
        />
      )}
    />
  );
}
