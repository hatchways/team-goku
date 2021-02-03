import React, { useState, useEffect } from "react";
import { Grid, Avatar, Button, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { getLogin } from "../util/LoginLogoutUtils";

const themes = makeStyles((theme) => ({
  root: {
    minHeight: "100vh",
  },
  avatar: {
    width: theme.spacing(25),
    height: theme.spacing(25),
  },
  name: {
    fontSize: "1.5em",
    fontWeight: "500",
  },
  sendMessageButton: {
    color: "#ff743d",
    borderStyle: "solid",
    borderWidth: "1px",
    borderColor: "#ff743d",
    textTransform: "none",
    margin: "1em 0 1em 0",
    borderRadius: "0 0 0 0",
    padding: "2em 3em 2em 3em",
    "&:hover": {
      backgroundColor: "#ff743d",
      color: "#fff",
    },
  },
  profileHeader: {
    fontWeight: "700",
  },
  profileText: {
    fontWeight: "500",
    color: "#777777",
  },
  cuisine: {
    color: "#ffffff",
    backgroundColor: "#ff743d",
    margin: "4px 4px 4px 4px",
    textTransform: "uppercase",
    fontSize: "0.8em",
    fontWeight: "600",
  },
}));

function UserProfile() {
  const classes = themes();

  const [user, setUser] = useState([]);
  const [userFavCuisines, setUserFavCuisines] = useState(null);
  useEffect(() => {
    fetch("/users/" + getLogin())
      .then((res) => res.json()) //should check if response status code 200 else return error
      .then((data) => {
        setUser(data);
      });
  }, []);

  useEffect(() => {
    if (user.favCuisines) {
      const fav = user.favCuisines.map((cuisine) => {
        return <Grid item className={classes.cuisine}>{cuisine}</Grid>;
      });
      setUserFavCuisines(fav);
    }
  }, [user]);

  return (
    <Grid>
      <Grid container spacing={2}>
        <Grid item sm={4} container>
          <Grid
            container
            direction="column"
            justify="center"
            alignItems="center"
          >
            <Grid item>
              <Avatar className={classes.avatar} src={user.picture}></Avatar>
            </Grid>
            <Grid item>
              <Typography className={classes.name}>{user.name}</Typography>
            </Grid>
            <Grid item>
              <Typography className={classes.profileText}>
                {user.location}
              </Typography>
            </Grid>
            <Grid item>
              <Button className={classes.sendMessageButton}>
                Send message
              </Button>
            </Grid>
          </Grid>
        </Grid>
        <Grid item sm={8} container justify="center" alignItems="center">
          <Grid container direction="column" justify="center" spacing={2}>
            <Grid item>
              <Typography className={classes.profileHeader}>
                ABOUT ME:
              </Typography>
              <Typography className={classes.profileText}>
                {user.aboutMe}
              </Typography>
            </Grid>
            <Grid item>
              <Typography className={classes.profileHeader}>
                FAVORITE CUISINE:
              </Typography>
            </Grid>
            <Grid item>
              <Grid container direction="row" justify="flex-start" spacing={2}>
                {userFavCuisines}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid>map here</Grid>
    </Grid>
  );
}

export default UserProfile;
