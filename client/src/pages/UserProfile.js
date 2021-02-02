import React, { useState, useEffect } from "react";
import { Grid, Avatar, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
    root: {
        minHeight: "100vh"
    },
});

function UserProfile() {
    const classes = useStyles();
    
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
                <Avatar></Avatar>
              </Grid>
              <Grid item>Christine Wilson</Grid>
              <Grid item>Toronto, Canada</Grid>
              <Grid item>
                <Button>Send message</Button>
              </Grid>
            </Grid>
          </Grid>
          <Grid item sm={8}>
            <Grid
              container
              container
              direction="column"
              justify="center"
            >
              <Grid item>About me: Hi everyone! I'm a foodie and I love to eat healthy and tasty meals. Also I'm mom of two beautiful babies.</Grid>
              <Grid item>Favourite Cuisine</Grid>
              <Grid item>Japanese Chinese Mediterranean Thai</Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid>map here</Grid>
      </Grid>
    );
}

export default UserProfile;
