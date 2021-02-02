import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import { makeStyles } from "@material-ui/core/Styles";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import StarWarsGridItem from "../UnusedComponents/StarWarsGridItem.js";
import StarWarsDataGrid from "./StarWarsDataGrid.js";
import LargeStarWarsGridItem from "../UnusedComponents/LargeStarWarsGridItem.js";
import { starWarsShips } from "./StarWarsShips2.js";
import Paper from "@material-ui/core/Paper";

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
  }
}));

export default function SimpleContainer(props) {
  const classes = useStyles();

  const makeSelectedGridItems = (
    <Grid container>
      {starWarsShips
        .filter(item =>
          item.name.toLowerCase().includes(props.searchbarValue.toLowerCase())
        )
        .map((ship, index) => (
          <Grid item xs={12} sm={6}>
            <StarWarsGridItem ship={ship} />
          </Grid>
        ))}
      <Grid item xs={12}>
        <Paper className={classes.paper}>Divider</Paper>
      </Grid>
    </Grid>
  );

  // {starWarsShips
  //   .filter(item => {
  //     if (props.shipFilter.currentFilters.length === 0) {
  //       return item;
  //     } else {
  // return (
  //   props.shipFilter.currentFilters[0].some(f => f(item)) &&
  //   props.shipFilter.currentFilters[1].some(f => f(item)) &&
  //   props.shipFilter.currentFilters[2].some(f => f(item))
  // );

  const makeShipTypeGridItems = (
    <Grid container>
      {starWarsShips
        .filter(item => {
          if (props.shipFilter.currentFilters.length === 0) {
            return item;
          } else {
            return props.shipFilter.currentFilters.some(f => f(item));
          }
        })
        .map((ship, index) => (
          <Grid item xs={12} sm={6}>
            <StarWarsGridItem ship={ship} />
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
          <LargeStarWarsGridItem ship={ship} />
        </Grid>
      ))}
    </Grid>
  );

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="xl">
        <Typography
          component="div"
          style={{ backgroundColor: "#cfe8fc", height: "100%" }}
        >
          {makeShipTypeGridItems}
          <Grid item xs={12}>
            <Paper className={classes.paper}>Divider</Paper>
          </Grid>
          {makeSelectedGridItems}
          <StarWarsDataGrid
            shipFilter={props.shipFilter}
            searchbarValue={props.searchbarValue}
          />
        </Typography>
      </Container>
    </React.Fragment>
  );
}
