import React, { useReducer } from "react";
import Drawer from "./Drawer.js";

//using useReducer
const testFunctions = {
  year: {
    "2015": ship => ship.year === 2015,
    "2016": ship => ship.year === 2016,
    "2017": ship => ship.year === 2017,
    "2018": ship => ship.year === 2018,
    "2019": ship => ship.year === 2019
    // "2020": { selected: false, function: ship => ship.year === 2020 }
  },
  type: {
    "Capital Ship": ship => ship.type.indexOf("Capital Ship") !== -1,
    Walker: ship => ship.type.indexOf("Walker") !== -1,
    Speeder: ship => ship.type.indexOf("Speeder") !== -1,
    Fighter: ship => ship.type.indexOf("Fighter") !== -1,
    Shuttle: ship => ship.type.indexOf("Shuttle") !== -1,
    "X-Wing": ship => ship.class.indexOf("X-Wing") !== -1,
    "TIE Fighter": ship => ship.class.indexOf("TIE") !== -1,
    Concept: ship => ship.special.indexOf("Concept") !== -1,
    Commemorative: ship => ship.special.indexOf("Commemorative") !== -1
  },
  faction: {
    Rebel: ship => ship.faction.indexOf("Rebel") !== -1,
    Imperial: ship => ship.faction.indexOf("Imperial") !== -1,
    Republic: ship => ship.faction.indexOf("Republic") !== -1,
    Resistance: ship => ship.faction.indexOf("Resistance") !== -1,
    "First Order": ship => ship.faction.indexOf("First Order") !== -1,
    Unaffiliated: ship => ship.faction.indexOf("Unaffiliated") !== -1
  }
};

const initialState = {
  year: {
    "2015": false,
    "2016": false,
    "2017": false,
    "2018": false,
    "2019": false
    // "2020": { selected: false, function: ship => ship.year === 2020 }
  },
  type: {
    "Capital Ship": false,
    Walker: false,
    Speeder: false,
    Fighter: false,
    Shuttle: false,
    "X-Wing": false,
    "TIE Fighter": false,
    Concept: false,
    Commemorative: false
  },
  faction: {
    Rebel: false,
    Imperial: false,
    Republic: false,
    Resistance: false,
    "First Order": false,
    Unaffiliated: false
  },
  filterArray: [],
  searchbarValue: ""
};

const filterReducer = (state, action) => {
  switch (action.type) {
    case "TOGGLE_SELECTION":
      // console.log(state);
      return {
        ...state,
        [action.category]: {
          ...state[action.category],
          [action.name]: !state[action.category][action.name]
        }
      };
    case "CHANGE_SEARCHBAR_DATA":
      return {
        ...state,
        searchbarValue:
          action.searchbarValue !== undefined ? action.searchbarValue : ""
      };
    case "CREATE_FILTERS":
      return {
        ...state,
        searchbarValue: "",
        filterArray: ["year", "type", "faction"].map(value => {
          let arr = [];
          for (const filter in state[value]) {
            if (state[value][filter]) {
              arr.push(testFunctions[value][filter]);
            }
          }
          return arr;
        })
      };
    default:
      return state;
  }
};

