import React, { useState } from "react";
import { Button, Box } from "@material-ui/core";
import { validateEmail, validatePassword } from "../Validation";
import { LoginComponent, PasswordComponent, NameComponent } from "../LoginSignupComponents";
import { themes } from "../themes/LoginSignupThemes";

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
    return(
        <Box>
            <form noValidate onSubmit={handleSignupSubmit}>
                <Box className={classes.formTitle}>
                    Create an account
                </Box>
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
                <Button className={classes.primary} type="submit">
                        Sign Up
                </Button>
            </form>
        </Box>
    )
}

export default SignupForm;