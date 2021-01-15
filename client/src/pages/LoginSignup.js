import React, { useEffect, useState } from "react";

import { makeStyles } from '@material-ui/core/styles';

import { Button, Grid, Hidden, Box } from "@material-ui/core";
import { validateEmail, validatePassword } from "../Validation";
import { LoginRedirectButton, SignupRedirectButton, LoginComponent, PasswordComponent, NameComponent } from "../LoginSignupComponents";

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

    const [email, setEmail] = useState("");
    const [validEmail, setValidEmail] = useState(true);
    const [password, setPassword] = useState("");
    const [validPassword, setValidPassword] = useState(true);
    const [name, setName] = useState("")
    const [validName, setValidName] = useState(true);


    const handleEmailInput = event => {
        setEmail(event.target.value);
    }

    const handlePasswordInput = event => {
        setPassword(event.target.value);
    }

    const handleNameInput = event => {
        setName(event.target.value);
    }

    const handleLoginSubmit = event => {
        if (validateEmail(email) && validatePassword(password)) {
            //TODO: Submit form
        }
        else {
            // Do not submit form and update states for user to see error.
            event.preventDefault();
            setValidEmail(validateEmail(email));
            setValidPassword(validatePassword(password));
        }
    }

    const handleSignupSubmit = event => {
        if (name !== "" && validateEmail(email) && validatePassword(password)) {
            //TODO: Submit form
        }
        else {
            // Do not submit form and update states for user to see error.
            event.preventDefault();
            setValidName(name !== "")
            setValidEmail(validateEmail(email));
            setValidPassword(validatePassword(password));
        }
    }

    

    const classes = useStyles();
    return (
        <Box>
            <Hidden smUp>
                <Switch>
                    <Route path="/signup">
                        <LoginRedirectButton/>
                    </Route>
                    <Route path="/login">
                        <SignupRedirectButton />
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
                               <form noValidate onSubmit={handleLoginSubmit}>
                                    Login
                                    <LoginComponent 
                                        onChange={handleEmailInput}
                                        error={!validEmail}
                                        helperText={validEmail === false ? "Please enter an email address." : ""}
                                    />
                                    <PasswordComponent
                                        onChange={handlePasswordInput}
                                        error={!validPassword}
                                        helperText={validPassword === false ? "Password should be at least 6 characters." : ""}
                                    />
                                    <Button type="submit">
                                            Sign In
                                    </Button>
                                </form>
                            </Route>
                           <Route path="/signup">
                               <form noValidate onSubmit={handleSignupSubmit}>
                                    Create an account
                                    <NameComponent
                                        onChange={handleNameInput}
                                        error={!validName}
                                        helperText={validName ? "": "Please enter a name."}
                                        placeholder="Enter your name"
                                    />
                                    <LoginComponent 
                                        onChange={handleEmailInput}
                                        error={!validEmail}
                                        helperText={validEmail ? "" : "Please enter an email address."}
                                        placeholder="Enter your e-mail address"
                                    />
                                    <PasswordComponent
                                        onChange={handlePasswordInput}
                                        error={!validPassword}
                                        helperText={validPassword ? "" : "Password should be at least 6 characters."}
                                        placeholder='Enter your password'
                                    />
                                    <Button type="submit">
                                            Sign Up
                                    </Button>
                                </form>
                            </Route>
                       </Switch>
                </Grid>
                <Hidden xsDown>
                    <Grid item xs className={classes.bg}>
                        <Switch>
                            <Route path="/signup">
                                <LoginRedirectButton/>
                            </Route>
                            <Route path="/login">
                                <SignupRedirectButton />
                            </Route>
                        </Switch>
                    </Grid>
                </Hidden>
            </Grid>
        </Box>
    );
}

export default LoginSignup;
