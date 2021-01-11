import * as React from "react";
import { DataGrid } from "@material-ui/data-grid";
import { makeStyles } from "@material-ui/core/styles";
import { starWarsShips } from "./StarWarsShips.js";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles(theme => ({
  img: {
    margin: "auto",
    display: "block",
    maxWidth: "100%",
    maxHeight: "100%"
  }
}));

export default function DataGridDemo(props) {
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
    {
      field: "id",
      headerName: "ID",
      flex: 0.3
    },
    { field: "name", headerName: "Name", flex: 1.5 },
    { field: "year", headerName: "Year", flex: 0.5 },
    {
      field: "model",
      headerName: "Model",
      flex: 0.5
    },
    { field: "pack", headerName: "Pack Type", flex: 0.5 },
    { field: "type", headerName: "Ship Type", flex: 0.5 },
    { field: "special", headerName: "Extra", flex: 0.5 }
  ];

  return (
    <DataGrid
      rows={starWarsShips}
      columns={columns}
      checkboxSelection
      autoHeight
      rowHeight={128}
    />
  );
}
