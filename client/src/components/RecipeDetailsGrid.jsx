import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Paper, Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import ScheduleMeal from './ScheduleMeal.jsx';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
  grid: {
    width: '100%',
    margin: '0px',
  },
  title: {
    padding: theme.spacing(1),
    margin: theme.spacing(2),
    fontFamily: 'Architects Daughter,cursive',
    cursor: 'pointer',
    width: '30%',
    textAlign: 'center',
    color: theme.palette.text.primary,
    background: '#e6e6fa',
  },
  recipe: {
    margin: theme.spacing(1),
    textAlign: 'center',
    fontSize: 24,
    fontFamily: 'Pattaya, sans-serif',
    color: theme.palette.text.primary,
    background: '#e6e6fa',
    height: 'auto',
  },
  description: {
    margin: theme.spacing(1),
    textAlign: 'left',
    color: theme.palette.text.primary,
    background: '#e6e6fa',
    height: '300px',
    overflow: 'scroll',
  },
  button: {
    margin: theme.spacing(1),
    textAlign: 'center',
    alignItems: 'center',
    color: theme.palette.text.secondary,
    background: '#e6e6fa',
    height: 'auto',
  }
}))


const RecipeDetailsGrid = (props) => {
  const classes = useStyles();

  return (
    <Grid container justify='center' justify-content='center' alignItems='center' spacing={1} className={classes.grid}>
      <Grid item className={classes.title} lg={8} xs={12}
        onClick={() => {
          props.setSearch(false)
          props.setDetail(false)
        }}>
        Back to HomePage
      </Grid>
      <Grid item className={classes.recipe} lg={4} xs={12}>
        {props.recipe.name}
        <br />
        <img style={{border: '1px solid black',}} src={props.recipe.photo[0] || 'https://pbs.twimg.com/media/D-DX-LDXkAEbaML.png'}></img>
      </Grid>
      <Grid item className={classes.description} lg={5} xs={12}>
        {props.recipe.description}
      </Grid>
      <Grid item className={classes.description} lg={4} xs={12}>
        {props.recipe.ingredientLines.map(
          (ingredient, i) =>
            <Typography key={i}>
              {`- ${ingredient}`}
            </Typography>
        )}
      </Grid>
      <Grid item className={classes.button} lg={5} xs={12}>
      <ScheduleMeal
          recipe={props.recipe}
          user={props.user}
          userId={props.userId}
          updateCalendar={props.updateCalendar}
          searchPage={props.searchPage}
          detailPage={props.detailPage}
          />
        <Button variant="outlined" color="primary" onClick={() => { props.setSearch(true); props.setDetail(false)}}>Back</Button>
      </Grid>
    </Grid >
  )
}

export default RecipeDetailsGrid;