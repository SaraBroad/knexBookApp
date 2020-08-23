var db = require('./knex.js')

function Books () {
  return db('Books')
}

function getAllBooks () {
  return db('Books').select()
}

function queryById (bookId) {
  return db('Books').where('id', bookId)
}

function ascendingRatingSort () {
  return db('Books').orderBy('rating', 'asc')
}

function addBook (newBook) {
  return db('Books').insert(newBook)
}

function deleteBook (bookId) {
  return db('Books').where('id', bookId).del()
}

function changeRating (rating, id) {
  return db('Books').where('id', '=', id).update(rating)
}

module.exports = {
  getAllBooks: getAllBooks,
  queryById: queryById,
  ascendingRatingSort: ascendingRatingSort,
  addBook: addBook,
  deleteBook: deleteBook,
  changeRating: changeRating
}
