import React, { useState } from "react";

import { makeStyles } from '@material-ui/core/styles';

import { TextField, Button, InputLabel, Grid, Hidden } from "@material-ui/core";
import { validateEmail, validatePassword } from "../Validation";

import image from '../images/0b74a39fcb811ed6c86f3bd4359962d5f5a4bc03.png'

const useStyles = makeStyles({
    root: {
        minHeight: '100vh'
    },
    // Might need to change for deployment
    bg: {
        backgroundImage: `url(${image})`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundSize: '100% 100%'
    }
});

function Login(props) {

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
        <Grid container spaceing={3} className={classes.root}>
            <Grid item xs container
                direction="row"
                justify="space-around"
                alignItems="center"
            >
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
            <Hidden smDown>
                <Grid item xs container
                    direction="row"
                    justify="space-around"
                    alignItems="center"
                    className={classes.bg}
                >
                </Grid>
            </Hidden>
        </Grid>
    );
}

export default Login;
