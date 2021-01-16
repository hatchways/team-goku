import { createMuiTheme } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import { Button } from "@material-ui/core";

export const theme = createMuiTheme({
  typography: {
    fontFamily: '"Montserrat"',
    fontSize: 12,
    h1: {
      // could customize the h1 variant as well
    }
  },
  palette: {
    primary: { main: "#DF1B1B" }
  }
});