import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import StarWarsGridItem from "./StarWarsGridItem.js";
import starWarsShips from "./StarWarsShips.js";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/Styles";

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
  console.log("value = ", props.value);

  const makeSelectedGridItems = (
    <Grid container>
      {starWarsShips.starWarsShips
        .filter(item =>
          item.name.toLowerCase().includes(props.value.toLowerCase())
        )
        .map((ship, index) => (
          <Grid item xs={12} xs={6}>
            <StarWarsGridItem ship={ship}>xs=12</StarWarsGridItem>
          </Grid>
        ))}
    </Grid>
  );

  const makeStarWarsGridItems = (
    <Grid container>
      {starWarsShips.starWarsShips.map((ship, index) => (
        <Grid item xs={12} xs={6}>
          <StarWarsGridItem ship={ship}>xs=12</StarWarsGridItem>
        </Grid>
      ))}
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
            {makeSelectedGridItems}
            <Grid item xs={12}>
              <Paper className={classes.paper}>Divider</Paper>
            </Grid>
            <Grid item xs={12}>
              <Paper
                style={{
                  padding: 8,
                  margin: 8,
                  textAlign: "center",
                  backgroundColor: "#ccffcc",
                  color: "black"
                }}
              >
                Divider
              </Paper>
            </Grid>
            {makeStarWarsGridItems}
          </Grid>
        </Typography>
      </Container>
    </React.Fragment>
  );
}
