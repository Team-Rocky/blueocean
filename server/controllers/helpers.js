const Users = require('../../database/Schemas/UsersSchemas');
const Recipes = require('../../database/Schemas/RecipesSchema');

module.exports = {
  getUser(email, callback) {
    Users.find(email, (err, docs) => {
      if (err) {
        callback(err, null);
      }
      callback(null, docs);
    });
  },
  getUserRecipes(id, limit, callback) {
    Recipes.find(id, (err, docs) => {
      if (err) {
        callback(err, null);
      }
      callback(null, docs);
    }).limit(limit);
    // .skip(limit * page + limit);
  },
  getAllRecipeByFilter(id, filter, limit, callback) {
    let queryBy;
    let search = {};
    console.log(filter);
    if (filter === 'time') {
      queryBy = { sort: '-date_created' };
    }
    if (filter === 'popularity') {
      queryBy = { sort: '-popularity' };
    }
    if (filter === 'myRecipes') {
      queryBy = null;
      search = id;
    }
    search.private = false;
    Recipes.find(search, null, queryBy, (err, docs) => {
      if (err) {
        callback(err, null);
      }
      callback(null, docs);
    }).limit(limit);
  },
  addUser(info, callback) {
    Users.create(info, (err, docs) => {
      if (err) {
        callback(err, null);
      }
      callback(null, docs);
    });
  },
  newRecipe(info, callback) {
    Recipes.create(info, (err, docs) => {
      if (err) {
        callback(err, null);
      }
      callback(null, docs);
    });
  },
  updateRecipe(id, newInfo, callback) {
    Recipes.findOneAndUpdate(id, { newInfo }, { upsert: true }, (err, docs) => {
      if (err) {
        callback(err, null);
      }
      callback(docs, null);
    });
  },
  incrementPopularity(id, callback) {
    Recipes.function(id, { $inc: { popularity: 1 } }, (err, docs) => {
      if (err) {
        callback(err, null);
      }
      callback(null, docs);
    });
  },
};
