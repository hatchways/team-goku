import React, { useState } from "react";
import { Grid, Button } from "@material-ui/core";
import { validateEmail, validatePassword } from "../Validation";
import { LoginComponent, PasswordComponent, NameComponent } from "../LoginSignupComponents";
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


function SignupForm(props) {
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

    const classes = themes();
    return (
        <Grid container
            direction="column"
            justify="center"
            alignItems="center"
        >
            <form noValidate onSubmit={handleSignupSubmit}>
                <Grid>
                    <h1 className={classes.formTitle}>Create an account</h1>
                </Grid>
                <Grid>
                    <NameComponent
                        onChange={handleNameInput}
                        error={!validName}
                        helperText={validName ? "" : "Please enter a name."}
                        placeholder="Enter your name"
                    />
                </Grid>
                <Grid >
                    <LoginComponent
                        onChange={handleEmailInput}
                        error={!validEmail}
                        helperText={validEmail ? "" : "Please enter an email address."}
                        placeholder="Enter your e-mail address"
                    />
                </Grid>
                <Grid>
                    <PasswordComponent
                        onChange={handlePasswordInput}
                        error={!validPassword}
                        helperText={validPassword ? "" : "Password should be at least 6 characters."}
                        placeholder='Enter your password'
                    />
                </Grid>
                <Grid>
                    <Button className={classes.primaryButton} type="submit">Sign Up</Button>
                </Grid>
            </form>
        </Grid>
    )
}

export default SignupForm;