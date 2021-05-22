// Users ROUTEs ============================================================ //
const express = require('express');
const router = express.Router();


// serverhost/api/users/username1
router.route('/:username')
  .get((req, res) => {
    // get relevant user data (friends list, user's recipes, userID...)
    req.user = req.param.user;
    if (!req.user) { req.user = 'NO_ID!'; }
    res.send(`successful GET to /api/users/${req.user}`);
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