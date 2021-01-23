import React from "react";
import Drawer from "./Drawer.js";
import GridItemsContainer from "./GridItemsContainer.js";

export default function Container() {
  const [value, setValue] = React.useState("");
  const [selected, setSelected] = React.useState("");
  const [selectedShipType, setSelectedShipType] = React.useState("");
  // const [filteredValue, setFilteredValue] = React.useState("");

  // const handleDrawerData = drawerData => {
  //   setFilteredValue(drawerData !== undefined ? drawerData : "");
  // };
  const handleSearchbarData = searchbarData => {
    setValue(searchbarData !== undefined ? searchbarData : "");
  };
  const handleSelectedShipType = selectedShipTypeData => {
    console.log(selectedShipTypeData);
    setSelectedShipType(
      selectedShipTypeData !== undefined ? selectedShipTypeData : ""
    );
  };

  //toggles bigger paper view for selected ship
  const handleSelect = clickId => {
    setSelected(selected === clickId ? "" : clickId);
  };

  return (
    <div>
      <Drawer
        handleSelectedShipType={handleSelectedShipType}
        handleSearchbarData={handleSearchbarData}
        handleSelect={handleSelect}
        selectedShipType={selectedShipType}
        value={value}
        selected={selected}
      />
    </div>
  );
}
