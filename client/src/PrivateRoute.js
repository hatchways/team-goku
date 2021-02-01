import React from "react";
import { Route, Redirect } from "react-router-dom";

import { isLogin } from "./util/LoginLogoutUtils";

function PrivateRoute({ children, ...rest }) {
  return (
    <Route
      {...rest}
      render={({ location }) =>
        isLogin() ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
            }}
          />
        )
      }
    />
  );
}

export default PrivateRoute;
