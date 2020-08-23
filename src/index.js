const express = require('express')
const db = require('../../db/knexQueries')
const router = express.Router()

router.get('/books', (req, res) => {
  db.getAllBooks().then(books => {
    res.send(books)
  })
    .catch(err => {
      res.status(500).send('DATABASE ERROR: ' + err.message)
    })
})

router.get('/books/sort', (req, res) => {
  db.ascendingRatingSort().then(books => {
    res.send(books)
  })
    .catch(err => {
      res.status(500).send('DATABASE ERROR: ' + err.message)
    })
})

router.get('/books/:id', (req, res) => {
  const bookId = req.params.id
  db.queryById(bookId)
    .then((books) => {
      if (books.length < 1) {
        res.status(404).json({
          message: 'The book with the specified ID does not exist.'
        })
      } else {
        // res.send(books)
        res.status(200).json(books)
      }
    })
    .catch((error) => {
      console.log(error)
      res.status(500).json({
        errorMessage: 'The book could not be removed.'
      })
    })
})

router.post('/books', (req, res) => {
  db.addBook(req.body).then(books => {
    res.json(books)
  })
    .catch(err => {
      res.status(500).send('DATABASE ERROR: ' + err.message)
    })
})

router.delete('/books/:id', (req, res) => {
  const bookId = req.params.id
  db.deleteBook(bookId)
    .then(books => {
      if (!books) {
        return res.status(404).send({
          message: 'The book with this specific ID does not exist.'
        })
      }
      res.status(200).json({ message: 'The book with the id has now been removed from the database.' })
    })
    .catch(err => {
      res.status(500).sendStatus('DATABASE ERROR: ' + err.message)
    })
})

router.put('/books/:id', (req, res) => {
  const bookId = req.params.id
  const book = req.body
  db.changeRating(book, bookId)
    .then(books => {
      if (!books) {
        return res.status(404).send({
          message: 'The book with this specific ID does not exist.'
        })
      }
      res.status(200).json({ message: 'The book rating has been changed.' })
    })
    .catch(err => {
      res.status(500).sendStatus('DATABASE ERROR: ' + err.message)
    })
})

module.exports = router
