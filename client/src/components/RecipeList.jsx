import React from 'react';
import Recipe from './Recipe.jsx';
import { makeStyles } from '@material-ui/core/styles';

// const useStyles = makeStyles((theme) => ({
//   recipeList: {
//     overflow: 'scroll'
//   }

// }))

const RecipeList = (props) => {
  // const classes = useStyles()

  console.log('props.topTen:', props.topTen)

  if (props.topTen !== undefined) {

    return (<div>
      {props.topTen.map((recipe, index) => {
        return <Recipe recipe={recipe} key={index} />
      })}
    </div>)
  } else {
    return null;
  }

  // return(<div>LISTTTT</div>)
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