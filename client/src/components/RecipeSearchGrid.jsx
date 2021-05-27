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
import ScheduleMeal from './ScheduleMeal.jsx';
import axios from 'axios';
import RecipeItem from './CustomDialog.jsx';

const useStyles = makeStyles((theme) => ({
  grid: {
    width: '100%',
    margin: '0px',
    backgroundImage: `url("https://www.transparenttextures.com/patterns/little-pluses.png")`,
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
  search: {
    padding: theme.spacing(1),
    margin: theme.spacing(1),
    width: '300px',
    textAlign: 'center',
    color: theme.palette.text.primary,
    // background: 'white',
  },
  recipes: {
    padding: theme.spacing(1),
    margin: theme.spacing(2),
    width: '60%',
    // textAlign: 'center',
    color: theme.palette.text.secondary,
    background: '#e6e6fa',
    height: 'auto',
    overflow: 'scroll',
  },
  card: {
    margin: theme.spacing(1),
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    background: 'white',
    backgroundImage: `url("https://www.transparenttextures.com/patterns/little-pluses.png")`,
    color: theme.palette.text.primary,
    border: '1px solid black',
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
    axios.get(`http://localhost:7625/api/recipes/${props.user.email}?filter=time&limit=20`)
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
        key={name + index}
        value={recipes[index]}>
        <CardContent>
          <Typography style={{ fontFamily: 'Pattaya, sans-serif' }} variant="h4">{name}</Typography>
          <Typography style={{ fontFamily: 'cambria , cursive' }}>{description}</Typography>
          <RecipeItem
            userId={props.userId}
            searchPage={props.searchPage}
            recipe={recipes[index]}
            key={index}
            updateCalendar={props.updateCalendar}
            user={props.user}
          />
          {/* <Button variant="outlined" color="primary" style={{ margin: '5px' }}>Schedule Meal</Button> */}
          <ScheduleMeal
            recipe={recipes[index]}
            user={props.user}
            userId={props.userId}
            updateCalendar={props.updateCalendar}
            searchPage={props.searchPage}
            detailPage={props.detailPage}
          />
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
      <Grid container alignItems='center' className={classes.recipes}>
        {Object.keys(recipes).map(
          (recipeData, i) =>
            (recipes[recipeData].name).toLowerCase().includes(inputValue.toLowerCase()) && renderRecipe(i)
        )}
      </Grid>
    </Grid >
  )
}

export default RecipeSearchGrid;