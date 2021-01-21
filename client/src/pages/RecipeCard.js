import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import SkipNextIcon from '@material-ui/icons/SkipNext';

import sushi1 from '../images/sushi1.png';


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    width: '100%',
    borderRadius: 0,
    padding: '50px 50px 50px 10px'
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
}));

export default function MediaControlCard() {
  const classes = useStyles();
  const theme = useTheme();

  return (
    <Card className={classes.root}>
      <div className={classes.details}>
        <CardContent className={classes.content}>
          <Typography component="h5" variant="h5">
            4 Special Rolls
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            Mac Miller
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
