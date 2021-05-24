import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Paper } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  grid: {
    width: '100%',
    margin: '0px',
  },
  title: {
    padding: theme.spacing(1),
    margin: theme.spacing(2),
    width: '30%',
    textAlign: 'center',
    color: theme.palette.text.secondary,
    background: 'lightGrey',
  },
  search: {
    padding: theme.spacing(1),
    margin: theme.spacing(1),
    width: '30%',
    textAlign: 'center',
    color: theme.palette.text.secondary,
    background: 'lightGrey',
  },
  recipes: {
    padding: theme.spacing(1),
    margin: theme.spacing(2),
    width: '70%',
    textAlign: 'center',
    color: theme.palette.text.secondary,
    background: 'lightGrey',
    height: '750px',
    overflow: 'scroll',
  },
}))


const RecipeSearchGrid = (props) => {
  const classes = useStyles();

  return (
    <Grid container justify-content='center' alignItems='center' direction='column' spacing={2} className={classes.grid}>
      <Grid item className={classes.title}>
        Back to HomePage
      </Grid>
      <Grid item className={classes.search} >
        search
      </Grid>
      <Grid item className={classes.recipes}>
      Recipe
      </Grid>
    </Grid >
  )
}

export default RecipeSearchGrid;