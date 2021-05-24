import React from 'react';
import Recipe from './Recipe.jsx'

const RecipeList = (props) => {

  return (<div>
    {props.data.map((recipe, index) => {
      return <Recipe recipe={recipe} key={index} />
    })}
  </div>)
}

export default RecipeList;

// for app.jsx:

// useEffect(() => {

//   axios.get(`/${user.displayName}`)
//   .then((response) => {
//     console.log('this is response.data: ', response.data)
//   })
//   .catch((err) => {
//     console.log('error in axios.get: ', err)
//   })

// })


// for Recipe.jsx

// import React from 'react';

// const Recipe = (props) => {
//   return (<div>
// RECIPE
//   </div>)

// }