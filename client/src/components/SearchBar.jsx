import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';

// //get request for recipe names
// let options = [''];

// // for (let i = 1; i < 400; i++) {
// //   options.push(`option ${i}`)
// // }

const useStyles = makeStyles((theme) => ({
  root: {
    width: 500,
    display: 'flex',
    justify: 'center',
    '& > * + *': {
      margin: theme.spacing(1),
    },
  },
}));

export default function SearchBar({ value, setValue, inputValue, setInputValue, recipeNames, getRecipeNames, setRecipes, recipes }) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Autocomplete

        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
          //console.log(value)
        }}
        inputValue={inputValue}
        onInputChange={(event, newInputValue) => {
          setInputValue(newInputValue);
          //console.log(inputValue)
        }}
        id="SearchBar"
        options={recipeNames}
        style={{ width: 300 }}
        renderInput={(params) => <TextField {...params} label="Search" variant="outlined" />}
      />
    </div>
  );
}