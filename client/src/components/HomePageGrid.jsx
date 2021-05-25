import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Paper } from '@material-ui/core';
import RecipeList from './recipeList.jsx';
import Auth from './Auth.jsx';
import Day from './Day.jsx';
import AddToCalendar from './AddToCalendar.jsx';

const useStyles = makeStyles((theme) => ({
  grid: {
    width: '100%',
    margin: '0px',
  },
  title: {
    padding: theme.spacing(2),
    margin: theme.spacing(8),
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
}))


const HomePageGrid = (props) => {
  console.log('props.wee: ', props.week)
  const classes = useStyles();
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  return (
    <Grid container justify='center'  spacing={2} className={classes.grid}>
      <Grid container justify='space-between' spacing={2} className={classes.grid}>
        <Grid item lg={2}>
          <Paper className={classes.button} >

          </Paper>
        </Grid>
        <Grid item lg={2}>
          <Paper className={classes.button} >
            <Auth />
          </Paper>
        </Grid>
      </Grid>
      <Grid item lg={5}>
        <Paper className={classes.title} >

        </Paper>
      </Grid>
      <Grid item lg={9} xs={12}>
        <Paper className={classes.calendar} >
          {days.map((day, index) => <Day key={index} day={day} schedule={props.schedule}/>)}
        </Paper>
      </Grid>
      <Grid item lg={3} xs={12}>
        <Paper className={classes.leaderboard} ></Paper>
      </Grid>
      <Grid container justify='flex-end' spacing={2} className={classes.grid}>
        <Grid item lg={3}>
          <Paper className={classes.button} >new Recipe</Paper>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default HomePageGrid