// Recipes ROUTEs =========================================================== //
const express = require('express');

const dbFunctions = require('../controllers/helpers');

const router = express.Router();

// /api/recipes/
router.route('/:id').get((req, res) => {
  // get all public recipes
  const userId = { userId: req.params.id };
  const { filter } = req.query || 'time';
  const limit = Number(req.query.limit) || 10;
  dbFunctions.getAllRecipeByFilter(userId, filter, limit, (err, results) => {
    if (err) {
      res.json(err);
    }
    res.json(results);
  });
  // res.send('GET to /api/recipes/ successful!');
});

router
  .route('/')
  .post((req, res) => {
    res.send('in post req');
    dbFunctions.newRecipe(req.body, (err, result) => {
      if (err) {
        res.json(err);
      }
      res.json(result);
    });
  })
  .delete((req, res) => {
    // delete recipe from db
    res.send('DELETE to /api/recipes/ successful!');
  });

router.route('/recipe/:recipeId/update-pop').put((req, res) => {
  dbFunctions.incrementPopularity(req.params, (err, results) => {
    if (err) {
      res.json(err);
    }
    res.json(results);
  });
});

// /api/recipes/recipe/:recipeID
router.route('/recipe/:recipeID').get((req, res) => {
  const { limit } = req.params || 10;

  dbFunctions.getUserRecipes(req.params.recipeID, limit, (err, result) => {
    if (err) {
      res.json(err);
    }
    res.json(result);
  });
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
