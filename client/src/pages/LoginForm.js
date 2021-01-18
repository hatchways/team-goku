import React, { useState } from "react";
import { Grid, Button } from "@material-ui/core";
import { validateEmail, validatePassword } from "../Validation";
import { LoginComponent, PasswordComponent } from "../LoginSignupComponents";
import { makeStyles } from '@material-ui/core/styles';

const themes = makeStyles({
    primaryButton: {
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
    formTitle: {
        fontSize: "2em",
        margin: "1em 0 1em 0",
    },
});

function LoginForm(props) {
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

    const classes = themes();
    return (
        <Grid container
            direction="column"
            justify="center"
            alignItems="center"
        >
            <form noValidate onSubmit={handleLoginSubmit}>
                <Grid>
                    <h1 className={classes.formTitle}>Login</h1>
                </Grid>
                <Grid>
                    <LoginComponent
                        onChange={handleEmailInput}
                        error={!validEmail}
                        helperText={validEmail === false ? "Please enter an email address." : ""}
                    />
                </Grid>
                <Grid>
                    <PasswordComponent
                        onChange={handlePasswordInput}
                        error={!validPassword}
                        helperText={validPassword === false ? "Password should be at least 6 characters." : ""}
                    />
                </Grid>
                <Grid item>
                    <Button className={classes.primaryButton} type="submit">Login</Button>
                </Grid>

            </form>
        </Grid>
    )
}

export default LoginForm;