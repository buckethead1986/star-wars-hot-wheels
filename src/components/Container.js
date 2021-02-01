import React from "react";
import Drawer from "./Drawer.js";

export default function Container() {
  const [searchbarValue, setSearchbarValue] = React.useState("");
  const [shipFilter, setShipFilter] = React.useState({
    filterParameters: {
      "2016": false,
      "2017": false,
      "2018": false,
      "2019": false,
      "2020": false,
      "Capital Ship": false,
      Walker: false,
      Speeder: false,
      Fighter: false,
      "X-Wing": false,
      "TIE Fighter": false,
      Imperial: false,
      Rebel: false,
      "Bounty Hunter": false,
      Smuggler: false
    },
    currentFilters: []
  });
  //make functions for repetitive code, and filters for 'rebel and imperial ships that are walkers'
  const filterFunctions = {
    2016: ship => ship.year === 2016,
    2017: ship => ship.year === 2017,
    2018: ship => ship.year === 2018,
    2019: ship => ship.year === 2019,
    2020: ship => ship.year === 2020,
    capitalship: ship => ship.type.indexOf("Capital Ship") !== -1,
    walker: ship => ship.type.indexOf("Walker") !== -1,
    speeder: ship => ship.type.indexOf("Speeder") !== -1,
    fighter: ship => ship.type.indexOf("Fighter") !== -1,
    xwing: ship => ship.type.indexOf("X-Wing") !== -1,
    tiefighter: ship => ship.type.indexOf("TIE Fighter") !== -1,
    imperial: ship => ship.faction.indexOf("Imperial") !== -1,
    rebel: ship => ship.faction.indexOf("Rebel") !== -1,
    bountyhunter: ship => ship.faction.indexOf("Bounty Hunter") !== -1,
    smuggler: ship => ship.faction.indexOf("Smuggler") !== -1
  };

  const handleSearchbarData = searchbarData => {
    setSearchbarValue(searchbarData !== undefined ? searchbarData : "");
  };
  const handleShipFilter = shipFilterData => {
    let filterParametersCopy = { ...shipFilter.filterParameters };
    if (shipFilterData !== undefined) {
      filterParametersCopy[shipFilterData]
        ? (filterParametersCopy[shipFilterData] = false)
        : (filterParametersCopy[shipFilterData] = true);
    }
    //Creates array of filterFunctions of which filterParameters are currently 'true'.
    //replace with sequential .maps for year, type, faction.
    let newFilters = Object.keys(filterParametersCopy)
      .filter(k => filterParametersCopy[k])
      .map(el => filterFunctions[el.toLowerCase().replace(/[-\s]/g, "")]);

    setShipFilter({
      ...shipFilter,
      filterParameters: filterParametersCopy,
      currentFilters: newFilters
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
