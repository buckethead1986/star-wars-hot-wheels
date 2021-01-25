import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import ButtonBase from "@material-ui/core/ButtonBase";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";

const useStyles = makeStyles(theme => ({
  // root: {
  //   flexGrow: 1
  // },
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
  img: {
    margin: "auto",
    display: "block",
    maxWidth: "100%",
    maxHeight: "100%"
  }
}));

export default function LargeStarWarsGridItem(props) {
  const classes = useStyles();

  return (
    <React.Fragment>
      <Paper
        className={classes.paper}
        onClick={() => {
          console.log(props.ship.id);
        }}
      >
        <Grid container direction="row">
          <Grid item>
            <ButtonBase className={classes.image}>
              <img className={classes.img} alt="complex" src={props.ship.src} />
            </ButtonBase>
          </Grid>
          <Divider orientation="vertical" flexItem />
          <Grid item>
            <Typography>{props.ship.name}</Typography>
          </Grid>
          <Divider orientation="vertical" flexItem />
          <Grid item>
            <Typography>Year: {props.ship.year}</Typography>
          </Grid>
          <Divider orientation="vertical" flexItem />
          <Grid item>
            <Typography>Model: {props.ship.model}</Typography>
          </Grid>
          <Divider orientation="vertical" flexItem />
          <Grid item>
            <Typography>Sold as: {props.ship.pack} pack</Typography>
          </Grid>
        </Grid>
      </Paper>
    </React.Fragment>
  );
}
