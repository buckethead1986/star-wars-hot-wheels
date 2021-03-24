import React, { useReducer } from "react";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MoreVert from "@material-ui/icons/MoreVert";
import Link from "@material-ui/core/Link";
import StarWarsDataGrid from "./StarWarsDataGrid.js";
import { starWarsShips } from "./StarWarsShips.js";

export default function GridItemsContainer(props) {
  const [helpText, toggleHelpText] = useReducer(state => !state, true);
  // Normally with useReducer you pass a value to dispatch to indicate what action to
  // take on the state, but in this case there's only one action.
  // e.g. const [open, toggleHelpText] = useReducer(toggleReducer, true).
  //'toggleReducer' would only ever return !state, because there aren't multiple actions to select from

  //Filters ships based on searchbarValue. Returns an array of exact matches, or an array of partial matches if there are no exact matches.
  const searchbarMatches = () => {
    let exactMatch = [];
    let partialMatch = [];
    const atat = /at[^st]?at?/i; //matches misspellings of AT-AT. 'at', 0-1 symbols besides s or t ('Attack' failed, and AT-ST is it's own regex), a, and 0-1 t's.
    const atst = /at[^a]?st/i; //Same for AT-ST
    const anyWing = /([xyabu]).?w/i; // x|y|a|b|u-wing. Captures x,y,a,b, or u in string.match(anyWing)
    // const atatCheck = atat.test(props.searchbarValue);
    // const atstCheck = atst.test(props.searchbarValue);
    // const anyWingCheck = anyWing.test(props.searchbarValue);

    // Checks for eact name matches first
    exactMatch = starWarsShips.filter(item => {
      return item.name === props.searchbarValue;
    });

    // If no exact matches, checks and filters for AT_AT's, AT-ST's, X|Y|A|B|U-Wing's, and defaults with any name or model number matches.
    if (exactMatch.length === 0) {
      if (atat.test(props.searchbarValue)) {
        partialMatch = starWarsShips.filter(item => {
          return (
            item.name.includes("AT-AT") ||
            item.name.includes("AT-ACT") ||
            item.name.includes("Heavy Assault Walker")
          );
        });
      } else if (atst.test(props.searchbarValue)) {
        partialMatch = starWarsShips.filter(item => {
          return item.name.includes("AT-ST");
        });
      } else if (anyWing.test(props.searchbarValue)) {
        let wingName =
          props.searchbarValue.match(anyWing)[1].toLowerCase() + "-wing";
        partialMatch = starWarsShips.filter(item => {
          return item.name.toLowerCase().includes(wingName);
        });
      } else {
        partialMatch = starWarsShips.filter(item => {
          return (
            item.name
              .toLowerCase()
              .includes(props.searchbarValue.toLowerCase()) ||
            item.model
              .toLowerCase()
              .includes(props.searchbarValue.toLowerCase())
          );
        });
      }
    }

    // exactMatch and partialMatch could be the same variable, but I think it increases readbility/understanding to separate them.
    if (exactMatch.length > 0) {
      return exactMatch;
    } else {
      return partialMatch;
    }
  };

  //Filters ships based on toggled filter parameters from DrawerList.js
  const filteredShips = starWarsShips.filter(item => {
    if (props.filterArray.length === 0) {
      return item;
    } else {
      return (
        (props.filterArray[0].length !== 0
          ? props.filterArray[0].some(f => f(item))
          : item) &&
        (props.filterArray[1].length !== 0
          ? props.filterArray[1].some(f => f(item))
          : item) &&
        (props.filterArray[2].length !== 0
          ? props.filterArray[2].some(f => f(item))
          : item)
      );
    }
  });

  const bulletedHelpList = (
    <ul>
      <li>
        <Typography>
          Filter the results below by using the Search box to the left, or by
          selecting any combination of Production Year, Ship Type, and Faction
          from the dropdown options.
        </Typography>
      </li>
      <li>
        <Typography>
          Click any column header to toggle sorting method: Ascending,
          Descending, or None.
        </Typography>
      </li>
      <li>
        <Typography>
          Select a column menu (
          <IconButton disabled style={{ padding: (0, 0, 3, 0) }}>
            <MoreVert color="primary" fontSize="small" />
          </IconButton>) for more specific sorting, filtering, and to show/hide
          columns.
        </Typography>
      </li>
      <li>
        <Typography>Click on any image to see a larger view.</Typography>
      </li>
    </ul>
  );

  return (
    <Container maxWidth="xl">
      <Typography style={{ marginBottom: "10px" }}>
        Welcome to the Hot Wheels Star Wars Starships Wiki! This is a repository
        for product information, images, and extra content about the collectible
        series.
        <Link underline="none" href="#" onClick={toggleHelpText}>
          {helpText ? " (Close Help)" : " (Open Help)"}
        </Link>
      </Typography>

      {helpText && (
        <div style={{ marginBottom: "10px" }}>{bulletedHelpList}</div>
      )}

      <StarWarsDataGrid
        filteredShips={
          props.searchbarValue.length !== 0 ? searchbarMatches() : filteredShips
        }
      />
    </Container>
  );
}
