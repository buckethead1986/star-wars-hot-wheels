import React from "react";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import StarWarsDataGrid from "./StarWarsDataGrid.js";
import { starWarsShips } from "./StarWarsShips.js";

//tests search input against regex for common mispellings of X-Wing, Y-Wing, AT-AT, etc.
const searchbarRegex = string => {
  // let lowerCaseString =
  //   string !== null || undefined ? string.toLowerCase() : "";
  let variable = string.substring(0, 1);
  let regexChecker = dynamicRegexCreator(variable); //makes regex for x-wing, bwing, u.wing, S=wing, etc.
  const atat = /^at[^s]?at?/gi; //matches misspellings of AT-AT.
  // ^at: Any word starting with 'at'
  //[^s]: zero to one symbol that isn't 's'
  //a: a
  //t?: zero to one 't'
  //'g' is global, 'i' is case insensitive
  const atst = /^at[^a]?st/gi; //Same for AT-ST

  if (regexChecker.test(string)) {
    let substring = variable + "-wing";
    return substring;
  } else if (atat.test(string)) {
    return "at-a"; //not at-at, so 'AT-ACT' matches. Trust me, it's an AT-AT.
  } else if (atst.test(string)) {
    return "at-st";
  } else {
    return string;
  }
};

//makes regex for x, y, b, u, a-wing misspellings: xwing, x=wing, x wing, etc.
const dynamicRegexCreator = variable => {
  const regex = new RegExp("^" + variable + ".?w");
  return regex;
};

//filters starWarsShips by year, type, and faction, or by searchbarValue (name or model code) if it was most recently used
//e.g. all Rebel Capital Ships, or Imperial ships from 2016 and 2017 that are also Walkers or TIE Fighters.
//searchbarValue is checked against common misspellings of names in searchbarRegex function above.
export default function GridItemsContainer(props) {
  const filteredShips = starWarsShips.filter(item => {
    if (props.searchbarValue.length !== 0) {
      return (
        item.name
          .toLowerCase()
          .includes(searchbarRegex(props.searchbarValue)) ||
        item.model.toLowerCase().includes(props.searchbarValue.toLowerCase())
      );
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
      <Typography>
        Welcome to the Hot Wheels Star Wars Starships Wiki!
      </Typography>
      <Typography style={{ marginBottom: 20 }}>
        Filter the results below by using the Search box to the left, or by
        selecting any combination of Production Year, Ship Type, and Faction
        from the dropdown options.
      </Typography>
      <StarWarsDataGrid filteredShips={filteredShips} />
    </Container>
  );
}
