import React from "react";
import Drawer from "./Drawer.js";
import GridItemsContainer from "./GridItemsContainer.js";

export default function Container() {
  const [value, setValue] = React.useState("");
  const [filteredValue, setFilteredValue] = React.useState("");

  const handleDrawerData = drawerData => {
    console.log(drawerData);
    setFilteredValue(drawerData != undefined ? drawerData : "");
  };
  const handleSearchbarData = searchbarData => {
    setValue(searchbarData != undefined ? searchbarData : "");
  };
  return (
    <div>
      <Drawer
        handleDrawerData={handleDrawerData}
        handleSearchbarData={handleSearchbarData}
      />
      <GridItemsContainer filteredValue={filteredValue} value={value} />
    </div>
  );
}
