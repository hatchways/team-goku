import React from "react";
import { Button, TextField, InputLabel, Box } from "@material-ui/core";
import { themes } from "./themes/LoginSignupThemes";

function RedirectButton(props) {
    const classes = themes();
    return (
        <Box className={props.className}
            display="flex"
            justifyContent="flex-end"
            alignItems="baseline">
            <span className={classes.redirectTextMargin}>{props.text}</span>
            <Button className={classes.primary} href={props.href}>
                {props.buttonText}
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

    const classes = themes();
    return (
        <Box>
            <InputLabel className={classes.formLabel} htmlFor="email-input">
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

    const classes = themes();
    return(
        <Box>
            <InputLabel className={classes.formLabel} htmlFor="password-input">
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

    const classes = themes();
    return(
        <Box>
            <InputLabel className={classes.formLabel} htmlFor="name-input">
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



export { RedirectButton, LoginComponent, PasswordComponent, NameComponent};