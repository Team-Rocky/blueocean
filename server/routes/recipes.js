// Recipes ROUTEs =========================================================== //
const express = require('express');

const dbFunctions = require('../controllers/helpers');

const client = require('../../redis');

const router = express.Router();

// /api/recipes/
router
  .route('/:id')
  .get((req, res) => {
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
  })
  .delete((req, res) => {
    // delete recipe from db
    client.del(`time`, (err, reply) => {
      console.log(reply);
    });
    client.del(`popularity`, (err, reply) => {
      console.log(reply);
    });
    client.del(`myRecipes`, (err, reply) => {
      console.log(reply);
    });
    dbFunctions.deleteRecipe({ _id: req.params.id }, (err, results) => {
      if (err) {
        res.json(err);
      }
      res.json(results);
    });
  });

router.route('/').post((req, res) => {
  client.del(`time`, (err, reply) => {
    console.log(reply);
  });
  client.del(`popularity`, (err, reply) => {
    console.log(reply);
  });
  client.del(`myRecipes`, (err, reply) => {
    console.log(reply);
  });
  dbFunctions.newRecipe(req.body, (err, result) => {
    console.log('here');
    if (err) {
      res.json(err);
    } else {
      res.json(result);
    }
  });
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

router.route('/calendar').post((req, res) => {
  client.del(`calendar${req.body.userId}`, (err, reply) => {
    if (err) {
      console.log(err);
    }
    console.log(reply);
  });
  dbFunctions.addCalendarEntry(req.body, (err) => {
    if (err) {
      console.log('err in .post to calendar: ', err);
      res.json(err);
    }
    res.send('posted!');
  });
});

router.route('/calendar/:id').delete((req, res) => {
  dbFunctions.deleteCalenderRecipe({ _id: req.params.id }, (err, data) => {
    if (err) {
      res.json(err);
    }
    client.del(`calendar${req.params.id}`, (err, reply) => {
      console.log(reply);
    });
    res.json(data);
  });
});

router.route('/calendar/:userId').get((req, res) => {
  // gets all the calendar entries for that user
  var body = { userId: req.params.userId };
  const cacheId = `calendar${req.params.userId}`;
  try {
    client.get(cacheId, async (err, cacheResult) => {
      if (cacheResult) {
        res.json(JSON.parse(cacheResult));
      } else {
        dbFunctions.getCalendarEntries(body, (err, data) => {
          if (err) {
            console.log('err in .get all calendar entries: ', err);
          } else {
            client.setex(cacheId, 1440, JSON.stringify(data));
            res.send(data);
          }
        });
      }
    });
  } catch (error) {
    console.log(error);
  }
});

router.route('/calendar/clear/:userId').delete((req, res) => {
  client.del(`calendar${req.params.id}`, (err, reply) => {
    console.log(reply);
  });
  dbFunctions.deleteAllCalenderRecipes(req.params, (err, data) => {
    if (err) {
      res.json(err);
    }
    res.json(data);
  });
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
