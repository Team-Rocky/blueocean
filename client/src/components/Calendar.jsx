import React from 'react';
import Day from './Day.jsx';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Paper, Box } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  grid: {
    width: '100%',
    margin: '0px',
  },
  calendar: {
    padding: theme.spacing(2),
    display: 'grid',
    'grid-template-columns': '14% 14% 14% 14% 14% 14% 14%',
    color: theme.palette.text.secondary,
    border: '1px',
    background: 'lightGrey',
  },
}));

const Calendar = (props) => {
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const classes = useStyles();

  return (
    <Grid container className={classes.calendar}>
      <Grid item >
        <Paper >
          {days.map((day, index) => <Day key={index} day={day}/>)}
        </Paper>
      </Grid>
    </Grid>
  );
};

export default Calendar;
