import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Paper,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  CircularProgress,
  Toolbar,
  AppBar,
  TextField,
} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import SearchBar from './SearchBar.jsx'
import axios from 'axios';

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
    width: '35%',
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
    height: 'auto',
    overflow: 'scroll',
  },
  card: {
    textAlign: 'left',
    color: theme.palette.text.secondary,
    borderBottom: '1px solid black',
    height: '200',
  }
}))


const RecipeSearchGrid = (props) => {
  const classes = useStyles();
  React.useEffect(() => {
    getRecipes();
  }, []);

  const [inputValue, setInputValue] = React.useState('');
  const [recipeNames, getRecipeNames] = React.useState([]);
  const [value, setValue] = React.useState(recipeNames[0]);
  const [recipes, setRecipes] = React.useState([])

  const getRecipes = () => {
    axios.get('http://localhost:7625/api/recipes/GirlFiery@chefslist.com')
      .then(recipes => {
        var names = [];
        //console.log('RECIPES: ', recipes.data)
        for (let i = 0; i < recipes.data.length; i++) {
          names.push(recipes.data[i].name)
          getRecipeNames(names)
          setRecipes(recipes.data)
          //console.log('options: ', recipes.data)
        }

      })
      .catch(err => {
        console.error(err)
      })
  }

  const renderRecipe = (index) => {
    const { description, name, ingredientLines } = recipes[index];
    //console.log('IT IS RUNNING')
    return (
      <Grid item className={classes.card} xl={6}
        key={name}
        value={recipes[index]}>
        <CardContent>
          <Typography>{name}</Typography>
          <Typography>{description}</Typography>
          <br />
          <Typography>{ingredientLines}</Typography>
          <button style={{ margin: '5px' }}
            value={recipes[index]}
            onClick={() =>props.goToDetailsPage(recipes[index])}
          >more info</button>
          <Button variant="outlined" color="primary" style={{ margin: '5px' }}>Schedule Meal</Button>
        </CardContent>
      </Grid>
    );
  }

  return (
    <Grid container justify-content='center' alignItems='center' direction='column' spacing={2} className={classes.grid}>
      <Grid item className={classes.title} onClick={() => { props.setSearch(false) }}>
        Back to HomePage
      </Grid>
      <Grid item className={classes.search} >
        <SearchBar
          value={value}
          setValue={setValue}
          inputValue={inputValue}
          setInputValue={setInputValue}
          recipeNames={recipeNames}
          getRecipeNames={getRecipeNames}
          recipes={recipes}
          setRecipes={setRecipes}
        />
      </Grid>
      <Grid container className={classes.recipes}>
        {Object.keys(recipes).map(
          (recipeData, i) =>
            (recipes[recipeData].name).toLowerCase().includes(inputValue.toLowerCase()) && renderRecipe(i)
        )}
      </Grid>
    </Grid >
  )
}

export default RecipeSearchGrid;