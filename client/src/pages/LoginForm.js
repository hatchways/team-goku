import React, { useState } from "react";
import { Grid, Button } from "@material-ui/core";
import { validateEmail, validatePassword } from "../Validation";
import { LoginComponent, PasswordComponent } from "./LoginSignupComponents";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import { login } from "../util/LoginLogoutUtils";

const themes = makeStyles({
  primaryButton: {
    fontSize: "1em",
    backgroundColor: "#FF743D",
    color: "#fff",
    textTransform: "none",
    padding: "1em 3em 1em 3em",
    margin: "1em 0 1em 0",
    borderRadius: "0 0 0 0",
    "&:hover": {
      backgroundColor: "#AD6800",
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

  const history = useHistory();

  const handleEmailInput = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordInput = (event) => {
    setPassword(event.target.value);
  };

  const handleLoginSubmit = (event) => {
    event.preventDefault();
    if (validateEmail(email) && validatePassword(password)) {
      const urlencoded = new URLSearchParams();
      urlencoded.append("email", "email@email.com");
      urlencoded.append("password", "password");

      const requestOptions = {
        method: "POST",
        body: urlencoded,
        credentials: "include",
      };

      fetch("http://localhost:3001/users/login", requestOptions)
        .then((response) => {
          if (response.status == 200) {
            response.json().then((body) => {
              const user = body.user;
              login(user);
              history.push("/user");
            });
          } else if (response.status === 401) {
            console.log(response);
          }
        })
        .catch((error) => console.log("error", error));
    } else {
      // Do not submit form and update states for user to see error.
      setValidEmail(validateEmail(email));
      setValidPassword(validatePassword(password));
    }
  };

  const classes = themes();
  return (
    <Grid container direction="column" justify="center" alignItems="center">
      <form noValidate onSubmit={handleLoginSubmit}>
        <Grid>
          <h1 className={classes.formTitle}>Login</h1>
        </Grid>
        <Grid>
          <LoginComponent
            onChange={handleEmailInput}
            error={!validEmail}
            helperText={
              validEmail === false ? "Please enter an email address." : ""
            }
          />
        </Grid>
        <Grid>
          <PasswordComponent
            onChange={handlePasswordInput}
            error={!validPassword}
            helperText={
              validPassword === false
                ? "Password should be at least 6 characters."
                : ""
            }
          />
        </Grid>
        <Grid item>
          <Button className={classes.primaryButton} type="submit">
            Login
          </Button>
        </Grid>
      </form>
    </Grid>
  );
}

export default LoginForm;
