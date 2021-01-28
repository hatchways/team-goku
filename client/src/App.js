import React from "react";
import { MuiThemeProvider } from "@material-ui/core";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import { theme } from "./themes/theme";
import LoginSignup from "./pages/LoginSignup";
import User from "./pages/User";
import PrivateRoute from "./PrivateRoute";

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
          <Route path="/">
            <LoginSignup />
          </Route>
        </Switch>
      </BrowserRouter>
    </MuiThemeProvider>
  );
}

export default App;
