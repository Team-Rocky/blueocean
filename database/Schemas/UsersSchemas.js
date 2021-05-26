const mongoose = require('mongoose');
const db = require('../index.js');
mongoose.Promise = global.Promise;

const UsersSchema = mongoose.Schema({
  name: String,
  email:{type: String, required: true, unique: true},
  friends: [String],
  date_created: Date,
});

const Users = mongoose.model('Users', UsersSchema);

module.exports = Users;
