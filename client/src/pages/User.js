import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Box from '@material-ui/core/Box';

import logo from '../images/logo.png';


const useStyles = makeStyles(({
  root: {
    background: "#F8F8FF",
    height: "100vh",
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
    marginLeft: '10px'
  },
  navbar: {
    background: "#FFFFFF"
  },
  menu: {
    background: "#F8F8FF",
  },
  accountButton: {
    float: 'right'
  }
}));

export default function MenuAppBar() {
  const classes = useStyles();
  const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [user_info, setUserInfo] = React.useState({ user_email: "email@email.com", user_type: "chef" })
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
      <div>
        <AppBar position="fixed" className={classes.navbar}>
          <Toolbar>
            <img src={logo} />
            <Typography component="div" className={classes.title}>
              <Box letterSpacing={6} m={1}>
                  CHEF'S MENU
              </Box>
            </Typography>
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
        <Profile />
      </div>

    </div>
  );
}
