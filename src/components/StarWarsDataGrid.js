import * as react from "react";
import { DataGrid } from "@material-ui/data-grid";
import { makeStyles } from "@material-ui/core/styles";
// import { starWarsShips } from "./StarWarsShips2.js";

const useStyles = makeStyles(theme => ({
  img: {
    margin: "auto",
    display: "block",
    maxWidth: "100%",
    maxHeight: "100%"
  }
}));

export default function StarWarsDataGrid(props) {
  const classes = useStyles();

  const columns = [
    {
      field: "src",
      headerName: "Image",
      width: 128,
      renderCell: params => (
        <img className={classes.img} alt="complex" src={params.value} />
      )
    },
    // {
    //   field: "packsrc",
    //   headerName: "Pack Image",
    //   width: 128,
    //   renderCell: params => (
    //     <img className={classes.img} alt="complex" src={params.value} />
    //   )
    // },
    {
      field: "id",
      headerName: "ID",
      flex: 0.3
    },
    { field: "name", headerName: "Name", flex: 1.5 },
    { field: "year", headerName: "Year", flex: 0.3 },
    { field: "model", headerName: "Model", flex: 0.5 },
    // { field: "pack", headerName: "Pack Type", flex: 0.5 },
    // { field: "pack-img", headerName: "Pack Image", flex: 0.5 },
    { field: "class", headerName: "Class", flex: 0.5 },
    { field: "type", headerName: "Ship Type", flex: 0.5 },
    { field: "faction", headerName: "Faction", flex: 0.5 },
    { field: "special", headerName: "Extra", flex: 0.5 }
  ];

  //default height for DataGrid is 0. This is a workaround I found to enable content to load below the grid
  const gridWrapperRef = react.useRef(null);
  react.useLayoutEffect(() => {
    const gridDiv = gridWrapperRef.current;
    if (gridDiv) {
      const gridEl: HTMLDivElement = gridDiv.querySelector("div");
      gridEl.style.height = "";
    }
  });

  return (
    <div ref={gridWrapperRef}>
      <DataGrid
        rows={props.filteredShips}
        columns={columns}
        autoHeight
        rowHeight={128}
        showCellRightBorder={true}
        showColumnRightBorder={true}
      />
    </div>
  );
}
