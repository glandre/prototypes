var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });

var Person = require('../models').Person;

module.exports = function (app) {
  app.get('/', (req, res) => {
    res.render('index');
  });

  app.get('/person/:id', (req, res) => {
    res.render('person', { id: req.params.id, qstr: req.params.qstr });
  });

  app.post('/person', urlencodedParser, (req, res) => {
    console.log(req.body.name);
    console.log(req.body.lastName);
    const {name, lastName} = req.body;
    var person = Person({
      name,
      lastName
    });
    if (person.name && person.lastName) {
      person.save((err) => {
        if (err) {
          throw err;
        }
        res.send('Thank you!');
      });
    } else {
      res.send('Invalid Data!');
    }
  });
}
