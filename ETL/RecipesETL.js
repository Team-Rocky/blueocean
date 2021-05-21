// const fs = require('fs')
// // const results = [];
// const db = require('./database/index.js');
// const Reviews = require('./database/ReviewsSchema.js')
// const ReviewPhotos = require('./database/ReviewPhotosSchema.js')



const fs = require('fs');
var tempArray = []
const db = require('../database/index')
const Recipes = require('../database/Schemas/RecipesSchema.js')

fs.readFile('testData.json', (err, data) => {
  if (err) throw err;
  let recipes = JSON.parse(data);
  // console.log(recipes.hits);

  recipes.hits.forEach((rec) => {
    tempArray.push(rec)
  })

  // recursively add items from temp array into recipes collection

  console.log('first item in tempArray: ', tempArray[0])
  console.log('length of tempArray: ', tempArray.length)

});

const addRecipes = (array) => {

  // if array is empty
    // return console log "saved!"
    if (array.length === 0) {
     return console.log('saved!')
    }

  // otherwise add the first item in array to recipes
  Recipes.create({

  })
    // upon completion of that, call addRecipes on spliced array
}