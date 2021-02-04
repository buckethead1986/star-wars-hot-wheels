import React from "react";
import Drawer from "./Drawer.js";

export default function Container() {
  const [searchbarValue, setSearchbarValue] = React.useState("");
  const [shipFilter, setShipFilter] = React.useState({
    filterParameters2: {
      year: {
        "2016": false,
        "2017": false,
        "2018": false,
        "2019": false,
        "2020": false
      },
      type: {
        "Capital Ship": false,
        Walker: false,
        Speeder: false,
        Fighter: false,
        "X-Wing": false,
        "TIE Fighter": false
      },
      faction: {
        Imperial: false,
        Rebel: false,
        "Bounty Hunter": false,
        Smuggler: false
      }
    },
    filterParameters3: {
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
    currentFilters: []
  });
  //I spent a while making functions to produce these filterFunctions, but scope was an issue for the 'year' functions
  //It ended up being simpler just to code them here separately for use
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
  const handleShipFilter = (shipFilterSelection, shipFilterType) => {
    let filterParametersCopy2 = { ...shipFilter.filterParameters2 };
    let filterParametersCopy3 = { ...shipFilter.filterParameters3 };

    //Creates array of filterFunctions of which filterParameters are currently 'true'.
    //replace with sequential .maps for year, type, faction.
    // let newFilters = Object.keys(filterParametersCopy)
    //   .filter(k => filterParametersCopy[k])
    //   .map(el => filterFunctions[el.toLowerCase().replace(/[-\s]/g, "")]);

    //may be better to have functions as a second key/vaue pair in filterParameters2
    //Works for filterParameters2 structured this way, and uses an external filterFunctions const.
    //faction: {
    // Imperial: false
    //}
    // if (shipFilterSelection !== undefined) {
    //   filterParametersCopy2[shipFilterType][shipFilterSelection]
    //     ? (filterParametersCopy2[shipFilterType][shipFilterSelection] = false)
    //     : (filterParametersCopy2[shipFilterType][shipFilterSelection] = true);
    // }
    // let testFilters2 = ["year", "type", "faction"].map(value => {
    //   return Object.keys(filterParametersCopy2[value])
    //     .filter(k => filterParametersCopy2[value][k])
    //     .map(el => filterFunctions[el.toLowerCase().replace(/[-\s]/g, "")]);
    // });

    //works for filterParameters2 structured this way. Doesn't require refgerence to filterFunctions and .toLowerCase().replace every time.
    // faction: {
    //   Imperial: {
    //     selected: false,
    //     function: ship => ship.faction.indexOf("Imperial") !== -1
    //   }
    //}
    if (shipFilterSelection !== undefined) {
      filterParametersCopy3[shipFilterType][shipFilterSelection].selected
        ? (filterParametersCopy3[shipFilterType][
            shipFilterSelection
          ].selected = false)
        : (filterParametersCopy3[shipFilterType][
            shipFilterSelection
          ].selected = true);
    }
    let filterParametersWithFilterFunctionIncluded = [
      "year",
      "type",
      "faction"
    ].map(value => {
      let obj = Object.values(filterParametersCopy3[value]);
      let arr = [];
      obj.forEach(x => {
        if (x.selected) {
          arr.push(x.function);
        }
      });
      return arr;
    });

    //works, but very tedious and repetitive.
    // let yearFilters = Object.keys(filterParametersCopy2["year"])
    //   .filter(k => filterParametersCopy2["year"][k])
    //   .map(el => filterFunctions[el.toLowerCase().replace(/[-\s]/g, "")]);
    // let typeFilters = Object.keys(filterParametersCopy2["type"])
    //   .filter(k => filterParametersCopy2["type"][k])
    //   .map(el => filterFunctions[el.toLowerCase().replace(/[-\s]/g, "")]);
    // let factionFilters = Object.keys(filterParametersCopy2["faction"])
    //   .filter(k => filterParametersCopy2["faction"][k])
    //   .map(el => filterFunctions[el.toLowerCase().replace(/[-\s]/g, "")]);
    // let testFilters = [yearFilters, typeFilters, factionFilters];

    setShipFilter({
      ...shipFilter,
      filterParameters: filterParametersCopy3,
      currentFilters: filterParametersWithFilterFunctionIncluded
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
