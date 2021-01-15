import React from "react";

import { makeStyles } from '@material-ui/core/styles';

import { Button, TextField, InputLabel, Box } from "@material-ui/core";



const useStyles = makeStyles({
    root: {
    },
});

function SignupRedirectButton() {
    return (
        <Box
            display="flex"
            justifyContent="flex-end"
            alignItems="baseline">
            Don't have an account?
            <Button href="/signup">
                SIGN UP
            </Button>
        </Box>
    )
}


function LoginRedirectButton() {
    return (
        <Box
            display="flex"
            justifyContent="flex-end"
            alignItems="baseline">
            Already a member?
            <Button href="/login">
                LOGIN
            </Button>
        </Box>
    )
}

function LoginComponent(props) {

    const handleOnChange = event => {
        if (props.onChange) {
            props.onChange(event);
          }
    }

    return (
        <Box>
            <InputLabel htmlFor="email-input">
                EMAIL
            </InputLabel>
            <TextField
                id="email-input"
                name="email"
                required
                type="email"
                variant="outlined"
                onChange={handleOnChange}
                error={props.error}
                helperText={props.helperText}
                placeholder={props.placeholder}
            />
        </Box>
    )
}

function PasswordComponent(props) {

    const handleOnChange = event => {
        if (props.onChange) {
            props.onChange(event);
          }
    }

    return(
        <Box>
            <InputLabel htmlFor="password-input">
                PASSWORD
            </InputLabel>
            <TextField
                id="password-input"
                name="password"
                required
                type="password"
                variant="outlined"
                onChange={handleOnChange}
                error={props.error}
                helperText={props.helperText}
                placeholder={props.placeholder}
            />
        </Box>
    )
}

function NameComponent(props) {
    const handleOnChange = event => {
        if (props.onChange) {
            props.onChange(event);
          }
    }

    return(
        <Box>
            <InputLabel htmlFor="name-input">
                NAME
            </InputLabel>
            <TextField
                id="name-input"
                name="name"
                required
                variant="outlined"
                onChange={handleOnChange}
                error={props.error}
                helperText={props.helperText}
                placeholder={props.placeholder}
            />
        </Box>
    )
}



export {LoginRedirectButton, SignupRedirectButton, LoginComponent, PasswordComponent, NameComponent};