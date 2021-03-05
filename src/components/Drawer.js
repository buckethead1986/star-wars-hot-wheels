import React from "react";
import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import DrawerList from "./DrawerList.js";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Searchbar from "./Searchbar.js";
import GridItemsContainer from "./GridItemsContainer.js";
import CalendarTodayIcon from "@material-ui/icons/CalendarToday";
import FlightIcon from "@material-ui/icons/Flight";
import CategoryIcon from "@material-ui/icons/Category";
import MenuIcon from "@material-ui/icons/Menu";
import IconButton from "@material-ui/core/IconButton";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: { display: "flex" },
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  hide: {
    display: "none"
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    width: drawerWidth
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end"
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(2),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    marginLeft: -drawerWidth
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    }),
    marginLeft: 0
  },
  title: {
    flexGrow: 1,
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block"
    }
  }
}));

export default function ResponsiveDrawer(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  //makes a resizeable drawer with 3 DrawerList.js dropdown menus to filter from
  //The DataGrid is inside the 'gridDiv' tag
  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            className={classes.title}
            align="center"
            variant="h6"
            noWrap
          >
            Hot Wheels Star Wars Starships Wiki
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </div>
        <Divider />
        <Searchbar handleSearchbarData={props.handleSearchbarData} />
        <Divider />
        <DrawerList
          handleShipFilter={props.handleShipFilter}
          primary="Year"
          name="year"
          icon={CalendarTodayIcon}
          list={["2015", "2016", "2017", "2018", "2019"]}
        />
        <DrawerList
          handleShipFilter={props.handleShipFilter}
          primary="Ship Type"
          name="type"
          icon={FlightIcon}
          list={[
            "Capital Ship",
            "Walker",
            "Speeder",
            "Fighter",
            "Shuttle",
            "X-Wing",
            "TIE Fighter",
            "Concept",
            "Commemorative"
          ]}
        />
        <DrawerList
          handleShipFilter={props.handleShipFilter}
          primary="Faction"
          name="faction"
          icon={CategoryIcon}
          list={[
            "Rebel",
            "Imperial",
            "Republic",
            "Resistance",
            "First Order",
            "Unaffiliated"
          ]}
        />
      </Drawer>

      <gridDiv
        className={clsx(classes.content, {
          [classes.contentShift]: open
        })}
      >
        <div
          style={{
            // necessary for content to be below app bar
            ...theme.mixins.toolbar
          }}
        />
        <GridItemsContainer
          shipFilter={props.shipFilter}
          searchbarValue={props.searchbarValue}
        />
      </gridDiv>
    </div>
  );
}
