import React from "react";
import Drawer from "./Drawer.js";
import GridItemsContainer from "./GridItemsContainer.js";

export default function Container() {
  const [value, setValue] = React.useState("");
  const [selected, setSelected] = React.useState("");
  const [filteredValue, setFilteredValue] = React.useState("");

  const handleDrawerData = drawerData => {
    // console.log(drawerData);
    setFilteredValue(drawerData !== undefined ? drawerData : "");
  };
  const handleSearchbarData = searchbarData => {
    setValue(searchbarData !== undefined ? searchbarData : "");
  };

  //toggles bigger paper view for selected ship
  const handleSelect = clickId => {
    // console.log(clickId);
    setSelected(selected === clickId ? "" : clickId);
  };
  // <GridItemsContainer filteredValue={filteredValue} value={value} />
  return (
    <div>
      <Drawer
        handleDrawerData={handleDrawerData}
        handleSearchbarData={handleSearchbarData}
        handleSelect={handleSelect}
        filteredValue={filteredValue}
        value={value}
        selected={selected}
      />
    </div>
  );
}
