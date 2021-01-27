import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import ButtonBase from "@material-ui/core/ButtonBase";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing(1),
    margin: theme.spacing(1),
    dataAlign: "center",
    color: theme.palette.text.secondary
  },
  image: {
    width: 128,
    height: 128
  },
  // bigImage: {
  //   width: 256,
  //   height: 256
  // },
  img: {
    margin: "auto",
    display: "block",
    maxWidth: "100%",
    maxHeight: "100%"
  }
}));

export default function NestedGrid(props) {
  const classes = useStyles();

  return (
    <React.Fragment>
      <Grid>
        <Paper className={classes.paper}>
          <Grid container direction="row">
            <Grid item>
              <ButtonBase className={classes.image}>
                <img
                  className={classes.img}
                  alt="complex"
                  src={props.ship.src}
                />
              </ButtonBase>
            </Grid>
            <Grid item xs={4} container direction="column" spacing={2}>
              <Grid item xs>
                <Typography>{props.ship.name}</Typography>
              </Grid>
              <Grid item xs>
                <Typography>Year: {props.ship.year}</Typography>
              </Grid>
            </Grid>
            <Grid item xs={4} container direction="column" spacing={2}>
              <Grid item xs>
                <Typography>Model: {props.ship.model}</Typography>
              </Grid>
              <Grid item xs>
                <Typography>Sold as: {props.ship.pack} pack</Typography>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </React.Fragment>
  );
}
