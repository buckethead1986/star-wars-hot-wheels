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
      width: 70
    },
    { field: "name", headerName: "Name", width: 200 },
    { field: "year", headerName: "Year", width: 70 },
    {
      field: "model",
      headerName: "Model",
      width: 90
    },
    { field: "pack", headerName: "Pack Type", width: 90 },
    { field: "type", headerName: "Ship Type", width: 90 }
  ];

  return (
    <div
      style={{
        backgroundColor: "white",
        height: "100%",
        width: "100%",
        position: "relative"
      }}
    >
      <DataGrid
        rows={starWarsShips}
        columns={columns}
        checkboxSelection
        autoHeight
      />
    </div>
  );
}
