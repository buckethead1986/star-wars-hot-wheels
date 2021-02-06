import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import { makeStyles } from "@material-ui/core/Styles";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import StarWarsGridItem from "../UnusedComponents/StarWarsGridItem.js";
import StarWarsDataGrid from "./StarWarsDataGrid.js";
// import LargeStarWarsGridItem from "../UnusedComponents/LargeStarWarsGridItem.js";
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
  // console.log(props.shipFilter.filterArray);

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

  const filteredShips = starWarsShips.filter(item => {
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
  });

  const makeShipTypeGridItems = (
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

  // const makeLargeStarWarsGridItems = (
  //   <Grid container>
  //     {starWarsShips.map((ship, index) => (
  //       <Grid item xs={12}>
  //         <LargeStarWarsGridItem ship={ship} />
  //       </Grid>
  //     ))}
  //   </Grid>
  // );

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
            filteredShips={filteredShips}
            shipFilter={props.shipFilter}
            searchbarValue={props.searchbarValue}
          />
        </Typography>
      </Container>
    </React.Fragment>
  );
}
