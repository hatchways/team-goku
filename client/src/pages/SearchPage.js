import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Divider from "@material-ui/core/Divider";
import RecipeCard from "./RecipeCard";
import TextField from "@material-ui/core/TextField";
import FormatBoldIcon from "@material-ui/icons/FormatBold";
import FormatItalicIcon from "@material-ui/icons/FormatItalic";
import FormatUnderlinedIcon from "@material-ui/icons/FormatUnderlined";
import FormatColorFillIcon from "@material-ui/icons/FormatColorFill";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import CardHeader from "@material-ui/core/CardHeader";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Switch from "@material-ui/core/Switch";
import CuisineButton from "./CuisineComponent";
import ChefSearch from "./ChefSearch";

import sushi1 from "../images/sushi1.png";
import chef from "../images/chef.png";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
    flex: 1,
    background: "#F8F8FF",
    overflow: "hidden",
  },
  sidebar: {
    width: 300,
    height: "100%",
    background: "#FFFFFF",
    padding: "20px 20px 20px 20px",
  },
  locationTextField: {
    "& > *": {
      width: "25ch",
    },
    borderRadius: 0,
    margin: "10px",
    borderRadius: 0,
  },
  chefAvatar: {
    width: theme.spacing(15),
    height: theme.spacing(15),
    borderWidth: 4,
    borderColor: "white",
    borderStyle: "solid",
    marginBottom: "3%",
    marginTop: "10%",
  },

  chefHeader: {
    height: "100%",
    width: "300px",
    padding: "10px",
  },
  dishesSection: {
    height: "100%",
    width: "70%",
    marginLeft: "5%",
    overflow: "auto",
  },
  chefName: {
    marginTop: "5%",
    marginBottom: "3%",
    float: "left",
  },
  buttonGroup: {
    marginTop: "5%",
    padding: theme.spacing(6),
  },
  chefList: {
    overflow: "auto",
    height: "100%",
    display: "auto",
    width: "100%",
  },
  chefCard: {
    textAlign: "center",
    alignItems: "center",
  },
  cards: {
    marginRight: "1%",
  },
  chefCuisines: {
    ...theme.typography.button,
    backgroundColor: "#FF743D",
    color: "white",
    padding: theme.spacing(1),
    marginBottom: "2%",
  },
}));

function constructSearch(searches) {
  var query = "/search/" + searches[0];
  for (var i = 1; i < searches.length; i++) {
    query = query + "," + searches[i];
  }
  return query;
}

function changeButtonStates(buttonStates, cuisine, selected) {
  if (selected) {
    buttonStates.push(cuisine);
  } else {
    const index = buttonStates.indexOf(cuisine);
    if (index > -1) {
      buttonStates.splice(index, 1);
    }
  }
  return buttonStates;
}

function SearchPage(props) {
  const classes = useStyles();
  const [recipeData, setrecipeData] = useState([]);
  const [formats, setFormats] = useState(() => ["bold", "italic"]);
  const [searches, setSearches] = useState([]);
  const [searchType, setSearchType] = useState({ chefs: true });
  var buttonStates = [];

  const cuisines = [
    "British",
    "American",
    "Caribbean",
    "Chinese",
    "French",
    "Greek",
    "Italian",
    "Mediterranean",
    "Mexican",
    "Morrocan",
    "Japanese",
    "Spanish",
    "Thai",
    "Turkish",
    "Vietnamese",
  ];

  const handleChange = (event) => {
    setSearchType({ ...searchType, [event.target.name]: event.target.checked });
  };

  function handleSearchChange(search, selected) {
    let searchesCopy = JSON.parse(JSON.stringify(searches));
    buttonStates = changeButtonStates(searchesCopy, search, selected);
    setSearches(buttonStates);
  }
  useEffect(() => {
    fetch(constructSearch(searches))
      .then((res) => res.json())
      .then((data) => setrecipeData(data));
  }, [searches]);

  console.log(recipeData);
  return (
    <Grid container className={classes.root}>
      <Grid>
        <Paper className={classes.sidebar}>
          <Grid
            item
            xs
            className={classes.chefHeader}
            container
            direction="column"
            alignItems="center"
          >
            <Grid component="label" container alignItems="center" spacing={1}>
              <Grid item>Chefs</Grid>
              <Grid item>
                <Switch
                  checked={searchType.checked} // relevant state for your case
                  onChange={handleChange} // relevant method to handle your change
                  value="checked" // some value you need
                />
              </Grid>
              <Grid item>Recipes</Grid>
            </Grid>
            <Grid>
              <Typography variant="h6" align="left">
                Location:
              </Typography>
              <form noValidate autoComplete="off">
                <TextField
                  id="outlined-basic"
                  label="Enter your location"
                  variant="outlined"
                  className={classes.locationTextField}
                />
              </form>
              <Grid
                direction="column"
                alignItems="center"
                classname={classes.buttonGroup}
              >
                {cuisines.map((value) => (
                  <CuisineButton
                    cuisine={value}
                    onChange={handleSearchChange}
                  />
                ))}
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
      <Grid className={classes.dishesSection} container>
        <Typography variant="h6" className={classes.chefName}>
          Available Chefs:
        </Typography>
        <Grid
          container
          spacing={2}
          direction="row"
          justify="flex-start"
          alignItems="flex-start"
        >
          
          {recipeData.map((elem) => (
            <ChefSearch id={elem.chef} />
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
}

export default SearchPage;
