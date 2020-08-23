// this contains knex queries that can be made without Express
require('dotenv').config()
const knex = require('./db/knex.js')

function selectAll () {
  knex
    .select('*')
    .from('Books')
    .then((result) => {
      console.log(result)
    })
}

// selectAll()

function queryById (id) {
  knex('Books')
    .where('id', id)
    .then((result) => {
      console.log('QueryById result: ', result)
    })
}

// queryById(4)

function ascendingRatingSort () {
  knex('Books')
    .orderBy('rating', 'asc')
    .then((result) => {
      console.log(result)
    })
}

// ascendingRatingSort()

module.exports = {
  selectAll,
  queryById,
  ascendingRatingSort
}
