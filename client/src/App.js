import React from "react";
import { MuiThemeProvider } from "@material-ui/core";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import { theme } from "./themes/theme";
import LoginSignup from "./pages/LoginSignup";
import NavBar from "./pages/NavBar";
import "./App.css";
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
          <PrivateRoute path={["/search", "/profile"]}>
            <NavBar></NavBar>
          </PrivateRoute>
          <Route path="/">
            <Redirect
              to={{
                pathname: "/search",
              }}
            />
          </Route>
        </Switch>
      </BrowserRouter>
    </MuiThemeProvider>
  );
}

export default App;
