const mongoose = require('mongoose');
const db = require('../index.js');
mongoose.Promise = global.Promise;

const CalendarEntrySchema = mongoose.Schema({

  userId: String,
  recipeId: String,
  date:{ type: Date, required: true, unique: true },
  cookTime: Number,
  ingredientList: [String],
  recipeName: String
})

const CalendarEntry = mongoose.model('CalendarEntries', CalendarEntrySchema);

module.exports = CalendarEntry;
