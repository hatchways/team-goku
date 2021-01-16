import React, { useEffect, useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import { Button, Box } from "@material-ui/core";
import { validateEmail, validatePassword } from "../Validation";
import { LoginComponent, PasswordComponent} from "../LoginSignupComponents";

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

    return(
        <Box>
            <form noValidate onSubmit={handleLoginSubmit}>
                Loginss
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
        </Box>
    )
}

export default LoginForm;