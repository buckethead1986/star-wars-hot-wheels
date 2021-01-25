import React from "react";
import Drawer from "./Drawer.js";
import GridItemsContainer from "./GridItemsContainer.js";

export default function Container() {
  const [searchbarValue, setSearchbarValue] = React.useState("");
  // const [selected, setSelected] = React.useState("");
  const [shipFilter, setShipFilter] = React.useState("");

  const handleSearchbarData = searchbarData => {
    setSearchbarValue(searchbarData !== undefined ? searchbarData : "");
  };
  const handleShipFilter = shipFilterData => {
    setShipFilter(shipFilterData !== undefined ? shipFilterData : "");
  };

  //toggles bigger paper view for selected ship. Only used with Paper display mode, not DataGrid
  //Will need Hook added and passed down to child components to use
  // const handleSelect = clickId => {
  //   setSelected(selected === clickId ? "" : clickId);
  // };

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
