import React from "react";
import Drawer from "./Drawer.js";
import GridItemsContainer from "./GridItemsContainer.js";

export default function Container() {
  const [searchbarValue, setSearchbarValue] = React.useState("");
  const [shipFilter, setShipFilter] = React.useState("");

  const handleSearchbarData = searchbarData => {
    setSearchbarValue(searchbarData !== undefined ? searchbarData : "");
  };
  const handleShipFilter = shipFilterData => {
    setShipFilter(shipFilterData !== undefined ? shipFilterData : "");
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
