const mongoose = require('mongoose');
const db = require('../index.js');
mongoose.Promise = global.Promise;

const RecipesSchema = mongoose.Schema({
  userId: String,
  userName: String,
  name: String,
  private: Boolean,
  ingredientLines: [String],
  popularity: Number,
  totalTime: Number,
  description: String,
  yield: Number,
  photo: [String],
  date_created: Date,
});

const Recipes = mongoose.model('Recipes', RecipesSchema);

module.exports = Recipes;
