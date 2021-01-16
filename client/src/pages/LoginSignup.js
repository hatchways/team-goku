import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Hidden, Box } from "@material-ui/core";
import { RedirectButton } from "../LoginSignupComponents";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import { themes } from "../themes/LoginSignupThemes";

import { Route, Switch } from "react-router-dom";

import image from "../images/ddb3f7c7b2544f7f1c636f0270f032276c911f02.png"

const useStyles = makeStyles({
    root: {
        minHeight: "100vh"
    },
    test: {
    },
    bg: {
        // Might need to change url for deployment
        backgroundImage: `url(${image})`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "cover 100%"
    }
});

function LoginSignup() {

    const classes = useStyles();
    const theme = themes();
    return (
        <Box>
            <Hidden smUp>
                <Switch>
                    <Route path="/signup">
                        <RedirectButton text="Already a member?" buttonText="Log In" href="/login"/>
                    </Route>
                    <Route path="/login">
                        <RedirectButton text="Don't have an account?" buttonText="Sign Up" href="/signup"/>
                    </Route>
                </Switch>
            </Hidden>
            <Grid container className={classes.root}>
                <Grid item xs
                    container
                    direction="row"
                    justify="center"
                    alignItems="center">
                       <Switch>
                           <Route path="/login">
                               <LoginForm/>
                            </Route>
                           <Route path="/signup">
                               <SignupForm/>
                            </Route>
                       </Switch>
                </Grid>
                <Hidden xsDown>
                    <Grid item xs className={classes.bg}>
                        <Switch>
                            <Route path="/signup">
                                <RedirectButton className={theme.redirectAlt} text="Already a member?" buttonText="Log In" href="/login"/>
                            </Route>
                            <Route path="/login">
                                <RedirectButton className={theme.redirectAlt} text="Don't have an account?" buttonText="Sign Up" href="/signup"/>
                            </Route>
                        </Switch>
                    </Grid>
                </Hidden>
            </Grid>
        </Box>
    );
}

export default LoginSignup;
