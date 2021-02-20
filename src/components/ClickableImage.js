import React from "react";
// import PropTypes from "prop-types";
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

// function SimpleDialog(props) {
//   const classes = useStyles();
//   const { onClose, open } = props;
//
//   const handleClose = () => {
//     onClose();
//   };
//
//   // const handleListItemClick = value => {
//   //   onClose(value);
//   // };
//
//   return (
//     <Dialog onClose={handleClose} open={open}>
//       <img
//         className={clsx(classes.img, classes.largeImage)}
//         src={props.src}
//         alt={props.alt}
//       />
//     </Dialog>
//   );
// }

// SimpleDialog.propTypes = {
//   onClose: PropTypes.func.isRequired,
//   open: PropTypes.bool.isRequired
//   // selectedValue: PropTypes.string.isRequired
// };

export default function ClickableImage(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  // const [selectedValue, setSelectedValue] = React.useState(emails[1]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = value => {
    setOpen(false);
    // setSelectedValue(value);
  };

  return (
    <div>
      <Button className={classes.root} onClick={handleClickOpen}>
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
