const Users = require("./../../database/Schemas/UsersSchemas.js");
const Recipes = require("./../../database/Schemas/RecipesSchema.js");

module.exports = {
  getUser: function (email, callback) {
    Users.find(email, (err, docs) => {
      if (err) {
        callback(err, null);
      }
      callback(null, docs);
    });
  },
  getUserRecipes: function (id, limit, callback) {
    Recipes.find(id, (err, docs) => {
      if (err) {
        callback(err, null);
      }
      callback(null, docs);
    }).limit(limit);
    // .skip(limit * page + limit);
  },
  getAllRecipeByFilter: function (id, filter, limit, callback) {
    let queryBy;
    let search = {};
    if (filter === "time") {
      queryBy = { sort: "-date_created" };
    }
    if (filter === "popularity") {
      queryBy = { sort: "-popularity" };
    }
    if (filter === "myRecipes") {
      queryBy = null;
      search = id;
    }
    Recipes.find(search, null, queryBy, (err, docs) => {
      if (err) {
        callback(err, null);
      }
      callback(null, docs);
    }).limit(limit);
  },
  addUser: function (info, callback) {
    Users.create(info, (err, docs) => {
      if (err) {
        callback(err, null);
      }
      callback(null, docs);
    });
  },
  newRecipe: function (info, callback) {
    Recipes.create(info, (err, docs) => {
      if (err) {
        callback(err, null);
      }
      callback(null, docs);
    });
  },
  updateRecipe: function (id, newInfo, callback) {
    Recipes.findOneAndUpdate(id, { newInfo }, { upsert: true }, (err, docs) => {
      if (err) {
        callback(err, null);
      }
      callback(docs, null);
    });
  },
  incrementPopularity: function (id, callback) {
    Recipes.function(id, { $inc: { popularity: 1 } }, (err, docs) => {
      if (err) {
        callback(err, null);
      }
      callback(null, docs);
    });
  },
};
