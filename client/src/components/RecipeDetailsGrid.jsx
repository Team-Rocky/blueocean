import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Paper } from '@material-ui/core';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
  grid: {
    width: '100%',
    margin: '0px',
  },
  title: {
    margin: theme.spacing(5),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    background: 'lightGrey',
  },
  recipe: {
    margin: theme.spacing(1),
    textAlign: 'left',
    color: theme.palette.text.secondary,
    background: 'lightGrey',
    height: '300px',
  },
  description: {
    margin: theme.spacing(1),
    textAlign: 'left',
    color: theme.palette.text.secondary,
    background: 'lightGrey',
    height: '300px',
    overflow: 'scroll',
  },
  button: {
    margin: theme.spacing(1),
    textAlign: 'center',
    alignItems: 'center',
    color: theme.palette.text.secondary,
    background: 'lightGrey',
    height: 'auto',
  }
}))


const RecipeDetailsGrid = (props) => {
  const classes = useStyles();

  return (
    <Grid container justify='center' justify-content='center' alignItems='center' spacing={1} className={classes.grid}>
      <Grid item className={classes.title} lg={8} xs={12}>
        Back to HomePage
      </Grid>
      <Grid item className={classes.recipe} lg={4} xs={12}>
        recipeitem
      </Grid>
      <Grid item className={classes.description} lg={5} xs={12}>
        description
      </Grid>
      <Grid item className={classes.description} lg={4} xs={12}>
        ingredients
      </Grid>
      <Grid item className={classes.button} lg={5} xs={12}>
        schedule button
      </Grid>
    </Grid >
  )
}

export default RecipeDetailsGrid;