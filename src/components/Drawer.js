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
// import ScheduleIcon from "@material-ui/icons/Schedule";
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
  // nested: {
  //   paddingLeft: theme.spacing(4)
  // },
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
          <Typography className={classes.title} variant="h6" noWrap>
            Hot Wheels Star Wars Wiki
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

      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open
        })}
      >
        <div className={classes.drawerHeader} />

        <Typography>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
          suscipit nisl at placerat tincidunt. Morbi tempus nibh sit amet enim
          porttitor vestibulum. Ut semper mattis nibh. Sed maximus sapien in
          massa hendrerit blandit. Sed eget eleifend sapien. Ut ac enim in
          tellus aliquam ornare sit amet non nibh. Suspendisse iaculis sem
          velit, et varius nibh condimentum at. Orci varius natoque penatibus et
          magnis dis parturient montes, nascetur ridiculus mus. Vestibulum
          condimentum placerat eros at porta. Vestibulum sed porta purus. Aenean
          quis sapien mi. Mauris ut porta velit. Suspendisse massa lectus,
          vestibulum ac laoreet mattis, dictum a justo. Fusce a magna vel justo
          maximus commodo nec in diam. Praesent non semper augue. Aliquam
          ullamcorper tellus eu purus dictum, a vulputate quam congue. In
          posuere lectus eget enim ultricies facilisis. Ut nisi felis, consequat
          non leo ut, vehicula euismod dolor. Fusce ac euismod orci. Sed a augue
          quam. Aliquam ut enim nec lorem auctor volutpat. Pellentesque
          fermentum neque non faucibus dignissim. Donec ac lectus viverra,
          malesuada mi eget, mattis neque. Nam blandit velit in rhoncus mattis.
          Quisque id dui eu elit finibus vestibulum vel et purus. Proin lacinia
          lobortis neque a sollicitudin. Interdum et malesuada fames ac ante
          ipsum primis in faucibus. Quisque sit amet lorem non est vehicula
          condimentum. Vestibulum nec malesuada metus. Quisque ac tincidunt
          nulla. Praesent at enim sit amet velit facilisis pulvinar. Sed aliquet
          tincidunt nulla sagittis consectetur. Cras hendrerit metus sit amet
          neque blandit gravida. Aliquam gravida iaculis erat vitae interdum.
        </Typography>
        <GridItemsContainer
          shipFilter={props.shipFilter}
          searchbarValue={props.searchbarValue}
        />
      </main>
    </div>
  );
}
