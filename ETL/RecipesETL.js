const fs = require('fs');
var tempArray = []
const db = require('../database/index');
const Recipes = require('../database/Schemas/RecipesSchema.js');
const Users = require('../database/Schemas/UsersSchemas.js');

var namesArray = [
  "Jordan Hamsey",
  "Marco Pierre Aight",
  "Billie Flay",
  "Girl Fiery",
  "Luigi Batali",
  "Jack Peepin"
]

fs.readFile('testData.json', (err, data) => {
  if (err) throw err;
  let recipes = JSON.parse(data);
  // console.log(recipes.hits);

  recipes.hits.forEach((rec) => {
    tempArray.push(rec)
  })

  // recursively add items from temp array into recipes collection
  addRecipes(tempArray)

  // console.log('first item in tempArray: ', tempArray[0])
  // console.log('length of tempArray: ', tempArray.length)

});

const addRecipes = (array) => {

  // if array is empty
    // return console log "saved!"
    if (array.length === 0) {
     return console.log('saved recipes!')
    }
var rando = namesArray[Math.round(Math.random() * 4)]
    // find a random user
    Users.find({name: rando})
      // add the first item in array to recipes
      .then((user) => {
        console.log('this is user[0].name: ', user[0].name)
      Recipes.create({
        userId: user[0]._id,
        userName: user[0].name,
        name: array[0].recipe.label,
        private: false,
        ingredientLines: array[0].recipe.ingredientLines,
        popularity: Math.round(Math.random() * 100),
        totalTime: 45,
        yield: Math.round(Math.random() * 4),
        photo: array[0].recipe.image,
        date_created: new Date()

      })
      .then(() => {
        // upon completion of that, call addRecipes on spliced array
        addRecipes(array.splice(1, array.length));

      })
      .catch((err) => {
        console.log('err in recipes.create:', err);
      });
    })
    .catch((err) => {
      console.log('err in users.find: ', err);
    });
};
