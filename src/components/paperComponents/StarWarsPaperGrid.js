import React from "react";
import { makeStyles } from "@material-ui/core/Styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import StarWarsGridItem from "./StarWarsGridItem.js";
import Paper from "@material-ui/core/Paper";

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

  const makePaperGridItems = (
    <Grid container>
      {props.filteredShips.map((ship, index) => (
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
    <Typography
      component="div"
      style={{ backgroundColor: "#cfe8fc", height: "100%" }}
    >
      {makePaperGridItems}
    </Typography>
  );
}
