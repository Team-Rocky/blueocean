import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { ClickAwayListener, Grid, Paper, Modal } from '@material-ui/core';
import AddRecipe from './AddRecipe.jsx'
import RecipeList from './RecipeList.jsx';
import Auth from './Auth.jsx';
import Day from './Day.jsx';
import AddToCalendar from './AddToCalendar.jsx';
import myPic from './../assets/set-and-forget.svg';
import ScheduleMeal from './ScheduleMeal.jsx';

const useStyles = makeStyles((theme) => ({
  /*

  */
  grid: {
    width: '100%',
    margin: '0px',
  },
  title: {
    padding: theme.spacing(0),
    margin: theme.spacing(2),
    textAlign: 'center',
    alignContent: 'center',
    color: theme.palette.text.secondary,
    border: '1px',
    background: 'lightGrey',
  },
  button: {
    padding: theme.spacing(2),
    textAlign: 'center',
    justify: 'right',
    color: theme.palette.text.secondary,
    border: '1px',
    background: 'lightGrey',
  },
  calendar: {
    padding: theme.spacing(2),
    display: 'grid',
    'grid-template-columns': '14% 14% 14% 14% 14% 14% 14%',
    textAlign: 'center',
    color: theme.palette.text.secondary,
    background: 'lightGrey',
    height: '450px',
    border: 'solid black',
  },
  leaderboard: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    background: 'lightGrey',
    height: '300px',
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '100%',
  },
}));

const HomePageGrid = (props) => {
  const classes = useStyles();
  const [clicked, setClicked] = useState(false);

  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  return (
    <Grid container justify="center" spacing={2} className={classes.grid}>
      <Grid container justify="center" spacing={2}>
        <Grid item xs={12} lg={12}>
          <Paper className={classes.header}>
            <img height="100px" widht="100px" src={myPic} />
            <Auth />
          </Paper>
        </Grid>
      </Grid>
      <Grid item lg={4}>
        <Paper className={classes.title}></Paper>
      </Grid>
      <Grid item lg={9} xs={12}>
        <Paper className={classes.calendar}>
          {days.map((day, index) => (
            <Day key={index} day={day} schedule={props.schedule} />
          ))}
        </Paper>
      </Grid>
      <Grid item lg={3} xs={12}>
        <Paper className={classes.leaderboard}></Paper>
      </Grid>
      <Grid container justify='flex-end' spacing={2} className={classes.grid}>
      <Grid item lg={3}>
          <Paper><AddRecipe userId={props.userId} /></Paper>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default HomePageGrid;
