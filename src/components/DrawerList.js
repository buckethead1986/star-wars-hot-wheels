import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
// import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import Collapse from "@material-ui/core/Collapse";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
// import InboxIcon from "@material-ui/icons/MoveToInbox";
// import MailIcon from "@material-ui/icons/Mail";
import Checkbox from "@material-ui/core/Checkbox";
import ArrowRightIcon from "@material-ui/icons/ArrowRight";
// import CategoryIcon from "@material-ui/icons/Category";

const useStyles = makeStyles(theme => ({
  nested: {
    paddingLeft: theme.spacing(4),
    paddingTop: theme.spacing(0),
    paddingBottom: theme.spacing(0)
  }
}));

export default function DrawerList(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [checked, setChecked] = React.useState([]);

  const handleOpen = () => {
    setOpen(!open);
  };

  const handleToggle = (item, value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
    props.handleShipFilter(item, props.name);
  };

  const makeListItems = (
    <List>
      {props.list.map((item, index) => {
        const labelId = `checkbox-list-secondary-label-${index}`;
        return (
          <ListItem
            button
            onClick={handleToggle(item, index)}
            key={item}
            className={classes.nested}
          >
            <ListItemIcon>
              {/* index % 2 === 0 ? <InboxIcon /> : <MailIcon /> */}
              <ArrowRightIcon fontSize="large" />
            </ListItemIcon>
            <ListItemText primary={item} />
            <Checkbox
              edge="end"
              checked={checked.indexOf(index) !== -1}
              inputProps={{ "aria-labelledby": labelId }}
            />
          </ListItem>
        );
      })}
    </List>
  );

  return (
    <List component="div" disablePadding>
      <ListItem button onClick={handleOpen}>
        <ListItemIcon>
          <props.icon />
        </ListItemIcon>
        <ListItemText primary={props.primary} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        {makeListItems}
      </Collapse>
    </List>
  );
}
