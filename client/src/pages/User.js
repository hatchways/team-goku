import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(({
  root: {
    background: "#6e6e6e",
    height: "100vh",
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
  navbar: {
    background: "#000000"
  },
  placeholder_one: {
    background: '#F8F8FF',
    border: 1,
    borderRadius: 3,
    boxShadow: '3px 5px #888888',
    color: 'white',
    height: 300,
    width: 300,
    padding: '100px 100px',
    margin: '25px 50px 75px 75px',
    textAlign: 'center',
    float: 'left',
  },
  placeholder_two: {
    background: '#F8F8FF',
    border: 1,
    borderRadius: 3,
    boxShadow: '3px 5px #888888',
    color: 'white',
    height: 300,
    width: 300,
    padding: '100px 100px',
    margin: '25px 50px 75px 75px',
    textAlign: 'center',
    float: 'right',
  },
  itemButton: {
    background: '#FF743D',
  },

}));

export default function MenuAppBar() {
  const classes = useStyles();
  const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleChange = (event) => {
    setAuth(event.target.checked);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className={classes.root}>
      <div className={classes.navbar}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" className={classes.title}>
              CHEF'S MENU
            </Typography>
            <Button color="inherit">Link 1</Button>
            <Button color="inherit">Link 2</Button>
            <Button color="inherit">Link 3</Button>
            {auth && (
              <div>
                <IconButton
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleMenu}
                  color="inherit"
                >
                  <AccountCircle />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={open}
                  onClose={handleClose}
                >
                  <MenuItem onClick={handleClose}>Profile</MenuItem>
                  <MenuItem onClick={handleClose}>Logout</MenuItem>
                </Menu>

              </div>
            )}
          </Toolbar>
        </AppBar>
      </div>
      <div className={classes.placeholder_one}>
      <Button className={classes.itemButton}>Placeholder</Button>
      </div>
      <div className={classes.placeholder_two}>
      <Button className={classes.itemButton}>Placeholder</Button>
      </div>
    </div>
  );
}
