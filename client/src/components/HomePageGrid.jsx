import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Paper } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import AddRecipe from './AddRecipe.jsx';
import RecipeList from './RecipeList.jsx';
import Auth from './Auth.jsx';
import Day from './Day.jsx';
import myPic from './../assets/set-and-forget.svg';
require('./helpers/pushNotifications.js');

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
    padding: theme.spacing(1),
    margin: theme.spacing(1),
    textAlign: 'center',
    alignContent: 'center',
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
    height: '450px',
    overflow: 'scroll',
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '100%',
  },
  button: {
    margin: theme.spacing(1),
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    textAlign: 'center',
  },
}));

const HomePageGrid = (props) => {
  const handleFilterChange = (e) => {
    props.getBoard(props.userId, e.target.value);
  };
  const classes = useStyles();
  const [clicked, setClicked] = useState(false);

  const days = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];
  return (
    <Grid container justify="center" spacing={2} className={classes.grid}>
      <Grid container justify="center" spacing={2}>
        <Grid item xs={12} lg={12}>
          <Paper className={classes.header}>
            <img height="100px" width="100px" src={myPic} />
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
            <Day updateCalendar={props.updateCalendar} key={index} day={day} schedule={props.schedule} />
          ))}
        </Paper>
      </Grid>
      <Grid item lg={3} xs={12}>
        <Paper className={classes.leaderboard}>
          <span>Filter by: </span>
          <select onChange={handleFilterChange} name="filter">
            <option value="time">Recent</option>
            <option value="popular">Popularity</option>
            <option value="myRecipes">My Recipes</option>
          </select>
          <RecipeList
            topTen={props.topTen}
            userId={props.userId}
            updateCalendar={props.updateCalendar}
          />
        </Paper>
      </Grid>
      <Grid
        container
        direction="row"
        justify="space-between"
        alignItems="center"
        spacing={2}
        className={classes.button}
      >
        <Button
          variant="contained"
          color="primary"
          onClick={props.changeDisplay}
        >
          Shopping List
        </Button>
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          onClick={() => {
            props.setSearch(true);
          }}
        >
          Browse
        </Button>
        <AddRecipe
          getBoard={props.getBoard}
          userId={props.userId}
          userId={props.userId}
        />
      </Grid>
    </Grid>
  );
};

export default HomePageGrid;
