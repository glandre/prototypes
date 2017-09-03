var mongoose = require('mongoose');

mongoose.connect('mongodb://dev:V8Dhmo41QIvxZBd0@ds121674.mlab.com:21674/geralds', {
  useMongoClient: true
});

var Schema = mongoose.Schema;

var personSchema = new Schema({
  name: String,
  lastName: String,
  address: String
});

var Person = mongoose.model('Person', personSchema);

module.exports = {
  Person
}
