var bodyParser = require('body-parser')
var Todos = require('../models/todos')

module.exports = (app) => {
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: true }))
  app.use('/', (req, res, next) => {
    console.log(`${req.method} ${req.headers.host}${req.url} - body:`, req.body)
    next()
  })
}
