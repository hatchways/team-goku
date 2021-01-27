import React, { useState, useEffect } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";

import sushi1 from "../images/sushi1.png";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    width: "100%",
    borderRadius: 0,
    padding: "30px 30px 30px 10px",
  },
  details: {
    display: "flex",
    flexDirection: "column",
    width: "80%",
  },
  content: {
    flex: "1 0 auto",
    paddingTop: 0,
  },
  cover: {
    width: "100%",
  },
  foodImg: {
    maxHeight: "100%",
    width: "100%",
  },
  controls: {
    display: "flex",
    alignItems: "center",
  },
  servingSize: {
    ...theme.typography.button,
    backgroundColor: "#FF743D",
    color: "white",
    padding: theme.spacing(1),
    marginBottom: "2%",
  },
  dishesList: {
    paddingTop: 0,
    paddingBottom: 0,
    position: "relative",
    overflow: "auto",
    height: "100%",
    display: "auto",
    width: "100%",
  },
  dishesItem: {
    padding: "0px 0px 6px 0px",
    width: "100%",
  },
}));

export default function MediaControlCard(props) {
  const classes = useStyles();
  const theme = useTheme();

  const [recipeData, setRecipeData] = useState({ data: [] });

  useEffect(() => {
    fetch("/recipes/chef/" + props.id)
      .then((res) => res.json())
      .then((data) => setRecipeData({ data: data }));
  }, []);

  return (
    <List className={classes.dishesList}>
      {recipeData.data.map((recipe) => (
        <ListItem key={`item-${recipe._id}`} className={classes.dishes_item}>
          <Card className={classes.root}>
            <div className={classes.details}>
              <CardContent className={classes.content}>
                <div className={classes.servingSize}>
                  {"Serving Size: " + recipe.servingSize}
                </div>
                <Typography component="h5" variant="h4">
                  {recipe.name}
                </Typography>
                <Typography variant="subtitle1">{recipe.price}</Typography>
                <Typography component="h6" variant="h6">
                  Ingredients:
                </Typography>
                <Typography component="h5" variant="body1">
                  {recipe.ingredients}
                </Typography>
                <Typography component="h5" variant="h6">
                  Required Stuff:
                </Typography>
                <Typography component="h5" variant="body1">
                  {recipe.requiredStuff}
                </Typography>
              </CardContent>
              <div className={classes.controls}></div>
            </div>
            <CardMedia className={classes.cover}>
              <div className={classes.recipePhoto}>
                <img src={recipe.picture} className={classes.foodImg} />
              </div>
            </CardMedia>
          </Card>
        </ListItem>
      ))}
    </List>
  );
}
