import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import { makeStyles } from "@material-ui/core/Styles";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import StarWarsGridItem from "../UnusedComponents/StarWarsGridItem.js";
import StarWarsDataGrid from "./StarWarsDataGrid.js";
import LargeStarWarsGridItem from "../UnusedComponents/LargeStarWarsGridItem.js";
import { starWarsShips } from "./StarWarsShips.js";
import Paper from "@material-ui/core/Paper";
import { DataGrid } from "@material-ui/data-grid";

//'paper' class only used for divider, remove in final
const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing(1),
    margin: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary
  },
  img: {
    margin: "auto",
    display: "block",
    maxWidth: "100%",
    maxHeight: "100%"
  }
}));

// const useStyles = makeStyles(theme => ({
//   img: {
//     margin: "auto",
//     display: "block",
//     maxWidth: "100%",
//     maxHeight: "100%"
//   }
// }));
//
// export default function DataGridDemo(props) {
//   const classes = useStyles();
// const columns = [
//   {
//     field: "src",
//     headerName: "Image",
//     width: 128,
//     renderCell: params => (
//       <img className={classes.img} alt="complex" src={params.value} />
//     )
//   },
//   {
//     field: "id",
//     headerName: "ID",
//     flex: 0.3
//   },
//   { field: "name", headerName: "Name", flex: 1.5 },
//   { field: "year", headerName: "Year", flex: 0.5 },
//   {
//     field: "model",
//     headerName: "Model",
//     flex: 0.5
//   },
//   { field: "pack", headerName: "Pack Type", flex: 0.5 },
//   { field: "type", headerName: "Ship Type", flex: 0.5 },
//   { field: "special", headerName: "Extra", flex: 0.5 }
// ];

export default function SimpleContainer(props) {
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
  // console.log("value = ", props.value);

  const makeSelectedGridItems = (
    <Grid container>
      {starWarsShips
        .filter(item =>
          item.name.toLowerCase().includes(props.value.toLowerCase())
        )
        .map((ship, index) => (
          <Grid item xs={12} sm={6}>
            <StarWarsGridItem
              ship={ship}
              selected={props.selected}
              handleSelect={props.handleSelect}
            />
          </Grid>
        ))}
      <Grid item xs={12}>
        <Paper className={classes.paper}>Divider</Paper>
      </Grid>
    </Grid>
  );

  const makeLargeStarWarsGridItems = (
    <Grid container>
      {starWarsShips.map((ship, index) => (
        <Grid item xs={12}>
          <LargeStarWarsGridItem
            ship={ship}
            selected={props.selected}
            handleSelect={props.handleSelect}
          />
        </Grid>
      ))}
    </Grid>
  );

  return (
    <React.Fragment>
      <CssBaseline />
      <div>
        <DataGrid
          rows={starWarsShips}
          columns={columns}
          checkboxSelection
          autoHeight
          rowHeight={128}
        />

        <div
          style={{
            backgroundColor: "#cfe8fc",
            position: "relative"
          }}
        >
          {makeSelectedGridItems}
        </div>
      </div>
    </React.Fragment>
  );
}
