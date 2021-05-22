// Users ROUTEs ============================================================ //
const express = require('express');
const router = express.Router();


// serverhost/api/users/username1
router.param('user', (req, res, next) => {
  req.user = req.param.user;
  next();
});

router.route('/')
  .get((req, res) => {
    // get relevant user data (friends list, user's recipes, userID...)
    res.send('GET to /api/users/ successful!');
  })
  .post((req, res) => {
    // add new user to users collection in db
    res.send('POST to /api/users/ successful!');
  })
  .delete((req, res) => {
    // delete user from db
    res.send('DELETE to /api/users/ successful!');
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
*/

module.exports = router;