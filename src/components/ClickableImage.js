import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";

const useStyles = makeStyles({
  root: {
    margin: 0,
    padding: 0
  },
  img: {
    margin: "auto",
    display: "block",
    maxWidth: "100%"
  },
  smallImage: {
    maxHeight: 128
  },
  largeImage: {
    maxHeight: "85vh"
  }
});

export default function ClickableImage(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = value => {
    setOpen(false);
  };

  return (
    <div>
      <Button className={classes.root} onClick={handleOpen}>
        <img
          className={clsx(classes.img, classes.smallImage)}
          src={props.src}
          alt={props.alt}
        />
      </Button>
      <Dialog onClose={handleClose} open={open}>
        <img
          className={clsx(classes.img, classes.largeImage)}
          src={props.src}
          alt={props.alt}
        />
      </Dialog>
    </div>
  );
}
