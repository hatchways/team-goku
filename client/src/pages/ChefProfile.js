import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Divider from "@material-ui/core/Divider";
import RecipeCard from "./RecipeCard";

import sushi1 from "../images/sushi1.png";
import chef from "../images/chef.png";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
    flex: 1,
  },
  sidebar: {
    width: 400,
    height: "100%",
    background: "#FFFFFF",
  },
  sidebarimg: {
    height: "45%",
    backgroundImage: `url(${sushi1})`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center top",
    backgroundSize: "100% 80%",
  },
  chefHeader: {
    height: "10%",
  },
  chefBio: {
    height: "25%",
  },
  chefDescription: {
    marginLeft: "15%",
    marginRight: "15%",
    marginTop: "10%",
  },
  large: {
    width: theme.spacing(15),
    height: theme.spacing(15),
    borderWidth: 4,
    borderColor: "white",
    borderStyle: "solid",
    marginBottom: "3%",
  },
  divider: {
    marginBottom: "20px",
  },
  srButton: {
    height: "20%",
    background: "#FF510C",
    borderRadius: 0,
    color: "white",
  },
  dishesSection: {
    height: "100%",
    width: "30%",
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
  },
}));

function Profile(props) {
  const classes = useStyles();
  const [chefData, setChefData] = useState([]);
  useEffect(() => {
    fetch("/users/" + props.id)
      .then((res) => res.json())
      .then((data) => setChefData(data));
  }, []);
  console.log(chefData);
  console.log(props.id)
  return (
    <Grid container className={classes.root}>
      <Paper className={classes.sidebar}>
        <Grid
          item
          xs
          className={classes.sidebarimg}
          container
          direction="column-reverse"
          alignItems="center"
        >
          <Avatar src={chefData.picture} className={classes.large} />
        </Grid>
        <Grid
          item
          xs
          className={classes.chefHeader}
          container
          direction="column"
          alignItems="center"
        >
          <Typography variant="h6" align="center">
            {chefData.name}
          </Typography>
          <Typography variant="subtitle1" align="center">
            {chefData.location}
          </Typography>
        </Grid>
        <Divider variant="middle" />
        <Grid
          item
          xs
          className={classes.chefBio}
          container
          direction="column"
          alignItems="center"
        >
          <Typography
            variant="subtitle2"
            align="center"
            lineHeight={2}
            className={classes.chefDescription}
          >
            {chefData.aboutMe}
          </Typography>
        </Grid>
        <Button variant="contained" className={classes.srButton} fullWidth>
          Send Request
        </Button>
      </Paper>

      <Grid
        item
        xs
        className={classes.dishesSection}
        container
        direction="column"
        alignItems="center"
      >
        <Typography variant="h6" align="center" className={classes.chefName}>
          {chefData.name + "'s Menu:"}
        </Typography>
        <Paper className={classes.dishes}>
          <RecipeCard id={props.id} />
        </Paper>
      </Grid>
    </Grid>
  );
}

export default Profile;
