import React, { useState } from 'react';
import { ThemeProvider, makeStyles, createMuiTheme} from '@material-ui/core/styles';
import styled from 'styled-components'
import { Grid, Paper } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import AddRecipe from './AddRecipe.jsx';
import RecipeList from './RecipeList.jsx';
import Auth from './Auth.jsx';
import Day from './Day.jsx';
import myPic from './../assets/set-and-forget.svg';
import picture from './vege-bg.png'
<<<<<<< HEAD
import Select from '@material-ui/core/Select';
// require('./helpers/pushNotifications.js');
=======
import pj from './pjpic.png';
require('./helpers/pushNotifications.js');
>>>>>>> main

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#d8bfd8'
    },
    secondary: {
      main: '#FFB6C1'
    }
  }
});

const useStyles = makeStyles((theme) => ({
  button: {
    padding: theme.spacing(1),
    margin: theme.spacing(1),
  },
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
  calendar: {
    padding: theme.spacing(2),
    display: 'grid',
    'grid-template-columns': '14% 14% 14% 14% 14% 14% 14%',
    textAlign: 'center',
    color: theme.palette.text.secondary,
    backgroundColor: 'thistle',
    height: '450px',
    border: 'solid black',
    backgroundImage: `url(${picture})`,
    backgroundSize: "contain",
  },
  leaderboard: {
<<<<<<< HEAD
    border: '3px solid black',
    height: '500px',
    //padding: '1px',
    textAlign: 'center',
    color: theme.palette.text.secondary,
    backgroundColor: 'thistle',
    backgroundImage: "url('./vege-bg.png')",
=======
    padding: theme.spacing(2),
    backgroundImage: `url(${pj})`,
    textAlign: 'center',
    color: 'theme.palette.text.secondary',
    backgroundSize: "contain",
    backgroundRepeat: 'no-repeat',
    backgroundSize: '100px',
    background: 'wheat',
    height: '450px',
>>>>>>> main
    overflow: 'scroll',
    border: '2px solid black'
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '100%',
    fontFamily: 'Fredoka One',
    fontSize: 'x-large',
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
    <ThemeProvider theme={theme}>
    <Grid container justify="center" spacing={2} className={classes.grid}>
      <Grid container justify="center" spacing={2}>
        <Grid item xs={12} lg={12}>
          <Paper className={classes.header}>
            <img height="100px" width="100px" src={myPic} />
            <div>Set &amp; forget</div>
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
        <span><h3 style={{fontFamily: 'Pattaya'}}>Recipes:</h3></span>
          <FilterStyle>Filter by: </FilterStyle>
          <SelectBox onChange={handleFilterChange} name="filter">
            <option value="time">Recent</option>
            <option value="popular">Popularity</option>
            <option value="myRecipes">My Recipes</option>
          </SelectBox>
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
          color="secondary"
          onClick={() => { props.setSearch(true); }}
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
    </ThemeProvider>
  );
};

const FilterStyle = styled.span`
  font-weight: bold;
  padding-left: 1em;
`

const SelectBox = styled.select`
  font-family: 'Architects Daughter';
`

export default HomePageGrid;



/*
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
  button: {
    margin: theme.spacing(1),
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    textAlign: 'center',
    color: 'white',
  },
*/