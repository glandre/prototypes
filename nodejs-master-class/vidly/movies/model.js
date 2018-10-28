const mongoose = require('mongoose')
const {schema, validate} = require('./schema')
const {NOT_FOUND_ERROR} = require('../errors')
const {pickNotNil} = require('../utils')
const Genre = require('../genres/model').Model
const Model = mongoose.model('movies', schema)

const getAll = (q = null, sorted = false) => {
  let query = (q && (q+'').length > 0)
    ? Model.find({
      name: {
        $regex: `.*${q}.*`,
        $options: 'i'
      }
    })
    : Model.find()

  if (sorted && (sorted+'').toLowerCase() === 'true') {
    query = query.sort('name')
  }

  return query.select('-__v -_id -genre._id -genre.__v')
}

const getById = async (id) => {
	return Model.findById(id)
    .select('-__v -_id -genre._id -genre.__v')
}

const add = async (data) => {
	validate(data)

  console.log('Data validated...')

  if (data.genre) {
    console.log('checking genre...')
    // check if genre exists
    const genre = await Genre.findOne({ name: data.genre.name })
    console.log('genre:', genre)
    if (genre) {
      // if it does: replace it with the one found in the database
      data.genre = null
    }

    data = Object.assign({}, pickNotNil(data), { genre })
    console.log('resulting data:', data)
  }

	const element = new Model(data)
  await element.save()
  console.log('returing element:', element)
	return element
}

const addAll = (array) => {
  if (!Array.isArray(array)) {
    throw new Error('Array of Models Expected!')
  }
  return Model.insertMany(array)
}

const update = (id, data) => {
	validate(data)
	return Model.findByIdAndUpdate(id, { $set: data }, { new: true })
    .select('-__v -_id -genre._id -genre.__v')
}

const deleteById = (id) => {
	return Model.findByIdAndDelete(id)
    .select('-__v -_id -genre._id -genre.__v')
}

module.exports = {
	getAll,
	getById,
	add,
  addAll,
	update,
	deleteById,
}