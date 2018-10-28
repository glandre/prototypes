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

const getAll = (sorted = false) => {
  const query = Model.find()

  if (sorted && (sorted+'').toLowerCase() === 'true') {
    query = query.sort('name')
  }

  return query
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

  // movie: decrement stock
  const updatedMovie = await Movie.findByIdAndUpdate(data.movieId, {
    $inc: {
      numberInStock: -1
    }
  })

  console.log('Movie successfully updated:', updatedMovie)

  // Save Rental
	const element = new Model({
    customer: customer._id,
    movie: movie._id
  })
  await element.save()

  console.log('returing element:', element)
	return element // .populate(movie).populate(customer)
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