var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });

module.exports = function (app) {
  app.get('/', (req, res) => {
    res.render('index');
  });

  app.get('/person/:id', (req, res) => {
    res.render('person', { id: req.params.id, qstr: req.params.qstr });
  });

  app.post('/person', urlencodedParser, (req, res) => {
    res.send('Thank you!');
    console.log(req.body.name);
    console.log(req.body.lastName);
  });
}
