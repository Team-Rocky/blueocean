import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BsFillPlusSquareFill from 'react-icons/bs';

const useStyles = makeStyles((theme) => ({
recipe: {
  border: '1px solid black',
  margin: '10px',
  padding: '15px',

}
}))

const Recipe = (props) => {
  const classes = useStyles()
return(<div className={classes.recipe} >
  {props.recipe.name}
  {/* <BsFillPlusSquareFill/> */}
</div>)
}

export default Recipe;