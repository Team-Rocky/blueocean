// Users ROUTEs ============================================================ //
const express = require('express');

const router = express.Router();

const dbFunctions = require('../controllers/helpers');

// serverhost/api/users/username1
router
  .route('/:email')
  .get((req, res) => {
    // get relevant user data (friends list, user's recipes, userID...)
    dbFunctions.getUser(req.params, (err, result) => {
      if (err) {
        res.json(err);
      }
      // eslint-disable-next-line no-underscore-dangle
      const { filter } = req.query || 'time';
      const limit = Number(req.query.limit) || 10;
      if (!result.length) {
        res.send('Does not Exist');
        return;
      }
      dbFunctions.getAllRecipeByFilter(
        { userId: result[0]._id },
        filter,
        limit,
        (resErr, recipeResults) => {
          if (resErr) {
            res.json(resErr);
          }
          res.json(recipeResults);
        }
      );
    });
  })
  .post((req, res) => {
    // add new user to users collection in db
    res.send(`successful POST to /api/users/ ${req.user}`);
  })
  .delete((req, res) => {
    // delete user from db
    res.send(`successful DELETE to /api/users/ ${req.user}`);
  });

/*
const axios = require('axios');
let apiKey = require('../auth/.apiname.key.js');

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

// serverhost/api/users/:username1
//router.param('user', (req, res, next) => {
//  req.user = req.param.user;
//  next();
//});
*/

module.exports = router;
