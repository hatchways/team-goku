import React from "react";
import { Button, TextField, InputLabel, Grid } from "@material-ui/core";
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
    formLabel: {
        color: "#000",
        fontWeight: "bold",
        margin: "1em 0 0.5em 0",
    },
    input: {
        width: "15em",
    }
});

function LoginComponent(props) {

    const handleOnChange = event => {
        if (props.onChange) {
            props.onChange(event);
          }
    }

    const classes = themes();
    return (
        <Grid>
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
                className={classes.input}
            />
        </Grid>
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
        <Grid>
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
                className={classes.input}
            />
        </Grid>
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
        <Grid>
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
                className={classes.input}
            />
        </Grid>
    )
}



export { LoginComponent, PasswordComponent, NameComponent};