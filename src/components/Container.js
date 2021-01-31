import React from "react";
import Drawer from "./Drawer.js";

export default function Container() {
  const [searchbarValue, setSearchbarValue] = React.useState("");
  const [shipFilter, setShipFilter] = React.useState({
    filterParameters: {
      "Capital Ship": false,
      Walker: false,
      Speeder: false,
      Fighter: false,
      "X-Wing": false,
      "TIE Fighter": false,
      "2016": true,
      "2017": true,
      "2018": false,
      "2019": true,
      "2020": false,
      Imperial: true,
      Rebel: false,
      "Bounty Hunter": false,
      Smuggler: false
    },
    currentFilters: []
  });
  const filterFunctions = {
    Imperial: ship => ship.faction.indexOf("Imperial") !== -1,
    rebel: ship => ship.faction.indexOf("Rebel") !== -1
    //...add more based on desired filters, then filter starWarsShips with .some(), iterating through the selected filters.
  };

  const handleSearchbarData = searchbarData => {
    setSearchbarValue(searchbarData !== undefined ? searchbarData : "");
  };
  const handleShipFilter = shipFilterData => {
    // result = ships.filter(item => {
    //   return selected.some(f => f(item))
    //
    // }

    let shipFilterCopy = { ...shipFilter.filterParameters };
    // console.log(shipFilterCopy["Walker"], shipFilterData);
    console.log("undefined?", shipFilterData);
    if (shipFilterData !== undefined) {
      shipFilterCopy[shipFilterData]
        ? (shipFilterCopy[shipFilterData] = false)
        : (shipFilterCopy[shipFilterData] = true);
    }
    let newFilters = Object.keys(shipFilterCopy).filter(k => shipFilterCopy[k]);
    console.log(newFilters);
    newFilters = newFilters.map(el => filterFunctions[el.toLowerCase()]);
    console.log(newFilters);
    // const result = ships.filter(item => newFilters.some(f => f(item)));
    // console.log(result);

    setShipFilter(
      {
        ...shipFilter,
        filterParameters: shipFilterCopy,
        currentFilters: newFilters
      },
      console.log("shipfilters", shipFilter, newFilters)
    );
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
