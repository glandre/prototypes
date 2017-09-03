var express = require('express');
var app = express();

var Person = require('./models').Person;

var apiController = require('./controllers/apiController');
var htmlController = require('./controllers/htmlController');

var port = process.env.PORT || 3000;

app.use('/assets', express.static(__dirname + '/public'));

app.set('view engine', 'ejs');

app.use('/', function (req, res, next) {
  console.log('Request Url: ' + req.url);

  Person.find({}, (err, users) => {
    if (err) {
      throw err;
    }
    console.log(users);
  })

  next();
});

htmlController(app);
apiController(app);

app.listen(port, () => {
  console.log('Welcome to Example of MongoDB connection in Node using Mongoose');
  console.log(`Listening on port ${port}`);
});
