import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar'
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';

import sushi1 from '../images/sushi1.png';
import chef from '../images/chef.png';

const useStyles = makeStyles(theme => ({
  root: {
    height: '100vh',
    flex: 1
  },
  sidebar: {
    width: 400,
    height: '100%',
    background: '#FFFFFF'
  },
  sidebarimg : {
    height: '45%',
    backgroundImage: `url(${sushi1})`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center top",
    backgroundSize: "100% 80%",

  },
  chefinfo_one: {
    height: '10%',
  },
  chefinfo_two: {
    height: '25%',
  },
  chef_description: {
    marginLeft: "15%",
    marginRight: '15%',
    marginTop: '10%',

  },
  large: {
    width: theme.spacing(15),
    height: theme.spacing(15),
    borderWidth: 4,
    borderColor: 'white',
    borderStyle: 'solid',
    marginBottom: '3%',
  },
  divider: {
    marginBottom: '20px',
  },
  srButton: {
    height: '20%',
    background: "#FF510C",
    borderRadius: 0,
  },
  dishes_section: {
    height: '100%',
    width: '30%',
  },
  dishes: {
    background: '#FFFFFF',
    height: '75%',
    width: '70%',
  },
  chefs_name: {
    marginTop: '10%',
    marginBottom:'3%',
  },
}));

function Profile(props){
  const classes = useStyles();

  return (
    <Grid container className={classes.root}>
      <Paper className={classes.sidebar}>
        <Grid item xs
              className={classes.sidebarimg}
              container
              direction="column-reverse"
              alignItems="center">
          <Avatar src={chef} className={classes.large} />
        </Grid>
        <Grid item xs
              className={classes.chefinfo_one}
              container
              direction="column"
              alignItems="center">
        <Typography variant='h6' align='center'>Atsushi Mikazuki</Typography>
        <Typography variant='subtitle1' align='center'>Toronto, Canada</Typography>
        </Grid>
        <Divider variant="middle" />
        <Grid item xs
              className={classes.chefinfo_two}
              container
              direction="column"
              alignItems="center">

        <Typography variant='subtitle2' align='center' lineHeight={2} className={classes.chef_description}>Chef with 8 years of experience in Japanese cuisine. Recipient of awards and positive feedback.</Typography>
        </Grid>
        <Button variant="contained" className={classes.srButton} fullWidth>Send Request</Button>
      </Paper>

      <Grid item xs
            className={classes.dishes_section}
            container
            direction="column"
            alignItems="center">
        <Typography variant='h6' align='center' className={classes.chefs_name}>Atsushi's Menu:</Typography>
        <Paper className={classes.dishes}>
        </Paper>
      </Grid>

    </Grid>
  );
}

export default Profile;
