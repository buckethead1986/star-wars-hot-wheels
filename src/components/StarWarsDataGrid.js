import * as react from "react";
import { DataGrid } from "@material-ui/data-grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import ClickableImage from "./ClickableImage.js";

const useStyles = makeStyles({
  wrapTextInCell: {
    "& div.MuiDataGrid-cell": {
      whiteSpace: "normal"
      // lineHeight: "20px",
      // overflow: "visible"
    }
  }
});

export default function StarWarsDataGrid(props) {
  const classes = useStyles();

  const columns = [
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      renderCell: params => <Typography>{params.value}</Typography> //<Typography> has own styling and renders larger
    },
    { field: "year", headerName: "Year", flex: 0.4 },
    { field: "model", headerName: "Model", flex: 0.4 },
    { field: "class", headerName: "Class", flex: 0.4 },
    { field: "type", headerName: "Ship Type", flex: 0.5 },
    { field: "faction", headerName: "Faction", flex: 0.5 },
    { field: "special", filterable: "false", headerName: "Extra", flex: 0.5 },
    {
      field: "src",
      headerName: "Image",
      width: 128,
      renderCell: params => (
        <ClickableImage src={params.value} alt={params.getValue("name")} />
      )
    },
    {
      field: "packsrc",
      headerName: "Pack Image",
      width: 128,
      renderCell: params => (
        <ClickableImage src={params.value} alt={params.getValue("name")} />
      )
    },
    {
      field: "backsrc",
      headerName: "Reverse Image",
      width: 128,
      renderCell: params => (
        <ClickableImage src={params.value} alt={params.getValue("name")} />
      )
    }
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
    <div ref={gridWrapperRef} className={classes.wrapTextInCell}>
      <DataGrid
        disableColumnMenu
        pageSize={25}
        rowsPerPageOptions={[25, 50, 75, 100]}
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
