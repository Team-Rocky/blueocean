const Users = require('../../database/Schemas/UsersSchemas');
const Recipes = require('../../database/Schemas/RecipesSchema');
const CalendarEntries = require('../../database/Schemas/CalendarEntrySchema');

module.exports = {
  getUser(email, callback) {
    console.log('in getUser!');
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
    //
    Recipes.findOneAndUpdate(
      { _id: id.recipeId },
      { $inc: { popularity: 1 } },
      (err, docs) => {
        if (err) {
          callback(err, null);
        }
        callback(null, docs);
      }
    );
  },
  addCalendarEntry(obj, callback) {
    // CalendarEntries.drop()
    // .then(() => {
    //   callback(null, 'db cleared!')
    // })

    CalendarEntries.create(obj)
      .then(() => {
        callback(null);
      })
      .catch((err) => {
        console.log('error in CalendarEntries.create!');
        callback(err);
      });
  },
  getCalendarEntries(id, callback) {
    CalendarEntries.find(id)
      .then((response) => {
        callback(null, response);
      })
      .catch((err) => {
        console.log('error in getCalendarEntries: ', err);
        callback(err);
      });
  },
  deleteRecipe(id, callback) {
    Recipes.findOneAndDelete(id, (err, docs) => {
      if (err) {
        callback(err, null);
      }
      callback(null, docs);
    });
  },
  deleteCalenderRecipe(id, callback) {
    CalendarEntries.findOneAndDelete(id, (err, docs) => {
      if (err) {
        callback(err, null);
      }
      callback(null, docs);
    });
  },
  // deleteAllCalenderRecipes(callback) {
  //   CalendarEntries.d
  // }
};
