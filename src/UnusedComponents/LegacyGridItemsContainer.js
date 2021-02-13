import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import { makeStyles } from "@material-ui/core/Styles";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import StarWarsGridItem from "../UnusedComponents/StarWarsGridItem.js";
import StarWarsDataGrid from "./StarWarsDataGrid.js";
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

  //filters starWarsShips by year, type, and faction.
  //e.g. all Rebel Capital Ships, or Imperial ships from 2016 and 2017 that are also Walkers or TIE Fighters.
  const filteredShips = starWarsShips.filter(item => {
    if (props.searchbarValue.length !== 0) {
      return item.name
        .toLowerCase()
        .includes(props.searchbarValue.toLowerCase());
    } else {
      if (props.shipFilter.filterArray.length === 0) {
        return item;
      } else {
        return (
          (props.shipFilter.filterArray[0].length !== 0
            ? props.shipFilter.filterArray[0].some(f => f(item))
            : item) &&
          (props.shipFilter.filterArray[1].length !== 0
            ? props.shipFilter.filterArray[1].some(f => f(item))
            : item) &&
          (props.shipFilter.filterArray[2].length !== 0
            ? props.shipFilter.filterArray[2].some(f => f(item))
            : item)
        );
      }
    }
  });

  const makePaperGridItems = (
    <Grid container>
      {filteredShips.map((ship, index) => (
        <Grid item xs={12} sm={6}>
          <StarWarsGridItem ship={ship} />
        </Grid>
      ))}
      <Grid item xs={12}>
        <Paper className={classes.paper}>Divider</Paper>
      </Grid>
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
          {makePaperGridItems}
          <Grid item xs={12}>
            <Paper className={classes.paper}>Divider</Paper>
          </Grid>
          {makeSelectedGridItems}
          <StarWarsDataGrid filteredShips={filteredShips} />
        </Typography>
      </Container>
    </React.Fragment>
  );
}
