module.exports = {
  getUser: function (email, callback) {
    Users.find(email, (err, docs) => {
      if (err) {
        callback(err, null);
      }
      callback(null, docs);
    });
  },
  getUserRecipes: function (id, limit, page, callback) {
    Recipes.find({ _id: id }, (err, docs) => {
      if (err) {
        callback(err, null);
      }
      callback(null, docs);
    })
      .limit(limit)
      .skip(limit * page + limit);
  },
  getAllRecipeByFilter: function (filter, limit, callback) {
    Recipes.find(filters, (err, docs) => {
      if (err) {
        callback(err, null);
      }
      callback(null, docs);
    }).limit(limit);
  },
  addUser: function (info, callback) {
    Users.insertOne(info, (err, docs) => {
      if (err) {
        callback(err, null);
      }
      callback(null, docs);
    });
  },
  newRecipe: function (info, callback) {
    Recipes.insertOne(info, (err, docs) => {
      if (err) {
        callback(err, null);
      }
      callback(null, docs);
    });
  },
  updateRecipe: function (id, newInfo, callback) {
    Recipes.findOneAndUpdate({ _id: id }, { newInfo }, (err, docs) => {
      if (err) {
        callback(err, null);
      }
      callback(docs, null);
    });
  },
  incrementPopularity: function (id, callback) {
    Recipes.function({ _id: id }, { $inc: { popularity: 1 } }, (err, docs) => {
      if (err) {
        callback(err, null);
      }
      callback(null, docs);
    });
  },
};
