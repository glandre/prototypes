const Fawn = require('fawn')
const mongoose = require('mongoose')
const {schema, validate} = require('./schema')
const {
  NOT_FOUND_ERROR, 
  CUSTOMER_NOT_FOUND_ERROR,
  GENRE_NOT_FOUND_ERROR,
  MOVIE_NOT_FOUND_ERROR,
  MOVIE_NOT_IN_STOCK_ERROR
} = require('../errors')

const Customer = require('../customers/model').Model
const Movie = require('../movies/model').Model

const Model = mongoose.model('rentals', schema)

Fawn.init(mongoose)

const getAll = () => {
  return Model
    .find()
    .sort('-dateOut')
    .populate('customer')
    .populate('movie')
    .select('-__v')
}

const getById = async (id) => {
	return Model.findById(id)
    .populate('customer')
    .populate('movie')
    .select('-__v')
}

const add = async (data) => {
	validate(data)

  // if customer does not exist: throw...
  const customer = await Customer.findById(data.customerId)
  if (!customer) {
    throw new Error(CUSTOMER_NOT_FOUND_ERROR)
  }

  // if movie does not exist: throw...
  const movie = await Movie.findById(data.movieId)
  if (!movie) {
    throw new Error(MOVIE_NOT_FOUND_ERROR)
  }

  // if movie is not in stock: throw...
  if (movie.numberInStock === 0) {
    throw new Error(MOVIE_NOT_IN_STOCK_ERROR)
  }

  const element = new Model({
    customer: customer._id,
    movie: movie._id,
    dateOut: new Date()
  })

  new Fawn.Task()
    .save('rentals', element)
    .update('movies', { _id: movie._id }, {
      $inc: { numberInStock: -1 }
    })
    .run()

  console.log('returing element:', element)
	return element
}

// const addAll = (array) => {
//   if (!Array.isArray(array)) {
//     throw new Error('Array of Models Expected!')
//   }
//   return Model.insertMany(array)
// }

// const update = async (id, data) => {
// 	validate(data, true)
//   data = await transformMovie(data)
// 	return Model.findByIdAndUpdate(id, { $set: data }, { new: true })
//     .select('-__v')
// }

// const deleteById = (id) => {
// 	return Model.findByIdAndDelete(id)
//     .select('-__v')
// }

//
// Exports
//
module.exports = {
	getAll,
	getById,
	add,
  // addAll,
	// update,
	// deleteById,
}