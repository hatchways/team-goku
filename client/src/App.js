import React from "react";
import { MuiThemeProvider } from "@material-ui/core";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import { theme } from "./themes/theme";
import LoginSignup from "./pages/LoginSignup";
import User from "./pages/User";
import "./App.css";
import PrivateRoute from "./PrivateRoute";
import UserProfile from "./pages/UserProfile";

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <BrowserRouter>
        <Switch>
          <Route path="/signup">
            <LoginSignup />
          </Route>
          <Route path="/login">
            <LoginSignup />
          </Route>
          <PrivateRoute path="/user">
            <User />
          </PrivateRoute>
          <PrivateRoute path="/profile">
            <UserProfile></UserProfile>
          </PrivateRoute>
          <Route path="/">
            <Redirect
              to={{
                pathname: "/login",
              }}
            />
          </Route>
        </Switch>
      </BrowserRouter>
    </MuiThemeProvider>
  );
}

export default App;
