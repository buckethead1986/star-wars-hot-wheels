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
import { starWarsShips } from "./StarWarsShips3.js";
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
  console.log(props);

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

  //Needs to be split/modified to seleft by item.faction and item.type, or the array needs to be updated so type and faction are contained in one value
  const makeShipTypeGridItems = (
    <Grid container>
      {starWarsShips
        .filter(item => item.keywords.includes(props.selectedShipType))
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
      <Container maxWidth="xl">
        <Typography
          component="div"
          style={{ backgroundColor: "#cfe8fc", height: "100%" }}
        >
          {makeShipTypeGridItems}
          <StarWarsDataGrid
            selectedShipType={props.selectedShipType}
            value={props.value}
            selected={props.selected}
            handleSelect={props.handleSelect}
          />

          {makeSelectedGridItems}
        </Typography>
      </Container>
    </React.Fragment>
  );
}
