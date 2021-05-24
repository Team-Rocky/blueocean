// Recipes ROUTEs =========================================================== //
const express = require('express');

const dbFunctions = require('../controllers/helpers');

const router = express.Router();

// /api/recipes/
router
  .route('/')
  .get((req, res) => {
    // get all public recipes
    const id = { id: req.params.id };
    const { filter } = req.params || 'time';
    const limit = req.params.limit || 5;
    dbFunctions.getAllRecipeByFilter(id, filter, limit, (err, results) => {
      if (err) {
        res.json(err);
      }
      res.json(results);
    });
    // res.send('GET to /api/recipes/ successful!');
  })
  .post((req, res) => {
    // add new recipe to recipe collection in db
    res.send('POST to /api/recipes/ successful!');
  })
  .delete((req, res) => {
    // delete recipe from db
    res.send('DELETE to /api/recipes/ successful!');
  });

// /api/recipes/top10
router.route('/top10').get((req, res) => {
  // get top 10 recipes
  res.send('GET to /api/recipes/top10 successful!');
});

// /api/recipes/recipe/:recipeID
router.route('/recipe/:recipeID').get((req, res) => {
  res.send(`GET to /api/recipes/recipe/${req.params.recipeID} successful!`);
});

/*
const axios = require('axios');
let apiKey = require('../auth/.apiname.key.js');
// for incoming JSON
router.use(express.json(), (req, res, next) => {
  next();
});

// create axios instance - for if we need to comm with external api
let ax = axios.create({
  baseURL: 'https://api.domain.com/route',
  timeout: 1000,
  headers: apiKey,
});

// axios error callback func
const axERRcb = (err) => {
  if (err.response === undefined) { console.error('  ^ERROR!'); }
  else {
    console.error('   ^ERROR!', err.response.status, err.response.statusText);
  }
}

  ax.get((`/api/route`))
    .then(function (response) {
      res.send(response.data);
    .catch(function (err) { axERRcb(err); res.end('axios ERR'); });
*/

module.exports = router;
