import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";

import StarWarsGridItem from "./StarWarsGridItem.js";
import starWarsShips from "./Playground.js";
import ships2 from "./StarWarsShips.js";

import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/Styles";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing(2),
    margin: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary
  }
}));

export default function SimpleContainer(props) {
  const classes = useStyles();
  console.log("value = ", props.value);

  const makeSelectedGridItem = (
    <Grid container>
      {ships2.starWarsShips2
        .filter(item =>
          item.name.toLowerCase().includes(props.value.toLowerCase())
        )
        .map((ship, index) => (
          <Grid item xs={12} xs={6}>
            <StarWarsGridItem className={classes.paper} ship={ship}>
              xs=12
            </StarWarsGridItem>
          </Grid>
        ))}
    </Grid>
  );

  const makeStarWarsGridItems = (
    <Grid container>
      {ships2.starWarsShips2.map((ship, index) => (
        <Grid item xs={12} xs={6}>
          <StarWarsGridItem className={classes.paper} ship={ship}>
            xs=12
          </StarWarsGridItem>
        </Grid>
      ))}
    </Grid>
  );

  const makeOldGridItems = (
    <Grid container>
      <Grid item xs={12}>
        <Paper className={classes.paper}>xs=12</Paper>
      </Grid>
      <Grid item xs={6}>
        <Paper className={classes.paper}>xs=6</Paper>
      </Grid>
      <Grid item xs={6}>
        <Paper className={classes.paper}>xs=6</Paper>
      </Grid>
      <Grid item xs={3}>
        <Paper className={classes.paper}>xs=3</Paper>
      </Grid>
      <Grid item xs={3}>
        <Paper className={classes.paper}>xs=3</Paper>
      </Grid>
      <Grid item xs={3}>
        <Paper className={classes.paper}>xs=3</Paper>
      </Grid>
      <Grid item xs={3}>
        <Paper className={classes.paper}>xs=3</Paper>
      </Grid>
    </Grid>
  );

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="lg">
        <Typography
          component="div"
          style={{ backgroundColor: "#cfe8fc", height: "100%" }}
        >
          <Grid container>
            {makeSelectedGridItem}

            {makeStarWarsGridItems}
          </Grid>
        </Typography>
      </Container>
    </React.Fragment>
  );
}
