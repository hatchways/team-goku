import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';


import sushi1 from '../images/sushi1.png';


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    width: '100%',
    borderRadius: 0,
    padding: '30px 30px 30px 10px'
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
    width: '80%'
  },
  content: {
    flex: '1 0 auto',
    paddingTop: 0,
  },
  cover: {
    width: '100%',

  },
  food_img: {
    float: 'right',
  },
  controls: {
    display: 'flex',
    alignItems: 'center',
  },
  servingSize: {
      ...theme.typography.button,
      backgroundColor: '#FF743D',
      color: 'white',
      padding: theme.spacing(1),
      marginBottom: '2%'
  },
}));

export default function MediaControlCard() {
  const classes = useStyles();
  const theme = useTheme();

  return (
    <Card className={classes.root}>
      <div className={classes.details}>
        <CardContent className={classes.content}>
          <div className={classes.servingSize}>{"FAMILY STYLE DINNER FOR 4."}</div>
          <Typography component="h5" variant="h4">
            4 Special Rolls
          </Typography>
          <Typography variant="subtitle1">
            $15.00
          </Typography>
          <Typography component="h6" variant="h6">
            Ingredients:
          </Typography>
          <Typography component="h5" variant="body1">
            Rice, Nori, Crab, Avacado, Cucumber
          </Typography>
          <Typography component="h5" variant="h6">
            Required Stuff:
          </Typography>
          <Typography component="h5" variant="body1">
            Kitchen Table, Cooking Plate
          </Typography>
        </CardContent>
        <div className={classes.controls}>

        </div>
      </div>
      <CardMedia className={classes.cover}>
      <img src={sushi1} className={classes.food_img} />
      </CardMedia>
    </Card>
  );
}
