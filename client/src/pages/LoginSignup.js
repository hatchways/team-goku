import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Button, Hidden } from "@material-ui/core";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";

import { Route, Switch } from "react-router-dom";

import image from "../images/ddb3f7c7b2544f7f1c636f0270f032276c911f02.png"

const useStyles = makeStyles({
    root: {
        minHeight: "100vh"
    },
    bg: {
        // Might need to change url for deployment
        backgroundImage: `url(${image})`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "cover 100%",
        padding: "10px"
    },
    button: {
        fontSize: "1em",
        backgroundColor: "#FF743D",
        color: "#fff",
        textTransform: "none",
        padding: "1em 3em 1em 3em",
        margin: "1em 0 1em 0",
        borderRadius: "0 0 0 0",
        '&:hover': {
            backgroundColor: '#AD6800'
        },
    },
    redirectAltColorText: {
        color: "#fff",
    }
});

function LoginSignup() {

    const classes = useStyles();
    return (
        <Grid>
            <Hidden smUp>
                <Grid container
                    direction="row"
                    spacing={2}
                    justify="flex-end"
                    alignItems="baseline"
                >
                    <Grid item>
                        <Switch>
                            <Route path="/signup">
                                <Grid
                                    container
                                    spacing={2}
                                    alignItems="baseline"
                                >
                                    <Grid item>Already a member?</Grid>
                                    <Grid item>
                                        <Button className={classes.button} href="/login">
                                            Log In
                                            </Button>
                                    </Grid>
                                </Grid>
                            </Route>
                            <Route path="/login">
                                <Grid
                                    container
                                    spacing={2}
                                    alignItems="baseline"
                                >
                                    <Grid item>Don't have an account?</Grid>
                                    <Grid item>
                                        <Button className={classes.button} href="/signup">
                                            Sign Up
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Route>
                        </Switch>
                    </Grid>
                </Grid>
            </Hidden>
            <Grid container className={classes.root}>
                <Grid item xs
                    container
                    direction="row"
                    justify="center"
                    alignItems="center"
                >
                    <Switch>
                        <Route path="/login">
                            <LoginForm />
                        </Route>
                        <Route path="/signup">
                            <SignupForm />
                        </Route>
                    </Switch>
                </Grid>
                <Hidden xsDown>
                    <Grid item xs className={classes.bg}>
                        <Grid container
                            id="blahblah"
                            direction="row"
                            spacing={2}
                            justify="flex-end"
                            alignItems="baseline"
                        >
                            <Grid item>
                                <Switch>
                                    <Route path="/signup">
                                        <Grid className={classes.redirectAltColorText}
                                            container
                                            spacing={2}
                                            alignItems="baseline"
                                        >
                                            <Grid item>Already a member?</Grid>
                                            <Grid item>
                                                <Button className={classes.button} href="/login">
                                                    Log In
                                                </Button>
                                            </Grid>
                                        </Grid>
                                    </Route>
                                    <Route path="/login">
                                        <Grid className={classes.redirectAltColorText}
                                            container
                                            spacing={2}
                                            alignItems="baseline"
                                        >
                                            <Grid item>Don't have an account?</Grid>
                                            <Grid item>
                                                <Button className={classes.button} href="/signup">
                                                    Sign Up
                                                </Button>
                                            </Grid>
                                        </Grid>
                                    </Route>
                                </Switch>
                            </Grid>
                        </Grid>
                    </Grid>
                </Hidden>
            </Grid>
        </Grid>
    );
}

export default LoginSignup;
