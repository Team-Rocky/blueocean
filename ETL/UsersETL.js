
const fs = require('fs');
var tempArray = []
const db = require('../database/index')
const Users = require('../database/Schemas/UsersSchemas.js')

var namesArray = [
  "Jordan Hamsey",
  "Marco Pierre Aight",
  "Billie Flay",
  "Girl Fiery",
  "Luigi Batali",
  "Jack Peepin"
]

var storeAll = (array) => {
  if (array.length === 0) {
    return console.log('saved users!')
  }

  Users.create({
    name: array[0],
    email: array[0].split(' ')[0] + array[0].split(' ')[1] + '@chefslist.com',
    friends: [],
    date_created: new Date()
  })
  .then (() => {

    storeAll(array.splice(1, array.length))

  })
  .catch((err) => {
    console.log('err saving user: ', err)
  })

}

storeAll(namesArray)