import React, { useState, useEffect } from "react";
import {
  Grid,
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogActions,
  CircularProgress,
  Typography,
} from "@material-ui/core";
import { validateEmail, validatePassword } from "../Validation";
import {
  LoginComponent,
  PasswordComponent,
  NameComponent,
} from "./LoginSignupComponents";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory, Link } from "react-router-dom";

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
  blackFont: {
    color: "#000",
  },
});

function SignupForm(props) {
  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(true);
  const [password, setPassword] = useState("");
  const [validPassword, setValidPassword] = useState(true);
  const [name, setName] = useState("");
  const [validName, setValidName] = useState(true);
  const [openSuccessDialog, setOpenSuccessDialog] = useState(false);
  const [loading, setLoading] = useState(true);
  const [signupSuccess, setSignupSuccess] = useState(false);

  const history = useHistory();

  useEffect(() => {
    if (signupSuccess) {
      const timer = setTimeout(() => {
        history.push("/login");
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [signupSuccess]);

  const handleClose = () => {
    if (!loading) {
      setOpenSuccessDialog(false);
    }
  };

  const handleEmailInput = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordInput = (event) => {
    setPassword(event.target.value);
  };

  const handleNameInput = (event) => {
    setName(event.target.value);
  };

  const handleSignupSubmit = (event) => {
    event.preventDefault();
    if (name !== "" && validateEmail(email) && validatePassword(password)) {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      const raw = JSON.stringify({
        name: name,
        email: email,
        password: password,
      });

      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
      };
      setOpenSuccessDialog(true);
      setLoading(true);
      fetch("http://localhost:5000/users/register", requestOptions)
        .then((response) => {
          if (response.status == 201) {
            setSignupSuccess(true);
          } else {
            setSignupSuccess(false);
          }
          setLoading(false);
        })
        .catch((error) => {
          setSignupSuccess(false);
          setLoading(false);
        });
    } else {
      // Do not submit form and update states for user to see error.
      setValidName(name !== "");
      setValidEmail(validateEmail(email));
      setValidPassword(validatePassword(password));
    }
  };

  const classes = themes();
  return (
    <Grid container direction="column" justify="center" alignItems="center">
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
        <Grid>
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
            helperText={
              validPassword ? "" : "Password should be at least 6 characters."
            }
            placeholder="Enter your password"
          />
        </Grid>
        <Grid>
          <Button className={classes.primaryButton} type="submit">
            Sign Up
          </Button>
        </Grid>
      </form>
      <Dialog
        onClose={handleClose}
        aria-labelledby="simple-dialog-title"
        open={openSuccessDialog}
      >
        <DialogContent>
          {loading ? (
            <CircularProgress color="secondary"></CircularProgress>
          ) : (
            <DialogContentText id="alert-dialog-description">
              {signupSuccess ? (
                <SuccessfulSignup></SuccessfulSignup>
              ) : (
                <FailedSignup></FailedSignup>
              )}
            </DialogContentText>
          )}
        </DialogContent>
        <DialogActions>
          {loading ? "" : <Button onClick={handleClose}>Close</Button>}
        </DialogActions>
      </Dialog>
    </Grid>
  );
}

function SuccessfulSignup() {
  const classes = themes();
  return (
    <Typography className={classes.blackFont}>
      Sign up succesful. Wait 5 seconds or click <Link to="/login">here</Link>{" "}
      to be redirected to the login page.
    </Typography>
  );
}

function FailedSignup() {
  const classes = themes();
  return (
    <Typography className={classes.blackFont}>
      Sign up failed. Please try again.
    </Typography>
  );
}

export default SignupForm;
