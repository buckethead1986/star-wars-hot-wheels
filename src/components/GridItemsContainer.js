import React from "react";
// import CssBaseline from "@material-ui/core/CssBaseline";
// import { makeStyles } from "@material-ui/core/Styles";
import Container from "@material-ui/core/Container";
// import Grid from "@material-ui/core/Grid";
import StarWarsDataGrid from "./StarWarsDataGrid.js";
import StarWarsPaperGrid from "./StarWarsPaperGrid.js";
import { starWarsShips } from "./StarWarsShips2.js";

export default function GridItemsContainer(props) {
  //filters starWarsShips by year, type, and faction, or by searchbarValue if it was most recently used
  //e.g. all Rebel Capital Ships, or Imperial ships from 2016 and 2017 that are also Walkers or TIE Fighters.
  const filteredShips = starWarsShips.filter(item => {
    if (props.searchbarValue.length !== 0) {
      return item.name
        .toLowerCase()
        .includes(props.searchbarValue.toLowerCase());
    } else {
      if (props.shipFilter.filterArray.length === 0) {
        return item;
      } else {
        return (
          (props.shipFilter.filterArray[0].length !== 0
            ? props.shipFilter.filterArray[0].some(f => f(item))
            : item) &&
          (props.shipFilter.filterArray[1].length !== 0
            ? props.shipFilter.filterArray[1].some(f => f(item))
            : item) &&
          (props.shipFilter.filterArray[2].length !== 0
            ? props.shipFilter.filterArray[2].some(f => f(item))
            : item)
        );
      }
    }
  });

  return (
    <Container maxWidth="xl">
      <StarWarsDataGrid filteredShips={filteredShips} />
      <StarWarsPaperGrid filteredShips={filteredShips} />
    </Container>
  );
}
