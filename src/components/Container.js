import React from "react";
import Drawer from "./Drawer.js";

export default function Container() {
  const [searchbarValue, setSearchbarValue] = React.useState("");
  const [shipFilter, setShipFilter] = React.useState({
    filterParameters: {
      year: {
        "2016": { selected: false, function: ship => ship.year === 2016 },
        "2017": { selected: false, function: ship => ship.year === 2017 },
        "2018": { selected: false, function: ship => ship.year === 2018 },
        "2019": { selected: false, function: ship => ship.year === 2019 },
        "2020": { selected: false, function: ship => ship.year === 2020 }
      },
      type: {
        "Capital Ship": {
          selected: false,
          function: ship => ship.type.indexOf("Capital Ship") !== -1
        },
        Walker: {
          selected: false,
          function: ship => ship.type.indexOf("Walker") !== -1
        },
        Speeder: {
          selected: false,
          function: ship => ship.type.indexOf("Speeder") !== -1
        },
        Fighter: {
          selected: false,
          function: ship => ship.type.indexOf("Fighter") !== -1
        },
        "X-Wing": {
          selected: false,
          function: ship => ship.type.indexOf("X-Wing") !== -1
        },
        "TIE Fighter": {
          selected: false,
          function: ship => ship.type.indexOf("TIE Fighter") !== -1
        }
      },
      faction: {
        Imperial: {
          selected: false,
          function: ship => ship.faction.indexOf("Imperial") !== -1
        },
        Rebel: {
          selected: false,
          function: ship => ship.faction.indexOf("Rebel") !== -1
        },
        "Bounty Hunter": {
          selected: false,
          function: ship => ship.faction.indexOf("Bounty Hunter") !== -1
        },
        Smuggler: {
          selected: false,
          function: ship => ship.faction.indexOf("Smuggler") !== -1
        }
      }
    },
    filterArray: []
  });

  const handleSearchbarData = searchbarData => {
    setSearchbarValue(searchbarData !== undefined ? searchbarData : "");
  };

  //Toggles selected DrawerList.js filters and updates shipFilter.filterArray
  const handleShipFilter = (shipFilterSelection, shipFilterType) => {
    let filterParametersCopy = { ...shipFilter.filterParameters };

    //toggles selections
    if (shipFilterSelection !== undefined) {
      filterParametersCopy[shipFilterType][shipFilterSelection].selected
        ? (filterParametersCopy[shipFilterType][
            shipFilterSelection
          ].selected = false)
        : (filterParametersCopy[shipFilterType][
            shipFilterSelection
          ].selected = true);
    }

    //creates array of filterFunctions
    let filterFunctionsArray = ["year", "type", "faction"].map(value => {
      let obj = Object.values(filterParametersCopy[value]);
      let arr = [];
      obj.forEach(x => {
        if (x.selected) {
          arr.push(x.function);
        }
      });
      return arr;
    });

    setShipFilter({
      ...shipFilter,
      filterParameters: filterParametersCopy,
      filterArray: filterFunctionsArray
    });
  };

  return (
    <div>
      <Drawer
        handleShipFilter={handleShipFilter}
        handleSearchbarData={handleSearchbarData}
        shipFilter={shipFilter}
        searchbarValue={searchbarValue}
      />
    </div>
  );
}
