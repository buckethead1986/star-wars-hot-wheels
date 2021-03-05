import React from "react";
import Container from "@material-ui/core/Container";
import StarWarsDataGrid from "./StarWarsDataGrid.js";
import StarWarsPaperGrid from "./paperComponents/StarWarsPaperGrid.js";
import { starWarsShips } from "./StarWarsShips3.js";

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
      <StarWarsDataGrid filteredShips={filteredShips} />
    </Container>
  );
}