export default function Container() {
  // const [searchbarValue, setSearchbarValue] = React.useState("");
  const [state, dispatch] = useReducer(filterReducer, initialState);

  const handleFilterSelection = (item, name) => {
    dispatch({
      type: "TOGGLE_SELECTION",
      category: item,
      name: name
    });
    dispatch({
      type: "CREATE_FILTERS"
    });
  };

  const changeSearchbarData = searchbarValue => {
    dispatch({
      type: "CHANGE_SEARCHBAR_DATA",
      searchbarValue: searchbarValue
    });
  };

  //using useState
  // const [shipFilter, setShipFilter] = React.useState({
  //   //state containing toggles for selected filters from drawer.js, and functions to filter StarWarsShips.js with when 'selected' is true
  //   filterParameters: {
  //     year: {
  //       "2015": { selected: false, function: ship => ship.year === 2015 },
  //       "2016": { selected: false, function: ship => ship.year === 2016 },
  //       "2017": { selected: false, function: ship => ship.year === 2017 },
  //       "2018": { selected: false, function: ship => ship.year === 2018 },
  //       "2019": { selected: false, function: ship => ship.year === 2019 }
  //       // "2020": { selected: false, function: ship => ship.year === 2020 }
  //     },
  //     type: {
  //       "Capital Ship": {
  //         selected: false,
  //         function: ship => ship.type.indexOf("Capital Ship") !== -1
  //       },
  //       Walker: {
  //         selected: false,
  //         function: ship => ship.type.indexOf("Walker") !== -1
  //       },
  //       Speeder: {
  //         selected: false,
  //         function: ship => ship.type.indexOf("Speeder") !== -1
  //       },
  //       Fighter: {
  //         selected: false,
  //         function: ship => ship.type.indexOf("Fighter") !== -1
  //       },
  //       Shuttle: {
  //         selected: false,
  //         function: ship => ship.type.indexOf("Shuttle") !== -1
  //       },
  //       "X-Wing": {
  //         selected: false,
  //         function: ship => ship.class.indexOf("X-Wing") !== -1
  //       },
  //       "TIE Fighter": {
  //         selected: false,
  //         function: ship => ship.class.indexOf("TIE") !== -1
  //       },
  //       Concept: {
  //         selected: false,
  //         function: ship => ship.special.indexOf("Concept") !== -1
  //       },
  //       Commemorative: {
  //         selected: false,
  //         function: ship => ship.special.indexOf("Commemorative") !== -1
  //       }
  //     },
  //     faction: {
  //       Rebel: {
  //         selected: false,
  //         function: ship => ship.faction.indexOf("Rebel") !== -1
  //       },
  //       Imperial: {
  //         selected: false,
  //         function: ship => ship.faction.indexOf("Imperial") !== -1
  //       },
  //       Republic: {
  //         selected: false,
  //         function: ship => ship.faction.indexOf("Republic") !== -1
  //       },
  //       Resistance: {
  //         selected: false,
  //         function: ship => ship.faction.indexOf("Resistance") !== -1
  //       },
  //       "First Order": {
  //         selected: false,
  //         function: ship => ship.faction.indexOf("First Order") !== -1
  //       },
  //       Unaffiliated: {
  //         selected: false,
  //         function: ship => ship.faction.indexOf("Unaffiliated") !== -1
  //       }
  //     }
  //   },
  //   filterArray: []
  // });
  //
  // const handleSearchbarData = searchbarData => {
  //   setSearchbarValue(searchbarData !== undefined ? searchbarData : "");
  // };
  //
  // // Toggles selected DrawerList.js filters and updates shipFilter.filterArray
  // const handleShipFilter = (shipFilterSelection, shipFilterType) => {
  //   let filterParametersCopy = { ...shipFilter.filterParameters };
  //   //toggles selections
  //   if (shipFilterSelection !== undefined) {
  //     filterParametersCopy[shipFilterType][shipFilterSelection].selected
  //       ? (filterParametersCopy[shipFilterType][
  //           shipFilterSelection
  //         ].selected = false)
  //       : (filterParametersCopy[shipFilterType][
  //           shipFilterSelection
  //         ].selected = true);
  //   }
  //   //creates array of filterFunctions
  //   let filterFunctionsArray = ["year", "type", "faction"].map(value => {
  //     let obj = Object.values(filterParametersCopy[value]);
  //     let arr = [];
  //     obj.forEach(x => {
  //       if (x.selected) {
  //         arr.push(x.function);
  //       }
  //     });
  //     return arr;
  //   });
  //
  //   setShipFilter(
  //     {
  //       ...shipFilter,
  //       filterParameters: filterParametersCopy,
  //       filterArray: filterFunctionsArray
  //     }
  //   );
  //   setSearchbarValue("");
  // };

  return (
    <div>
      <Drawer
        handleFilterSelection={handleFilterSelection}
        changeSearchbarData={changeSearchbarData}
        filterArray={state.filterArray}
        searchbarValue={state.searchbarValue}
      />
    </div>
  );
}
