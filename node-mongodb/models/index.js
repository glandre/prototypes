var mongoose = require('mongoose');
const { connectionString } = require('../config').mongodb;
console.log('connectionString:', connectionString);
mongoose.connect(connectionString, {useMongoClient: true});

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
