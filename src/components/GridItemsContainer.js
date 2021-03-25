import React, { useReducer } from "react";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MoreVert from "@material-ui/icons/MoreVert";
import Link from "@material-ui/core/Link";
import StarWarsDataGrid from "./StarWarsDataGrid.js";
import { starWarsShips } from "./StarWarsShips.js";

export default function GridItemsContainer(props) {
  const searchbarValue = props.searchbarValue;
  const [helpText, toggleHelpText] = useReducer(state => !state, true);
  //No separate reducer function needed, as there's only one action to take on the state, toggling state to !state
  //useState would be fine, but I decided to use useReducer throughout this App

  //Filters ships based on searchbarValue. Returns an array of exact matches, or an array of partial matches if there are no exact matches.
  const searchbarMatches = () => {
    let matches = [];
    const atat = /at[^st]?at?/i; //matches misspellings of AT-AT. 'at', 0-1 symbols besides s or t ('Attack' failed, and AT-ST is it's own regex), a, and 0-1 t's.
    const atst = /at[^a]?st/i; //Same for AT-ST
    const anyWing = /([xyabu]).?w/i; // x|y|a|b|u-wing. Captures x,y,a,b, or u in string.match(anyWing)
    const atatCheck = atat.test(searchbarValue);
    const atstCheck = atst.test(searchbarValue);
    const anyWingCheck = anyWing.test(searchbarValue);

    // Checks for eact name matches first (For selections from the searchBar suggestions)
    matches = starWarsShips.filter(item => {
      return item.name === searchbarValue;
    });

    // If no exact matches, checks and filters for AT_AT's, AT-ST's, X|Y|A|B|U-Wing's, and defaults with any name or model number matches.
    if (matches.length === 0) {
      if (atatCheck) {
        matches = starWarsShips.filter(item => {
          return (
            item.name.includes("AT-AT") ||
            item.name.includes("AT-ACT") ||
            item.name.includes("Heavy Assault Walker") //It's an AT-AT, but there wasn't a good way to filter for it besides hardcoding it in
          );
        });
      } else if (atstCheck) {
        matches = starWarsShips.filter(item => {
          return item.name.includes("AT-ST");
        });
      } else if (anyWingCheck) {
        let wingName = searchbarValue.match(anyWing)[1].toLowerCase() + "-wing"; //modifies any misspellings, using captured letter from 'anyWing' regex
        matches = starWarsShips.filter(item => {
          return item.name.toLowerCase().includes(wingName);
        });
      } else {
        matches = starWarsShips.filter(item => {
          return (
            item.name.toLowerCase().includes(searchbarValue.toLowerCase()) ||
            item.model.toLowerCase().includes(searchbarValue.toLowerCase())
          );
        });
      }
    }
    return matches;
  };

  //Filters ships based on toggled filter options from DrawerList.js, sent up to Container.js,
  //with the corresponding filterFunctions passed down as filterArray[[Year Filters], [Ship Filters], [Faction Filters]]
  //Returns results that match any selected Years AND any selected ship types AND any selected Factions.
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
          searchbarValue.length !== 0 ? searchbarMatches() : filteredShips
        }
      />
    </Container>
  );
}
