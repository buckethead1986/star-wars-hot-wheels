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
        "2017": { selected: true, function: ship => ship.year === 2017 },
        "2018": { selected: true, function: ship => ship.year === 2018 },
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
          selected: true,
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
    let filterParametersCopy = { ...shipFilter.filterParameters };
    let filterParametersCopy2 = { ...shipFilter.filterParameters2 };

    // if (shipFilterSelection !== undefined) {
    //   filterParametersCopy[shipFilterSelection]
    //     ? (filterParametersCopy[shipFilterSelection] = false)
    //     : (filterParametersCopy[shipFilterSelection] = true);
    // }
    if (shipFilterSelection !== undefined) {
      filterParametersCopy2[shipFilterType][shipFilterSelection]
        ? (filterParametersCopy2[shipFilterType][shipFilterSelection] = false)
        : (filterParametersCopy2[shipFilterType][shipFilterSelection] = true);
    }
    //Creates array of filterFunctions of which filterParameters are currently 'true'.
    //replace with sequential .maps for year, type, faction.
    let newFilters = Object.keys(filterParametersCopy)
      .filter(k => filterParametersCopy[k])
      .map(el => filterFunctions[el.toLowerCase().replace(/[-\s]/g, "")]);

    //makes "2016": false into {2016: false, filter: filterfunction}. Iterating through Object.entries(filterParameters["Year"]) for true filters, then immediately taking the filter function might be better
    //     let testObject = Object.entries(filterParameters2["Ship Type"]).map(([key, value]) => {
    //   return {[key]: [value], filter: filterFunctions[key.toLowerCase().replace(/[-\s]/g, '')]}
    // })

    //more concise version of tedious methods below. works on data structure like:
    //year: {
    //  "2016": [false, ship => ship.year === 2016],
    //  "2017": [false, ship => ship.year === 2017]
    //      }

    //Iterates through filterParameters[year], [type], and [faction],
    //filters for currently selected parameters, and returns array of filterFunctions
    // let filters = ["year", "type", "faction"].map(value => {
    //   return Object.keys(filterParameters3[value])
    //     .filter(k => filterParameters3[value][k][0])
    //     .map(j => {
    //       return filterParameters3[value][j][1];
    //     });
    // });

    let testFilters2 = ["year", "type", "faction"].map(value => {
      return Object.keys(filterParametersCopy2[value])
        .filter(k => filterParametersCopy2[value][k])
        .map(el => filterFunctions[el.toLowerCase().replace(/[-\s]/g, "")]);
    });

    //------
    //Same, but for:
    // year: {
    //  "2016": {selected: false, function: ship => ship.year === 2016},
    // "2017": {selected: true,function: ship => ship.year === 2017},
    //      }

    // let filterParameters4Test = ['year', 'type', 'faction'].map(i => {
    //   let obj = Object.values(filterParameters4[i])
    //
    //   let arr = []
    //
    //   obj.forEach(x => {
    //     if(x.selected) {
    //       arr.push(x.function) // change this to conditional based on 'i', with dynamic "ship => ship.type.indexOf("TIE Fighter") !== -1" functions based off variables
    //     }
    //   })
    //   return arr
    //     })

    //not working. scope for 'year' doesnt pass 'value'
    // const createFilterFunction = (yearTypeOrFaction, value) => {
    //   if (yearTypeOrFaction === "year") {
    //     let test = value;
    //     console.log(value, test, test === "2016", test === 2016);
    //     return (ship => ship.year === test)(test);
    //   } else {
    //     return (ship, value) => ship[yearTypeOrFaction].indexOf(value) !== -1;
    //   }
    // };
    //--------

    //works, but very tediosu and repetitive.
    let yearFilters = Object.keys(filterParametersCopy2["year"])
      .filter(k => filterParametersCopy2["year"][k])
      .map(el => filterFunctions[el.toLowerCase().replace(/[-\s]/g, "")]);
    let typeFilters = Object.keys(filterParametersCopy2["type"])
      .filter(k => filterParametersCopy2["type"][k])
      .map(el => filterFunctions[el.toLowerCase().replace(/[-\s]/g, "")]);
    let factionFilters = Object.keys(filterParametersCopy2["faction"])
      .filter(k => filterParametersCopy2["faction"][k])
      .map(el => filterFunctions[el.toLowerCase().replace(/[-\s]/g, "")]);
    let testFilters = [yearFilters, typeFilters, factionFilters];
    console.log(
      "testFilters",
      testFilters
      // Object.keys(filterParametersCopy2["ShipType"])
      //   .filter(k => filterParametersCopy2["ShipType"][k])
      //   .map(el => filterFunctions[el.toLowerCase().replace(/[-\s]/g, "")])
    );

    setShipFilter({
      ...shipFilter,
      filterParameters: filterParametersCopy2,
      currentFilters: testFilters
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
