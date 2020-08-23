'use strict'
require('dotenv').config()

const express = require('express')
const bodyParser = require('body-parser')
const PORT = 8000
const routes = require('./src/routes/index')

const app = express()

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.get('/', function (req, res) {
  res.send('database connection')
})

app.use('/', routes)

app.listen(PORT, function () {
  console.log(`App listening on port ${PORT}`)
})

module.exports = app
