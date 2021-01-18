import React from "react";
import { MuiThemeProvider } from "@material-ui/core";
import { BrowserRouter, Route } from "react-router-dom";
import { Switch } from "react-router";

import { theme } from "./themes/theme";
import LandingPage from "./pages/Landing"
import UserPage from "./pages/User";

import "./App.css";

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <BrowserRouter>
        <Switch>
          <Route path="/user" component={UserPage} />
          <Route path="/" component={LandingPage} />
        </Switch>
      </BrowserRouter>
    </MuiThemeProvider>
  );
}

export default App;
