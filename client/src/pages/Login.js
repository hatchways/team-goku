import React, { useState } from "react";

import { makeStyles } from '@material-ui/core/styles';

import { TextField, Button, InputLabel, Grid, Hidden, Box, Typography } from "@material-ui/core";
import { flexbox, positions } from '@material-ui/system';
import { validateEmail, validatePassword } from "../Validation";
import LoginComponent from "../LoginComponent";

import image from '../images/ddb3f7c7b2544f7f1c636f0270f032276c911f02.png'

const useStyles = makeStyles({
    root: {
        minHeight: '100vh'
    },
    test: {
    },
    bg: {
        // Might need to change url for deployment
        backgroundImage: `url(${image})`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundSize: 'cover 100%'
    }
});

function SignupButton() {
    return (
        <Box
            display="flex"
            justifyContent="flex-end"
            alignItems="baseline">
            Don't have an account?
            <Button>
                SIGN UP
            </Button>
        </Box>
    )
}

function Login() {

    const [email, setEmail] = useState("");
    const [validEmail, setValidEmail] = useState(true);
    const [password, setPassword] = useState("");
    const [validPassword, setValidPassword] = useState(true);


    const handleEmailInput = event => {
        setEmail(event.target.value);
    }

    const handlePasswordInput = event => {
        setPassword(event.target.value);
    }

    const handleSubmit = event => {
        event.preventDefault();
        setValidEmail(validateEmail(email));
        setValidPassword(validatePassword(password));
    }


    const classes = useStyles();
    return (
        <Box>
            <Hidden smUp>
                <SignupButton/>
            </Hidden>
            <Grid container className={classes.root}>
                <Grid item xs
                    container
                    direction="row"
                    justify="center"
                    alignItems="center">
                    <form noValidate autoComplete="off" onSubmit={handleSubmit}>
                        Login
                    <InputLabel htmlFor="email-input">
                            EMAIL
                    </InputLabel>
                        <TextField
                            id="email-input"
                            name="email"
                            required
                            variant="outlined"
                            onChange={handleEmailInput}
                            error={!validEmail}
                            helperText={validEmail === false ? 'Please enter an email address.' : ''}
                        />
                        <InputLabel htmlFor="password-input">
                            PASSWORD
                    </InputLabel>
                        <TextField
                            id="password-input"
                            name="password"
                            required
                            type="password"
                            variant="outlined"
                            onChange={handlePasswordInput}
                            error={!validPassword}
                            helperText={validPassword === false ? 'Password should be at least 6 characters.' : ''}
                        />
                        <div>
                            <Button type="submit">
                                SIGN IN
                        </Button>
                        </div>
                    </form>
                </Grid>
                <Hidden xsDown>
                    <Grid item xs className={classes.bg}>
                        <SignupButton/>
                    </Grid>
                </Hidden>
            </Grid>
        </Box>
    );
}

export default Login;
