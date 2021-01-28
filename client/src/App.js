import React from "react";
import { MuiThemeProvider } from "@material-ui/core";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import { theme } from "./themes/theme";
import LoginSignup from "./pages/LoginSignup";
import User from "./pages/User";
import UploadDialog from "./UploadDialog";

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
          <Route path="/user">
            <User />
          </Route>
          <Route path="/test">
            <UploadDialog />
          </Route>
        </Switch>
      </BrowserRouter>
    </MuiThemeProvider>
  );
}

export default App;
