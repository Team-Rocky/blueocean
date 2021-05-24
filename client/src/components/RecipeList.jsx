import React from 'react';
import Recipe from './Recipe.jsx'

const RecipeList = (props) => {

  return (<div>
{props.data.map((recipe, index) => {
<Recipe recipe={recipe} key={index} />
})}
  </div>)
}

export default RecipeList;