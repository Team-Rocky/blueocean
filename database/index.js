const mongoose = require('mongoose');
require('dotenv').config();
// console.log('this is process.env:', process.env.MONGOURI)

mongoose.connect(process.env.MONGOURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

const db = mongoose.connection;

module.exports = db;
