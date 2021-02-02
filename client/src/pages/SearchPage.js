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
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";

import sushi1 from "../images/sushi1.png";
import chef from "../images/chef.png";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
    flex: 1,
    background: "#F8F8FF",
  },
  sidebar: {
    width: 300,
    height: "100%",
    background: "#FFFFFF",
    padding: "20px 20px 20px 20px",
  },
  locationTextField: {
    "& > *": {
      margin: theme.spacing(1),
      width: "25ch",
    },
    borderRadius: 0,
  },

  chefHeader: {
    height: "10%",
  },
  chefBio: {
    height: "25%",
  },
  dishesSection: {
    height: "100%",
    width: "70%",
    marginLeft: "5%",
  },
  dishes: {
    background: "#FFFFFF",
    height: "75%",
    width: "70%",
    borderRadius: 0,
    overflow: "hidden",
  },
  chefName: {
    marginTop: "10%",
    marginBottom: "3%",
    float: "left",
  },
  buttonGroup: {
    marginTop: "30px",
  },
  paper: {
    height: 500,
    width: 400,
  },
  chefList: {
    overflow: "auto",
    height: "100%",
    display: "auto",
    width: "100%",
  },
}));

function SearchPage(props) {
  const classes = useStyles();
  const [chefData, setChefData] = useState([]);
  const [formats, setFormats] = React.useState(() => ["bold", "italic"]);

  const handleFormat = (event, newFormats) => {
    setFormats(newFormats);
  };
  useEffect(() => {
    fetch("/users/" + "601051ad82257e2c4291b27b")
      .then((res) => res.json())
      .then((data) => setChefData(data));
  }, []);
  console.log(chefData);
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
            <Grid>
              <Typography variant="h6" align="left">
                Location:
              </Typography>
              <form
                className={classes.locationTextField}
                noValidate
                autoComplete="off"
              >
                <TextField
                  id="outlined-basic"
                  label="Enter your location"
                  variant="outlined"
                />
              </form>
            </Grid>
          </Grid>
          <Grid
            className={classes.chefBio}
            container
            direction="column"
            alignItems="center"
          >
            <Grid direction="column" alignItems="center">
              <ToggleButtonGroup
                value={formats}
                onChange={handleFormat}
                aria-label="text formatting"
                className={classes.buttonGroup}
              >
                {[0, 1, 2, 3].map((value) => (
                  <ToggleButton value="bold" aria-label="bold">
                    Cuisine
                  </ToggleButton>
                ))}
              </ToggleButtonGroup>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
      <Grid className={classes.dishesSection} container>
        <Grid>
          <Typography variant="h6" className={classes.chefName}>
            Available Chefs:
          </Typography>
        </Grid>
        <List className={classes.chefList}>
          {[0, 1, 2].map((value) => (
            <Grid key={value} item>
              <Paper className={classes.paper} />
            </Grid>
          ))}
        </List>
      </Grid>
    </Grid>
  );
}

export default SearchPage;
