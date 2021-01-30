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
      "TIE Fighter": false
    }
  });

  const handleSearchbarData = searchbarData => {
    setSearchbarValue(searchbarData !== undefined ? searchbarData : "");
  };
  const handleShipFilter = shipFilterData => {
    let shipFilterCopy = { ...shipFilter.filterParameters };
    // console.log(shipFilterCopy["Walker"], shipFilterData);
    if (shipFilterData !== undefined) {
      shipFilterCopy[shipFilterData]
        ? (shipFilterCopy[shipFilterData] = false)
        : (shipFilterCopy[shipFilterData] = true);
    }
    console.log(shipFilterCopy);

    // setShipFilter(shipFilterData !== undefined ? shipFilterData : "");
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
