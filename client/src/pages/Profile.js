import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar'
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles(({
  root: {
    height: "100vh",
    background: '#F8F8FF'
  },
  sidebar: {
    background: '#FFFFFF',
    color: 'white',
    height: "100vh",
    width: 400,
    margin: '0px 0px 0px 0px',
    textAlign: 'center',
    float: 'left',
  },
  profile_info: {
    height: "60vh",
  },
  profile_bgimg: {
    height: 100,
  },
  placeholder_two: {
    background: '#F8F8FF',
    color: 'white',
    height: "100vh",
    width: 300,
    margin: '0px 0px 0px 0px',
    textAlign: 'center',
    float: 'right',
  },
  itemButton: {
    background: '#FF510C',
    height: 150,
    position: 'bottom',
  },
  avatar: {
    margin: 'auto',
    height: 150,
    width: 150,
  },
  dishes: {
    margin: '50px 100px',
    float: 'right',
    height: 500,
    width: 800,
    background: '#FFFFFF',
    padding: '50px 0px 0px 0px',
  },
  paper: {
    height: 140,
    width: '100%'
  },

}));

function Profile(props){
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.sidebar}>
        <div className={classes.profile_info}>
          <div className={classes.profile_bgimg}></div>
          <div>
            <Avatar className={classes.avatar}/>
          </div>
        </div>
        <div>
          <Button className={classes.itemButton} fullWidth>Send Request</Button>
        </div>
      </div>
      <div className={classes.dishes}>
        <Paper className={classes.paper}>
          <Grid container wrap="nowrap" spacing={2}>
            <Grid item>
              <Avatar>W</Avatar>
            </Grid>
            <Grid item xs zeroMinWidth>
              <Typography noWrap>PLACEHOLDER</Typography>
            </Grid>
          </Grid>
        </Paper>
        <Paper className={classes.paper}>
          <Grid container wrap="nowrap" spacing={2}>
            <Grid item>
              <Avatar>W</Avatar>
            </Grid>
            <Grid item xs>
              <Typography noWrap>PLACEHOLDER</Typography>
            </Grid>
          </Grid>
        </Paper>
        <Paper className={classes.paper}>
          <Grid container wrap="nowrap" spacing={2}>
            <Grid item>
              <Avatar>W</Avatar>
            </Grid>
            <Grid item xs>
              <Typography>PLACEHOLDER</Typography>
            </Grid>
          </Grid>
        </Paper>
      </div>
    </div>

  );
}

export default Profile;
