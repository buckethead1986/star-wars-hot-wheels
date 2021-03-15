import * as react from "react";
import { DataGrid } from "@material-ui/data-grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import ClickableImage from "./ClickableImage.js";

const useStyles = makeStyles(theme => ({
  //Workaround to let text wrap in DataGrid cells
  wrapTextInCell: {
    "& div.MuiDataGrid-cell": {
      whiteSpace: "normal"
      // padding: theme.spacing(0, 1) //0px top and bottom, 8px left and right
    }
  }
}));

const textColumns = () => {
  return [
    ["faction", "Faction", 0.4],
    ["class", "Class", 0.4],
    ["type", "Type", 0.4],
    ["extra", "Extra", 0.5]
  ].map(column => {
    return {
      field: column[0],
      headerName: column[1],
      flex: column[2],
      renderCell: params => (
        <Typography style={{ fontSize: "0.9rem" }}>{params.value}</Typography>
      )
    };
  });
};
const imageColumns = () => {
  return [
    ["src", "Image"],
    ["packsrc", "Pack"],
    ["backsrc", "Reverse"]
  ].map(column => {
    return {
      field: column[0],
      headerName: column[1],
      width: 100,
      disableColumnMenu: true,
      sortable: false,
      renderCell: params => (
        <ClickableImage src={params.value} alt={params.getValue("name")} />
      )
    };
  });
};

export default function StarWarsDataGrid(props) {
  const classes = useStyles();

  const columns = [
    {
      field: "name",
      headerName: "Name",
      flex: 0.8,
      renderCell: params => <Typography>{params.value}</Typography> //<Typography> has own styling and renders larger
    },
    {
      field: "year",
      headerName: "Year",
      flex: 0.3
    },
    { field: "model", headerName: "Model", flex: 0.3 }
  ].concat(textColumns(), imageColumns());

  const longhandColumns = [
    {
      field: "name",
      headerName: "Name",
      flex: 0.8,
      renderCell: params => <Typography>{params.value}</Typography> //<Typography> has own styling and renders larger
    },
    {
      field: "year",
      headerName: "Year",
      flex: 0.3
    },
    { field: "model", headerName: "Model", flex: 0.3 },
    {
      field: "faction",
      headerName: "Faction",
      flex: 0.4,
      renderCell: params => (
        <Typography style={{ fontSize: "0.9rem" }}>{params.value}</Typography>
      )
    },
    {
      field: "class",
      headerName: "Class",
      flex: 0.4,
      renderCell: params => (
        <Typography style={{ fontSize: "0.9rem" }}>{params.value}</Typography>
      )
    },
    {
      field: "type",
      headerName: "Type",
      flex: 0.4,
      renderCell: params => (
        <Typography style={{ fontSize: "0.9rem" }}>{params.value}</Typography>
      )
    },
    {
      field: "extra",
      headerName: "Extra",
      flex: 0.5,
      renderCell: params => (
        <Typography style={{ fontSize: "0.9rem" }}>{params.value}</Typography>
      )
    },
    {
      field: "src",
      headerName: "Image",
      width: 100,
      disableColumnMenu: true,
      sortable: false,
      renderCell: params => (
        <ClickableImage src={params.value} alt={params.getValue("name")} />
      )
    },
    {
      field: "packsrc",
      headerName: "Pack",
      width: 100,
      disableColumnMenu: true,
      sortable: false,
      renderCell: params => (
        <ClickableImage src={params.value} alt={params.getValue("name")} />
      )
    },
    {
      field: "backsrc",
      headerName: "Reverse",
      width: 100,
      disableColumnMenu: true,
      sortable: false,
      renderCell: params => (
        <ClickableImage src={params.value} alt={params.getValue("name")} />
      )
    }
  ];

  //default height for DataGrid is 0. This is a workaround I found to enable content to load below the grid
  // const gridWrapperRef = react.useRef(null);
  // react.useLayoutEffect(() => {
  //   const gridDiv = gridWrapperRef.current;
  //   if (gridDiv) {
  //     const gridEl: HTMLDivElement = gridDiv.querySelector("div");
  //     gridEl.style.height = "";
  //   }
  // });

  return (
    <div className={classes.wrapTextInCell}>
      <DataGrid
        pageSize={25}
        rowsPerPageOptions={[25, 50, 75, 100]}
        rows={props.filteredShips}
        columns={longhandColumns}
        autoHeight
        rowHeight={100}
        showCellRightBorder={true}
        showColumnRightBorder={true}
      />
    </div>
  );
}
