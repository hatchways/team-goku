import React, { useState, useEffect } from "react";
import { Grid, Avatar, Button, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

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
    color: "#FF743D",
    borderStyle: "solid",
    borderWidth: "1px",
    borderColor: "#FF743D",
    textTransform: "none",
    margin: "1em 0 1em 0",
    borderRadius: "0 0 0 0",
    padding: "2em 3em 2em 3em",
    "&:hover": {
      backgroundColor: "#FF743D",
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
}));

function UserProfile() {
    const classes = themes();
    
    return (
      <Grid>
        <Grid container spacing={2}>
          <Grid item sm={4}>
            <Grid
              container
              direction="column"
              justify="center"
              alignItems="center"
            >
              <Grid item>
                <Avatar className={classes.avatar}></Avatar>
              </Grid>
              <Grid item>
                <Typography className={classes.name}>
                  Christine Wilson
                </Typography>
              </Grid>
              <Grid item>
                <Typography className={classes.profileText}>
                  Toronto, Canada
                </Typography>
              </Grid>
              <Grid item>
                <Button className={classes.sendMessageButton}>
                  Send message
                </Button>
              </Grid>
            </Grid>
          </Grid>
          <Grid item sm={8}>
            <Grid container container direction="column" justify="center">
              <Grid item>
                <Typography className={classes.profileHeader}>
                  ABOUT ME:
                </Typography>
                <Typography className={classes.profileText}>
                  Hi everyone! I'm a foodie and I love to eat healthy and tasty
                  meals. Also I'm mom of two beautiful babies.
                </Typography>
              </Grid>
              <Grid item>
                <Typography className={classes.profileHeader}>
                  FAVORITE CUISINE:
                </Typography>
              </Grid>
              <Grid item>Japanese Chinese Mediterranean Thai</Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid>map here</Grid>
      </Grid>
    );
}

export default UserProfile;
