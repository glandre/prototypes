var express = require('express')
var mongoose = require('mongoose')

var config = require('./config')

var setup = require('./controllers/setup')
var api = require('./controllers/api')

var app = express()
var port = process.env.PORT || 3000

// TODO: comment about this to prevent warnings
mongoose.Promise = global.Promise
mongoose.connect(config.mongodb.uri, { useMongoClient: true })

// middlewares
setup(app)

// api
api(app)

// static elements
app.use('/', express.static(__dirname + '/public'))

if (process.env.NODE_ENV !== 'production') {
  // enables development custom tools
  require('./controllers/dev')(app)
}

app.listen(port, () => {
  console.log('TODO List Web Server running on port ' + port)
})
